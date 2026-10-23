import { useRef } from 'react';
import useMagnetic from '../hooks/useMagnetic.js';

// Bouton / lien stylé unique du portfolio.
// - Rend un <a> si `href` est fourni, sinon un <button>.
// - `disabled` : état clairement identifié (aria-disabled + titre explicatif), jamais un faux lien.
// - Effet magnétique GSAP au survol (bureau uniquement).

const VARIANTS = {
  primary: 'bg-sun text-void hover:bg-[#ff7f3a] shadow-[0_10px_30px_-10px_rgba(255,107,26,0.7)]',
  outline: 'border border-mist/25 text-snow hover:border-ion hover:text-ion bg-night/40',
  ghost: 'text-mist hover:text-snow',
};

export default function Button({
  href,
  children,
  icon: Icon,
  variant = 'primary',
  disabled = false,
  disabledReason = 'Bientôt disponible',
  className = '',
  external = false,
  download,
  type = 'button',
  ...rest
}) {
  const ref = useRef(null);
  useMagnetic(ref, { enabled: !disabled });

  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-[background-color,border-color,color,box-shadow,opacity] duration-300';
  const state = disabled ? 'cursor-not-allowed opacity-45 saturate-50' : '';
  const classes = `${base} ${VARIANTS[variant]} ${state} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />}
      <span>{children}</span>
    </>
  );

  if (disabled) {
    return (
      <span role="link" aria-disabled="true" title={disabledReason} className={classes}>
        {content}
      </span>
    );
  }

  if (href) {
    const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a ref={ref} href={href} download={download} className={classes} {...extra} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
