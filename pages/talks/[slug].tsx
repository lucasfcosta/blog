import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';

import Layout from '../../components/Layout';
import BlogImage from '../../components/BlogImage';
import Spacer from '../../components/Spacer';
import Callout from '../../components/Callout';
import BigText from '../../components/BigText';
import YouTube from '../../components/YouTube';
import { getAllTalks, getTalkBySlug, formatDate, Talk } from '../../lib/posts';
import { siteConfig } from '../../lib/config';

interface TalkPageProps {
  talk: Talk;
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

export default function TalkPage({ talk, mdxSource }: TalkPageProps) {
  const talkUrl = `${siteConfig.url}/talks/${talk.slug}`;

  return (
    <Layout title={talk.title} description={talk.description}>
      <div className="post">
        <h1 className="post-title">{talk.title}</h1>

        <div className="post-headline">
          <span className="post-meta">
            <span className="post-date">
              {formatDate(talk.date)}
            </span>
            <span className="post-separator"> — </span>
            <span className="post-author">
              {talk.author} at {talk.event}
            </span>
            <span className="post-flag">{talk.flag}</span>
          </span>

          <span className="share-buttons">
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(talk.title)}&url=${encodeURIComponent(talkUrl)}&via=${siteConfig.twitterUsername}&related=${siteConfig.twitterUsername}`}
              rel="nofollow" 
              target="_blank" 
              title="Share on Twitter"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a 
              href={`https://facebook.com/sharer.php?u=${encodeURIComponent(talkUrl)}`} 
              rel="nofollow" 
              target="_blank"
              title="Share on Facebook"
            >
              <i className="fab fa-facebook-f fa-2x"></i>
            </a>
            <a 
              href={`http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(talkUrl)}&title=${encodeURIComponent(talk.title)}&summary=${encodeURIComponent(siteConfig.url)}&source=${encodeURIComponent(siteConfig.url)}`}
              rel="nofollow" 
              target="_blank" 
              title="Share on LinkedIn"
            >
              <i className="fab fa-linkedin-in fa-2x"></i>
            </a>
            <a 
              href={`http://www.reddit.com/submit?url=${encodeURIComponent(talkUrl)}&title=${encodeURIComponent(talk.title)}`}
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
  const talks = getAllTalks();
  const paths = talks.map((talk) => ({
    params: { slug: talk.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const talk = getTalkBySlug(params?.slug as string);

  if (!talk) {
    return {
      notFound: true,
    };
  }

  // Process content to handle modern MDX components while preserving legacy HTML
  let processedContent = talk.content;
  
  // Convert BlogImage components to HTML for markdown processing
  processedContent = processedContent.replace(
    /<BlogImage\s+([^>]+)\s*\/>/g,
    (match, props) => {
      // Extract props from the BlogImage component
      const srcMatch = props.match(/src="([^"]+)"/);
      const altMatch = props.match(/alt="([^"]+)"/);
      const hrefMatch = props.match(/href="([^"]+)"/);
      const captionMatch = props.match(/caption="([^"]+)"/);
      
      const src = srcMatch ? srcMatch[1] : '';
      const alt = altMatch ? altMatch[1] : '';
      const href = hrefMatch ? hrefMatch[1] : '';
      const caption = captionMatch ? captionMatch[1] : '';
      
      let imgTag = `<img style="margin-bottom: -18px;" src="${src}" alt="${alt}">`;
      
      if (href) {
        imgTag = `<a target="_blank" class="image-link" href="${href}">${imgTag}</a>`;
      }
      
      if (caption) {
        imgTag += `\n<center style="font-size: 0.8em; margin-bottom: 32px;"><i>${caption}</i></center>`;
      }
      
      return imgTag;
    }
  );

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
      talk,
      mdxSource,
    },
  };
};