import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import {
  getPaginatedPosts,
  getTotalPostPages,
  formatDate,
  Post,
} from '../../lib/posts';

type PostPreview = Omit<Post, 'content'>;

interface PageProps {
  posts: PostPreview[];
  currentPage: number;
  totalPages: number;
}

export default function Page({ posts, currentPage, totalPages }: PageProps) {
  return (
    <Layout>
      <div className="blog">
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-item">
              <span className="post-date">{formatDate(post.date)}</span>

              <h2 className="post-title">
                <a className="post-link" href={`/blog/${post.slug}`}>
                  {post.title}
                </a>
              </h2>

              <span className="post-author">
                {post.author} at {post.place}
              </span>
              <span className="post-flag">{post.flag}</span>
            </li>
          ))}
        </ul>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = getTotalPostPages();
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
  const posts = getPaginatedPosts(page);
  const totalPages = getTotalPostPages();

  const postsWithoutContent = posts.map(({ content, ...post }) => post);

  return {
    props: {
      posts: postsWithoutContent,
      currentPage: page,
      totalPages,
    },
  };
};
