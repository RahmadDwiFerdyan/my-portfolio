import useReveal from "../hooks/useReveal";

export default function Footer() {
  const [sectionRef, sectionVisible] = useReveal();

  const contactLinks = [
    {
      label: "WhatsApp",
      value: "+62 881 9881 596",
      href: "https://wa.me/628819881596?text=Hi%20Ferdy%2C%20I%20saw%20your%20portfolio.",
      accent: "hover:border-emerald-400/70 hover:shadow-[0_0_28px_rgba(16,185,129,0.35)]",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87c0 2.09.55 4.13 1.58 5.92L0 24l6.38-1.67a11.86 11.86 0 0 0 5.67 1.45h.01c6.55 0 11.87-5.32 11.87-11.87a11.8 11.8 0 0 0-3.41-8.43Zm-8.46 18.3h-.01a9.9 9.9 0 0 1-5.04-1.37l-.36-.21-3.79.99 1.01-3.7-.23-.38a9.86 9.86 0 0 1-1.52-5.24C2.12 6.42 6.6 1.94 12.05 1.94a9.86 9.86 0 0 1 9.86 9.86c0 5.45-4.49 9.98-9.85 9.98Zm5.42-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.47-1.74-1.64-2.04-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.48-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.08-.8.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.86 1.21 3.06c.15.2 2.08 3.18 5.05 4.46.71.3 1.26.48 1.69.62.71.23 1.36.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/rahmadferdyan",
      href: "https://www.linkedin.com/in/rahmadferdyan",
      accent: "hover:border-sky-400/70 hover:shadow-[0_0_28px_rgba(56,189,248,0.3)]",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.33 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.55V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .78 0 1.74v20.52C0 23.22.79 24 1.77 24h20.46c.98 0 1.77-.78 1.77-1.74V1.74C24 .78 23.21 0 22.23 0Z" />
        </svg>
      ),
    },
    {
      label: "Email",
      value: "rahmadferdyan440@gmail.com",
      href: "mailto:rahmadferdyan440@gmail.com?subject=Portfolio%20Inquiry",
      accent: "hover:border-amber-300/70 hover:shadow-[0_0_28px_rgba(251,191,36,0.35)]",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
          <path d="m22 8-10 6L2 8" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className={`relative py-14 md:py-20 text-white font-manrope project-reveal ${sectionVisible ? "show" : ""}`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <h3 className="font-sora text-3xl md:text-4xl font-bold text-white text-center">Let's Connect</h3>
        <p className="mt-2 text-center text-white/65 text-base md:text-lg">
          Reach out through your preferred channel.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {contactLinks.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className={`group animate-fadeUp rounded-2xl border border-white/10 bg-white/5 px-5 py-5 transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 ${item.accent}`}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="flex items-center gap-3 text-primary">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#13283d] transition group-hover:scale-110 group-hover:border-primary/60">
                  {item.icon}
                </span>
                <p className="font-sora text-lg font-semibold text-white">{item.label}</p>
              </div>

              <p className="mt-3 text-sm md:text-base text-white/75 wrap-break-word group-hover:text-white/90 transition">
                {item.value}
              </p>
            </a>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/55">© 2025 Ferdy. All rights reserved.</p>
      </div>
    </footer>
  );
}
