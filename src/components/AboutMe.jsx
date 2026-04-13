import { useEffect, useRef, useState } from "react";
import useReveal from "../hooks/useReveal";

const PAGES = [
  { key: "details", label: "Detail" },
  { key: "highlights", label: "Highlights" },
];

const EXPERIENCE_ITEMS = [
  {
    title: "UI/UX Designer - EduKids",
    meta: "Project Case Study",
    summary:
      "Led user research, defined product goals, and crafted end-to-end learning flows for children and parents.",
    href: "https://drive.google.com/",
  }
];

const CERTIFICATE_ITEMS = [
  {
    title: "Google UX Design Professional Certificate",
    meta: "Google | 2026",
    href: "https://drive.google.com/file/d/1tiy0Q6qX2XJJqqJK58k8soJTgpataMgR/view?usp=drive_link",
  },
  {
    title: "UI/UX and Product Management Bootcamp",
    meta: "Harisenin.com | 2025-2026",
    href: "https://drive.google.com/file/d/1BtDovGAx-WwtPjZ91bke1vsTmEfWf3Ba/view?usp=drive_link",
  },
  {
    title: "UX Researcher Project-Based Internship",
    meta: "Telkom Digital Amoeba | 2026",
    href: "https://drive.google.com/file/d/1_uZBRbfaJ9fLnkS6B8-3H6V650vodhLM/view?usp=drive_link",
  },
];

const TECH_STACK_ITEMS = [
  "Figma",
  "FigJam",
  "Framer",
  "Notion",
  "Miro",
  "Laravel",
  "JavaScript",
  "React.js",
];

export default function AboutMe() {
  const [activePage, setActivePage] = useState("details");
  const [sectionRef, sectionVisible] = useReveal();
  const titleRef = useRef(null);
  const titleVisible = useRef(false);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !titleVisible.current) {
            titleVisible.current = true;
            entry.target.classList.add("show-underline");
          }
        });
      },
      { threshold: 0.8 }
    );

    if (titleRef.current) titleObserver.observe(titleRef.current);
    return () => titleObserver.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative py-14 md:py-20 project-reveal ${sectionVisible ? "show" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-6">
      <div className="mb-6 md:mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2
          ref={titleRef}
          className="category-title mt-2 inline-block w-fit font-sora text-3xl md:text-4xl font-bold text-white"
        >
          About Me
        </h2>
        <a
          href="/CV_Rahmad Dwi Ferdyan.pdf"
          download
          className="inline-flex items-center justify-center self-start rounded-xl border border-primary/40 px-4 py-2 font-manrope font-semibold text-primary hover:border-primary hover:bg-primary/5 transition"
        >
          Download CV
        </a>
      </div>


      <div
        className="scroll-mt-0 rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
      >
        {/* Ribbon / Tabs */}
        <div className="px-3 pt-6 md:px-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 overflow-x-auto">
            <div className="inline-flex gap-2 font-sora whitespace-nowrap">
              {PAGES.map((p) => {
                const isActive = p.key === activePage;

                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setActivePage(p.key)}
                    className={
                      isActive
                        ? "px-4 py-2 font-semibold text-primary border-b-2 border-primary"
                        : "px-4 py-2 font-semibold text-white/80 hover:text-primary transition border-b-2 border-transparent"
                    }
                    aria-current={isActive ? "page" : undefined}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-3 py-6 md:px-6 md:pb-8">
          {activePage === "details" && (
            <div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-sora text-2xl font-bold text-white">
                  Rahmad Dwi Ferdyan
                </h3>
                <p className="mt-3 font-manrope text-white/80 leading-relaxed">
                  I am a UI/UX Designer with a strong focus on creating meaningful and user-centered digital experiences.
                  Turning complex problems into simple and <span className="font-semibold text-primary">intuitive solutions</span> is something I really enjoy.
                  For me, design is not just about how things look, but how they work and how they feel for the user.
                </p>
                <p className="mt-3 font-manrope text-white/80 leading-relaxed">
                  Good design should be <span className="font-semibold text-primary">accessible and inclusive</span>.
                  It should work for a wide range of people, including those with different abilities and needs.
                  Through my work, I focus on understanding real user needs, structuring information clearly, and creating
                  experiences that are easy to use, practical, and impactful.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 font-manrope text-md">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-white/60">Location</p>
                    <p className="text-white mt-1">Malang, East Java, Indonesia</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-white/60">Focus</p>
                    <p className="text-white mt-1">UI Design, UX Research</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-white/60">Email</p>
                    <p className="text-white mt-1">rahmadferdyan440@gmail.com</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-white/60">Availability</p>
                    <p className="text-white mt-1">Open to work</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "highlights" && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* EXPERIENCE */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h4 className="font-sora text-2xl font-semibold text-white">Experience</h4>
                  <p className="mt-2 font-manrope text-base text-white/65">Selected projects and hands-on roles.</p>
                  <ul className="mt-5 space-y-3">
                    {EXPERIENCE_ITEMS.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-xl border border-white/10 bg-[#13283d] px-4 py-4 transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-[#18344d]"
                        >
                          <p className="font-sora text-base font-semibold text-white leading-snug">{item.title}</p>
                          <p className="mt-1 font-manrope text-sm text-primary">{item.meta}</p>
                          <p className="mt-2 font-manrope text-sm leading-relaxed text-white/75">{item.summary}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CERTIFICATES */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h4 className="font-sora text-2xl font-semibold text-white">Certificates</h4>
                  <p className="mt-2 font-manrope text-base text-white/65">Credential links and completion records.</p>
                  <ul className="mt-5 space-y-3">
                    {CERTIFICATE_ITEMS.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-xl border border-white/10 bg-[#13283d] px-4 py-4 transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-[#18344d]"
                        >
                          <p className="font-sora text-base font-semibold text-white leading-snug">{item.title}</p>
                          <p className="mt-2 font-manrope text-sm text-primary">{item.meta}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* TECH STACK */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h4 className="font-sora text-2xl font-semibold text-white">Tech Stack</h4>
                  <p className="mt-2 font-manrope text-base text-white/65">Tools and technologies I use actively.</p>
                  <ul className="mt-5 flex flex-wrap items-start gap-3">
                    {TECH_STACK_ITEMS.map((tech, index) => (
                      <li
                        key={tech}
                        className={`inline-flex w-fit whitespace-nowrap rounded-xl border border-white/10 bg-[#13283d] font-manrope text-base font-medium text-white/90 transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-[#18344d] ${
                          index % 3 === 0 ? "px-5 py-3" : "px-4 py-2.5"
                        }`}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
