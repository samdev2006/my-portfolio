import { useEffect, useState } from 'react';
import { ScrollTrigger } from './animations/gsapAnimations.js';
import SpaceBackground from './components/SpaceBackground.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import BackToTop from './components/BackToTop.jsx';
import World from './components/World.jsx';
import { WorldProvider } from './components/WorldContext.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Creations from './sections/Creations.jsx';
import Experience from './sections/Experience.jsx';
import Education from './sections/Education.jsx';
import Services from './sections/Services.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  // `ready` passe à true quand le loader commence à disparaître : le Hero lance alors son intro.
  const [ready, setReady] = useState(false);

  // Recalcule les positions ScrollTrigger quand la mise en page change (polices, images, chargement).
  useEffect(() => {
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 250);
    };
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    const main = document.getElementById('main');
    const observer = main && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(refresh) : null;
    if (observer) observer.observe(main);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', refresh);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <WorldProvider>
      <a href="#main" className="skip-link">
        Aller au contenu principal
      </a>
      <SpaceBackground />
      <World ready={ready} />
      <ScrollProgress />
      <CustomCursor />
      <Loader onReveal={() => setReady(true)} />
      <Navbar />
      <main id="main" className="relative overflow-x-clip">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Creations />
        <Experience />
        <Education />
        <Services />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </WorldProvider>
  );
}
