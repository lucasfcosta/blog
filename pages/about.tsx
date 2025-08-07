import { GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

import Layout from '../components/Layout';
import { siteConfig } from '../lib/config';
import Image from 'next/image';

interface AboutPageProps {
  mdxSource: MDXRemoteSerializeResult;
  frontmatter: {
    title: string;
    description: string;
  };
}

export default function About({ mdxSource, frontmatter }: AboutPageProps) {
  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
      <div className="about">
        <Image 
          className="profile-picture" 
          src="/lucasfcosta.png" 
          alt="Lucas F. Costa profile picture"
          width={200}
          height={200}
          priority
        />

        <h2 className="greeting-text">
          Hello, I&apos;m Lucas <span>👋</span>
        </h2>

        <span className="call-to-action">
          <a 
            href={`https://twitter.com/${siteConfig.twitterUsername}`}
            onClick={() => {/* Analytics event can be added later */}}
          >
            follow me on twitter
          </a>
        </span>

        <div className="profile-content">
          <MDXRemote {...mdxSource} />
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const aboutPath = path.join(process.cwd(), 'about.md');
  const source = fs.readFileSync(aboutPath, 'utf8');
  
  const { content, data } = matter(source);
  
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeHighlight, rehypeKatex],
    },
  });

  return {
    props: {
      mdxSource,
      frontmatter: {
        title: data.title || 'About Me',
        description: data.description || 'About Lucas F. Costa',
      },
    },
  };
};