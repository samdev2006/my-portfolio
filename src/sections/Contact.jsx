import { useRef, useState } from 'react';
import { Mail, Copy, Check, Linkedin, Github, Send } from 'lucide-react';
import useGsap from '../hooks/useGsap.js';
import { standardSectionAnimations } from '../animations/gsapAnimations.js';
import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';
import { WorldAnchor } from '../components/WorldContext.jsx';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Merci d’indiquer votre nom (2 caractères minimum).';
  if (!values.email.trim()) errors.email = 'Merci d’indiquer votre adresse e-mail.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Cette adresse e-mail ne semble pas valide (ex. nom@exemple.com).';
  if (values.subject.trim().length < 3) errors.subject = 'Merci d’indiquer un sujet (3 caractères minimum).';
  if (values.message.trim().length < 10) errors.message = 'Votre message est un peu court (10 caractères minimum).';
  return errors;
}

const EMPTY = { name: '', email: '', subject: '', message: '' };

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-snow">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-sun">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-mist/15 bg-void/60 px-4 py-3 text-sm text-snow placeholder:text-mist/40 transition-colors focus:border-ion focus:outline-none';

export default function Contact() {
  const { contact, socials } = profile;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);

  const ref = useGsap(({ reduced }) => {
    if (reduced) return;
    standardSectionAnimations(ref.current);
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const copyEmail = async () => {
    if (!contact.email) return;
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch (error) {
      // Repli pour les navigateurs sans API Clipboard (ou contexte non sécurisé).
      const temp = document.createElement('textarea');
      temp.value = contact.email;
      temp.setAttribute('readonly', '');
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(temp);
      }
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setStatus({ type: 'error', message: 'Le formulaire contient des erreurs : merci de les corriger.' });
      const field = formRef.current && formRef.current.elements[firstInvalid];
      if (field) field.focus();
      return;
    }

    // 1) Service de formulaire configuré (ex. Formspree) : envoi réel.
    if (contact.formEndpoint) {
      setStatus({ type: 'loading', message: 'Envoi en cours…' });
      try {
        const response = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setValues(EMPTY);
        setStatus({ type: 'success', message: 'Message envoyé, merci ! Je vous répondrai dès que possible.' });
      } catch (error) {
        setStatus({
          type: 'error',
          message: 'L’envoi a échoué. Merci de réessayer plus tard ou de me contacter directement par e-mail.',
        });
      }
      return;
    }

    // 2) Sans backend : ouverture du client de messagerie avec les champs préremplis (mailto:).
    if (!contact.email) {
      setStatus({
        type: 'error',
        message: 'L’adresse e-mail de destination n’est pas encore configurée : le message ne peut pas être préparé.',
      });
      return;
    }
    const body = `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`;
    const href = `mailto:${contact.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus({
      type: 'success',
      message: 'Votre application de messagerie devrait s’ouvrir avec le message prérempli. Il vous reste à l’envoyer.',
    });
  };

  const hasEmail = Boolean(contact.email);

  return (
    <div ref={ref}>
      <Section id="contact" wave="a">
        <SectionHeading id="contact" eyebrow="08 · Contact" title={profile.contactSection.title} description={profile.contactSection.text} />

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal className="space-y-6">
            <ul className="space-y-3">
              <li>
                <Button
                  href={hasEmail ? `mailto:${contact.email}` : undefined}
                  icon={Mail}
                  disabled={!hasEmail}
                  disabledReason="Adresse e-mail bientôt disponible"
                  className="w-full sm:w-auto"
                >
                  Envoyer un e-mail
                </Button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={copyEmail}
                  disabled={!hasEmail}
                  title={hasEmail ? undefined : 'Adresse e-mail bientôt disponible'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-mist/25 bg-night/40 px-6 py-3 text-sm font-semibold text-snow transition-all hover:border-ion hover:text-ion disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
                >
                  {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  {copied ? 'Adresse copiée' : 'Copier mon adresse e-mail'}
                </button>
                <span className="sr-only" role="status" aria-live="polite">
                  {copied ? 'Adresse e-mail copiée dans le presse-papiers' : ''}
                </span>
              </li>
            </ul>

            {hasEmail && <p className="font-mono text-sm text-mist/80">{contact.email}</p>}
            {contact.location && <p className="text-sm text-mist/70">{contact.location}</p>}

            <div className="flex flex-wrap gap-3">
              <Button
                href={socials.linkedin || undefined}
                external
                icon={Linkedin}
                variant="outline"
                disabled={!socials.linkedin}
                disabledReason="Lien LinkedIn bientôt disponible"
              >
                LinkedIn
              </Button>
              <Button
                href={socials.github || undefined}
                external
                icon={Github}
                variant="outline"
                disabled={!socials.github}
                disabledReason="Lien GitHub bientôt disponible"
              >
                GitHub
              </Button>
            </div>

            {/* Dernière planète : globe 3D (Three.js) dessiné par le canvas fixe sur cette zone */}
            <WorldAnchor
              name="contact"
              label="Globe 3D en maillage entouré d’anneaux et de satellites"
              className="mt-2 h-64 w-full sm:h-80"
            />
          </div>

          <form
            ref={formRef}
            data-reveal
            onSubmit={onSubmit}
            noValidate
            aria-label="Formulaire de contact"
            className="glass relative space-y-5 rounded-3xl p-5 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Nom" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClass}
                  placeholder="Votre nom"
                />
              </Field>
              <Field id="email" label="Adresse e-mail" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={onChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClass}
                  placeholder="vous@exemple.com"
                />
              </Field>
            </div>
            <Field id="subject" label="Sujet" error={errors.subject}>
              <input
                id="subject"
                name="subject"
                type="text"
                value={values.subject}
                onChange={onChange}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className={inputClass}
                placeholder="Opportunité de stage, projet, collaboration…"
              />
            </Field>
            <Field id="message" label="Message" error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={onChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputClass} resize-y`}
                placeholder="Parlez-moi de votre projet ou de votre besoin…"
              />
            </Field>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" icon={Send} disabled={false} className={status.type === 'loading' ? 'pointer-events-none opacity-70' : ''}>
                {status.type === 'loading' ? 'Envoi…' : 'Envoyer le message'}
              </Button>
              <p className="text-xs text-mist/60">
                {contact.formEndpoint
                  ? 'Votre message est envoyé via un service de formulaire.'
                  : 'Ce formulaire ouvre votre application de messagerie avec le message prérempli.'}
              </p>
            </div>

            <p
              role={status.type === 'error' ? 'alert' : 'status'}
              aria-live="polite"
              className={`min-h-[1.25rem] text-sm ${status.type === 'error' ? 'text-sun' : 'text-ion'}`}
            >
              {status.message}
            </p>
          </form>
        </div>
      </Section>
    </div>
  );
}
