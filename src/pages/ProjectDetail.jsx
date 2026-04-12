import { Children, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
    return <ProjectDetailInner key={id} id={id} navigate={navigate} />;
}

function ProjectDetailInner({ id, navigate }) {
    const SCROLL_OFFSET = 96;
    const [language, setLanguage] = useState(() => {
        try {   
            return window.localStorage.getItem("projectDetailLanguage") || "en";
        } catch {
            return "id";
        }
    });
    const project = projects.find((p) => p.id == id);

    const markdown = useMemo(() => {
        if (!project?.slug) return "";
        const slug = project.slug;

        const candidates =
            language === "en"
                ? [
                    `../content/projects/${slug}.en.md`,
                    `../content/projects/${slug}.en-US.md`,
                    `../content/projects/${slug}.id.md`,
                    `../content/projects/${slug}.md`,
                ]
                : [
                    `../content/projects/${slug}.id.md`,
                    `../content/projects/${slug}.md`,
                    `../content/projects/${slug}.en.md`,
                ];

        const key = candidates.find((p) => Boolean(MARKDOWN_BY_PATH[p]));
        return (key && MARKDOWN_BY_PATH[key]) || "";
    }, [project?.slug, language]);

    const renderPseudoBr = (nodeChildren) => {
        const brRe = /<br\s*\/?>/gi;
        const out = [];

        for (const child of Children.toArray(nodeChildren)) {
            if (typeof child !== "string") {
                out.push(child);
                continue;
            }

            const parts = child.split(brRe);
            for (let i = 0; i < parts.length; i += 1) {
                if (i > 0) out.push(<br key={`mdbr-${out.length}-${i}`} />);
                if (parts[i]) out.push(parts[i]);
            }
        }

        return out;
    };

    const hasVisibleContent = (nodeChildren) => {
        for (const child of Children.toArray(nodeChildren)) {
            if (typeof child === "string") {
                if (child.replace(/<br\s*\/?>/gi, "").trim()) return true;
                continue;
            }
            // Any React element (e.g. <img/>, <strong/>) counts as visible content.
            return true;
        }
        return false;
    };

    const CollapsibleTable = ({ children }) => {
        const COLLAPSED_MAX_HEIGHT = 160;
        const contentRef = useRef(null);
        const [expanded, setExpanded] = useState(false);
        const [canCollapse, setCanCollapse] = useState(false);

        useLayoutEffect(() => {
            const el = contentRef.current;
            if (!el) return;
            const nextCanCollapse = el.scrollHeight > COLLAPSED_MAX_HEIGHT + 24;
            setCanCollapse(nextCanCollapse);
            if (!nextCanCollapse) setExpanded(false);
        }, [children]);

        return (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5">
                <div
                    ref={contentRef}
                    className={expanded ? "overflow-x-auto" : "overflow-x-auto overflow-y-hidden"}
                    style={expanded ? undefined : { maxHeight: COLLAPSED_MAX_HEIGHT }}
                >
                    {children}
                </div>

                {canCollapse ? (
                    <div className="border-t border-white/10 px-4 py-2">
                        <button
                            type="button"
                            onClick={() => setExpanded((v) => !v)}
                            className="block mx-auto text-sm font-semibold text-primary hover:underline"
                        >
                            {expanded ? "See less ↑" : "See more ↓"}
                        </button>
                    </div>
                ) : null}
            </div>
        );
    };

    const setAndStoreLanguage = (nextLanguage) => {
        setLanguage(nextLanguage);
        try {
            window.localStorage.setItem("projectDetailLanguage", nextLanguage);
        } catch {
            // ignore
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

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
    const jumpMenuRef = useRef(null);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        // Always start from the top when opening a project detail.
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        let rafId = 0;

        const computeActive = () => {
            const ordered = sections.map((s) => sectionRefs.current[s.id]).filter(Boolean);
            if (!ordered.length) return;

            const scrollBottom = window.innerHeight + window.scrollY;
            const pageHeight = document.documentElement.scrollHeight;
            if (scrollBottom >= pageHeight - 8) {
                setActiveSection(sections[sections.length - 1]?.id);
                return;
            }

            let current = sections[0]?.id;
            for (const s of sections) {
                const el = sectionRefs.current[s.id];
                if (!el) continue;
                const top = el.getBoundingClientRect().top;
                if (top - SCROLL_OFFSET <= 16) current = s.id; //ini
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
    }, [sections]);

    useEffect(() => {
        let rafId = 0;

        const computeShow = () => {
            const el = jumpMenuRef.current;
            if (!el) {
                setShowScrollToTop(window.scrollY > 200);
                return;
            }

            const rect = el.getBoundingClientRect();
            setShowScrollToTop(rect.top < 0);
        };

        const onScroll = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = 0;
                computeShow();
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
    }, []);

    const scrollToSection = (sectionId) => {
        const el = document.getElementById(sectionId);
        if (!el) return;
        setActiveSection(sectionId);
        const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

                            <div
                                className="ml-3 inline-flex overflow-hidden rounded-lg border border-white/10 bg-white/5"
                                role="group"
                                aria-label="Content language"
                            >
                                <button
                                    type="button"
                                    onClick={() => setAndStoreLanguage("id")}
                                    aria-pressed={language === "id"}
                                    className={
                                        language === "id"
                                            ? "px-3 py-1 text-xs font-manrope font-semibold text-primary bg-primary/10"
                                            : "px-3 py-1 text-xs font-manrope font-semibold text-white/70 hover:text-primary hover:bg-white/5 transition"
                                    }
                                >
                                    ID 
                                </button>
                                <div className="w-px bg-white/10" aria-hidden="true" />
                                <button
                                    type="button"
                                    onClick={() => setAndStoreLanguage("en")}
                                    aria-pressed={language === "en"}
                                    className={
                                        language === "en"
                                            ? "px-3 py-1 text-xs font-manrope font-semibold text-primary bg-primary/10"
                                            : "px-3 py-1 text-xs font-manrope font-semibold text-white/70 hover:text-primary hover:bg-white/5 transition"
                                    }
                                >
                                    EN
                                </button>
                            </div>

                            <h1 className="mt-3 font-sora text-2xl font-bold text-white leading-tight">
                                {project.title}
                            </h1>
                        </div>

                        <div ref={jumpMenuRef} className="border-t border-white/10 p-4">
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
                    <div className="mt-8 space-y-12">
                        {markdown ? (
                            (() => {
                                let headingIndex = 0;

                                return (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h2: ({ children, ...props }) => {
                                                const idx = headingIndex;
                                                const id = headingIds[idx] || undefined;
                                                headingIndex += 1;

                                                const wrapperClass =
                                                    idx === 0
                                                        ? "scroll-mt-36"
                                                        : "scroll-mt-36 mt-10 pt-10 border-t border-white/10";

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
                                                            className="my-0 text-xl md:text-2xl font-sora font-bold text-primary"
                                                        >
                                                            {children}
                                                        </h2>
                                                    </div>
                                                );
                                            },
                                            h3: ({ children, ...props }) => (
                                                <h3 {...props} className="mt-12 mb-3 text-lg md:text-xl font-sora font-bold text-white leading-tight">
                                                    {children}
                                                </h3>
                                            ),
                                            h4: ({ children, ...props }) => (
                                                <h4 {...props} className="ml-6 mt-6 mb-3 font-bold text-md md:text-lg font-sora text-white leading-tight">
                                                    {children}
                                                </h4>
                                            ),
                                            p: ({ children, ...props }) => (
                                                <p {...props} className="mt-1 mb-3 text-white/90 text-sm font-medium md:text-base leading-6 md:leading-relaxed">
                                                    {children}
                                                </p>
                                            ),
                                            ul: ({ children, ...props }) => (
                                                <ul
                                                    {...props}
                                                    className="mt-1 mb-5 space-y-1 text-white/90 text-sm font-medium md:text-base list-disc pl-6"
                                                >
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children, ...props }) => (
                                                <ol
                                                    {...props}
                                                    className="mt-1 mb-5 space-y-1 text-white/90 text-sm font-medium md:text-base list-decimal pl-6"
                                                >
                                                    {children}
                                                </ol>
                                            ),
                                            code: ({ children, ...props }) => (
                                                <span
                                                    {...props}
                                                    className="font-bold bg-white/16 px-1 rounded"
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    {children}
                                                </span>
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
                                            img: ({ ...props }) => {
                                                const title = props.title || "";
                                                const match = /(\b(?:w|width|maxw|max-width)\s*=\s*)(\d+%|\d+px|\d+)(\b)/i.exec(title);
                                                const rawValue = match?.[2];
                                                const widthValue = rawValue
                                                    ? /^\d+$/.test(rawValue)
                                                        ? `${rawValue}px`
                                                        : rawValue
                                                    : null;

                                                const wrapperStyle = widthValue
                                                    ? widthValue.endsWith("%")
                                                        ? { width: widthValue }
                                                        : { maxWidth: widthValue, width: "100%" }
                                                    : undefined;

                                                const wrapperClass = widthValue
                                                    ? "mt-0 mx-auto block"
                                                    : "mt-0 block";

                                                const cleanTitle = match
                                                    ? title.replace(match[0], "").replace(/\s{2,}/g, " ").trim()
                                                    : title;

                                                return props.src ? (
                                                    <a
                                                        href={props.src}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={wrapperClass}
                                                        style={wrapperStyle}
                                                        title={cleanTitle || "Open image in new tab"}
                                                    >
                                                        <img
                                                            {...props}
                                                            title={cleanTitle || undefined}
                                                            loading="lazy"
                                                            className="w-full cursor-zoom-in rounded-2xl border border-white/10 bg-white/5"
                                                            alt={props.alt || ""}
                                                        />
                                                    </a>
                                                ) : (
                                                    <img
                                                        {...props}
                                                        title={cleanTitle || undefined}
                                                        loading="lazy"
                                                        className={widthValue ? "mt-0 mx-auto w-full rounded-2xl border border-white/10 bg-white/5" : "mt-6 w-full rounded-2xl border border-white/10 bg-white/5"}
                                                        style={wrapperStyle}
                                                        alt={props.alt || ""}
                                                    />
                                                );
                                            },
                                            table: ({ children, ...props }) => (
                                                <CollapsibleTable>
                                                    <table {...props} className="min-w-full text-left border-collapse">
                                                        {children}
                                                    </table>
                                                </CollapsibleTable>
                                            ),
                                            thead: ({ children, ...props }) => (
                                                <thead {...props}>
                                                    {children}
                                                </thead>
                                            ),
                                            th: ({ children, ...props }) => (
                                                <th
                                                    {...props}
                                                    className={
                                                        hasVisibleContent(children)
                                                            ? "border border-white/10 px-3 py-2 font-sora text-sm md:text-base font-semibold text-white"
                                                            : "border border-white/10 px-3 py-2 text-sm md:text-base text-white/80 font-normal align-top"
                                                    }
                                                >
                                                    {renderPseudoBr(children)}
                                                </th>
                                            ),
                                            td: ({ children, ...props }) => (
                                                <td {...props} className="border border-white/10 px-3 py-2 text-sm md:text-base text-white/80 align-top">
                                                    {renderPseudoBr(children)}
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

            {showScrollToTop ? (
                <button
                    type="button"
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-30 inline-flex items-center justify-center rounded-full border border-white/10 bg-[#0B1C2D]/75 px-4 py-3 font-sora text-sm font-semibold text-primary backdrop-blur-sm hover:bg-white/15 hover:border-white/20 transition"
                    aria-label="Scroll to top"
                >
                    ↑ Back to Top
                </button>
            ) : null}
        </section>
    );
}
