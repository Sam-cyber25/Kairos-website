import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Palette, Globe, Wrench, ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import Button from '../components/ui/Button';
import Marquee from '../components/ui/Marquee';
import ScrollReveal from '../components/ui/ScrollReveal';
import KairosLogoDark from '../components/logo/KairosLogoDark';
import { useWebGL } from '../hooks/useWebGL';
import styles from './Home.module.css';

const HeroLogo3D = lazy(() => import('../three/HeroLogo3D'));

const SERVICES = [
  {
    number: '01',
    icon: Palette,
    title: 'Website Design',
    description: 'Custom-built from scratch. Every pixel placed with purpose. Your customers will know the difference.',
  },
  {
    number: '02',
    icon: Globe,
    title: 'Domain and Hosting',
    description: 'Domain, Vercel deployment, SSL, custom domain. Your website live and fast, in a day.',
  },
  {
    number: '03',
    icon: Wrench,
    title: 'Ongoing Maintenance',
    description: 'Content updates, performance checks, small design changes. We keep it running like it should.',
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

export default function Home() {
  const webglSupported = useWebGL();

  return (
    <PageTransition>
      <main id="main-content">

        {/* === HERO === */}
        <section className={styles.hero} aria-label="Hero">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroNoise} aria-hidden="true" />

          <div className={styles.heroContent}>
            <Suspense fallback={
              <div className={styles.logoFallback}>
                <KairosLogoDark size={180} />
              </div>
            }>
              {webglSupported ? (
                <HeroLogo3D />
              ) : (
                <div className={styles.logoFallback}>
                  <KairosLogoDark size={180} />
                </div>
              )}
            </Suspense>

            <motion.h1
              className={styles.heroHeadline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              We build websites that work.
            </motion.h1>

            <motion.p
              className={styles.heroSubline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.23, 1, 0.32, 1] }}
            >
              Kanpur's boldest web design agency.
            </motion.p>

            <motion.div
              className={styles.heroCtas}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
            >
              <Button as="a" href="/work" variant="filled">See Our Work</Button>
              <Button as="a" href="/contact" variant="outlined">Get In Touch</Button>
            </motion.div>
          </div>

          <div className={styles.scrollIndicator} aria-hidden="true">
            <ChevronDown size={24} strokeWidth={1.5} />
          </div>
        </section>

        {/* === MARQUEE === */}
        <Marquee />

        {/* === SERVICES PREVIEW === */}
        <section className={styles.services} aria-labelledby="services-heading">
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              <span className="eyebrow" id="services-heading">What We Do</span>
            </ScrollReveal>

            <div className={styles.servicesGrid}>
              {SERVICES.map((service, i) => {
                const Icon = service.icon;
                return (
                  <ScrollReveal key={service.number} delay={i * 0.05}>
                    <article className={styles.serviceItem}>
                      <span className={styles.serviceNumber} aria-hidden="true">{service.number}</span>
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

        {/* === QUOTE TEASER === */}
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

        {/* === PORTFOLIO PREVIEW === */}
        <section className={styles.portfolio} aria-labelledby="portfolio-heading">
          <div className={styles.sectionContainer}>
            <ScrollReveal>
              <span className="eyebrow" id="portfolio-heading">Our Work</span>
            </ScrollReveal>

            <div className={styles.portfolioGrid}>
              {PORTFOLIO_ITEMS.map((item, i) => (
                <ScrollReveal key={item.name} delay={i * 0.07}>
                  <article
                    className={`${styles.portfolioItem} ${item.featured ? styles.featured : ''}`}
                  >
                    <div className={styles.portfolioImageWrap}>
                      <div className={styles.portfolioPlaceholder} aria-label={`${item.name} project preview`}>
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
