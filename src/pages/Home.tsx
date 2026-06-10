import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  // One-shot intro: plays once per browser session via sessionStorage gate.
  // On return visits within the same session, heroSkip is added and all
  // elements reveal instantly with no animation.
  const [isIntro] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const played = sessionStorage.getItem('kairos-intro');
    if (!played) {
      sessionStorage.setItem('kairos-intro', '1');
      return true;
    }
    return false;
  });

  const FeaturedIcon = SERVICE_FEATURED.icon;

  return (
    <PageTransition>

      <main id="main-content">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className={`${styles.hero} ${isIntro ? '' : styles.heroSkip}`}
          aria-label="Hero"
          data-cursor-theme="dark"
        >
          {/* Background texture layers */}
          <div className={styles.heroGrid}  aria-hidden="true" />
          <div className={styles.heroNoise} aria-hidden="true" />

          {/* Ghost clock — wrapped for fade-in at step 4 (3200ms) */}
          <div className={styles.heroClockWrap} aria-hidden="true">
            <HeroClock />
          </div>

          <div className={styles.heroContent}>

            {/* Step 3 (2400ms): logo fades in — pure opacity, no transform */}
            <img
              src="/kairos-mark-light.png"
              alt="Kairos"
              className={styles.introLogo}
            />

            {/* Step 2 (1500ms+): KAIROS types in — 6 spans, 90ms per-letter stagger */}
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

            {/* Step 1 (600ms): tagline clip-path curtain left → right */}
            <p className={styles.introTagline} aria-label="The pursuit continues">
              — THE PURSUIT CONTINUES —
            </p>

            {/* Step 4 (3200ms): subheadline + CTAs, 60ms stagger between rows */}
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
                <span style={{ display: 'contents' }} data-cursor-force="dark">
                  <Button as="a" href="/work" variant="filled">See Our Work</Button>
                </span>
                <Button as="a" href="/contact" variant="outlined">Get In Touch</Button>
              </div>
            </div>
          </div>

          {/* Dissolving overlay — #1C352D fades out 0–500ms, pointer-events: none */}
          <div className={styles.introOverlay} aria-hidden="true" />

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
              <article className={styles.serviceFeatured} data-cursor-force="light">
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

            {/* Secondary cards — 2-column grid */}
            <div className={styles.servicesSecondary}>
              {SERVICES_SECONDARY.map((service, i) => {
                const Icon = service.icon;
                return (
                  <ScrollReveal key={service.title} delay={i * 0.05}>
                    <article className={styles.serviceItem} data-cursor-force="light">
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
