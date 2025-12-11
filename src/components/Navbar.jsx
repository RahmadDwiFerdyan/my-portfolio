export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="font-sora text-lg font-semibold">Ferdy's Portfolio</h1>

        <ul className="flex gap-6 font-manrope">
          <a href="#profile" className="hover:text-primary">Profile</a>
          <a href="#projects" className="hover:text-primary">Projects</a>
          <a href="#stack" className="hover:text-primary">Tech Stack</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </ul>
      </div>
    </nav>
  );
}
