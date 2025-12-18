import TechCard from "../components/TechCard";
import useReveal from "../hooks/useReveal";


const techCategories = [
    {
        title: "Languages",
        items: [
            { label: "JavaScript", icon: "/icons/javascript.svg" },
            { label: "PHP", icon: "/icons/php.svg" },
            { label: "Python", icon: "/icons/python.svg" },
            { label: "Java", icon: "/icons/java.svg" },
        ],
    },
    {
        title: "Frameworks & Libraries",
        items: [
            { label: "React.js / React Native", icon: "/icons/react.svg" },
            { label: "Node.js / Express.js", icon: "/icons/node.svg" },
            { label: "Laravel", icon: "/icons/laravel.svg" },
            { label: "TailwindCSS", icon: "/icons/tailwind.svg" },
        ],
    },
    {
        title: "Databases",
        items: [
            { label: "PostgreSQL", icon: "/icons/postgresql.svg" },
            { label: "MySQL", icon: "/icons/mysql.svg" },
            { label: "MS SQL Server", icon: "/icons/sqlserver.svg" },
        ],
    },
    {
        title: "Development Tools",
        items: [
            { label: "GitHub", icon: "/icons/github-mark.svg" },
            { label: "VS Code", icon: "/icons/vscode.svg" },
            { label: "Figma", icon: "/icons/figma.svg" },
        ],
    },
];

export default function TechStack() {
    const [titleRef, visible] = useReveal();

    return (
        <section
            id="stack"
            className="
            max-w-7xl
            py-28 mx-auto px-10
            relative
            md:px-6
          "
        >
            <h2
                ref={titleRef}
                className={`
                mb-8
                text-4xl font-sora font-bold text-center
                category-title
                lg:mb-16
                ${visible ? "show-underline" : ""}
              `}
            >
                Tech Stack
            </h2>

            <div
                className="
                grid grid-cols-2
                gap-4
                sm:grid-cols-2
                lg:grid-cols-4 lg:gap-16
              "
            >
                {techCategories.map((cat, idx) => (
                    <div
                        key={idx}
                        className="
                        space-y-4
                        text-center
                      "
                    >
                        <h3
                            className="
                            pt-4
                            font-sora text-md font-semibold
                            lg:text-xl
                          "
                        >
                            {cat.title}
                        </h3>
                        <div
                            className="
                            grid
                            gap-5
                          "
                        >
                            {cat.items.map((item, i) => (
                                <TechCard
                                    key={i}
                                    index={i}
                                    icon={item.icon}
                                    label={item.label}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className=" flex justify-center">
                <div
                    className="
                inline-flex mx-auto flex-col
                mt-20 px-12 py-4
                text-center
                rounded-lg border border-primary/50
                items-center gap-4
                animate-subtle-bounce
              "
                >
                    {/* Direction hint */}
                    <div
                        className="
                    flex
                    text-md text-gray-500 font-manrope
                    items-center gap-2
                  "
                    >
                        <span
                            className="
                        tracking-wide 
                      "
                        >
                            Continue exploring!
                        </span>
                    </div>

                    {/* Actions */}
                    <div
                        className="
                    flex flex-col
                    items-center gap-3
                    md:flex-row
                  "
                    >
                        <a
                            href="https://drive.google.com/file/d/165OFcfLT8uxr5dYmxJiuIdwIfocElSrv/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                        inline-flex
                        px-2 py-1
                        font-manrope font-semibold text-primary
                        rounded-md
                        transition-all
                        group items-center gap-2 duration-300 hover:bg-primary/5
                      "
                        >
                            
                            <span
                                className="
                            underline-offset-4 group-hover:underline
                          "
                            >
                                Download CV
                            </span>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="
                            w-4 h-4
                            opacity-70 transition-transform
                            duration-300 group-hover:translate-x-0.5
                          "
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>

                        <span
                            className="
                        hidden
                        text-gray-300
                        md:block
                      "
                        >
                            •
                        </span>

                        <a
                            href="https://drive.google.com/file/d/1ttoPPeyjou0Y00wPiFwoaAq3qdP9w-P2/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                        inline-flex
                        px-2 py-1
                        font-manrope font-semibold text-primary
                        rounded-md
                        transition-all
                        group items-center gap-2 duration-300 hover:bg-primary/5
                      "
                        >
                            <span
                                className="
                            underline-offset-4 group-hover:underline
                          "
                            >
                                Creative Portfolio
                            </span>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="
                            w-4 h-4
                            opacity-70 transition-transform
                            duration-300 group-hover:translate-x-0.5
                          "
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
