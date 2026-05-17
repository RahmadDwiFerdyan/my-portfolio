import { useEffect, useState } from "react";

const HERO_NAME_VARIANTS = [
  ["Rahmad Dwi", "Ferdyan"],
  ["... well just call me,", "Ferdy!"],
];

const HIGHLIGHT_BADGES = [
  "Full-Stack Web Development",
  "System Analysis",
  "Database Design",
  "UI/UX Design",
  "System Design",
];

const HERO_STARS = [
  { top: "12%", left: "8%", size: 10, delay: "0s", duration: "7.5s", dx: "14px", dy: "-10px" },
  { top: "18%", left: "78%", size: 10, delay: "1.2s", duration: "9s", dx: "-10px", dy: "10px" },
  { top: "26%", left: "18%", size: 6, delay: "0.6s", duration: "8.4s", dx: "10px", dy: "8px" },
  { top: "30%", left: "64%", size: 7, delay: "2s", duration: "10s", dx: "-8px", dy: "-12px" },
  { top: "42%", left: "12%", size: 5, delay: "1.8s", duration: "7.8s", dx: "8px", dy: "-6px" },
  { top: "46%", left: "86%", size: 9, delay: "0.9s", duration: "8.8s", dx: "-14px", dy: "10px" },
  { top: "58%", left: "24%", size: 7, delay: "1.4s", duration: "9.4s", dx: "12px", dy: "-8px" },
  { top: "63%", left: "72%", size: 5, delay: "2.4s", duration: "8.2s", dx: "-6px", dy: "10px" },
  { top: "73%", left: "16%", size: 8, delay: "0.4s", duration: "10.2s", dx: "10px", dy: "-10px" },
  { top: "78%", left: "84%", size: 6, delay: "1.7s", duration: "9.8s", dx: "-12px", dy: "-6px" },
  { top: "84%", left: "48%", size: 10, delay: "0.2s", duration: "11s", dx: "8px", dy: "-10px" },
  { top: "88%", left: "34%", size: 5, delay: "2.7s", duration: "7.2s", dx: "-8px", dy: "8px" },
];

export default function Hero() {
  const [nameIndex, setNameIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNameIndex((currentIndex) => (currentIndex + 1) % HERO_NAME_VARIANTS.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeName = HERO_NAME_VARIANTS[nameIndex];

  return (
    <section
      id="hero"
      className="relative isolate w-full min-h-[82vh] flex items-center justify-center overflow-hidden pt-32 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 hero-stage" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="hero-halo" />
        {HERO_STARS.map((star, index) => (
          <span
            key={`${star.left}-${star.top}-${index}`}
            className="hero-star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
              ["--hero-star-dx"]: star.dx,
              ["--hero-star-dy"]: star.dy,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-10 text-center animate-fadeUp md:pb-16">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-3 sm:gap-3 sm:flex-nowrap">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-sm font-semibold text-primary/90 shadow-[0_0_40px_rgba(58,255,158,0.08)] backdrop-blur-md sm:px-4 sm:py-2 sm:text-md">
            Web Developer
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-sm font-semibold text-primary/90 shadow-[0_0_40px_rgba(58,255,158,0.08)] backdrop-blur-md sm:px-4 sm:py-2 sm:text-md">
            System Designer
          </div>
        </div>

        <h1 className="text-3xl md:text-7xl text-white font-sora font-bold leading-tight">
          <span className="block">Hello there, I&apos;m</span>
          <span className="mt-3 inline-flex flex-col items-center gap-1 sm:inline-flex sm:flex-row sm:flex-nowrap sm:items-baseline sm:gap-4">
            {activeName.map((part, index) => (
              <span
                key={`${nameIndex}-${part}`}
                className={`block text-3xl md:text-7xl text-balance bg-linear-to-r text-transparent bg-clip-text animate-fadeUp ${nameIndex === 0
                    ? "from-primary to-secondary"
                    : "from-yellow-400 to-orange-300"
                  } ${index === 0 ? "sm:whitespace-nowrap" : "sm:whitespace-nowrap"}`}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {part}
              </span>
            ))}
          </span>
        </h1>

        <p className="mx-auto px-4 mt-6 max-w-2xl text-md md:text-lg leading-relaxed text-white/80 font-manrope">
          Building digital systems that balance functionality, structure, and usability.
          Interested in workflow design, product design, system analysis, and web application development.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-[#072012] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(58,255,158,0.35)]"
          >
            Explore Projects
          </a>
          <a
            href="/CV_Rahmad Dwi Ferdyan_New.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white/90 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10"
          >
            View Resume (CV)
          </a>
        </div>

        {/* <div className="mt-8 flex justify-center gap-5">
          <a
            href="https://www.linkedin.com/in/rahmadferdyan"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 transition hover:opacity-100"
          >
            <img src="/icons/linkedin.png" className="w-7" alt="LinkedIn" />
          </a>
        </div> */}

        <div className="mt-12 md:mt-16">
          <div className="hero-transition-wrap relative left-1/2 w-screen -translate-x-1/2 px-0 sm:px-2 md:px-0">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#0b1c2d] via-[#0b1c2d]/95 to-transparent md:w-36" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-[#0b1c2d] via-[#0b1c2d]/95 to-transparent md:w-36" aria-hidden="true" />

            <div className="relative overflow-hidden py-3 sm:py-4">
              <div className="hero-marquee hero-marquee--primary hero-marquee--wide">
                {[...HIGHLIGHT_BADGES, ...HIGHLIGHT_BADGES, ...HIGHLIGHT_BADGES, ...HIGHLIGHT_BADGES].map((badge, index) => (
                  <span key={`${badge}-${index}`} className="hero-marquee-pill">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
