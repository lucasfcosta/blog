import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../../components/Layout';
import Pagination from '../../../components/Pagination';
import {
  getPaginatedTalks,
  getTotalTalkPages,
  formatDate,
  Talk,
} from '../../../lib/posts';

type TalkPreview = Omit<Talk, 'content'>;

interface PageProps {
  talks: TalkPreview[];
  currentPage: number;
  totalPages: number;
}

export default function Page({ talks, currentPage, totalPages }: PageProps) {
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/talks"
        />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = getTotalTalkPages();
  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { page: String(i + 2) },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = Number(params?.page) || 1;
  const talks = getPaginatedTalks(page);
  const totalPages = getTotalTalkPages();

  const talksWithoutContent = talks.map(({ content, ...talk }) => talk);

  return {
    props: {
      talks: talksWithoutContent,
      currentPage: page,
      totalPages,
    },
  };
};
