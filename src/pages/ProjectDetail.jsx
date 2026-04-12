import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MARKDOWN_BY_PATH = import.meta.glob("../content/projects/*.md", {
    eager: true,
    as: "raw",
});

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.id == id);

    const markdownPath = project?.slug
        ? `../content/projects/${project.slug}.md`
        : null;
    const markdown = (markdownPath && MARKDOWN_BY_PATH[markdownPath]) || "";

    const { sections, headingIds } = useMemo(() => {
        const ids = [];
        const parsed = [];
        const seen = new Map();

        const lines = markdown.split(/\r?\n/);
        for (const line of lines) {
            const match = /^##\s+(.*)\s*$/.exec(line);
            if (!match) continue;
            const label = match[1].trim();
            const base = label
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .trim()
                .replace(/\s+/g, "-");
            const count = (seen.get(base) ?? 0) + 1;
            seen.set(base, count);
            const id = count === 1 ? base : `${base}-${count}`;
            ids.push(id);
            parsed.push({ id, label });
        }

        // Fallback if markdown is missing headings.
        if (!parsed.length) {
            return {
                sections: [
                    { id: "project-overview", label: "Project Overview" },
                    { id: "detail-product-requirement", label: "Detail Product & Requirement" },
                    { id: "research-planning", label: "Research & Planning" },
                    { id: "ui-design-prototype", label: "UI Design & Prototype" },
                    { id: "usability-test", label: "Usability Test" },
                ],
                headingIds: [],
            };
        }

        return { sections: parsed, headingIds: ids };
    }, [markdown]);

    const [activeSection, setActiveSection] = useState(sections[0]?.id);
    const sectionRefs = useRef({});
    const headingIndexRef = useRef(0);

    useEffect(() => {
        // Always start from the top when opening a project detail.
        setActiveSection(sections[0]?.id);
        headingIndexRef.current = 0;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        const SECTION_OFFSET = 140;
        let rafId = 0;

        const computeActive = () => {
            const ordered = sections.map((s) => sectionRefs.current[s.id]).filter(Boolean);
            if (!ordered.length) return;

            let current = sections[0]?.id;
            for (const s of sections) {
                const el = sectionRefs.current[s.id];
                if (!el) continue;
                const top = el.getBoundingClientRect().top;
                if (top - SECTION_OFFSET <= 0) current = s.id;
            }

            setActiveSection(current);
        };

        const onScroll = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = 0;
                computeActive();
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        onScroll();

        return () => {
            if (rafId) window.cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [id]);

    const scrollToSection = (sectionId) => {
        const el = document.getElementById(sectionId);
        if (!el) return;
        setActiveSection(sectionId);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleBackToHome = () => {
        const last = sessionStorage.getItem("lastHomeSection") || "#projects";
        const lastScrollY = sessionStorage.getItem("lastHomeScrollY");
        if (lastScrollY != null) sessionStorage.setItem("pendingHomeScrollY", lastScrollY);
        sessionStorage.setItem("pendingHomeHash", last);
        navigate({ pathname: "/", hash: last });
    };

    if (!project) {
        return (
            <section className="pt-16 pb-20 max-w-7xl mx-auto px-14 lg:px-6 font-manrope text-white">
                <Link to="/" className="inline-flex items-center gap-2 font-medium text-lg mb-6 hover:underline">
                    ← Back to Home
                </Link>
                <p className="text-white/80">Project not found.</p>
            </section>
        );
    }

    return (
        <section className="pt-16 pb-20 max-w-7xl mx-auto px-10 md:px-6 font-manrope text-white text-left">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                {/* LEFT STICKY MENU */}
                <aside className="md:col-span-4 lg:col-span-3 md:sticky md:top-28 self-start">
                    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                        <div className="p-4">
                            <button
                                type="button"
                                onClick={handleBackToHome}
                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-manrope font-semibold text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-primary transition"
                            >
                                <span aria-hidden="true">←</span>
                                Back
                            </button>
                        </div>

                        <div className="border-t border-white/10" />

                        <div className="p-4">
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-manrope text-white/70">
                                UX Case Study
                            </span>
                            <h1 className="mt-3 font-sora text-2xl font-bold text-white leading-tight">
                                {project.title}
                            </h1>
                        </div>

                        <div className="border-t border-white/10 p-4">
                            <p className="font-manrope text-white/70">Jump to</p>

                            <nav className="mt-4 flex flex-col gap-2 font-sora">
                                {sections.map((s) => {
                                    const isActive = s.id === activeSection;
                                    return (
                                        <button
                                            key={s.id}
                                            type="button"
                                            onClick={() => scrollToSection(s.id)}
                                            className={
                                                isActive
                                                    ? "flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-3 py-2 text-left text-primary font-semibold"
                                                    : "flex items-center gap-3 rounded-xl border border-white/10 bg-white/0 px-3 py-2 text-left text-white/90 font-semibold hover:border-white/20 hover:bg-white/5 hover:text-primary transition"
                                            }
                                            aria-current={isActive ? "true" : undefined}
                                        >
                                            <span
                                                className={
                                                    isActive
                                                        ? "h-2 w-2 rounded-full bg-primary"
                                                        : "h-2 w-2 rounded-full bg-white/25"
                                                }
                                                aria-hidden="true"
                                            />
                                            <span className="leading-snug">{s.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </aside>

                {/* RIGHT CONTENT */}
                <div className="md:col-span-8 lg:col-span-9">
                    {/* SECTIONS */}
                    <div className="mt-10 space-y-16">
                        {markdown ? (
                            (() => {
                                headingIndexRef.current = 0;

                                return (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h2: ({ children, ...props }) => {
                                                const idx = headingIndexRef.current;
                                                const id = headingIds[idx] || undefined;
                                                headingIndexRef.current += 1;

                                                const wrapperClass =
                                                    idx === 0
                                                        ? "scroll-mt-28"
                                                        : "scroll-mt-28 mt-12 pt-12 border-t border-white/10";

                                                return (
                                                    <div
                                                        id={id}
                                                        ref={(el) => {
                                                            if (id && el) sectionRefs.current[id] = el;
                                                        }}
                                                        className={wrapperClass}
                                                    >
                                                        <h2
                                                            {...props}
                                                            className="text-3xl md:text-4xl font-sora font-bold text-primary"
                                                        >
                                                            {children}
                                                        </h2>
                                                    </div>
                                                );
                                            },
                                            h3: ({ children, ...props }) => (
                                                <h3 {...props} className="mt-8 text-xl font-sora font-bold text-white">
                                                    {children}
                                                </h3>
                                            ),
                                            p: ({ children, ...props }) => (
                                                <p {...props} className="mt-4 text-white/80 text-lg leading-relaxed">
                                                    {children}
                                                </p>
                                            ),
                                            ul: ({ children, ...props }) => (
                                                <ul
                                                    {...props}
                                                    className="mt-4 space-y-2 text-white/80 text-lg list-disc pl-6"
                                                >
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children, ...props }) => (
                                                <ol
                                                    {...props}
                                                    className="mt-4 space-y-2 text-white/80 text-lg list-decimal pl-6"
                                                >
                                                    {children}
                                                </ol>
                                            ),
                                            li: ({ children, ...props }) => (
                                                <li {...props} className="leading-relaxed">
                                                    {children}
                                                </li>
                                            ),
                                            a: ({ children, ...props }) => (
                                                <a
                                                    {...props}
                                                    className="text-primary hover:underline"
                                                    target={props.href?.startsWith("/") ? undefined : "_blank"}
                                                    rel={props.href?.startsWith("/") ? undefined : "noopener noreferrer"}
                                                >
                                                    {children}
                                                </a>
                                            ),
                                            img: ({ ...props }) => (
                                                <img
                                                    {...props}
                                                    loading="lazy"
                                                    className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5"
                                                    alt={props.alt || ""}
                                                />
                                            ),
                                            table: ({ children, ...props }) => (
                                                <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
                                                    <table {...props} className="min-w-full text-left">
                                                        {children}
                                                    </table>
                                                </div>
                                            ),
                                            thead: ({ children, ...props }) => (
                                                <thead {...props} className="border-b border-white/10">
                                                    {children}
                                                </thead>
                                            ),
                                            th: ({ children, ...props }) => (
                                                <th {...props} className="px-4 py-3 font-sora font-semibold text-white">
                                                    {children}
                                                </th>
                                            ),
                                            td: ({ children, ...props }) => (
                                                <td {...props} className="px-4 py-3 text-white/80">
                                                    {children}
                                                </td>
                                            ),
                                        }}
                                    >
                                        {markdown}
                                    </ReactMarkdown>
                                );
                            })()
                        ) : (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <p className="text-white/80">
                                    No case study content found for this project. Add a Markdown file under
                                    <span className="font-semibold"> src/content/projects/</span>.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* LINKS */}
                    {project.links?.length ? (
                        <div className="mt-16 flex flex-wrap gap-4 text-lg justify-start">
                            {project.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        group
                                        flex items-center gap-3 
                                        px-5 py-2.5 rounded-full
                                        border border-primary/40 
                                        text-primary font-base font-manrope text-md

                                        bg-white/40 backdrop-blur-sm

                                        transition-all duration-300

                                        hover:border-primary hover:bg-primary/5
                                        hover:-translate-y-1 active:scale-[0.98]
                                    "
                                >
                                    {link.icon && (
                                        <img
                                            src={link.icon}
                                            className="w-5 h-5 object-contain transition-transform duration-300"
                                            alt=""
                                        />
                                    )}
                                    <span className="transition-colors duration-300 group-hover:text-primary">
                                        {link.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
