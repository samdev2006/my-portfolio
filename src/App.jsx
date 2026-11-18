import { useEffect } from 'react';
import { ScrollTrigger } from './animations/gsapAnimations.js';
import Navbar from './components/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Creations from './sections/Creations.jsx';
import Journey from './sections/Journey.jsx';
import Services from './sections/Services.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  // Recalcule les positions ScrollTrigger quand la mise en page change (polices, images).
  useEffect(() => {
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
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main" className="relative overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Creations />
        <Journey />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
