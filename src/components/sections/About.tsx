import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // Skills data for animation and rendering
  const skills = [
    { name: 'HTML5', proficiency: 90 },
    { name: 'CSS3', proficiency: 85 },
    { name: 'JavaScript', proficiency: 80 },
    { name: 'React', proficiency: 75 },
    { name: 'PHP', proficiency: 70 },
    { name: 'Python', proficiency: 65 },
    { name: 'MongoDB', proficiency: 60 },
    { name: 'MySQL', proficiency: 75 },
  ];

  useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      // Add scroll trigger for section animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        }
      });

      // Animate bio content
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        }
      });

      // Animate skill bars
      gsap.from('.skill-bar-fill', {
        width: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        }
      });

      // Animate skill percentages
      gsap.from('.skill-percent', {
        textContent: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5,
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        },
        onUpdate: function() {
          const targets = document.querySelectorAll('.skill-percent');
          targets.forEach((target, index) => {
            if (target instanceof HTMLElement) {
              target.textContent = `${Math.round(this.targets()[index].textContent)}%`;
            }
          });
        }
      });

    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-dark-200">
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16 relative"
        >
          About <span className="text-teal">Me</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-teal mt-2" />
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio Section */}
          <div ref={contentRef} className="bg-dark-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-teal">Who Am I?</h3>
            <p className="text-gray-300 mb-4">
              I am Ibrahim Sohofi, a passionate web developer from Morocco. I enjoy creating beautiful, functional, and accessible websites and web applications that provide great user experiences.
            </p>
            <p className="text-gray-300 mb-4">
              My journey in web development started back in 2020, and since then, I've been constantly learning and improving my skills. I specialize in front-end development but also have experience with back-end technologies.
            </p>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-teal">Education</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium">Bachelor's in Web Development</h4>
                  <span className="text-sm text-teal">2018 - 2021</span>
                </div>
                <p className="text-gray-400">University of Morocco</p>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium">Web Development Certification</h4>
                  <span className="text-sm text-teal">2022</span>
                </div>
                <p className="text-gray-400">FreeCodeCamp</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div ref={skillsRef} className="bg-dark-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-teal">My Skills</h3>

            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-teal skill-percent">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="skill-bar-fill bg-gradient-to-r from-teal to-orange h-2.5 rounded-full"
                      style={{width: `${skill.proficiency}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-teal">Languages</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-medium">English</h4>
                  <p className="text-gray-400">Professional Working</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Arabic</h4>
                  <p className="text-gray-400">Native</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium">French</h4>
                  <p className="text-gray-400">Professional Working</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
