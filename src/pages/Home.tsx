import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Palette, Globe, Wrench, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import Marquee from '../components/ui/Marquee';
import ScrollReveal from '../components/ui/ScrollReveal';
import styles from './Home.module.css';

// ─── data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    number: '01',
    icon: Palette,
    title: 'Website Design',
    description:
      'Custom-built from scratch. Every pixel placed with purpose. Your customers will know the difference.',
  },
  {
    number: '02',
    icon: Globe,
    title: 'Domain and Hosting',
    description:
      'Domain, Vercel deployment, SSL, custom domain. Your website live and fast, in a day.',
  },
  {
    number: '03',
    icon: Wrench,
    title: 'Ongoing Maintenance',
    description:
      'Content updates, performance checks, small design changes. We keep it running like it should.',
  },
];

const PORTFOLIO_ITEMS = [
  {
    name: 'Institute Menon',
    type: 'Education',
    location: 'Kanpur',
    tags: ['Web Design', 'Local Business'],
    featured: true,
  },
  {
    name: 'Coming Soon',
    type: 'Local Business',
    location: 'Kanpur',
    tags: ['Web Design'],
    featured: false,
  },
];

interface Dot {
  top: string;
  left?: string;
  right?: string;
  size: number;
  duration: number;
}

const DOTS: Dot[] = [
  { top: '22%', left: '18%',  size: 4, duration: 3.8 },
  { top: '68%', left: '12%',  size: 3, duration: 5.1 },
  { top: '30%', right: '16%', size: 5, duration: 4.4 },
  { top: '72%', right: '20%', size: 3, duration: 3.2 },
  { top: '50%', left: '6%',   size: 4, duration: 6.0 },
];

// ─── component ───────────────────────────────────────────────────────────────

