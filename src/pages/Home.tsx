import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Palette, Globe, Wrench, ArrowRight } from 'lucide-react';
import HeroClock from '../components/hero/HeroClock';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import Marquee from '../components/ui/Marquee';
import ScrollReveal from '../components/ui/ScrollReveal';
import styles from './Home.module.css';

// ─── data ────────────────────────────────────────────────────────────────────

const SERVICE_FEATURED = {
  icon: Palette,
  title: 'Website Design',
  description:
    'Every layout is designed from scratch for your specific business. What works for a coaching institute in Kanpur is different from what works for a restaurant.',
};

const SERVICES_SECONDARY = [
  {
    icon: Globe,
    title: 'Domain & Hosting',
    description:
      'We get your site live on a real domain, with SSL and Vercel hosting sorted. Usually within a day.',
  },
  {
    icon: Wrench,
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
  },
  {
    name: 'Coming Soon',
    type: 'Local Business',
    location: 'Kanpur',
    tags: ['Web Design'],
    featured: false,
    comingSoon: true,
  },
];

// ─── component ───────────────────────────────────────────────────────────────

export default function Home() {
  // One-shot intro: runs once per browser session (sessionStorage gate)
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

  // Hero entrance stagger — longer sequence on first visit
  const d = isFirstVisit
    ? { logo: 0.4, h1: 1.4, sub: 1.8, ctas: 1.85 }
    : { logo: 0.05, h1: 0.28, sub: 0.4, ctas: 0.45 };

  // Icon component for featured service
  const FeaturedIcon = SERVICE_FEATURED.icon;

  return (
    <PageTransition>

      {/* ── One-shot intro overlay ──────────────────────────────────────────── */}
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
              src="/kairos-light.png"
              alt=""
              className={styles.introLogo}
              initial={{ opacity: 0, transform: 'scale(0.88)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className={styles.hero} aria-label="Hero" data-cursor-theme="dark">
          {/* Background texture layers */}
          <div className={styles.heroGrid}  aria-hidden="true" />
          <div className={styles.heroNoise} aria-hidden="true" />

          {/* Ghost clock — atmospheric, z-index 0, aria-hidden */}
          <HeroClock />

          <div className={styles.heroContent}>

            {/* Logo mark — bare img, no container box, no glow, no border-radius */}
            <motion.img
              src="/kairos-light.png"
              alt="Kairos"
              className={styles.heroLogo}
              initial={{ opacity: 0, transform: 'scale(0.9)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              transition={{ duration: 0.8, delay: d.logo, ease: [0.23, 1, 0.32, 1] }}
            />

            {/* Separator — 80px vertical line */}
            <motion.div
              className={styles.heroSeparator}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.45, delay: d.h1 - 0.14, ease: [0.23, 1, 0.32, 1] }}
              style={{ transformOrigin: 'top' }}
              aria-hidden="true"
            />

            <motion.h1
              className={styles.heroHeadline}
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: 0.6, delay: d.h1, ease: [0.23, 1, 0.32, 1] }}
            >
              We build websites that work.
            </motion.h1>

            <motion.p
              className={styles.heroSubline}
              initial={{ opacity: 0, transform: 'translateY(16px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: 0.6, delay: d.sub, ease: [0.23, 1, 0.32, 1] }}
            >
              Every business in Kanpur deserves a website that actually works.
            </motion.p>

            <motion.div
              className={styles.heroCtas}
              initial={{ opacity: 0, transform: 'translateY(16px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
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

        {/* ── Marquee ──────────────────────────────────────────────────────── */}
        <Marquee />

        {/* ── Services ─────────────────────────────────────────────────────── */}
        {/* MAX ONE eyebrow on this page — it lives here */}
        <section className={styles.services} aria-labelledby="services-heading">
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              <span className="eyebrow">What We Do</span>
              <h2 className={styles.sectionHeading} id="services-heading">
                We do three things.<br />We do them well.
              </h2>
            </ScrollReveal>

            {/* Featured card — Website Design, full-width */}
            <ScrollReveal>
              <article className={styles.serviceFeatured}>
                <div className={styles.serviceHeader}>
                  <FeaturedIcon size={22} strokeWidth={2} className={styles.serviceIcon} aria-hidden="true" />
                  <h3 className={styles.serviceFeaturedTitle}>{SERVICE_FEATURED.title}</h3>
                </div>
                <p className={styles.serviceFeaturedDesc}>{SERVICE_FEATURED.description}</p>
                <Link to="/services" className={styles.serviceLink} style={{ touchAction: 'manipulation' }}>
                  Learn more <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </Link>
              </article>
            </ScrollReveal>

            {/* Secondary cards — 2-column grid (Domain & Hosting, Maintenance) */}
            <div className={styles.servicesSecondary}>
              {SERVICES_SECONDARY.map((service, i) => {
                const Icon = service.icon;
                return (
                  <ScrollReveal key={service.title} delay={i * 0.05}>
                    <article className={styles.serviceItem}>
                      <div className={styles.serviceHeader}>
                        <Icon size={18} strokeWidth={2} className={styles.serviceIcon} aria-hidden="true" />
                        <h3 className={styles.serviceTitle}>{service.title}</h3>
                      </div>
                      <p className={styles.serviceDesc}>{service.description}</p>
                      <Link to="/services" className={styles.serviceLink} style={{ touchAction: 'manipulation' }}>
                        Learn more <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                      </Link>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Quote ────────────────────────────────────────────────────────── */}
        <section className={styles.quote} aria-label="Agency quote" data-cursor-theme="dark">
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              <blockquote className={styles.quoteText}>
                "We don't just build websites. We build the version of your business the internet sees."
              </blockquote>
              <Link to="/about" className={styles.quoteLink} style={{ touchAction: 'manipulation' }}>
                Our Story
                <ArrowRight size={16} strokeWidth={2} className={styles.quoteArrow} aria-hidden="true" />
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Portfolio preview ─────────────────────────────────────────────── */}
        <section className={styles.portfolio} aria-labelledby="portfolio-heading">
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              {/* No eyebrow — heading stands alone */}
              <h2 className={styles.sectionHeading} id="portfolio-heading">
                What we've shipped so far.
              </h2>
            </ScrollReveal>

            <div className={styles.portfolioGrid}>
              {PORTFOLIO_ITEMS.map((item, i) => (
                <ScrollReveal key={item.name} delay={i * 0.07}>
                  <article
                    className={[
                      styles.portfolioItem,
                      item.featured ? styles.featured : '',
                      item.comingSoon ? styles.comingSoon : '',
                    ].filter(Boolean).join(' ')}
                  >
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
                          <span className={styles.viewLabel}>View Project</span>
                          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                        </div>
                      )}
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
