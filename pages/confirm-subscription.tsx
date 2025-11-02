import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function ConfirmSubscription() {
  const router = useRouter();
  const [status, setStatus] = useState<
    'loading' | 'success' | 'error' | 'invalid'
  >('loading');

  useEffect(() => {
    if (!router.isReady) return;

    const token = router.query.token;

    if (!token || typeof token !== 'string') {
      setStatus('invalid');
      return;
    }

    const confirmSubscription = async () => {
      try {
        const response = await fetch('/api/confirm-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    };

    confirmSubscription();
  }, [router.isReady, router.query.token]);

  if (status === 'loading') {
    return (
      <Layout
        title="Confirming Subscription"
        description="Confirming your subscription to Lucas F. Costa's newsletter"
      >
        <div className="confirmation-page">
          <h1 className="confirmation-title">
            Confirming your subscription...
          </h1>
        </div>
      </Layout>
    );
  }

  if (status === 'invalid') {
    return (
      <Layout
        title="Invalid Link"
        description="Invalid subscription confirmation link"
      >
        <div className="confirmation-page">
          <h1 className="confirmation-title">Invalid confirmation link</h1>
          <div className="confirmation-content">
            <p>This confirmation link is invalid or has expired.</p>
            <p className="confirmation-footer">
              <Link href="/">Return to the homepage</Link>
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (status === 'error') {
    return (
      <Layout
        title="Confirmation Error"
        description="Error confirming subscription"
      >
        <div className="confirmation-page">
          <h1 className="confirmation-title">Something went wrong</h1>
          <div className="confirmation-content">
            <p>
              We couldn&apos;t confirm your subscription. The link may have
              already been used or expired.
            </p>
            <p className="confirmation-footer">
              <Link href="/">Return to the homepage</Link>
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Subscription Confirmed"
      description="You've successfully subscribed to Lucas F. Costa's newsletter"
    >
      <div className="confirmation-page">
        <h1 className="confirmation-title">Subscription confirmed.</h1>
        <div className="confirmation-content">
          <p>
            Thanks for subscribing. You&apos;ll receive an email whenever I
            publish a new post.
          </p>
          <p>
            You can unsubscribe at any time by clicking the link at the bottom
            of any email I send.
          </p>
          <p className="confirmation-footer">
            <Link href="/">Return to the homepage</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
