import { useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, MapPin, Phone, Send } from 'lucide-react';
import { profile } from '../data/profile.js';
import Section from '../components/Section.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Button from '../components/Button.jsx';
import { copyText } from '../utils/clipboard.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: '', email: '', subject: '', message: '' };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Indiquez votre nom (2 caractères minimum).';
  if (!values.email.trim()) errors.email = 'Indiquez votre adresse e-mail.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Adresse e-mail invalide (ex. nom@exemple.com).';
  if (values.subject.trim().length < 3) errors.subject = 'Indiquez un sujet (3 caractères minimum).';
  if (values.message.trim().length < 10) errors.message = 'Votre message est un peu court (10 caractères minimum).';
  return errors;
}

const inputClass =
  'w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-[0.95rem] text-paper placeholder:text-paper/30 transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-accent/70';

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-paper/85">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-accent-soft">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const { contact, socials } = profile;
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const onCopy = async () => {
    await copyText(contact.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
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

    // Honeypot : un robot remplit ce champ invisible, un humain non.
    const trap = formRef.current && formRef.current.elements._gotcha;
    if (trap && trap.value) return;

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
        setStatus({ type: 'success', message: 'Message envoyé, merci ! Je vous réponds au plus vite.' });
      } catch {
        setStatus({
          type: 'error',
          message: 'L’envoi a échoué. Réessayez plus tard ou écrivez-moi directement par e-mail.',
        });
      }
      return;
    }

    // Sans service de formulaire : ouverture du client de messagerie.
    const body = `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
    setStatus({ type: 'success', message: 'Votre messagerie devrait s’ouvrir avec le message prérempli.' });
  };

  const describedBy = (name) => (errors[name] ? `contact-${name}-error` : undefined);

  return (
    <Section id="contact" className="border-t border-line">
      <SectionHeading id="contact" index="08" label="Contact" title={profile.contactSection.title} text={profile.contactSection.text} />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div data-reveal className="lg:col-span-5">
          <p className="label">E-mail</p>
          <a
            href={`mailto:${contact.email}`}
            className="group mt-3 inline-flex max-w-full items-center gap-2 font-display text-[clamp(1.15rem,5.6vw,1.875rem)] font-medium tracking-tight text-paper transition-colors hover:text-accent"
          >
            <span className="min-w-0 [overflow-wrap:anywhere]">{contact.email}</span>
            <ArrowUpRight className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
          <div className="mt-5">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-stone transition-colors hover:border-paper/40 hover:text-paper"
            >
              {copied ? <Check className="h-4 w-4 text-[#28C840]" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? 'Adresse copiée' : 'Copier l’adresse'}
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {copied ? 'Adresse e-mail copiée' : ''}
            </span>
          </div>

          <ul className="mt-12 divide-y divide-line border-y border-line text-sm">
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 py-4 text-paper/85 transition-colors hover:text-paper">
                  <Phone className="h-4 w-4 text-stone" aria-hidden="true" />
                  {contact.phone}
                </a>
              </li>
            )}
            <li className="flex items-center gap-3 py-4 text-paper/85">
              <MapPin className="h-4 w-4 text-stone" aria-hidden="true" />
              {contact.location}
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.linkedin && (
              <Button href={socials.linkedin} icon={Linkedin} variant="outline" size="sm">
                LinkedIn
              </Button>
            )}
            {socials.github && (
              <Button href={socials.github} icon={Github} variant="outline" size="sm">
                GitHub
              </Button>
            )}
          </div>
        </div>

        <form
          ref={formRef}
          data-reveal
          noValidate
          onSubmit={onSubmit}
          aria-label="Formulaire de contact"
          className="card p-6 sm:p-9 lg:col-span-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="contact-name" label="Nom" error={errors.name}>
              <input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={onChange} placeholder="Votre nom" aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} className={inputClass} />
            </Field>
            <Field id="contact-email" label="E-mail" error={errors.email}>
              <input id="contact-email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} placeholder="vous@exemple.com" aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} className={inputClass} />
            </Field>
          </div>
          <div className="mt-5">
            <Field id="contact-subject" label="Sujet" error={errors.subject}>
              <input id="contact-subject" name="subject" value={values.subject} onChange={onChange} placeholder="Stage, projet, collaboration…" aria-invalid={Boolean(errors.subject)} aria-describedby={describedBy('subject')} className={inputClass} />
            </Field>
          </div>
          <div className="mt-5">
            <Field id="contact-message" label="Message" error={errors.message}>
              <textarea id="contact-message" name="message" rows={6} value={values.message} onChange={onChange} placeholder="Parlez-moi de votre projet ou de votre besoin…" aria-invalid={Boolean(errors.message)} aria-describedby={describedBy('message')} className={`${inputClass} resize-y`} />
            </Field>
          </div>

          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:opacity-60"
            >
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              {status.type === 'loading' ? 'Envoi…' : 'Envoyer le message'}
            </button>
            <p
              role="status"
              aria-live="polite"
              className={`text-sm ${status.type === 'error' ? 'text-accent-soft' : status.type === 'success' ? 'text-[#5BD87A]' : 'text-stone'}`}
            >
              {status.message || 'Tous les champs sont requis.'}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
