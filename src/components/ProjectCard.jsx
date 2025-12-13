import { Link } from "react-router-dom";
import { forwardRef, useState } from "react";

const ProjectCard = forwardRef(function ProjectCard({ project }, ref) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Link to={`/project/${project.id}`} className="block">
      <div
        ref={ref}
        className="
          group relative rounded-2xl border border-black/10
          bg-white/30 shadow-[0_6px_20px_rgba(0,0,0,0.03)]
          overflow-hidden transition-all duration-500
          hover:shadow-[0_10px_50px_rgba(123,97,255,0.25)]
          hover:-translate-y-3 hover:scale-[1.015]
          project-reveal min-h-0 md:min-h-[520px]
        "
      >

        {/* Glow */}
        <div className="
          absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-500
          bg-linear-to-br from-primary/10 to-secondary/10 blur-3xl
        " />

        <div className="p-5 relative z-10">

          {/* Thumbnail */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="
                w-full h-60 object-cover rounded-xl
                transition-transform duration-500
                group-hover:scale-105
              "
            />
          </div>

          {/* Title */}
          <h3 className="mt-5 text-2xl font-sora font-semibold text-gray-800 group-hover:text-primary transition">
            {project.title}
          </h3>

          {/* DESCRIPTION */}
          <div
            className={`
              mt-2 text-gray-600 text-md leading-relaxed font-manrope
              transition-all duration-300
              ${expanded ? "block" : "hidden"}
              md:block
            `}
          >
            {project.description}
          </div>

          {/* TECH STACK */}
          <div
            className={`
              flex flex-wrap gap-2 mt-4
              transition-all duration-300
              ${expanded ? "flex" : "hidden"}
              md:flex
            `}
          >
            {project.tech?.map((t, i) => (
              <span
                key={i}
                className="
                  text-md px-3 py-1 text-gray-600 rounded-full
                  bg-white/60 backdrop-blur-sm
                  border border-black/10
                  font-medium font-manrope
                "
              >
                {t}
              </span>
            ))}
          </div>

          {/* EXPAND BUTTON — MOBILE ONLY */}
          <button
            onClick={(e) => {
              e.preventDefault();   // prevent Link
              e.stopPropagation();  // prevent bubbling
              setExpanded(!expanded);
            }}
            className="
              mt-4 md:hidden
              text-sm font-semibold font-manrope
              text-primary
              hover:underline
            "
          >
            {expanded ? "Hide details" : "Show details"}
          </button>

        </div>
      </div>
    </Link>
  );
});

export default ProjectCard;
