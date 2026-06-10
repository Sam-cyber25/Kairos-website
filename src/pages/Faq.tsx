import { useEffect } from 'react';
import PageTransition from '../components/layout/PageTransition';
import FaqAccordion from '../components/ui/FaqAccordion';
import ScrollReveal from '../components/ui/ScrollReveal';
import styles from './Faq.module.css';

const FAQ_ITEMS = [
  {
    question: 'How long does it take to build a website?',
    answer:
      'Most projects take 2 to 4 weeks from start to launch. Simple sites are often ready within 10 days. More complex builds with custom features take longer. You get a clear timeline before any work begins.',
  },
  {
    question: 'How much does a website cost?',
    answer:
      'It depends on what you need. We give you an exact quote after a brief conversation about your goals, so there are no surprises. Pricing reflects the scope of work, not a fixed menu.',
  },
  {
    question: 'Do I need to provide content and images?',
    answer:
      'You provide the text and any photos you have. We give you a content brief so you know exactly what to prepare. If you need photography or copywriting help, we can point you toward people who do that well.',
  },
  {
    question: 'Will my website work on phones and tablets?',
    answer:
      'Yes. Every site we build is fully responsive and tested across current iOS and Android devices, as well as common desktop screen sizes. Mobile is a first consideration, not an afterthought.',
  },
  {
    question: 'What is Vercel hosting and why do you use it?',
    answer:
      'Vercel is where we deploy your finished site. It is fast, includes free SSL, and stays reliable. Your site loads quickly because Vercel serves it from servers close to your visitors. You do not pay extra for this.',
  },
  {
    question: 'What happens after my site goes live?',
    answer:
      'We offer monthly maintenance packages that cover content updates, performance checks, and small design fixes. If you do not need regular help, we are available for one-off updates whenever something needs changing.',
  },
  {
    question: 'Do you work with businesses outside Kanpur?',
    answer:
      'Yes. We work with clients anywhere. Most of our process happens online, including calls and feedback rounds. Location does not affect how we work or what we deliver.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer:
      'Yes. Redesigns are a significant part of what we do. We start by understanding what your current site is missing, then build something that fixes those problems. We can preserve your existing domain and most of your content.',
  },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
};

export default function Faq() {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'faq-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(FAQ_SCHEMA);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('faq-schema');
      if (el) document.head.removeChild(el);
    };
  }, []);

  return (
    <PageTransition>
      <main id="main-content">

        <section className={styles.pageHero} aria-label="FAQ hero" data-cursor-theme="dark">
          <div className={styles.heroInner}>
            <ScrollReveal>
              <h1 className={styles.heroHeading}>
                Questions,<br />answered.
              </h1>
              <p className={styles.heroSubline}>
                If something is not covered here, reach out directly.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-heading">
          <div className={styles.sectionInner}>
            <ScrollReveal>
              <h2 id="faq-heading" className={styles.sectionHeading}>
                Common questions
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <FaqAccordion items={FAQ_ITEMS} />
            </ScrollReveal>
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
