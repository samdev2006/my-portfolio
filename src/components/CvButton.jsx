import { Download } from 'lucide-react';
import Button from './Button.jsx';
import useCvAvailable from '../hooks/useCvAvailable.js';
import { profile } from '../data/profile.js';

/** Télécharge le CV (PDF) s'il est présent dans public/cv/, sinon bouton désactivé explicite. */
export default function CvButton({ variant = 'outline', className = '', label = 'Télécharger mon CV' }) {
  const available = useCvAvailable();

  return (
    <Button
      href={profile.cv.path}
      download={profile.cv.downloadName}
      icon={Download}
      variant={variant}
      className={className}
      disabled={!available}
      disabledReason="CV bientôt disponible"
    >
      {label}
    </Button>
  );
}
