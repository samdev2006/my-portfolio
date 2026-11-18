const VARIANTS = {
  primary: 'bg-accent text-ink hover:bg-accent-soft',
  light: 'bg-paper text-ink hover:bg-white',
  outline: 'border border-line bg-graphite/40 text-paper hover:border-paper/40 hover:bg-graphite',
  ghost: 'text-paper/80 hover:text-paper',
};

/**
 * Bouton ou lien stylé. `href` -> <a>, sinon <button>.
 * `disabled` : rendu inactif avec une explication accessible (title + sr-only).
 */
export default function Button({
  href,
  icon: Icon,
  iconRight: IconRight,
  variant = 'primary',
  size = 'md',
  disabled = false,
  disabledReason = '',
  className = '',
  children,
  ...rest
}) {
  const sizes = size === 'sm' ? 'h-9 px-4 text-[0.8rem]' : 'h-12 px-6 text-sm';
  const classes = `group inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 ${sizes} ${VARIANTS[variant]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && (
        <IconRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (disabled) {
    return (
      <span aria-disabled="true" title={disabledReason} className={`${classes} pointer-events-none opacity-40`}>
        {content}
        {disabledReason && <span className="sr-only"> ({disabledReason})</span>}
      </span>
    );
  }

  if (href) {
    const external = /^https?:\/\//.test(href);
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
