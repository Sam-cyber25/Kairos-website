import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      // GPU-composited: use transform string, NOT y shorthand (y runs on main thread)
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(20px)' }}
      animate={isVisible
        ? { opacity: 1, transform: 'translateY(0px)' }
        : reducedMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(20px)' }
      }
      transition={{
        duration: reducedMotion ? 0.15 : 0.5,
        delay: reducedMotion ? 0 : delay,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
