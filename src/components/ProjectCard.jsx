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
          h-auto md:h-[480px]
          bg-white/10
          rounded-2xl border border-white/10
          shadow-[0_6px_20px_rgba(0,0,0,0.03)] transition-all
          group relative duration-300 project-reveal flex flex-col
          md:hover:-translate-y-1 md:hover:scale-[1.05] md:hover:border-secondary
        "
      >
        {/* Category badge tucked inside the top edge */}
        <div className="absolute left-0 top-0 z-20">
          <span className="inline-flex w-max whitespace-nowrap items-center gap-2 rounded-br-2xl bg-primary px-4 py-1.5 text-sm font-semibold text-[#072012] shadow-[0_12px_28px_rgba(0,0,0,0.2)]">
            {project.category || project.type || "Project"}
          </span>
        </div>
        <div
          className="
            z-10
            p-5
            relative
            flex flex-1 flex-col
            overflow-hidden
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

          {/* TECH STACK */}
          {(project.tech || project.techStack || []).length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-start gap-2 w-full">
              {(project.tech || project.techStack || []).map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

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
                className="w-5 h-5 text-primary "
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
