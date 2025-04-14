import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

const Header = ({ onScrollToSection }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll event to add background to header when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const { top } = element.getBoundingClientRect();
          if (top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation for header
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from('.nav-item', {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out',
      duration: 0.8,
      delay: 0.5
    });

    tl.from('.download-cv', {
      y: -20,
      opacity: 0,
      ease: 'power3.out',
      duration: 0.8,
    }, '-=0.4');

    // Hover effect on nav items
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          y: -2,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    return () => {
      navItems.forEach(item => {
        item.removeEventListener('mouseenter', () => {});
        item.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  // Handle nav item click
  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-200/90 backdrop-blur-md py-3 shadow-lg' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a
          href="#home"
          className="text-2xl font-bold text-white group"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          <span className="text-teal">Ibrahim</span>
          <span className="text-white group-hover:text-orange transition-colors duration-300">Sohofi</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
            <a
              key={section}
              href={`#${section}`}
              className={`nav-item nav-link text-sm uppercase tracking-wider font-medium transition-colors duration-300 ${
                activeSection === section ? 'text-teal active' : 'text-white hover:text-teal'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(section);
              }}
            >
              {section}
            </a>
          ))}
        </nav>

        {/* Download CV Button */}
        <button
          className="hidden md:block download-cv download-btn px-5 py-2 rounded-md font-medium text-sm transition-all duration-300"
        >
          Download CV
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-dark-200/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {['home', 'about', 'skills', 'projects', 'contact'].map(section => (
              <a
                key={section}
                href={`#${section}`}
                className={`text-sm uppercase tracking-wider font-medium transition-colors duration-300 ${
                  activeSection === section ? 'text-teal' : 'text-white hover:text-teal'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(section);
                }}
              >
                {section}
              </a>
            ))}
            <button className="download-btn px-5 py-2 rounded-md font-medium text-sm w-full mt-4">
              Download CV
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
