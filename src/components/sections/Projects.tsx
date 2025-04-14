import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Project type interface
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string[];
  technologies: string[];
  demoLink: string;
  githubLink: string;
}

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Example projects data
  const projectsData: Project[] = [
    {
      id: 'vidnet-frontend',
      title: 'VidNet Frontend',
      description: 'A modern video streaming platform with React and Redux',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
      category: ['frontend', 'web'],
      technologies: ['React', 'Redux', 'Tailwind CSS'],
      demoLink: 'https://vidnet.example.com',
      githubLink: 'https://github.com/ibrahimsohofi/vidnet_frontend'
    },
    {
      id: 'online-courses',
      title: 'Online Courses Platform',
      description: 'A platform for online courses with user authentication',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
      category: ['fullstack', 'web'],
      technologies: ['Next.js', 'MongoDB', 'Express.js'],
      demoLink: 'https://courses.example.com',
      githubLink: 'https://github.com/ibrahimsohofi/online_courses_platform'
    },
    {
      id: 'link-shortener',
      title: 'Link Shortener',
      description: 'A URL shortening service with analytics',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      category: ['backend', 'web'],
      technologies: ['Node.js', 'Express.js', 'MongoDB'],
      demoLink: 'https://shortlinks.example.com',
      githubLink: 'https://github.com/ibrahimsohofi/link-shortener'
    },
    {
      id: 'books-website',
      title: 'Books Website',
      description: 'A book review and recommendation website',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d',
      category: ['frontend', 'web'],
      technologies: ['HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://books.example.com',
      githubLink: 'https://github.com/ibrahimsohofi/Bookswebsite'
    },
    {
      id: 'watch-series',
      title: 'Watch Series',
      description: 'A series and movies tracking application',
      image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8',
      category: ['fullstack', 'web'],
      technologies: ['TypeScript', 'React', 'Node.js'],
      demoLink: 'https://watchseries.example.com',
      githubLink: 'https://github.com/ibrahimsohofi/watch-series-'
    },
    {
      id: 'anime-tracker',
      title: 'Anime Tracker',
      description: 'An application to track and discover anime series',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42',
      category: ['frontend', 'mobile'],
      technologies: ['React Native', 'Firebase'],
      demoLink: 'https://animetracker.example.com',
      githubLink: 'https://github.com/ibrahimsohofi/anime'
    }
  ];

  useEffect(() => {
    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);

  useEffect(() => {
    if (!projectsRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        }
      });

      // Animate filter buttons
      gsap.from(filterRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        }
      });

      // Animate project cards
      gsap.from('.project-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none none'
        }
      });
    }, projectsRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);

    if (filter === 'all') {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter(project => project.category.includes(filter));
    setFilteredProjects(filtered);

    // Animate the filtered projects
    gsap.from('.project-card', {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.out',
      clearProps: 'all'
    });
  };

  return (
    <section id="projects" ref={projectsRef} className="py-20 bg-dark-100">
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold text-center mb-16 relative"
        >
          My <span className="text-teal">Projects</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-teal mt-2" />
        </h2>

        {/* Filter Buttons */}
        <div
          ref={filterRef}
          className="flex flex-wrap justify-center mb-12 gap-4"
        >
          {['all', 'frontend', 'backend', 'fullstack', 'web', 'mobile'].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-teal text-white shadow-lg shadow-teal/20'
                  : 'bg-dark-200 text-gray-400 hover:bg-dark-100 hover:border-teal hover:text-white'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl bg-dark-200">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={`${project.image}?auto=format&fit=crop&w=500&q=80`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-200/90 flex items-end">
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {project.category.map((cat) => (
                        <span key={`${project.id}-${cat}`} className="inline-block px-2 py-1 text-xs rounded-full bg-teal/20 text-teal">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-teal mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={`${project.id}-${tech}`} className="px-2 py-1 text-xs bg-dark-100 rounded-md text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-2 border-t border-gray-700">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-teal hover:text-orange transition-colors"
                    aria-label={`View ${project.title} Demo`}
                  >
                    Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-teal hover:text-orange transition-colors"
                    aria-label={`${project.title} Github Repository`}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more projects button */}
        {projects.length > 6 && (
          <div className="text-center mt-12">
            <button className="btn bg-teal hover:bg-teal/90 text-white py-3 px-8 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-teal/20 hover:shadow-xl">
              View More Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
