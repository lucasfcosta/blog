import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { checkBotId } from 'botid/server';
import { prisma } from '../../lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const verification = await checkBotId();
  if (verification.isBot) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { token },
    });

    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    if (subscriber.confirmed) {
      return res
        .status(200)
        .json({ success: true, message: 'Already confirmed' });
    }

    await prisma.subscriber.update({
      where: { token },
      data: { confirmed: true },
    });

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        await resend.contacts.create({
          email: subscriber.email,
          unsubscribed: false,
          audienceId,
        });
      } catch (error) {
        console.error('Error adding contact to Resend audience:', error);
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error confirming subscription:', error);
    return res.status(500).json({ error: 'Failed to confirm subscription' });
  }
}
