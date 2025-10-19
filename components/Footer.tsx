import Script from 'next/script';

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <span className="copyleft">
            <span className="copyleft-brand">
              Copyleft - All rights reversed.
            </span>
            <span className="copyleft-motto">
              The internet is free and so is my content.
            </span>
          </span>
          <a href="/feed.xml" className="rss-link">
            RSS
          </a>
        </div>
      </div>

      {/* Analytics Scripts */}
      <Script
        src="https://blogaudience.lucasfcosta.com/latest.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://blogaudience.lucasfcosta.com/auto-events.js"
        strategy="afterInteractive"
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://blogaudience.lucasfcosta.com/noscript.gif" alt="" />
      </noscript>
    </>
  );
}
