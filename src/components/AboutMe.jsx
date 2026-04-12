import { useEffect, useRef, useState } from "react";

const PAGES = [
  { key: "details", label: "Details" },
  { key: "experience", label: "Experience" },
  { key: "certificates", label: "Certificates" },
];

export default function AboutMe() {
  const [activePage, setActivePage] = useState("details");
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const titleVisible = useRef(false);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

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
      className="max-w-7xl py-28 mx-auto px-10 relative md:px-6"
    >
      <div
        id="about"
        className="scroll-mt-0 rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="font-manrope text-white/70">Get to know</p>
            <h2
              ref={titleRef}
              className="category-title mt-2 font-sora text-4xl font-bold text-white"
            >
              About Me
            </h2>
          </div>

          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center justify-center rounded-xl border border-primary/40 px-4 py-2 font-manrope font-semibold text-primary hover:border-primary hover:bg-primary/5 transition"
          >
            Download CV
          </a>
        </div>

        {/* Ribbon / Tabs */}
        <div className="px-3 md:px-6">
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
        <div
          ref={contentRef}
          className="mt-4 border-t border-white/10 max-h-[calc(100vh-320px)] overflow-y-auto p-6 md:p-8"
        >
          {activePage === "details" && (
            <div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-sora text-2xl font-bold text-white">
                  Rahmad Dwi Ferdyan
                </h3>
                <p className="mt-3 font-manrope text-white/80 leading-relaxed">
                  (Dummy) I’m a Website & Mobile App Developer focused on building clean,
                  reliable products with great UI/UX.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 font-manrope text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-white/60">Location</p>
                    <p className="text-white mt-1">(Dummy) Indonesia</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-white/60">Focus</p>
                    <p className="text-white mt-1">(Dummy) React, React Native</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-white/60">Email</p>
                    <p className="text-white mt-1">(Dummy) rahmad@example.com</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-white/60">Availability</p>
                    <p className="text-white mt-1">(Dummy) Open to work</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "experience" && (
            <div>
              <h3 className="font-sora text-3xl font-bold text-white mb-6">Experience</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-sora font-semibold text-white">(Dummy) Role A</p>
                  <p className="mt-2 font-manrope text-sm text-white/70">
                    (Dummy) Summary of responsibilities and outcomes.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-sora font-semibold text-white">(Dummy) Role B</p>
                  <p className="mt-2 font-manrope text-sm text-white/70">
                    (Dummy) Summary of responsibilities and outcomes.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-sora font-semibold text-white">(Dummy) Role C</p>
                  <p className="mt-2 font-manrope text-sm text-white/70">
                    (Dummy) Summary of responsibilities and outcomes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activePage === "certificates" && (
            <div>
              <h3 className="font-sora text-3xl font-bold text-white mb-6">Certificates</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-sora font-semibold text-white">(Dummy) Certificate 1</p>
                  <p className="mt-2 font-manrope text-sm text-white/70">
                    (Dummy) Issuer • Year
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-sora font-semibold text-white">(Dummy) Certificate 2</p>
                  <p className="mt-2 font-manrope text-sm text-white/70">
                    (Dummy) Issuer • Year
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-sora font-semibold text-white">(Dummy) Certificate 3</p>
                  <p className="mt-2 font-manrope text-sm text-white/70">
                    (Dummy) Issuer • Year
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
