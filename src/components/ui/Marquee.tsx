import styles from './Marquee.module.css';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CONTENT = 'WEB DESIGN · KANPUR · THE PURSUIT CONTINUES · WEBSITES THAT WORK · KAIROS · ';

export default function Marquee() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={styles.static}>
        <span className={styles.text}>{CONTENT}</span>
      </div>
    );
  }

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.track}>
        <span className={styles.text}>{CONTENT}</span>
        <span className={styles.text}>{CONTENT}</span>
      </div>
    </div>
  );
}
