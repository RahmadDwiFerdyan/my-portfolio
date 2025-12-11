import { Link } from "react-router-dom";
import { forwardRef } from "react";

const ProjectCard = forwardRef(function ProjectCard({ project }, ref) {

  return (
    <Link to={`/project/${project.id}`} className="block">
      <div
        ref={ref}
        className={`
          group relative rounded-2xl border border-white/10 backdrop-blur-xl 
          bg-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.05)]
          overflow-hidden transition-all duration-500
          hover:shadow-[0_20px_50px_rgba(123,97,255,0.25)]
          hover:-translate-y-3 hover:scale-[1.015]
          project-reveal 
          min-h-[560px]
        `}
      >

        {/* Glow */}
        <div className="
          absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-500
          bg-linear-to-br from-primary/10 to-secondary/10 blur-3xl
        "></div>

        {/* Inner */}
        <div className="p-5 relative z-10">

          {/* Thumbnail */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="
                w-full h-60 object-cover rounded-xl
                transition-transform duration-700
                group-hover:scale-110 group-hover:-rotate-1
              "
            />
          </div>

          {/* Title */}
          <h3 className="mt-5 text-2xl font-sora font-semibold text-gray-900 group-hover:text-primary transition">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-md mt-2 leading-relaxed font-manrope">
            {project.description}
          </p>

          {/* Badges FIX */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech?.map((t, i) => (
              <span
                key={i}
                className="
                  text-md px-3 py-1 text-gray-600 rounded-full bg-white/60 backdrop-blur-sm
                  border border-black/5 
                  font-medium font-manrope 
                  transition-all duration-500
                  group-hover:-translate-y-0.5
                "
              >
                {t}
              </span>
            ))}
          </div>

        </div>
      </div>
    </Link>
  );
});

export default ProjectCard;
