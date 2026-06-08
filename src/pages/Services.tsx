import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition';
import FaqAccordion from '../components/ui/FaqAccordion';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import styles from './Services.module.css';

const INCLUDES_DESIGN = [
  'Full custom design, built to your brand',
  'Mobile-responsive on every screen size',
  'Fast load times, optimised from the start',
  'SEO foundations: titles, meta, structure',
  'WhatsApp button integration',
  'Vercel deployment included',
];

const INCLUDES_HOSTING = [
  'Domain name purchase and setup',
  'Vercel deployment and configuration',
  'Custom domain connected',
  'SSL certificate (HTTPS) active',
];

const INCLUDES_MAINTENANCE = [
  'Content updates: text, images, prices',
  'Performance monitoring',
  'Small design tweaks and improvements',
  'Monthly check-in report',
];

const FAQ_ITEMS = [
  {
    question: 'Do I need a website?',
    answer: 'If your customers search for you online and find nothing, you are losing business to someone who does have a site. A website works for you all the time, even when you are not available. For any business in Kanpur looking to grow, yes: you need one.',
  },
  {
    question: 'How long does it take?',
    answer: 'A full website takes 3 to 5 days from when we have all the information we need from you. Domain and hosting setup takes 1 day. We move fast, but not at the cost of quality.',
  },
  {
    question: 'What do I need to get started?',
    answer: 'Your business name, what you sell, your contact details, and any photos or logos you have. That is it. We handle the rest and guide you through anything we need along the way.',
  },
  {
    question: 'Do you work outside Kanpur?',
    answer: 'Yes. We are based in Kanpur but work with clients anywhere. Everything is done remotely, so location is no barrier. Reach out via the contact page and we will take it from there.',
  },
];

