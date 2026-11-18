import { useEffect } from 'react';
import { ScrollTrigger } from './animations/gsapAnimations.js';
import { profile } from './data/profile.js';
import { useLang } from './i18n/LanguageContext.jsx';
import Navbar from './components/Navbar.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import GithubActivity from './sections/GithubActivity.jsx';
import Creations from './sections/Creations.jsx';
import Journey from './sections/Journey.jsx';
import Services from './sections/Services.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

// Petit mot pour les développeurs qui ouvrent la console.
function greetDevelopers(text) {
  if (typeof window === 'undefined' || window.__portfolioGreeted) return;
  window.__portfolioGreeted = true;
  console.log(`%c${text.hello}`, 'font: 600 18px system-ui; color: #FF6B1A;');
  console.log(text.body(profile.sourceCode.repoUrl, profile.contact.email));
}

export default function App() {
  const { ui } = useLang();
  // Recalcule les positions ScrollTrigger quand la mise en page change (polices, images).
  useEffect(() => {
    greetDevelopers(ui.console);
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <div className="grain">
      <a href="#main" className="skip-link">
        {ui.common.skip}
      </a>
      <Navbar />
      <main id="main" className="relative overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GithubActivity />
        <Creations />
        <Journey />
        <Services />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </div>
  );
}
