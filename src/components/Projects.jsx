import { useEffect, useRef } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
  }, []);

  return (
    <section id="projects" className="relative py-8 overflow-hidden">

      {/* Gradient Blobs
      <div className="absolute -top-10 -left-20 w-[500px] h-[500px] bg-primary/20 blur-[140px] -z-10"></div>
      <div className="absolute bottom-0 -right-20 w-[550px] h-[550px] bg-secondary/20 blur-[150px] -z-10"></div> */}

      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="category-title text-center text-4xl font-sora font-bold mb-16">
          Projects
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              ref={(el) => (cardRefs.current[i] = el)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
