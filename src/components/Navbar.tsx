import { navLinks, signature, themeConfig, type Theme } from '../data/navigation';
import { useScrolled } from '../hooks/useScrolled';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

function MoonIcon() {
  return (
    <svg className="moon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="sun" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8m10.6 10.6 1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </svg>
  );
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const config = themeConfig[theme];
  const scrolled = useScrolled();
  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`} aria-label="Primary navigation">
      <div className="wrap site-nav-inner">
        <button type="button" className="status status-button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0 })}>
          {signature}
        </button>
        <div className="nav-links">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <button
          className="theme-toggle"
          type="button"
          aria-pressed={config.pressed}
          aria-label={config.ariaLabel}
          onClick={onToggleTheme}
        >
          <MoonIcon />
          <SunIcon />
          <span className="theme-label">{config.label}</span>
        </button>
        </div>
      </div>
    </nav>
  );
}
