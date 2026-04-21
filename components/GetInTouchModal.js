'use client';

import { useEffect, useRef } from 'react';

const CONTACT_EMAIL = 'tb@tbt-advisory.com';
const CALENDLY_URL = 'https://calendly.com/tbt-advisory'; // replace with real URL

export default function GetInTouchModal({ onClose }) {
    const nameRef  = useRef(null);
    const emailRef = useRef(null);
    const msgRef   = useRef(null);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const handleSend = (e) => {
        e.preventDefault();
        const name  = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const msg   = msgRef.current.value.trim();
        const subject = encodeURIComponent(`Enquiry from ${name}`);
        const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal-panel" role="dialog" aria-modal="true" aria-label="Get in touch">
                <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

                <p className="modal-eyebrow">Contact</p>
                <h2 className="modal-title">Let&apos;s talk.</h2>
                <p className="modal-subtitle">
                    Leave a message and we&apos;ll follow up.
                </p>

                <form className="modal-form" onSubmit={handleSend}>
                    <div className="form-field">
                        <label htmlFor="modal-name">Name</label>
                        <input
                            id="modal-name"
                            type="text"
                            ref={nameRef}
                            placeholder="Your name"
                            required
                            autoComplete="name"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="modal-email">Email</label>
                        <input
                            id="modal-email"
                            type="email"
                            ref={emailRef}
                            placeholder="your@email.com"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="modal-message">Message</label>
                        <textarea
                            id="modal-message"
                            ref={msgRef}
                            rows={4}
                            placeholder="Tell us about your situation…"
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn-send">Send message</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
