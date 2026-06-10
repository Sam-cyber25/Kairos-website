import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavbarScroll } from '../../hooks/useNavbarScroll';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useNavbarScroll(80);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  const isHeroPage = location.pathname === '/';

  // Pages whose hero is dark — navbar is transparent there, so cursor needs the
  // dark token so the custom cursor stays visible against the dark background.
  const darkHeroPages = ['/', '/about', '/services'];
  const navbarOnDark  = darkHeroPages.includes(location.pathname) && !scrolled;

  const closeMenu = () => setMenuOpen(false);

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: reducedMotion ? 0.01 : 0.32, ease: [0.32, 0.72, 0, 1] } },
    exit: { opacity: 0, transition: { duration: reducedMotion ? 0.01 : 0.24, ease: [0.23, 1, 0.32, 1] } },
  };

  const linkVariants = {
    hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, x: -24 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.32, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] },
    }),
  };

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isHeroPage && !scrolled ? styles.onHero : ''}`}
        role="banner"
        data-cursor-theme={navbarOnDark ? 'dark' : undefined}
      >
        <div className={styles.inner}>
          <NavLink to="/" aria-label="Kairos home" className={styles.logoLink} onClick={closeMenu}>
            {/* Two images; CSS toggles opacity based on state — avoids JS src mutation flash.
                kairos-dark.png = deep green mark → use on CREAM (light) backgrounds
                kairos-light.png = cream mark       → use on DARK GREEN backgrounds */}
            <img
              src="/kairos-mark-dark.png"
              alt="Kairos"
              className={`${styles.logoImg} ${styles.logoDark}`}
            />
            <img
              src="/kairos-mark-light.png"
              alt=""
              aria-hidden="true"
              className={`${styles.logoImg} ${styles.logoLight}`}
            />
          </NavLink>

          <nav aria-label="Main navigation" className={styles.desktopNav}>
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            className={styles.hamburger}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <button
              className={styles.closeButton}
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <X size={24} strokeWidth={1.5} />
            </button>
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div key={to} custom={i} variants={linkVariants} initial="hidden" animate="visible">
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                    }
                    onClick={closeMenu}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
