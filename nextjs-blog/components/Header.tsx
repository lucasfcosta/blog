import { useState } from 'react';
import { siteConfig } from '../lib/config';

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
            onClick={() => {/* Analytics event can be added later */}}
            href={`https://twitter.com/${siteConfig.twitterUsername}`}
          >
            Twitter
          </a>
          <a 
            className="navItem" 
            onClick={() => {/* Analytics event can be added later */}}
            href={`https://github.com/${siteConfig.githubUsername}`}
          >
            Github
          </a>
        </div>
        <div className="header-center">
          <h1 className="title">
            <a className="title-link" href={siteConfig.url}>
              Lucas F. Costa
              <span className="subtitle">{siteConfig.subtitle}</span>
            </a>
          </h1>
        </div>
        <div className="header-right">
          <a className="navItem" href={siteConfig.url}>Blog</a>
          <a className="navItem" href="/talks">Talks</a>
          <a className="navItem" href="/about">About Me</a>
          <a 
            className="navItem" 
            onClick={() => {/* Analytics event can be added later */}} 
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
              <a className="title-link" href={siteConfig.url}>
                Lucas F. Costa
                <span className="subtitle">{siteConfig.subtitle}</span>
              </a>
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
            <a className="drawer-item" href={siteConfig.url}>Blog</a>
            <a className="drawer-item" href="/talks">Talks</a>
            <a className="drawer-item" href="/about">About Me</a>
            <a className="drawer-item" href={`mailto:${siteConfig.email}`}>Email</a>
            <a 
              className="drawer-item" 
              onClick={() => {/* Analytics event can be added later */}}
              href={`https://twitter.com/${siteConfig.twitterUsername}`}
            >
              Twitter
            </a>
            <a 
              className="drawer-item" 
              onClick={() => {/* Analytics event can be added later */}}
              href={`https://github.com/${siteConfig.githubUsername}`}
            >
              Github
            </a>
            <a 
              className="drawer-item" 
              onClick={() => {/* Analytics event can be added later */}} 
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