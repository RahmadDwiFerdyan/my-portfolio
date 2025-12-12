import { useState } from "react";

export default function Footer() {
  const [copied, setCopied] = useState("");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);

    // hide after 1.5s
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <footer
      id="contact"
      className="relative py-10 text-center text-gray-600 font-manrope"
    >
      {/* EMAIL */}
      <button
        onClick={() => handleCopy("rahmadferdyan440@gmail.com")}
        className="hover:text-primary transition font-medium"
      >
        Email: rahmadferdyan440@gmail.com
      </button>

      <br />

      {/* PHONE */}
      <button
        onClick={() => handleCopy("+628819881596")}
        className="hover:text-primary transition font-medium mt-2"
      >
        Phone: +62-881-9881-596
      </button>

      <p className="mt-4">© 2025 Ferdy. All rights reserved.</p>

      {/* COPIED TOAST */}
      {copied && (
        <div
          className="
            absolute left-1/2 -translate-x-1/2 bottom-4
            bg-black/80 text-white text-sm px-4 py-2 rounded-lg
            shadow-lg animate-fadeInOut
          "
        >
          Copied!
        </div>
      )}
    </footer>
  );
}
