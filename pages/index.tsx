import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { getAllPosts, formatDate, Post } from '../lib/posts';

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <div className="blog">
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-item">
              <span className="post-date">{formatDate(post.date)}</span>

              <h2 className="post-title">
                <a className="post-link" href={`/${post.slug}`}>
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
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};
