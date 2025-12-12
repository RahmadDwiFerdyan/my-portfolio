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
            { label: "React / React Native", icon: "/icons/react.svg" },
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
        <section id="stack" className="relative py-28 max-w-7xl mx-auto px-6">

            <h2
                ref={titleRef}
                className={`
          text-4xl font-sora font-bold text-center mb-16 category-title 
          ${visible ? "show-underline" : ""}
        `}
            >
                Tech Stack
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
                {techCategories.map((cat, idx) => (
                    <div key={idx} className="text-center space-y-6">
                        <h3 className="font-sora text-xl font-semibold">{cat.title}</h3>

                        <div className="grid gap-5">
                            {cat.items.map((item, i) => (
                                <TechCard key={i} index={i} icon={item.icon} label={item.label} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <a
                    href="https://drive.google.com/file/d/1h4Oa4qbOpxd_f1aWSN96ZDawEuUh5yOR/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                inline-flex items-center gap-3
                px-6 py-3
                bg-white/60 backdrop-blur-sm
                border border-primary/40
                rounded-xl
                text-primary font-semibold font-manrope text-[16px]
                shadow-sm
                transition-all duration-300
                hover:border-primary hover:bg-primary/5 hover:-translate-y-1
                active:scale-[0.97]
                "
                >
                    <img
                        src="/icons/pdf.svg"
                        className="w-5 h-5 opacity-80 transition-transform duration-300 group-hover:-translate-y-0.5"
                    />

                    Download My CV
                </a>
            </div>

        </section>
    );
}
