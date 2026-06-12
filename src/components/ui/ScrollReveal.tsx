import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type RevealVariant = 'fadeUp' | 'fadeScale' | 'fadeLeft';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}

const VARIANTS: Record<RevealVariant, { initial: object; visible: object }> = {
  fadeUp:    { initial: { opacity: 0, transform: 'translateY(20px)'  }, visible: { opacity: 1, transform: 'translateY(0px)' } },
  fadeScale: { initial: { opacity: 0, transform: 'scale(0.96)'       }, visible: { opacity: 1, transform: 'scale(1)'       } },
  fadeLeft:  { initial: { opacity: 0, transform: 'translateX(-12px)' }, visible: { opacity: 1, transform: 'translateX(0px)' } },
};

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  variant = 'fadeUp',
}: ScrollRevealProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 });
  const reducedMotion = useReducedMotion();

  const { initial, visible } = VARIANTS[variant];
  const initState = reducedMotion ? { opacity: 0 } : initial;
  const visState  = reducedMotion ? { opacity: 1 } : visible;
  const hidState  = reducedMotion ? { opacity: 0 } : initial;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initState}
      animate={isVisible ? visState : hidState}
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
