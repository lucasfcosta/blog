import { useState } from 'react';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Check your email to confirm your subscription!');
      } else {
        const data = await response.json();
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="subscribe-section">
      <h3 className="subscribe-title">Subscribe</h3>
      <p className="subscribe-description">
        Get an email when I publish a new post. I&apos;ll never send you spam.
      </p>
      <form onSubmit={handleSubmit} className="subscribe-form">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading' || status === 'success'}
          className="subscribe-input"
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="subscribe-button"
        >
          Subscribe
        </button>
      </form>
      {message && (
        <p
          className={`subscribe-message ${status === 'error' ? 'subscribe-message-error' : 'subscribe-message-success'}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
