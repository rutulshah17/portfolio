import { useCallback, useRef, useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { contactSection } from './data/contact';
import { meta } from './data/meta';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Capabilities from './components/Capabilities';
import SystemsLab from './components/SystemsLab';
import Aidlc from './components/Aidlc';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact, { Footer } from './components/Contact';
import Toast from './components/Toast';

const TOAST_MS = 1800;

export default function App() {
  const { theme, toggle } = useTheme();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMessage(null), TOAST_MS);
  }, []);

  const copyEmail = useCallback(() => {
    const done = () => showToast(contactSection.copiedMessage);
    const fallback = () => showToast(meta.email);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(meta.email).then(done, fallback);
    } else {
      fallback();
    }
  }, [showToast]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Capabilities />
        <SystemsLab />
        <Aidlc />
        <Experience />
        <Skills />
        <Contact onCopyEmail={copyEmail} />
      </main>
      <Footer />
      <Toast message={toastMessage} />
    </>
  );
}
