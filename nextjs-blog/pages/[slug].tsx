import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';

import Layout from '../components/Layout';
import BlogImage from '../components/BlogImage';
import Spacer from '../components/Spacer';
import Callout from '../components/Callout';
import BigText from '../components/BigText';
import YouTube from '../components/YouTube';
import { getAllPosts, formatDate, Post } from '../lib/posts';
import { siteConfig } from '../lib/config';

interface PostPageProps {
  post: Post;
  mdxSource: MDXRemoteSerializeResult;
}

// Custom components for MDX
const components = {
  BlogImage,
  Spacer,
  Callout,
  BigText,
  YouTube,

};

export default function PostPage({ post, mdxSource }: PostPageProps) {
  const postUrl = `${siteConfig.url}/${post.slug}`;

  return (
    <Layout title={post.title} description={post.description}>
      <div className="post">
        <h1 className="post-title">{post.title}</h1>

        <div className="post-headline">
          <span className="post-meta">
            <span className="post-date">
              {formatDate(post.date)}
            </span>
            <span className="post-separator"> — </span>
            <span className="post-author">
              {post.author} at {post.place}
            </span>
            <span className="post-flag">{post.flag}</span>
          </span>

          <span className="share-buttons">
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}&via=${siteConfig.twitterUsername}&related=${siteConfig.twitterUsername}`}
              rel="nofollow" 
              target="_blank" 
              title="Share on Twitter"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a 
              href={`https://facebook.com/sharer.php?u=${encodeURIComponent(postUrl)}`} 
              rel="nofollow" 
              target="_blank"
              title="Share on Facebook"
            >
              <i className="fab fa-facebook-f fa-2x"></i>
            </a>
            <a 
              href={`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(siteConfig.url)}&source=${encodeURIComponent(siteConfig.url)}`}
              rel="nofollow" 
              target="_blank" 
              title="Share on LinkedIn"
            >
              <i className="fab fa-linkedin-in fa-2x"></i>
            </a>
            <a 
              href={`http://www.reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}`}
              rel="nofollow" 
              target="_blank" 
              title="Share on Reddit"
            >
              <i className="fab fa-reddit-alien fa-2x"></i>
            </a>
          </span>
        </div>

        <article className="post-content">
          <MDXRemote {...mdxSource} components={components} />
        </article>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  // Process content to handle modern MDX components while preserving legacy HTML
  let processedContent = post.content;
  
  // Keep BlogImage components as-is for MDX to handle them

  const mdxSource = await serialize(processedContent, {
    parseFrontmatter: false, // We already parsed it
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeKatex, // KaTeX math rendering
        rehypeHighlight, // Syntax highlighting
      ],
      format: 'mdx', // Use MDX format to support JSX components
    },
  });

  return {
    props: {
      post,
      mdxSource,
    },
  };
};