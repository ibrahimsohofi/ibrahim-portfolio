import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

const Hero = ({ onScrollToSection }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const headingCharsRef = useRef<HTMLDivElement>(null);
  const subtitleWordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !headingRef.current || !subtitleRef.current) return;

    // Create a context to enable scrollTrigger on this component
    const ctx = gsap.context(() => {
      // Prepare heading and subtitle for animation
      const heading = headingRef.current;
      const subtitle = subtitleRef.current;

      // Create wrapper spans for each word of the heading text
      if (heading) {
        const headingText = heading.innerHTML;
        heading.innerHTML = '';
        const headingWords = headingText.split(' ');

        headingWords.forEach((word, index) => {
          // Create a wrapper for each word
          const wordSpan = document.createElement('span');
          wordSpan.className = 'inline-block mr-2 overflow-hidden';

          // Create spans for each character
          word.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.className = 'inline-block char opacity-0';
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
          });

          heading.appendChild(wordSpan);

          // Add space between words except for the last word
          if (index < headingWords.length - 1) {
            const space = document.createElement('span');
            space.innerHTML = ' ';
            heading.appendChild(space);
          }
        });
      }

      // Create wrapper spans for each word of the subtitle text
      if (subtitle) {
        const subtitleText = subtitle.innerHTML;
        subtitle.innerHTML = '';
        const subtitleWords = subtitleText.split(' ');

        subtitleWords.forEach((word, index) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'inline-block mr-2 word opacity-0';
          wordSpan.textContent = word;
          subtitle.appendChild(wordSpan);

          // Add space between words except for the last word
          if (index < subtitleWords.length - 1) {
            const space = document.createElement('span');
            space.innerHTML = ' ';
            subtitle.appendChild(space);
          }
        });
      }

      // Create timeline for intro animations
      const tl = gsap.timeline();

      // Animate hero background
      tl.from(heroRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Animate heading by characters with stagger
      tl.from(".char", {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Animate subtitle by words with stagger
      tl.from(".word", {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.3");

      // Animate buttons and social icons
      tl.from(".hero-btn", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

      tl.from(".social-icon", {
        opacity: 0,
        scale: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.6");

      // Animate the floating effect for the hero image
      gsap.to(".hero-image", {
        y: -20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Add moving gradients in background
      gsap.to(".bg-gradient-1", {
        x: "10%",
        y: "5%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".bg-gradient-2", {
        x: "-10%",
        y: "-5%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, heroRef);

    // Clean up animations when component unmounts
    return () => ctx.revert();
  }, []);

  const handleButtonClick = (sectionId: string) => {
    onScrollToSection(sectionId);
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-gradient-1 absolute top-0 left-0 w-[50%] h-[50%] rounded-full bg-teal/10 filter blur-[100px] transform -translate-x-1/4 -translate-y-1/4" />
        <div className="bg-gradient-2 absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-orange/10 filter blur-[100px] transform translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Hi, I'm <span className="text-teal">Ibrahim Sohofi</span> <br />
              Web Developer
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto md:mx-0"
            >
              I create beautiful and functional web experiences with clean code and modern technologies.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
              <button
                className="hero-btn btn bg-teal hover:bg-teal/90 text-white py-3 px-8 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-teal/20 hover:shadow-xl"
                onClick={() => handleButtonClick('projects')}
              >
                View Projects
              </button>

              <button
                className="hero-btn btn bg-transparent border-2 border-teal text-white hover:text-teal py-3 px-8 rounded-full font-semibold text-sm transition-all duration-300"
                onClick={() => handleButtonClick('contact')}
              >
                Contact Me
              </button>
            </div>

            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://github.com/ibrahimsohofi" target="_blank" rel="noopener noreferrer" className="social-icon text-white hover:text-teal transition-colors duration-300" aria-label="GitHub">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/ibrahimsohofi/" target="_blank" rel="noopener noreferrer" className="social-icon text-white hover:text-teal transition-colors duration-300" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://twitter.com/Ibrahimsohofi" target="_blank" rel="noopener noreferrer" className="social-icon text-white hover:text-teal transition-colors duration-300" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/sohofi.ibrahim/" target="_blank" rel="noopener noreferrer" className="social-icon text-white hover:text-teal transition-colors duration-300" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-teal/20 flex items-center justify-center hero-image">
              <div className="absolute inset-0 border-2 border-teal/30 rounded-full animate-pulse" />
              <div className="w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-teal to-navy rounded-full overflow-hidden border-4 border-teal/20 shadow-xl">
                <div className="h-full w-full bg-gradient-to-br from-navy/80 to-dark-200/80" />
                {/* You can add an image here if available */}
                {/* <img src="/path-to-your-image.jpg" alt="Ibrahim Sohofi" className="w-full h-full object-cover" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/70 text-sm mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-teal rounded-full animate-bounce-slow" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