export default function Home() {
  // Runs once per browser session. Sets the flag immediately so a hard-refresh
  // is treated as a new session visit.
  const [isFirstVisit] = useState(() => {
    if (typeof window === 'undefined') return false;
    const seen = sessionStorage.getItem('kairos-intro');
    if (!seen) {
      sessionStorage.setItem('kairos-intro', '1');
      return true;
    }
    return false;
  });

  const [showIntro, setShowIntro] = useState(isFirstVisit);

  useEffect(() => {
    if (!isFirstVisit) return;
    const t = setTimeout(() => setShowIntro(false), 1000);
    return () => clearTimeout(t);
  }, [isFirstVisit]);

  // Hero element entrance delays — longer sequence on first visit
  const d = isFirstVisit
    ? { logo: 0.4, tagline: 0.9, h1: 1.4, sub: 1.8, ctas: 1.85 }
    : { logo: 0.05, tagline: 0.15, h1: 0.28, sub: 0.4, ctas: 0.45 };

  return (
    <PageTransition>

      {/* ── One-shot intro overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className={styles.introOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            aria-hidden="true"
          >
            <motion.img
              src="/kairos-dark.jpeg"
              alt=""
              className={styles.introLogo}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className={styles.hero} aria-label="Hero">
          <div className={styles.heroGrid}  aria-hidden="true" />
          <div className={styles.heroNoise} aria-hidden="true" />

          {/* Floating ambient dots */}
          <div className={styles.floatingDots} aria-hidden="true">
            {DOTS.map((dot, i) => (
              <span
                key={i}
                className={styles.floatingDot}
                style={{
                  top: dot.top,
                  left: dot.left,
                  right: dot.right,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  animationDuration: `${dot.duration}s`,
                  animationDelay: `${i * 0.45}s`,
                }}
              />
            ))}
          </div>

          <div className={styles.heroContent}>

            {/* Eyebrow tagline — clip-path left-to-right reveal */}
            <motion.p
              className={styles.heroTagline}
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.9, delay: d.tagline, ease: [0.23, 1, 0.32, 1] }}
            >
              The Pursuit Continues
            </motion.p>

            {/* JPEG logo with breathing glow */}
            <motion.div
              className={styles.heroLogoWrap}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: d.logo, ease: [0.23, 1, 0.32, 1] }}
            >
              <img
                src="/kairos-dark.jpeg"
                alt="Kairos"
                className={styles.heroLogo}
              />
            </motion.div>

            {/* Separator line */}
            <motion.div
              className={styles.heroSeparator}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: d.h1 - 0.12, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformOrigin: 'left' }}
              aria-hidden="true"
            />

            <motion.h1
              className={styles.heroHeadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: d.h1, ease: [0.23, 1, 0.32, 1] }}
            >
              We build websites that work.
            </motion.h1>

            <motion.p
              className={styles.heroSubline}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: d.sub, ease: [0.23, 1, 0.32, 1] }}
            >
              Kanpur's boldest web design agency.
            </motion.p>

            <motion.div
              className={styles.heroCtas}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: d.ctas, ease: [0.23, 1, 0.32, 1] }}
            >
              <Button as="a" href="/work" variant="filled">See Our Work</Button>
              <Button as="a" href="/contact" variant="outlined">Get In Touch</Button>
            </motion.div>
          </div>

          <div className={styles.scrollIndicator} aria-hidden="true">
            <ChevronDown size={24} strokeWidth={1.5} />
          </div>
        </section>

        {/* ── Marquee ────────────────────────────────────────────────────── */}
        <Marquee />

        {/* ── Services preview ───────────────────────────────────────────── */}
        <section className={styles.services} aria-labelledby="services-heading">
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              <span className="eyebrow">What We Do</span>
              <h2 className={styles.sectionHeading} id="services-heading">
                We do three things.<br />We do them well.
              </h2>
            </ScrollReveal>

            <div className={styles.servicesGrid}>
              {SERVICES.map((service, i) => {
                const Icon = service.icon;
                return (
                  <ScrollReveal key={service.number} delay={i * 0.05}>
                    <article className={styles.serviceItem}>
                      <span className={styles.serviceNumber} aria-hidden="true">
                        {service.number}
                      </span>
                      <div className={styles.serviceHeader}>
                        <Icon size={20} strokeWidth={2} className={styles.serviceIcon} aria-hidden="true" />
                        <h3 className={styles.serviceTitle}>{service.title}</h3>
                      </div>
                      <p className={styles.serviceDesc}>{service.description}</p>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Quote teaser ───────────────────────────────────────────────── */}
        <section className={styles.quote} aria-label="Agency quote">
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              <blockquote className={styles.quoteText}>
                "We don't just build websites. We build the version of your business the internet sees."
              </blockquote>
              <Link to="/about" className={styles.quoteLink}>
                Our Story
                <ArrowRight size={16} strokeWidth={2} className={styles.quoteArrow} aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Portfolio preview ──────────────────────────────────────────── */}
        <section className={styles.portfolio} aria-labelledby="portfolio-heading">
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              <span className="eyebrow">Our Work</span>
              <h2 className={styles.sectionHeading} id="portfolio-heading">
                What we've shipped so far.
              </h2>
            </ScrollReveal>

            <div className={styles.portfolioGrid}>
              {PORTFOLIO_ITEMS.map((item, i) => (
                <ScrollReveal key={item.name} delay={i * 0.07}>
                  <article
                    className={`${styles.portfolioItem} ${item.featured ? styles.featured : ''}`}
                  >
                    <div className={styles.portfolioImageWrap}>
                      <div
                        className={styles.portfolioPlaceholder}
                        aria-label={`${item.name} project preview`}
                      >
                        <span className={styles.placeholderText}>{item.name}</span>
                      </div>
                      <div className={styles.portfolioOverlay}>
                        <span className={styles.viewLabel}>View Project</span>
                        <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                      </div>
                    </div>
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
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className={styles.allWork}>
                <Link to="/work" className={styles.allWorkLink}>
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
