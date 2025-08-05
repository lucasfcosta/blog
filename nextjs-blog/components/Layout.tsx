import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { siteConfig } from '../lib/config';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children, title, description }: LayoutProps) {
  const pageTitle = title ? `${title}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        

        
        {/* KaTeX for math */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
          integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" 
          crossOrigin="anonymous" 
        />
        
        <link rel="canonical" href={`${siteConfig.url}${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
        <link rel="alternate" type="application/rss+xml" title={siteConfig.title} href="/feed.xml" />
        
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      
      <Header />
      
      <div className="page-content">
        {children}
      </div>
      
      <Footer />
    </>
  );
}