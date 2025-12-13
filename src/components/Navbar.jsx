import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="font-sora text-lg font-semibold">
            Ferdy's Portfolio
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 font-manrope">
            <a href="#profile" className="hover:text-primary transition">Profile</a>
            <a href="#projects" className="hover:text-primary transition">Projects</a>
            <a href="#stack" className="hover:text-primary transition">Tech Stack</a>
            <a href="#contact" className="hover:text-primary transition">Contact</a>
          </ul>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 focus:outline-none"
          >
            <div className="w-6 h-0.5 bg-black mb-[5px] rounded"></div>
            <div className="w-6 h-0.5 bg-black mb-[5px] rounded"></div>
            <div className="w-6 h-0.5 bg-black rounded"></div>
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
          bg-white backdrop-blur-xl shadow-xl z-60
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 flex flex-col gap-8 text-lg font-manrope">

          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="self-end text-3xl font-light hover:text-primary transition"
          >
            &times;
          </button>

          <a
            href="#profile"
            className="hover:text-primary transition"
            onClick={() => setOpen(false)}
          >
            Profile
          </a>

          <a
            href="#projects"
            className="hover:text-primary transition"
            onClick={() => setOpen(false)}
          >
            Projects
          </a>

          <a
            href="#stack"
            className="hover:text-primary transition"
            onClick={() => setOpen(false)}
          >
            Tech Stack
          </a>

          <a
            href="#contact"
            className="hover:text-primary transition"
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
