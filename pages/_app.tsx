import type { AppProps } from 'next/app';
import Head from 'next/head';
import { BotIdClient } from 'botid/client';
import '../public/css/reset.css';
import '../public/css/font-awesome.min.css';
import '../public/css/brands.min.css';
import '../public/css/solid.min.css';
import '../public/css/pygments.css';
import 'katex/dist/katex.min.css';
import '../styles/globals.scss';

const protectedRoutes = [
  {
    path: '/api/subscribe',
    method: 'POST',
  },
  {
    path: '/api/confirm-subscription',
    method: 'POST',
  },
];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <BotIdClient protect={protectedRoutes} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
