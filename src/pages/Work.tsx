import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import ScrollReveal from '../components/ui/ScrollReveal';
import styles from './Work.module.css';

const FILTERS = ['All', 'Web Design', 'Local Business'] as const;
type Filter = typeof FILTERS[number];

const PROJECTS = [
  {
    name: 'Institute Menon',
    type: 'Education',
    location: 'Kanpur',
    tags: ['Web Design', 'Local Business'],
    description: 'A clean, fast site for a coaching institute. Students find the timetable, teachers find the updates, and the business gets found online.',
  },
  {
    name: 'Coming Soon',
    type: 'Local Business',
    location: 'Kanpur',
    tags: ['Web Design', 'Local Business'],
    description: 'More work in progress. The pursuit continues.',
    comingSoon: true,
  },
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(activeFilter));

  return (
    <PageTransition>
      <main id="main-content" className={styles.page}>

        {/* Page Hero */}
        <section className={styles.hero} aria-label="Work page header">
          <div className={styles.container}>
            <ScrollReveal>
              <h1 className={styles.heading}>Our Work</h1>
              <p className={styles.subtext}>Every website tells a story. Here are ours.</p>
            </ScrollReveal>
          </div>
        </section>

        {/* Filters */}
        <section className={styles.filterSection} aria-label="Filter projects">
          <div className={styles.container}>
            <div className={styles.filterBar} role="group" aria-label="Filter by category">
              {FILTERS.map(filter => (
                <button
                  key={filter}
                  className={`${styles.filterBtn} ${activeFilter === filter ? styles.active : ''}`}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Project Grid */}
        <section className={styles.gridSection} aria-label="Projects">
          <div className={styles.container}>
            {filtered.length > 0 ? (
              <div className={styles.grid}>
                {filtered.map((project, i) => (
                  <ScrollReveal key={project.name} delay={i * 0.05}>
                    <article
                      className={`${styles.card} ${project.comingSoon ? styles.comingSoon : ''}`}
                    >
                      <div className={styles.imageWrap} data-cursor-theme="dark">
                        <div
                          className={styles.imagePlaceholder}
                          role="img"
                          aria-label={`${project.name} website preview`}
                        >
                          {project.comingSoon ? (
                            <span className={styles.comingSoonLabel}>Coming Soon</span>
                          ) : (
                            <span className={styles.projectInitial}>{project.name[0]}</span>
                          )}
                        </div>
                        {!project.comingSoon && (
                          <div className={styles.overlay} aria-hidden="true">
                            <span>View Case Study</span>
                            <ArrowRight size={16} strokeWidth={2} />
                          </div>
                        )}
                      </div>

                      <div className={styles.cardMeta}>
                        <h2 className={styles.projectName}>{project.name}</h2>
                        <p className={styles.projectDesc}>{project.description}</p>
                        <div className={styles.tags}>
                          {project.tags.map(tag => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                          ))}
                          <span className={styles.tag}>{project.location}</span>
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyText}>
                  <em>More work dropping soon. The pursuit continues.</em>
                </p>
              </div>
            )}
          </div>
        </section>

      </main>
    </PageTransition>
  );
}
