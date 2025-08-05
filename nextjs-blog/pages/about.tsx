import Layout from '../components/Layout';
import { siteConfig } from '../lib/config';

export default function About() {
  return (
    <Layout title="About Me" description="About Lucas F. Costa">
      <div className="about">
        <img 
          className="profile-picture" 
          src="/lucasfcosta.png" 
          alt="Lucas F. Costa profile picture" 
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
          <p>
            I was born in an island in southern Brazil. The weather there was too nice, so I had to go live in London for five years. Now that I&apos;m back, I miss the tea, the tube, and the drizzle.
          </p>

          <p>
            Currently, I&apos;m the founder and CEO at <a href="https://briefer.cloud">Briefer</a> (a YC company in the S23 batch).
          </p>

          <p>
            Besides prose, I write JavaScript, TypeScript, and Rust most of the time, and I&apos;m passionate about open-source. Previously, I have been a maintainer of <a href="http://chaijs.com/">Chai.js</a> and <a href="http://sinonjs.org/">Sinon.js</a>. I&apos;m very active on <a href="https://github.com/lucasfcosta">GitHub</a> and have contributed to numerous projects, including <a href="https://github.com/facebook/jest">Jest</a> and <a href="https://nodeschool.io/">NodeSchool</a>.
          </p>

          <p>
            As an author, I&apos;ve written <a href="https://www.manning.com/books/testing-javascript-applications"><em>Testing JavaScript Applications</em></a>, a book published by <a href="https://www.manning.com/">Manning Publications</a>.
          </p>

          <p>
            I like opinionated books, beautiful code, well-engineered prose, command-line interfaces, and vim. In fact, I like vim so much that <a href="/assets/vimtattoo.jpg">I got a <code>:w</code> tattoed on my ankle</a>.
          </p>

          <p>
            Content that I <em>own</em> is always up for grabs. Universities and online courses use some of these posts as reference material, and you can do the same if you want.
          </p>

          <p>
            I have been voluntarily translated into many languages, including German, Korean, Russian, Mandarin, French, Portuguese, and Spanish. If you wish to translate any of these posts, you <em>don&apos;t</em> need to ask for permission.
          </p>

          <p>
            Everything I produce belongs to the internet. It has made me who I am, and, therefore, it deserves all I have.
          </p>
        </div>
      </div>
    </Layout>
  );
}