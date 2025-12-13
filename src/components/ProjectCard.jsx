import { Link } from "react-router-dom";
import { forwardRef, useState } from "react";

const ProjectCard = forwardRef(function ProjectCard({ project }, ref) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Link
      to={`/project/${project.id}`}
      className="
        block
      "
    >
      <div
        ref={ref}
        className="
          overflow-hidden
          min-h-0
          bg-white/30
          rounded-2xl border border-black/10
          shadow-[0_6px_20px_rgba(0,0,0,0.03)] transition-all
          group relative duration-500 project-reveal
          md:min-h-[520px] md:hover:shadow-[0_10px_50px_rgba(123,97,255,0.25)] md:hover:-translate-y-3 md:hover:scale-[1.015]
        "
      >
        {/* Glow */}
        <div
          className="
            bg-linear-to-br from-primary/10 to-secondary/10
            opacity-0
            absolute inset-0 transition duration-500 blur-3xl
            md:group-hover:opacity-20
          "
        />

        <div
          className="
            z-10
            p-5
            relative
          "
        >
          {/* Thumbnail */}
          <div
            className="
              overflow-hidden
              rounded-xl
              shadow-lg
            "
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="
                object-cover
                w-full h-60
                rounded-xl
                transition-transform
                duration-500 group-hover:scale-105
              "
            />
          </div>

          {/* Title */}
          <h3
            className="
              mt-5
              text-2xl font-sora font-semibold text-gray-800
              transition
              md:group-hover:text-primary
            "
          >
            {project.title}
          </h3>

          {/* DESCRIPTION */}
          <div
            className={`
              mt-2
              text-gray-600 text-md leading-relaxed font-manrope
              transition-all
              duration-300
              md:block
              ${expanded ? "block" : "hidden"}
            `}
          >
            {project.description}
          </div>

          {/* TECH STACK */}
          <div
            className={`
              flex flex-wrap
              mt-4
              transition-all
              gap-2 duration-300
              md:flex
              ${expanded ? "flex" : "hidden"}
            `}
          >
            {project.tech?.map((t, i) => (
              <span
                key={i}
                className="
                  px-3 py-1
                  text-md text-gray-600 font-medium font-manrope
                  bg-white/60
                  rounded-full border border-black/10
                  backdrop-blur-sm
                "
              >
                {t}
              </span>
            ))}
          </div>

          {/* ACTIONS — MOBILE ONLY */}
          <div
            className="
              flex
              mt-5
              items-center justify-between
              md:hidden
            "
          >
            {/* EXPAND / COLLAPSE */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="
                text-sm font-semibold font-manrope text-primary
              "
            >
              {expanded ? "Hide details" : "Show details"}
            </button>

            {/* SEE MORE — ONLY WHEN EXPANDED */}
            {expanded && (
              <Link
                to={`/project/${project.id}`}
                onClick={(e) => e.stopPropagation()}
                className="
                  inline-flex
                  px-4 py-2
                  text-white text-sm font-semibold font-manrope
                  bg-primary
                  rounded-full border border-primary/40
                  transition-all
                  items-center gap-2 backdrop-blur-sm duration-300 active:scale-[0.96]
                "
              >
                See more →
              </Link>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ProjectCard;
