import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SocialIconGithub = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.77.6-3.35-1.17-3.35-1.17-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.64.35-1.08.63-1.33-2.21-.25-4.54-1.1-4.54-4.9 0-1.08.39-1.97 1.03-2.66-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.5 9.5 0 0112 6.8c.85 0 1.71.11 2.51.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.69 1.03 1.58 1.03 2.66 0 3.81-2.34 4.65-4.57 4.9.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
  </svg>
);

const SocialIconLinkedIn = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <path d="M4.98 3.5a2.48 2.48 0 110 4.96 2.48 2.48 0 010-4.96zM3 8.98h3.96V21H3V8.98zM9.02 8.98H13v1.64h.06c.55-1.04 1.9-2.14 3.92-2.14C20.2 8.48 21 10.62 21 13.4V21h-3.96v-6.72c0-1.6-.03-3.66-2.23-3.66-2.23 0-2.57 1.74-2.57 3.54V21H9.02V8.98z" />
  </svg>
);

const SocialIconX = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <path d="M18.9 2H22l-6.8 7.77L23 22h-6.3l-4.93-7.1L5.6 22H2l7.28-8.33L1 2h6.46l4.46 6.5L18.9 2zm-1.1 18h1.72L6.53 3.93H4.68L17.8 20z" />
  </svg>
);

export default function Layout({ children }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = router.pathname === '/';

  const resolveHref = (href) => {
    if (!href?.startsWith('#')) return href;
    return isHome ? href : `/${href}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 20;
      setIsScrolled((previous) =>
        previous === nextIsScrolled ? previous : nextIsScrolled,
      );
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Partners', href: '#partners' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="app-container">
      <Head>
        <title>
          MONAD SYSTEMS Lean-Agile software development & consulting
        </title>
        <meta
          name="description"
          content="Lean-Agile software development, training and consulting services"
        />
        <meta property="og:title" content="MONAD SYSTEMS" />
        <meta
          property="og:description"
          content="Lean-Agile software development, training and consulting services"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monad.hu" />
        <meta property="og:image" content="/og_1200_630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MONAD SYSTEMS" />
        <meta
          name="twitter:description"
          content="Lean-Agile software development, training and consulting services"
        />
        <meta name="twitter:image" content="/og_1200_630.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#0b0f14" />
        <meta name="theme-color" content="#0b0f14" />
      </Head>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding,background-color,border-color] duration-500 ${
          isScrolled ? 'glass py-3 md:py-4' : 'py-4 md:py-6'
        }`}
      >
        <div className="site-container flex items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex items-center leading-none"
            aria-label="Monad Systems"
          >
            <Image
              src="/logo.svg"
              alt="MONAD SYSTEMS"
              width={125}
              height={42}
              priority
            />
          </Link>

          <nav className="desktop-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <span key={link.label} className="inline-flex items-center">
                {link.href.startsWith('/') ? (
                  <Link href={link.href} className="site-nav-link">
                    {link.label}
                  </Link>
                ) : (
                  <a href={resolveHref(link.href)} className="site-nav-link">
                    {link.label}
                  </a>
                )}
              </span>
            ))}
          </nav>

          <div className="desktop-cta">
            <a className="btn btn-hero btn-sm" href={resolveHref('#contact')}>
              Get in Touch
            </a>
          </div>

          <button
            type="button"
            className={`mobile-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="mobile-toggle-bars" />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu glass animate-fade-in">
            <nav aria-label="Mobile">
              {navLinks.map((link) => (
                <span key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={resolveHref(link.href)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )}
                </span>
              ))}
              <a className="btn btn-hero" href={resolveHref('#contact')}>
                Get in Touch
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className={`${isHome ? '' : 'site-main'} site-main-content`}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-content">
            <Image
              src="/logo.svg"
              alt="MONAD SYSTEMS"
              width={125}
              height={42}
            />

            <div className="footer-links">
              <a href={resolveHref('#services')}>Services</a>
              <a href={resolveHref('#about')}>About</a>
              <a href={resolveHref('#work')}>Work</a>
              <a href={resolveHref('#contact')}>Contact</a>
            </div>

            <div className="footer-social">
              <a
                href="https://github.com/monad-systems/"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="GitHub"
              >
                <SocialIconGithub />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.comhttps://www.linkedin.com/company/monad-systems/"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="LinkedIn"
              >
                <SocialIconLinkedIn />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© {new Date().getFullYear()} MONAD SYSTEMS Kft.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
