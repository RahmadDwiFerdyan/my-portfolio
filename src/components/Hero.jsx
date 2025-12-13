export default function Hero() {
  return (
    <section
      id="profile"
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden pt-28 md:pt-0"
    >

      <div className="
        relative max-w-6xl mx-auto px-12 md:px-6
        flex flex-col md:flex-row items-center gap-16
      ">

        {/* Photo with subtle floating animation */}
        <div className="photo-wrapper animate-fadeUp">
          <div className="photo-card">
            {/* FRONT SIDE */}
            <img
              src="images/profile.jpg"
              className="photo-front"
            />

            {/* BACK SIDE */}
              <img
              src="images/profile.png"
              className="photo-back"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="max-w-2xl animate-fadeUp text-center md:text-left">
          <p className="text-md text-gray-500 mb-4">Website & Mobile App Developer</p>
          <h1 className="text-5xl md:text-6xl text-gray-800 font-sora font-bold leading-tight">
            Hello there, I’m{" "}
            <span className="bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text
                              hover:from-yellow-400 hover:to-orange-300 transition-colors duration-400">
              Rahmad Dwi Ferdyan
            </span>

          </h1>

          <p className="mt-6 text-gray-700 font-manrope leading-relaxed text-lg">
            I am a passionate Website and Mobile App Developer who delivers high-quality,
            reliable solutions by combining strong problem-solving with UI/UX principles
            to create intuitive and meaningful experiences.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-8 md:text-center justify-center md:justify-start">
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
