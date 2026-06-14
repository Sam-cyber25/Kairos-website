import styles from './aurora-background.module.css';

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={`${styles.wrapper}${className ? ' ' + className : ''}`}>
      <div className={styles.aurora} aria-hidden="true">
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
