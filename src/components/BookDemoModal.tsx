import { useState, useEffect, useRef } from 'react';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

/**
 * Modal form for booking a demo.
 * Fields: Name (required), Email (required), Company (optional).
 * On submit, saves to backend and shows success message.
 */
export function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus the name input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => nameInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/api/demo-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setCompany('');
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-demo-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded bg-card border border-border p-6 shadow-xl"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-foreground transition-colors rounded focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-foreground mb-2">Thank you!</h2>
            <p className="text-muted">We'll contact you within 24 hours.</p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 px-6 py-2 rounded bg-accent text-white font-semibold hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 id="book-demo-title" className="text-xl font-bold text-foreground mb-1">
              Book a Demo
            </h2>
            <p className="text-muted text-sm mb-6">
              Fill in your details and we'll reach out to schedule a walkthrough.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="demo-name" className="block text-sm font-medium text-foreground mb-1">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  id="demo-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 rounded bg-background border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="demo-email" className="block text-sm font-medium text-foreground mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 rounded bg-background border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="demo-company" className="block text-sm font-medium text-foreground mb-1">
                  Company <span className="text-muted text-xs">(optional)</span>
                </label>
                <input
                  id="demo-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company"
                  className="w-full px-3 py-2 rounded bg-background border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-6 py-3 rounded bg-accent text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                {status === 'submitting' ? 'Submitting...' : 'Book Demo'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
