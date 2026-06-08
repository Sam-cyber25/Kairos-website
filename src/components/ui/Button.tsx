import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined';
  as?: 'button' | 'a';
  href?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'filled',
  as: Tag = 'button',
  href,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const classes = [styles.btn, styles[variant], className].filter(Boolean).join(' ');

  if (Tag === 'a') {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
