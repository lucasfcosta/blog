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

  const { email } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    let subscriber;

    try {
      subscriber = await prisma.subscriber.create({
        data: { email: normalizedEmail },
      });
    } catch (createError: any) {
      if (createError.code === 'P2002') {
        subscriber = await prisma.subscriber.findUnique({
          where: { email: normalizedEmail },
        });

        if (!subscriber) {
          throw new Error('Failed to retrieve existing subscriber');
        }

        if (subscriber.confirmed) {
          return res.status(200).json({ success: true });
        }
      } else {
        throw createError;
      }
    }

    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    const confirmUrl = `${baseUrl}/confirm-subscription?token=${subscriber.token}`;

    await resend.emails.send({
      from: 'Lucas F. Costa <noreply@updates.lucasfcosta.com>',
      to: normalizedEmail,
      subject: 'Confirm your subscription',
      html: `
        <p>Please confirm your subscription by clicking the link below:</p>
        <p><a href="${confirmUrl}">Confirm subscription</a></p>
        <p>If you haven't requested this, please ignore this email.</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return res.status(500).json({ error: 'Failed to create subscription' });
  }
}
