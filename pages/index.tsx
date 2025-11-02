import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Pagination from '../components/Pagination';
import {
  getPaginatedPosts,
  getTotalPostPages,
  formatDate,
  Post,
} from '../lib/posts';

type PostPreview = Omit<Post, 'content'>;

interface HomeProps {
  posts: PostPreview[];
  currentPage: number;
  totalPages: number;
}

export default function Home({ posts, currentPage, totalPages }: HomeProps) {
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPaginatedPosts(1);
  const totalPages = getTotalPostPages();

  const postsWithoutContent = posts.map(({ content, ...post }) => post);

  return {
    props: {
      posts: postsWithoutContent,
      currentPage: 1,
      totalPages,
    },
  };
};
