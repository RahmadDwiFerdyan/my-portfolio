import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";

export default function ProjectDetail() {
    const { id } = useParams();
    const project = projects.find((p) => p.id == id);

    return (
        <section className="pt-16 pb-20 max-w-7xl mx-auto px-6 font-manrope">

            {/* Back Button */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 font-medium text-lg mb-6 hover:underline"
            >
                ← Back to Home
            </Link>

            {/* Title */}
            <h1 className="text-4xl font-sora font-bold text-primary">
                {project.title}
            </h1>

            {/* Description */}
            <p className="text-xl mt-2 text-gray-600">{project.description}</p>

            {/* Tech Stack */}
            <div className="mt-6 flex flex-wrap gap-3">
                {project.tech?.map((tech, i) => (
                    <span
                        key={i}
                        className="px-4 py-1.5 bg-primary/10 text-primary font-manrope font-semibold text-md rounded-full"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {/* Bento Image Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mt-10 space-y-4">
                {project.images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        className="w-full rounded-xl shadow-lg break-inside-avoid
                                    hover:transition-transform duration-500 
                                    hover:scale-110"
                    />
                ))}
            </div>

            {/* Links */}
            <div className="mt-16 flex flex-wrap gap-4 text-lg justify-center">
                {project.links?.map((link, i) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group
                            flex items-center gap-3 
                            px-5 py-2.5 rounded-lg
                            border border-primary/40 
                            text-primary font-base font-manrope text-md

                            bg-white/40 backdrop-blur-sm
                            

                            transition-all duration-300

                            hover:border-primary hover:bg-primary/5
                            hover:-translate-y-1 active:scale-[0.98]
                        "
                    >
                        {/* ICON */}
                        {link.icon && (
                            <img
                                src={link.icon}
                                className="
                                    w-5 h-5 object-contain 
                                    transition-transform duration-300
                                   
                                "
                            />
                        )}

                        {/* LABEL */}
                        <span className="transition-colors duration-300 group-hover:text-primary">
                            {link.label}
                        </span>
                    </a>

                ))}
            </div>



        </section>
    );
}