export default function Services() {
  return (
    <PageTransition>
      <main id="main-content">

        {/* === PAGE HERO === */}
        <section className={styles.pageHero} aria-label="Services header">
          <div className={styles.container}>
            <ScrollReveal>
              <h1 className={styles.pageHeading}>What We Build</h1>
              <p className={styles.pageSubtext}>
                No templates. No shortcuts. Only websites your customers actually remember.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* === SERVICE 1: Website Design === */}
        <section className={styles.serviceSectionCream} aria-labelledby="service-design">
          <div className={styles.container}>
            <div className={styles.serviceLayout}>
              <div className={styles.serviceText}>
                <ScrollReveal>
                  <span className="eyebrow">Service 01</span>
                  <h2 id="service-design" className={styles.serviceHeading}>
                    Website Design and Development
                  </h2>
                  <p className={styles.serviceIntro}>
                    Built from scratch, designed around your business. Not a theme someone else
                    is using in the next street.
                  </p>
                  <ul className={styles.includesList} aria-label="What's included">
                    {INCLUDES_DESIGN.map(item => (
                      <li key={item} className={styles.includesItem}>
                        <CheckCircle size={18} strokeWidth={2} className={styles.checkIcon} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.priceBlock}>
                    <div>
                      <span className={styles.priceLabel}>Starting at</span>
                      <span className={styles.price}>3,000</span>
                      <span className={styles.priceUnit}>per website</span>
                    </div>
                    <div className={styles.timeline}>
                      <span className={styles.timelineLabel}>Timeline</span>
                      <span className={styles.timelineValue}>3 to 5 days</span>
                    </div>
                  </div>
                  <Link to="/contact">
                    <Button variant="filled">Start a Project</Button>
                  </Link>
                </ScrollReveal>
              </div>

              <div className={styles.serviceVisual}>
                <ScrollReveal delay={0.1}>
                  <div className={styles.browserMockup} aria-hidden="true">
                    <div className={styles.browserBar}>
                      <span className={styles.dot} />
                      <span className={styles.dot} />
                      <span className={styles.dot} />
                      <span className={styles.browserUrl}>kairosbuilds.in</span>
                    </div>
                    <div className={styles.browserScreen}>
                      <div className={styles.mockNav} />
                      <div className={styles.mockHero} />
                      <div className={styles.mockContent}>
                        <div className={styles.mockLine} style={{ width: '70%' }} />
                        <div className={styles.mockLine} style={{ width: '50%' }} />
                        <div className={styles.mockLine} style={{ width: '85%' }} />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* === SERVICE 2: Domain and Hosting === */}
        <section className={styles.serviceSectionGreen} aria-labelledby="service-hosting">
          <div className={styles.container}>
            <div className={`${styles.serviceLayout} ${styles.reversed}`}>
              <div className={styles.serviceVisual}>
                <ScrollReveal delay={0.1}>
                  <div className={styles.hostingVisual} aria-hidden="true">
                    <div className={styles.hostingItem}>
                      <span className={styles.hostingIcon}>🔒</span>
                      <span>SSL Active</span>
                    </div>
                    <div className={styles.hostingItem}>
                      <span className={styles.hostingIcon}>⚡</span>
                      <span>Vercel CDN</span>
                    </div>
                    <div className={styles.hostingItem}>
                      <span className={styles.hostingIcon}>🌐</span>
                      <span>Custom Domain</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              <div className={styles.serviceText}>
                <ScrollReveal>
                  <span className={`eyebrow ${styles.eyebrowDark}`}>Service 02</span>
                  <h2 id="service-hosting" className={`${styles.serviceHeading} ${styles.headingDark}`}>
                    Domain and Hosting Setup
                  </h2>
                  <p className={`${styles.serviceIntro} ${styles.introDark}`}>
                    Your website needs a home. We set it up correctly the first time.
                  </p>
                  <ul className={`${styles.includesList} ${styles.includesListDark}`} aria-label="What's included">
                    {INCLUDES_HOSTING.map(item => (
                      <li key={item} className={styles.includesItem}>
                        <CheckCircle size={18} strokeWidth={2} className={styles.checkIconDark} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className={`${styles.priceBlock} ${styles.priceBlockDark}`}>
                    <div>
                      <span className={styles.priceLabelDark}>Starting at</span>
                      <span className={`${styles.price} ${styles.priceDark}`}>1,500</span>
                      <span className={styles.priceUnit}>per year</span>
                    </div>
                    <div className={styles.timeline}>
                      <span className={styles.timelineLabel}>Timeline</span>
                      <span className={`${styles.timelineValue} ${styles.timelineValueDark}`}>1 day</span>
                    </div>
                  </div>
                  <Link to="/contact">
                    <Button variant="outlined">Start a Project</Button>
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* === SERVICE 3: Maintenance === */}
        <section className={styles.serviceSectionCream} aria-labelledby="service-maintenance">
          <div className={styles.container}>
            <div className={styles.serviceLayout}>
              <div className={styles.serviceText}>
                <ScrollReveal>
                  <span className="eyebrow">Service 03</span>
                  <h2 id="service-maintenance" className={styles.serviceHeading}>
                    Monthly Maintenance
                  </h2>
                  <p className={styles.serviceIntro}>
                    Your business changes. Your website should keep up. We handle the updates
                    so you can focus on the work.
                  </p>
                  <ul className={styles.includesList} aria-label="What's included">
                    {INCLUDES_MAINTENANCE.map(item => (
                      <li key={item} className={styles.includesItem}>
                        <CheckCircle size={18} strokeWidth={2} className={styles.checkIcon} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.priceBlock}>
                    <div>
                      <span className={styles.priceLabel}>Starting at</span>
                      <span className={styles.price}>500</span>
                      <span className={styles.priceUnit}>per month</span>
                    </div>
                    <div className={styles.timeline}>
                      <span className={styles.timelineLabel}>Timeline</span>
                      <span className={styles.timelineValue}>Ongoing</span>
                    </div>
                  </div>
                  <Link to="/contact">
                    <Button variant="filled">Get In Touch</Button>
                  </Link>
                </ScrollReveal>
              </div>

              <div className={styles.serviceVisual}>
                <ScrollReveal delay={0.1}>
                  <div className={styles.maintenanceVisual} aria-hidden="true">
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Uptime</span>
                      <span className={styles.statValue}>99.9%</span>
                    </div>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Updates</span>
                      <span className={styles.statValue}>On request</span>
                    </div>
                    <div className={styles.statRow}>
                      <span className={styles.statLabel}>Response</span>
                      <span className={styles.statValue}>24 hours</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* === SERVICE 4: Full Package === */}
        <section className={styles.fullPackage} aria-labelledby="service-bundle">
          <div className={styles.container}>
            <ScrollReveal>
              <div className={styles.packageInner}>
                <span className={styles.bestValueBadge}>Best Value</span>
                <span className={`eyebrow ${styles.eyebrowDark}`}>Full Package</span>
                <h2 id="service-bundle" className={`${styles.serviceHeading} ${styles.headingDark}`}>
                  Everything you need to go live.
                </h2>
                <p className={`${styles.serviceIntro} ${styles.introDark}`}>
                  Website design, domain, hosting, and one month of maintenance. One price,
                  one point of contact, zero headaches.
                </p>
                <div className={`${styles.priceBlock} ${styles.priceBlockDark}`}>
                  <div>
                    <span className={styles.priceLabelDark}>Starting at</span>
                    <span className={`${styles.price} ${styles.priceDark} ${styles.priceLarge}`}>4,500</span>
                    <span className={styles.priceUnit}>everything included</span>
                  </div>
                </div>
                <Link to="/contact">
                  <Button variant="filled">Start Your Project</Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* === FAQ === */}
        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <div className={styles.container}>
            <ScrollReveal>
              <h2 id="faq-heading" className={styles.faqHeading}>Common Questions</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <FaqAccordion items={FAQ_ITEMS} />
            </ScrollReveal>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
