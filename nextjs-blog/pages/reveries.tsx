import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getAllReveries, formatDate, Post } from '../lib/posts';

interface ReveriesProps {
  reveries: Post[];
}

export default function Reveries({ reveries }: ReveriesProps) {
  return (
    <Layout title="Reveries" description="Quick personal essays">
      <div className="page-lead">
        <p>
          I have reserved this section for{' '}
          <a href="https://jsomers.net/blog/speed-matters">quick personal essays</a>. 
          To go back to the main content, <Link href="/">click here</Link>.
        </p>
      </div>
      
      <div className="reveries">
        <ul className="post-list">
          {reveries.map((reverie) => (
            <li key={reverie.slug} className="post-item">
              <span className="post-date">
                {formatDate(reverie.date)}
              </span>

              <h2 className="post-title">
                <Link href={`/reveries/${reverie.slug}`} className="post-link">
                  {reverie.title}
                </Link>
              </h2>

              <span className="post-author">
                {reverie.author} at {reverie.place}
              </span>
              <span className="post-flag">{reverie.flag}</span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const reveries = getAllReveries();

  return {
    props: {
      reveries,
    },
  };
};