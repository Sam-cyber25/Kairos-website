import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useSpring } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import Marquee from '../components/ui/Marquee';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { HeroBackground } from '../components/ui/HeroBackground';
import styles from './Home.module.css';

// ─── data ────────────────────────────────────────────────────────────────────

const SERVICE_ITEMS = [
  {
    num: '01',
    title: 'Website Design',
    description:
      'Every layout is designed from scratch for your specific business. What works for a coaching institute is different from what works for a restaurant.',
  },
  {
    num: '02',
    title: 'Domain & Hosting',
    description:
      'We get your site live on a real domain, with SSL and Vercel hosting sorted. Usually within a day.',
  },
  {
    num: '03',
    title: 'Ongoing Maintenance',
    description:
      "Content updates, performance checks, and small design fixes every month. You don't have to think about it.",
  },
];

const PORTFOLIO_ITEMS = [
  {
    name: 'Institute Menon',
    type: 'Education',
    location: 'Kanpur',
    tags: ['Web Design', 'Local Business'],
    featured: true,
    comingSoon: false,
    link: 'https://menon-institute.vercel.app/' as string | null,
  },
  {
    name: 'Coming Soon',
    type: 'Local Business',
    location: 'Kanpur',
    tags: ['Web Design'],
    featured: false,
    comingSoon: true,
    link: null as string | null,
  },
];

// ─── Magnetic CTA wrapper (Emil spring mouse interaction) ─────────────────────

