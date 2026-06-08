import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import styles from './About.module.css';

const VALUES = [
  {
    title: 'Craft over speed',
    description: 'We don\'t rush. We get it right.',
  },
  {
    title: 'Local first',
    description: 'We know Kanpur. We build for it.',
  },
  {
    title: 'The pursuit',
    description: 'We never stop improving. That\'s the name.',
  },
];

export default function About() {
  return (
    <PageTransition>
      <main id="main-content">

        {/* === HERO === */}
        <section className={styles.hero} aria-label="About page header">
          <div className={styles.container}>
            <ScrollReveal>
              <h1 className={styles.heroHeading}>The Pursuit Continues</h1>
              <p className={styles.heroSubtext}>This is not just an agency. It's a mission.</p>
            </ScrollReveal>
          </div>
        </section>

        {/* === STORY === */}
        <section className={styles.storySectionCream} aria-labelledby="story-heading">
          <div className={styles.container}>
            <div className={styles.storyLayout}>
              <ScrollReveal>
                <h2 id="story-heading" className={styles.storyHeading}>
                  Built by a 16-year-old who refused to wait.
                </h2>

                <div className={styles.storyBody}>
                  <p>
                    Kairos was born in Kanpur with one belief: local businesses deserve
                    real websites, not cheap templates they found for free.
                  </p>
                  <p>
                    Sam started building for clients while most people his age were still
                    figuring out what direction to go. He didn't wait for permission.
                  </p>
                  <p>
                    The name comes from Ancient Greek. Kairos means the decisive moment,
                    the perfect instant when everything aligns and opportunity opens up.
                    That is what we build for our clients: the moment their business stops
                    being invisible online.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <blockquote className={styles.pullQuote}>
                  "We build for the decisive moment."
                </blockquote>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* === VALUES === */}
        <section className={styles.valuesSection} aria-labelledby="values-heading">
          <div className={styles.container}>
            <ScrollReveal>
              <span className={`eyebrow ${styles.eyebrowDark}`}>What we stand for</span>
              <h2 id="values-heading" className={styles.valuesHeading}>Three things we don't compromise on.</h2>
            </ScrollReveal>
            <div className={styles.valuesGrid}>
              {VALUES.map((value, i) => (
                <ScrollReveal key={value.title} delay={i * 0.05}>
                  <div className={styles.valueItem}>
                    <h3 className={styles.valueTitle}>{value.title}</h3>
                    <p className={styles.valueDesc}>{value.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* === PHILOSOPHY === */}
        <section className={styles.philosophySection} aria-labelledby="philosophy-heading">
          <div className={styles.container}>
            <ScrollReveal>
              <h2 id="philosophy-heading" className={styles.philosophyHeading}>Why Kairos?</h2>
              <p className={styles.philosophyBody}>
                In Ancient Greek philosophy, Kairos was the god of the perfect moment. Not
                Chronos, who measured time in minutes and hours, but Kairos: the opportune
                instant. The window that opens, stays open briefly, then closes.
              </p>
              <p className={styles.philosophyBody}>
                Your website is that window on the internet. When someone searches for what
                you do in Kanpur, they will find something. The question is whether they
                find you, or someone else.
              </p>
              <p className={`${styles.philosophyBody} ${styles.philosophyCta}`}>
                Your website is your decisive moment on the internet. Make it count.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* === CTA === */}
        <section className={styles.ctaSection} aria-label="Call to action">
          <div className={styles.container}>
            <ScrollReveal>
              <h2 className={styles.ctaHeading}>Ready to seize your moment?</h2>
              <Link to="/contact">
                <Button variant="filled">Start a Project</Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
