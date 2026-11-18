import { ArrowDownToLine } from 'lucide-react';
import Button from './Button.jsx';
import useCvAvailable from '../hooks/useCvAvailable.js';
import { profile } from '../data/profile.js';
import { useLang } from '../i18n/LanguageContext.jsx';

/** CV à proposer selon la langue : la version anglaise si elle existe, sinon le CV français. */
export function cvFor(lang) {
  const { cv } = profile;
  const english = lang === 'en' && Boolean(cv.pathEn);
  return {
    path: english ? cv.pathEn : cv.path,
    downloadName: english ? cv.downloadNameEn : cv.downloadName,
    // Site en anglais mais CV en français : on le signale.
    frenchOnly: lang === 'en' && !english,
  };
}

/** Télécharge le CV (PDF) s'il est présent dans public/cv/, sinon bouton désactivé. */
export default function CvButton({ variant = 'outline', size = 'md', className = '', label }) {
  const { lang, ui } = useLang();
  const cv = cvFor(lang);
  const available = useCvAvailable(cv.path);
  const text = label || (cv.frenchOnly ? ui.common.cvFrenchOnly : ui.common.downloadCv);

  return (
    <Button
      href={cv.path}
      download={cv.downloadName}
      icon={ArrowDownToLine}
      variant={variant}
      size={size}
      className={className}
      disabled={!available}
      disabledReason={ui.common.cvSoon}
    >
      {text}
    </Button>
  );
}