interface MagneticCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function MagneticCTA({ children, ...rest }: MagneticCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 8);
      y.set(((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 8);
    },
    [x, y, reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated service row (slide from left, staggered) ────────────────────────

interface ServiceRowProps {
  num: string;
  title: string;
  description: string;
  index: number;
}

function ServiceRow({ num, title, description, index }: ServiceRowProps) {
  const [rowRef, rowVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={rowRef}
      className={styles.serviceRow}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateX(-12px)' }}
      animate={
        rowVisible
          ? { opacity: 1, transform: 'translateX(0px)' }
          : reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, transform: 'translateX(-12px)' }
      }
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className={styles.serviceNum} aria-hidden="true">{num}</span>
      <div className={styles.serviceBody}>
        <h3 className={styles.serviceRowTitle}>{title}</h3>
        <p className={styles.serviceRowDesc}>{description}</p>
      </div>
    </motion.div>
  );
}

// ─── Portfolio card — tilt + link ────────────────────────────────────────────

type PortfolioItemType = typeof PORTFOLIO_ITEMS[number];

function PortfolioCard({ item }: { item: PortfolioItemType }) {
  const reducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const cy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setTilt({ x: cy * -3, y: cx * 3 });
    },
    [reducedMotion],
  );

  const handleMouseEnter = useCallback(() => {
    if (!reducedMotion) setHovering(true);
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const tiltStyle: React.CSSProperties = reducedMotion
    ? {}
    : {
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovering ? 'transform 100ms ease-out' : 'transform 600ms ease-out',
      };

  const imageContent = (
    <div className={styles.portfolioImageWrap} data-cursor-theme="dark">
      <div
        className={styles.portfolioPlaceholder}
        aria-label={`${item.name} project preview`}
      >
        {item.comingSoon ? (
          <span className={styles.comingSoonPulse}>Coming Soon</span>
        ) : (
          <span className={styles.placeholderText}>{item.name}</span>
        )}
      </div>
      {!item.comingSoon && (
        <div className={styles.portfolioOverlay}>
          <span className={styles.viewLabel}>
            {item.link ? 'View Site →' : 'View Project →'}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <article
      className={[
        styles.portfolioItem,
        item.featured ? styles.featured : '',
        item.comingSoon ? styles.comingSoon : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.link ? (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          {imageContent}
        </a>
      ) : (
        imageContent
      )}
      <div className={styles.portfolioMeta}>
        <h3 className={styles.portfolioName}>{item.name}</h3>
        <div className={styles.portfolioTags}>
          {item.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
          <span className={styles.tag}>{item.location}</span>
        </div>
      </div>
    </article>
  );
}

// ─── component ───────────────────────────────────────────────────────────────

export default function Home() {
  // One-shot intro: plays once per browser session via sessionStorage gate.
  const [isIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const played = sessionStorage.getItem('kairos-intro');
    if (!played) {
      sessionStorage.setItem('kairos-intro', '1');
      return true;
    }
    return false;
  });

  const [quoteRef, quoteVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
  const reducedMotion = useReducedMotion();
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <PageTransition>

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className={`${styles.hero} ${isIntro ? '' : styles.heroSkip}`}
          aria-label="Hero"
          data-cursor-theme="dark"
          style={{ position: 'relative' }}
        >
          <HeroBackground />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className={styles.heroContent}>

              {/* Step 3 (2400ms): logo */}
              <img
                src="/kairos-mark-light.png"
                alt="Kairos"
                className={styles.introLogo}
              />

              {/* Step 2 (1500ms+): KAIROS typewriter — letters arrive with translateY */}
              <h1 className={styles.introKairos} aria-label="Kairos">
                {'KAIROS'.split('').map((letter, i) => (
                  <span
                    key={i}
                    className={styles.introLetter}
                    style={isIntro ? { animationDelay: `${1500 + i * 90}ms` } : undefined}
                    aria-hidden="true"
                  >
                    {letter}
                  </span>
                ))}
              </h1>

              {/* Step 1 (600ms): tagline curtain left → right */}
              <p className={styles.introTagline} aria-label="The pursuit continues">
                — THE PURSUIT CONTINUES —
              </p>

              {/* Step 4 (3200ms): subheadline + CTAs */}
              <div className={styles.heroPostContent}>
                <div className={styles.heroPostText}>
                  <p className={styles.heroHeadline}>
                    We build websites that work.
                  </p>
                  <p className={styles.heroSubline}>
                    Every business deserves a website that actually works.
                  </p>
                </div>
                <div className={styles.heroCtas}>
                  <MagneticCTA data-cursor-force="dark">
                    <Button as="a" href="/work" variant="filled">See Our Work</Button>
                  </MagneticCTA>
                  <MagneticCTA>
                    <Button as="a" href="/contact" variant="outlined">Get In Touch</Button>
                  </MagneticCTA>
                </div>
              </div>
            </div>

            {/* Dissolving overlay — fades out 0–500ms */}
            <div className={styles.introOverlay} aria-hidden="true" />

            <div
              className={[
                styles.scrollIndicator,
                scrolledPast ? styles.scrollIndicatorHidden : '',
              ].filter(Boolean).join(' ')}
              aria-hidden="true"
            >
              <div className={styles.scrollTrack}>
                <div className={styles.scrollDot} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Marquee ──────────────────────────────────────────────────────── */}
        <Marquee />

        {/* ── Services ─────────────────────────────────────────────────────── */}
        <section className={styles.services} aria-labelledby="services-heading">
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              <h2 className={styles.sectionHeading} id="services-heading">
                We do three things.<br />We do them well.
              </h2>
            </ScrollReveal>

            <div className={styles.serviceList} role="list">
              {SERVICE_ITEMS.map((item, i) => (
                <ServiceRow key={item.num} index={i} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote ────────────────────────────────────────────────────────── */}
        <section className={styles.quote} aria-label="Agency quote" data-cursor-theme="dark">
          <div className={styles.sectionContainer}>
            <div className={styles.quoteInner}>
              {/* Clip-path curtain reveal — the quote is unveiled, not faded */}
              <div ref={quoteRef} className={styles.quoteRevealWrap}>
                <motion.blockquote
                  className={styles.quoteText}
                  initial={reducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
                  animate={
                    quoteVisible
                      ? reducedMotion
                        ? { opacity: 1 }
                        : { clipPath: 'inset(0 0% 0 0)' }
                      : reducedMotion
                      ? { opacity: 0 }
                      : {}
                  }
                  transition={
                    reducedMotion
                      ? { duration: 0.15 }
                      : { duration: 0.9, ease: [0.77, 0, 0.175, 1] }
                  }
                >
                  "We don't just build websites. We build the version of your business the internet sees."
                </motion.blockquote>
              </div>
              <ScrollReveal delay={0.15}>
                <Link to="/about" className={styles.quoteLink} style={{ touchAction: 'manipulation' }}>
                  Our Story
                  <ArrowRight size={16} strokeWidth={2} className={styles.quoteArrow} aria-hidden="true" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Portfolio preview ─────────────────────────────────────────────── */}
        <section className={styles.portfolio} aria-labelledby="portfolio-heading">
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              <span className={styles.portfolioEyebrow}>Our Work</span>
              <h2 className={styles.sectionHeading} id="portfolio-heading">
                What we've shipped so far.
              </h2>
            </ScrollReveal>

            <div className={styles.portfolioGrid}>
              {PORTFOLIO_ITEMS.map((item, i) => (
                <ScrollReveal key={item.name} delay={i * 0.07} variant="fadeScale">
                  <PortfolioCard item={item} />
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className={styles.allWork}>
                <Link to="/work" className={styles.allWorkLink} style={{ touchAction: 'manipulation' }}>
                  All Work
                  <ArrowRight size={16} strokeWidth={2} className={styles.quoteArrow} aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
