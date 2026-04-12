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
          bg-white/10
          rounded-2xl border border-white/10
          shadow-[0_6px_20px_rgba(0,0,0,0.03)] transition-all
          group relative duration-300 project-reveal flex flex-col
          md:min-h-[520px] md:hover:-translate-y-1 md:hover:scale-[1.01]
        "
      >
        <div
          className="
            z-10
            p-5
            relative
            flex flex-1 flex-col
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
              "
            />
          </div>

          {/* Title */}
          <h3
            className="
              mt-5
              text-2xl font-sora font-semibold text-white
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
              text-white text-md leading-relaxed font-manrope
              transition-all
              duration-300
              md:block
              ${expanded ? "block" : "hidden"}
            `}
          >
            {project.description}
          </div>

          <div className="mt-auto">
            {/* SEE MORE */}
            <div
              className={`
                flex items-center justify-between
                mt-4
                transition-all
                duration-300
                md:flex
                ${expanded ? "flex" : "hidden"}
              `}
            >
              <span className="text-md font-semibold font-manrope text-primary">See more</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-primary"
                aria-hidden="true"
              >
                <path d="M14 3h7v7" />
                <path d="M10 14L21 3" />
                <path d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" />
              </svg>
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
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ProjectCard;
