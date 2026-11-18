import { ArrowDownToLine } from 'lucide-react';
import Button from './Button.jsx';
import useCvAvailable from '../hooks/useCvAvailable.js';
import { profile } from '../data/profile.js';

/** Télécharge le CV (PDF) s'il est présent dans public/cv/, sinon bouton désactivé. */
export default function CvButton({ variant = 'outline', size = 'md', className = '', label = 'Télécharger le CV' }) {
  const available = useCvAvailable();

  return (
    <Button
      href={profile.cv.path}
      download={profile.cv.downloadName}
      icon={ArrowDownToLine}
      variant={variant}
      size={size}
      className={className}
      disabled={!available}
      disabledReason="CV bientôt disponible"
    >
      {label}
    </Button>
  );
}
