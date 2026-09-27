import { contactSection, footer } from '../data/contact';
import { meta } from '../data/meta';

interface ContactProps {
  onCopyEmail: () => void;
}

export default function Contact({ onCopyEmail }: ContactProps) {
  return (
    <section id="contact">
      <div className="wrap contact">
        <div>
          <p className="eyebrow">{contactSection.eyebrow}</p>
          <h2>{contactSection.title}</h2>
        </div>
        <div className="contact-links">
          <a href={`mailto:${meta.email}`}>
            {contactSection.emailLabel}{' '}
            <span className="arrow" aria-hidden="true">
              {contactSection.emailArrow}
            </span>
          </a>
          <button className="copy-email" type="button" onClick={onCopyEmail}>
            {contactSection.copyLabel}{' '}
            <span className="arrow" aria-hidden="true">
              {contactSection.copyArrow}
            </span>
          </button>
          {contactSection.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
            >
              {link.label}{' '}
              <span className="arrow" aria-hidden="true">
                {link.arrow}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap footer-row">
        <span>{footer.left}</span>
        <span>{footer.right}</span>
      </div>
    </footer>
  );
}
