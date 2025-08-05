import Head from 'next/head';
import { siteConfig } from '../lib/config';

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>{siteConfig.title}</h1>
        <p>{siteConfig.subtitle}</p>
        <p>{siteConfig.description}</p>
        
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <h2>✅ Phase 1: Foundation Setup Complete!</h2>
          <p>Next.js is running successfully. Here&apos;s what we have:</p>
          <ul>
            <li>✅ Next.js 15 with TypeScript</li>
            <li>✅ Static export configuration</li>
            <li>✅ MDX support installed</li>
            <li>✅ SCSS support ready</li>
            <li>✅ Site configuration (matching your Jekyll config)</li>
          </ul>
          <p><strong>Next:</strong> We&apos;ll convert your Jekyll layouts to React components!</p>
        </div>
      </main>
    </>
  );
}