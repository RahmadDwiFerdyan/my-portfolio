export default function Hero() {
  return (
    <section
      id="profile"
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient blobs */}
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] bg-primary/25 blur-[160px] rounded-full animate-pulse-slow -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[500px] h-[500px] bg-secondary/25 blur-[160px] rounded-full animate-pulse-slower -z-10"></div>

      <div className="
        relative max-w-6xl mx-auto px-6
        flex flex-col md:flex-row items-center gap-16
      ">

        {/* Photo with subtle floating animation */}
        <img
          src="images/profile.jpg"
          alt="Profile"
          className="
            w-60 h-60 md:w-[360px] md:h-[360px]
            object-cover rounded-4xl shadow-xl
            animate-float
          "
        />

        {/* Text content */}
        <div className="max-w-xl animate-fadeUp">
            <p className="text-md text-gray-500 mb-4">Rahmad Dwi Ferdyan</p>
          <h1 className="text-5xl md:text-6xl font-sora font-bold leading-tight">
            Hello there, I’m{" "}
            <span className="text-primary">Ferdy</span>
          </h1>

          <p className="mt-6 text-gray-700 font-manrope leading-relaxed text-lg">
            I am a passionate Website and App Developer who delivers high-quality,
            reliable solutions by combining strong problem-solving with UI/UX principles
            to create intuitive and meaningful experiences.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-8">
            <a href="https://github.com/RahmadDwiFerdyan" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition">
              <img src="/icons/github-mark.svg" className="w-7" />
            </a>
            <a href="https://www.linkedin.com/in/rahmadferdyan" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition">
              <img src="/icons/linkedin.svg" className="w-7" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
