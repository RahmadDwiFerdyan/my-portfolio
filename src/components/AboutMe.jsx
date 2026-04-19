import { useEffect, useRef } from "react";
import useReveal from "../hooks/useReveal";

const FOCUS_ITEMS = [
  {
    title: "UI Design",
    description: "Crafting visual systems, clear hierarchy, and polished interfaces.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M7 8h10" />
        <path d="M7 12h6" />
      </svg>
    ),
  },
  {
    title: "UX Research",
    description: "Learning from users, testing assumptions, and shaping decisions with evidence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <path d="M10 10a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
        <path d="M2 20c1.5-4 5-6 8-6" />
        <path d="m17 17 5 5" />
      </svg>
    ),
  },
  {
    title: "Interaction Design",
    description: "Designing behavior, flow, and feedback that feel natural and responsive.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    ),
  },
];

export default function AboutMe() {
  const [sectionRef, sectionVisible] = useReveal();
  const titleRef = useRef(null);
  const titleVisible = useRef(false);
  const photoStageRef = useRef(null);
  const photoSceneRef = useRef(null);

  const setPhotoTilt = (clientX, clientY, currentTarget) => {
    const stage = photoStageRef.current;
    const scene = photoSceneRef.current;
    if (!stage || !scene || !currentTarget) return;

    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 16;

    stage.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(-2px)`;
    scene.style.transform = `translateZ(0)`;
  };

  const resetPhotoTilt = () => {
    const stage = photoStageRef.current;
    const scene = photoSceneRef.current;
    if (stage) stage.style.transform = "rotateY(0deg) rotateX(0deg) translateY(0)";
    if (scene) scene.style.transform = "translateZ(0)";
  };

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
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center self-start rounded-xl border border-primary/40 px-4 py-2 font-manrope font-semibold text-primary hover:border-primary hover:bg-primary/5 transition"
          >
            See my CV
          </a>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[380px_minmax(0,1fr)] items-start">
          <div>
            <div
              className="about-photo-shell mx-auto max-w-[380px] "
              onMouseMove={(event) => setPhotoTilt(event.clientX, event.clientY, event.currentTarget)}
              onMouseLeave={resetPhotoTilt}
            >
              <div ref={photoStageRef} className="about-photo-stage">
                <div ref={photoSceneRef} className="photo-wrapper mx-auto animate-fadeUp scale-100 sm:scale-100 hover:border-3 border-primary rounded-4xl overflow-hidden">
                  <div className="photo-scene">
                    <img src="images/foto.jpeg" className="photo-back" alt="Rahmad Dwi Ferdyan" />
                    <div className="photo-stars" aria-hidden="true">
                      <img src="images/star.png" className="photo-star star-1" alt="" />
                      <img src="images/star.png" className="photo-star star-2" alt="" />
                      <img src="images/star.png" className="photo-star star-3" alt="" />
                      <img src="images/star.png" className="photo-star star-4" alt="" />
                      <img src="images/star.png" className="photo-star star-5" alt="" />
                      <img src="images/star.png" className="photo-star star-6" alt="" />
                    </div>
                    <img
                      src="images/foto-removebg.png"
                      className="photo-front"
                      alt="Rahmad Dwi Ferdyan"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Who am I</p>
            <h3 className="mt-3 font-sora text-2xl md:text-3xl font-bold text-white">
              Rahmad Dwi Ferdyan
            </h3>
            <p className="mt-4 font-manrope leading-relaxed text-white/80">
              I’m a UI/UX Designer focused on creating meaningful, user-centered experiences. 
              I enjoy turning complex problems into simple, <span className="font-bold text-primary">intuitive solutions</span>. 
              For me, design is not just about how it looks, but how it works and feels for the user.

            </p>
            <p className="mt-3 font-manrope leading-relaxed text-white/80">
             I believe good design should be <span className="font-bold text-primary">inclusive and accessible</span>, working for people with diverse abilities and needs. 
             I focus on understanding real users, structuring information clearly, and creating experiences that are practical, 
             easy to use, and impactful.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {FOCUS_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/10 bg-[#13283d] p-4 font-manrope transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-[#17324b]"
                >
                  <div className="flex items-center gap-3 text-primary">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      {item.icon}
                    </span>
                    <p className="font-sora text-sm font-semibold text-white">{item.title}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
