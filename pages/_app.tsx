import type { AppProps } from 'next/app';
import '../public/css/reset.css';
import '../public/css/font-awesome.min.css';
import '../public/css/brands.min.css';
import '../public/css/solid.min.css';
import '../public/css/pygments.css';
import 'katex/dist/katex.min.css';
import '../styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
