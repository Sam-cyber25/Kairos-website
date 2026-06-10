import { NavLink } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import InstagramIcon from '../ui/InstagramIcon';
import styles from './Footer.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo" data-cursor-theme="dark">
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.logoGroup}>
          <img
            src="/kairos-mark-light.png"
            alt="Kairos"
            className={styles.logo}
          />
          <p className={styles.logoName}>KAIROS</p>
          <p className={styles.tagline}>— THE PURSUIT CONTINUES —</p>
        </div>

        <nav aria-label="Footer navigation" className={styles.nav}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={styles.link}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.contact}>
          <a
            href="mailto:kairosbuilds.in@gmail.com"
            className={styles.contactLink}
            aria-label="Email Kairos"
          >
            <Mail size={16} strokeWidth={2} aria-hidden="true" />
            kairosbuilds.in@gmail.com
          </a>
          <a
            href="https://instagram.com/kairosbuilds.in"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactLink}
            aria-label="Kairos on Instagram"
          >
            <InstagramIcon size={16} strokeWidth={2} aria-hidden="true" />
            @kairosbuilds.in
          </a>
          <span className={styles.contactLink}>
            <MapPin size={16} strokeWidth={2} aria-hidden="true" />
            Kanpur, India
          </span>
        </div>

        <hr className={styles.divider} />

        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Kairos. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
