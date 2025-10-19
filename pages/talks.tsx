import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { getAllTalks, formatDate, Talk } from '../lib/posts';

type TalkPreview = Omit<Talk, 'content'>;

interface TalksProps {
  talks: TalkPreview[];
}

export default function Talks({ talks }: TalksProps) {
  return (
    <Layout
      title="Talks"
      description="Conference talks and presentations by Lucas F. Costa"
    >
      <div className="blog">
        <ul className="post-list">
          {talks.map((talk) => (
            <li key={talk.slug} className="post-item">
              <span className="post-date">{formatDate(talk.date)}</span>

              <h2 className="post-title">
                <a className="post-link" href={`/talks/${talk.slug}`}>
                  {talk.title}
                </a>
              </h2>

              <span className="post-author">
                {talk.author} at {talk.event}
              </span>
              <span className="post-flag">{talk.flag}</span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const talks = getAllTalks();

  const talksWithoutContent = talks.map(({ content, ...talk }) => talk);

  return {
    props: {
      talks: talksWithoutContent,
    },
  };
};
