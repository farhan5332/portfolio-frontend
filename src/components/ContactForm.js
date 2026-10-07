'use client';

import { useState } from 'react';
import { sendContactMessage } from '@/lib/api';

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };

function Field({ id, label, error, required, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

// Sends the message to POST /api/contact. The backend saves it and emails the site owner.
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' }); // idle | sending | success | error

  const sending = status.type === 'sending';

  const bind = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
    },
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: `input ${errors[name] ? 'border-red-500' : ''}`,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus({ type: 'sending', message: '' });

    try {
      const res = await sendContactMessage(values);
      setValues(EMPTY);
      setStatus({ type: 'success', message: res.message });
    } catch (err) {
      setErrors(err.fieldErrors ?? {});
      setStatus({
        type: 'error',
        message: Object.keys(err.fieldErrors ?? {}).length ? 'Please fix the highlighted fields.' : err.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input type="text" autoComplete="name" maxLength={100} required {...bind('name')} />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input type="email" autoComplete="email" maxLength={200} required {...bind('email')} />
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject}>
        <input type="text" maxLength={150} {...bind('subject')} />
      </Field>

      <Field id="message" label="Message" required error={errors.message}>
        <textarea rows={6} maxLength={5000} required {...bind('message')} />
      </Field>

      {/* Honeypot: invisible to people, bots fill it in and the API quietly drops the message */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" tabIndex={-1} autoComplete="off" {...bind('website')} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? 'Sending...' : 'Send message'}
        </button>
        <p
          role={status.type === 'error' ? 'alert' : 'status'}
          className={`text-sm ${status.type === 'error' ? 'text-red-500' : 'text-emerald-600'}`}
        >
          {status.message}
        </p>
      </div>
    </form>
  );
}
