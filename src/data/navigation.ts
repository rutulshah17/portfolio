export type Theme = 'light' | 'dark';

export interface ThemeConfig {
  label: string;
  ariaLabel: string;
  pressed: boolean;
}

/** Lookup map — no branching on theme anywhere. */
export const themeConfig: Record<Theme, ThemeConfig> = {
  light: { label: 'Dark', ariaLabel: 'Enable dark theme', pressed: false },
  dark: { label: 'Light', ariaLabel: 'Enable light theme', pressed: true },
};

export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#lab', label: 'Systems lab' },
  { href: '#aidlc', label: 'AIDLC' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const signature = 'Rutul Shah';
