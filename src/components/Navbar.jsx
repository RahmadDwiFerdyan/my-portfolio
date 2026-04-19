import { useEffect, useState } from "react";

const NAV_LINKS = [
  { id: "home", label: "Homepage", targetId: "home" },
  { id: "about", label: "About Me", targetId: "about" },
  { id: "projects", label: "Projects", targetId: "projects" },
  { id: "highlights", label: "Highlights", targetId: "highlights" },
  { id: "contact", label: "Contact", targetId: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isDetached, setIsDetached] = useState(false);

  useEffect(() => {
    const updateNavbarMode = () => {
      if (window.innerWidth < 768) {
        setIsDetached(false);
        return;
      }

      const hero = document.getElementById("hero");
      if (!hero) {
        setIsDetached(window.scrollY > 180);
        return;
      }

      const heroBottom = hero.getBoundingClientRect().bottom;
      setIsDetached(heroBottom <= 96);
    };

    updateNavbarMode();
    window.addEventListener("scroll", updateNavbarMode, { passive: true });
    window.addEventListener("resize", updateNavbarMode);

    return () => {
      window.removeEventListener("scroll", updateNavbarMode);
      window.removeEventListener("resize", updateNavbarMode);
    };
  }, []);

  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) {
      setOpen(false);
      return;
    }

    const nav = document.querySelector("nav");
    const navHeight = nav?.offsetHeight ?? 0;
    const extraOffset = 4;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - extraOffset;

    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
    setOpen(false);
  };

  return (
    <>
      

      {/* NAVBAR */}
      <nav
        className={`fixed left-1/2 z-50 w-[calc(100%)] max-w-4xl -translate-x-1/2 bg-[#0B1C2D]/90 backdrop-blur-sm transition-[top,border-radius,padding,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[calc(100%-1.5rem)] ${
          isDetached
            ? "top-4 rounded-4xl border border-white/14 max-w-2xl px-18 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.28)]"
            : "top-0 rounded-b-4xl md:bg-white/2 bg-[#0B1C2D]/90 border-x border-b border-white/14 px-6 md:px-20 py-4 shadow-md"
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0.5 -z-10 bg-linear-to-r from-primary/10 via-white/8 to-secondary/10 blur-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isDetached ? "rounded-full opacity-40" : "rounded-b-[1.6rem] opacity-55"
          }`}
        />
        <div className="mx-auto flex items-center justify-between gap-4">
          <div className="pl-4 relative inline-flex items-center shrink-0">
            <img
              src="/images/portfolio.png"
              alt="Ferdy's Portfolio"
              className="h-4 w-auto md:h-5"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-0.5 font-manrope text-[16px] font-medium">
            {NAV_LINKS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.targetId}`}
                  className="inline-flex rounded-full px-4 py-2 text-white/85 transition hover:bg-white/8 hover:text-primary"
                  onClick={scrollToSection(item.targetId)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none md:hidden"
            aria-label="Open navigation menu"
          >
            <div className="flex flex-col gap-1">
              <div className="h-0.5 w-4 rounded-full bg-current"></div>
              <div className="h-0.5 w-4 rounded-full bg-current"></div>
              <div className="h-0.5 w-4 rounded-full bg-current"></div>
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* MOBILE MENU PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-[300px] 
          border-l border-white/10 bg-[#0B1C2D]/96 backdrop-blur-xl shadow-xl z-60
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col gap-8 p-6 text-lg font-manrope text-white">

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="self-end rounded-full px-3 py-1 text-2xl font-light text-white/60 transition hover:text-white"
          >
            &times;
          </button>

          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.targetId}`}
                className="rounded-xl bg-white/5 px-4 py-3 text-white/80 transition hover:bg-white/10 hover:text-white"
                onClick={scrollToSection(item.targetId)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
