import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const appRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // Handle cursor movement
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Expand cursor on hover of interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const interactiveElements = document.querySelectorAll('button, a, .nav-link, .project-card');

    for (const element of interactiveElements) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);

      for (const element of interactiveElements) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Loading animation
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Account for header height
        behavior: 'smooth'
      });
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-dark-200 z-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-t-4 border-b-4 border-teal rounded-full animate-spin mb-4" />
          <h2 className="text-2xl font-bold text-white">Loading<span className="animate-pulse">...</span></h2>
        </div>
      </div>
    );
  }

  return (
    <div ref={appRef} className="App">
      {/* Custom cursor */}
      <div ref={cursorRef} className="custom-cursor">
        <div ref={cursorDotRef} className="cursor-dot" />
        <div className="cursor-outline" />
      </div>

      {/* Header */}
      <Header onScrollToSection={scrollToSection} />

      {/* Hero Section */}
      <Hero onScrollToSection={scrollToSection} />

      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}

export default App;
