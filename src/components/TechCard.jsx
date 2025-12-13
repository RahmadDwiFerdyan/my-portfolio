import useReveal from "../hooks/useReveal";

export default function TechCard({ icon, label, index }) {
  const [ref, show] = useReveal();

  return (
    <div className="tech-tilt-wrapper">
      <div
        ref={ref}
        style={{ animationDelay: `${index * 0.12}s` }}
        className={`
        reveal ${show ? "show" : ""}
        tech-tilt
        flex flex-col items-center gap-3
        p-6 rounded-2xl border border-black/10 bg-white/70
        shadow-sm cursor-default
      `}
      >
        <img src={icon} className="w-10 h-10 object-contain opacity-90" />
        <p className="font-manrope text-sm font-semibold">{label}</p>
      </div>
    </div>
  );
}
