import { useEffect, useRef } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const cardRefs = useRef([]);
  const titleRef = useRef(null);   // <-- NEW
  const titleVisible = useRef(false);

  useEffect(() => {
    // Reveal cards
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

  useEffect(() => {
    // Animate underline for title
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !titleVisible.current) {
            titleVisible.current = true;
            entry.target.classList.add("show-underline");
          }
        });
      },
      { threshold: 0.8 }
    );

    if (titleRef.current) titleObserver.observe(titleRef.current);
  }, []);

  return (
    <section
      id="projects"
      className="
        relative 
        pt-12 pb-12 
        overflow-hidden 
        bg-[linear-gradient(to_top,white,rgba(255,255,255,0)_40%)]
      "
    >
      <div className="max-w-7xl mx-auto px-10 md:px-6">

        {/* TITLE WITH UNDERLINE ANIMATION */}
        <h2
          ref={titleRef}
          className="
            category-title 
            block mx-auto text-center 
            text-4xl font-sora font-bold 
            mb-12
          "
        >
          Projects
        </h2>

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
