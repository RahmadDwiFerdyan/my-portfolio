export default function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 md:pt-36"
    >

      <div className="
        relative max-w-6xl mx-auto px-10 md:px-6
        flex flex-col md:flex-row items-center gap-16
      ">

        {/* Photo with subtle floating animation */}
        <div className="photo-wrapper animate-fadeUp">
          <div className="photo-scene">
            {/* BACK LAYER (full photo) */}
            <img src="images/foto.jpeg" className="photo-back" alt="" />

            {/* STARS (middle layer) */}
            <div className="photo-stars" aria-hidden="true">
              <img src="images/star.png" className="photo-star star-1" alt="" />
              <img src="images/star.png" className="photo-star star-2" alt="" />
              <img src="images/star.png" className="photo-star star-3" alt="" />
              <img src="images/star.png" className="photo-star star-4" alt="" />
              <img src="images/star.png" className="photo-star star-5" alt="" />
              <img src="images/star.png" className="photo-star star-6" alt="" />
            </div>

            {/* FRONT LAYER (cutout PNG) */}
            <img
              src="images/foto-removebg.png"
              className="photo-front"
              alt="Rahmad Dwi Ferdyan"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="max-w-2xl animate-fadeUp text-center md:text-left">
          <p className="text-md text-white mb-4">UI/UX Designer</p>
          <h1 className="text-3xl md:text-6xl text-white font-sora font-bold leading-tight">
            Hello there, I’m{" "}
            <span className="bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text
                              hover:from-yellow-400 hover:to-orange-300 transition-colors duration-400">
              Rahmad Dwi Ferdyan
            </span>

          </h1>

          <p className="mt-6 text-white font-manrope leading-relaxed text-lg">
            I am a UI/UX Designer who focuses on solving real problems through thoughtful design. 
            I create intuitive and meaningful digital experiences by combining user-centered thinking with clear and practical solutions.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 mt-8 md:text-center justify-center md:justify-start">
            {/* <a href="https://github.com/RahmadDwiFerdyan" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition">
              <img src="/icons/email.svg" className="w-7.5" />
            </a> */}
            <a href="https://www.linkedin.com/in/rahmadferdyan" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition">
              <img src="/icons/linkedin.png" className="w-7" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
