import { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '../lib/config';

// Type for the analytics function
declare global {
  interface Window {
    sa_event?: (eventName: string) => void;
  }
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="header-left">
          <a className="navItem" href={`mailto:${siteConfig.email}`}>Email</a>
          <a 
            className="navItem" 
            onClick={() => {
              if (typeof window !== 'undefined' && window.sa_event) {
                window.sa_event('header_twitter_follow');
              }
            }}
            href={`https://twitter.com/${siteConfig.twitterUsername}`}
          >
            Twitter
          </a>
          <a 
            className="navItem" 
            onClick={() => {
              if (typeof window !== 'undefined' && window.sa_event) {
                window.sa_event('header_github_follow');
              }
            }}
            href={`https://github.com/${siteConfig.githubUsername}`}
          >
            Github
          </a>
        </div>
        <div className="header-center">
          <h1 className="title">
            <Link className="title-link" href="/">
              Lucas F. Costa
              <span className="subtitle">{siteConfig.subtitle}</span>
            </Link>
          </h1>
        </div>
        <div className="header-right">
          <Link className="navItem" href="/">Blog</Link>
          <Link className="navItem" href="/talks">Talks</Link>
          <Link className="navItem" href="/about">About Me</Link>
          <a 
            className="navItem" 
            onClick={() => {
              if (typeof window !== 'undefined' && window.sa_event) {
                window.sa_event('header_rss');
              }
            }} 
            href="/feed.xml"
          >
            RSS
          </a>
        </div>

        <span 
          id="menu-toggle" 
          className="menu-toggle navItem"
          onClick={toggleMenu}
        >
          MENU
        </span>
        <div 
          id="menu-drawer" 
          className={`menu-drawer ${isMenuOpen ? '' : 'menu-drawer-hidden'}`}
        >
          <div className="drawer-header">
            <h1 className="title">
              <Link className="title-link" href="/">
                Lucas F. Costa
                <span className="subtitle">{siteConfig.subtitle}</span>
              </Link>
            </h1>
            <span 
              id="menu-close" 
              className="menu-close-button"
              onClick={closeMenu}
            >
              <i className="fas fa-times fa-2x"></i>
            </span>
          </div>

          <div className="drawer-menu-items">
            <Link className="drawer-item" href="/">Blog</Link>
            <Link className="drawer-item" href="/talks">Talks</Link>
            <Link className="drawer-item" href="/about">About Me</Link>
            <a className="drawer-item" href={`mailto:${siteConfig.email}`}>Email</a>
            <a 
              className="drawer-item" 
              onClick={() => {
                if (typeof window !== 'undefined' && window.sa_event) {
                  window.sa_event('drawer_twitter_follow');
                }
              }}
              href={`https://twitter.com/${siteConfig.twitterUsername}`}
            >
              Twitter
            </a>
            <a 
              className="drawer-item" 
              onClick={() => {
                if (typeof window !== 'undefined' && window.sa_event) {
                  window.sa_event('drawer_github_follow');
                }
              }}
              href={`https://github.com/${siteConfig.githubUsername}`}
            >
              Github
            </a>
            <a 
              className="drawer-item" 
              onClick={() => {
                if (typeof window !== 'undefined' && window.sa_event) {
                  window.sa_event('drawer_rss');
                }
              }} 
              href="/feed.xml"
            >
              RSS
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}