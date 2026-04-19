import { useEffect, useState } from "react";
import useReveal from "../hooks/useReveal";
import {
  DEFAULT_VISIBLE_ITEMS,
  EXPERIENCE_ITEMS,
  CERTIFICATE_ITEMS,
  TECH_STACK_ITEMS,
  ACHIEVEMENT_ITEMS,
  ORGANIZATION_ITEMS,
  SECTION_ITEMS,
  NAV_ITEMS,
} from "../data/highlights";

function SectionCard({ title, description, children, sectionId, sectionRef }) {
  return (
    <section id={sectionId} ref={sectionRef} className="scroll-mt-32 rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
      <h4 className="font-sora text-2xl font-semibold text-white">{title}</h4>
      <p className="mt-2 font-manrope text-base text-white/65">{description}</p>
      {children}
    </section>
  );
}

function TextualList({ items, onOpenDetail, showOpenLink = false }) {
  return (
    <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((item) => {
        const canOpenDetail = typeof onOpenDetail === "function";
        const hasLink = showOpenLink && Boolean(item.href);
        const isCardActionable = canOpenDetail || hasLink;

        const openCardAction = () => {
          if (canOpenDetail) {
            onOpenDetail(item);
            return;
          }

          if (hasLink) {
            window.open(item.href, "_blank", "noopener,noreferrer");
          }
        };

        const summaryValue = item.summary || item.description;
        const summaryText = Array.isArray(summaryValue)
          ? summaryValue
              .map((line) => String(line).trim())
              .filter(Boolean)
              .join(" • ")
          : typeof summaryValue === "string"
            ? summaryValue
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .join(" • ")
            : "";

        const rawImages = Array.isArray(item.images) ? item.images : null;
        const thumbSrc =
          (rawImages && rawImages.length ? rawImages[0] : null) || item.imageSrc || item.image || item.logo || "";
        const thumbAlt = item.imageAlt || item.logoAlt || item.title;

        return (
          <li key={`${item.title}-${item.meta}`} className="min-w-0">
            <div
              className={`group h-full rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 transition hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white/10 ${
                isCardActionable ? "cursor-pointer" : ""
              }`}
              role={isCardActionable ? "button" : undefined}
              tabIndex={isCardActionable ? 0 : undefined}
              onClick={isCardActionable ? openCardAction : undefined}
              onKeyDown={
                isCardActionable
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openCardAction();
                      }
                    }
                  : undefined
              }
              aria-label={isCardActionable ? `Open item: ${item.title}` : undefined}
            >
              <div className="flex items-start gap-3">
                {thumbSrc ? (
                  <div className="mt-0.5 h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                    <img src={thumbSrc} alt={thumbAlt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ) : (
                  <div className="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5">
                    <span className="font-sora text-[10px] font-semibold uppercase tracking-wide text-white/60">Item</span>
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="highlight-item-title font-sora text-sm sm:text-base font-semibold leading-snug text-white">
                        {item.title}
                      </p>
                      <p className="highlight-item-meta mt-1 font-manrope text-[11px] sm:text-sm font-medium text-primary/95">
                        {item.meta}
                      </p>
                    </div>

                    {canOpenDetail || hasLink ? (
                      <div className="shrink-0 flex items-center gap-2">
                        {canOpenDetail ? (
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              onOpenDetail(item);
                            }}
                            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition hover:border-primary/45 hover:bg-primary hover:text-black"
                            aria-label={`See detail: ${item.title}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                              aria-hidden="true"
                            >
                              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            </svg>
                          </button>
                        ) : null}

                        {hasLink ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 bg-white/0 text-white/80 transition hover:border-white/25 hover:bg-white/10 hover:text-primary"
                            aria-label={`Open link: ${item.title}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                              aria-hidden="true"
                            >
                              <path d="M14 3h7v7" />
                              <path d="M10 14L21 3" />
                              <path d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" />
                            </svg>
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  {summaryText ? (
                    <p className="mt-2 font-manrope text-xs sm:text-sm leading-relaxed text-white/75 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                      {summaryText}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function CertificateList({ items, showAll, setShowAll }) {
  const visibleCertificates = showAll ? items : items.slice(0, DEFAULT_VISIBLE_ITEMS);

  const openCertificateLink = (href) => {
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {visibleCertificates.map((item) => {
          const summaryValue = item.summary || item.description;
          const summaryText = Array.isArray(summaryValue)
            ? summaryValue
                .map((line) => String(line).trim())
                .filter(Boolean)
                .join(" • ")
            : typeof summaryValue === "string"
              ? summaryValue
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .join(" • ")
              : "";

          return (
            <li key={item.title} className="min-w-0">
              <div
                className={`group h-full rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 transition hover:-translate-y-0.5 hover:border-primary/35 hover:bg-white/10 ${
                  item.href ? "cursor-pointer" : ""
                }`}
                role={item.href ? "link" : undefined}
                tabIndex={item.href ? 0 : undefined}
                onClick={item.href ? () => openCertificateLink(item.href) : undefined}
                onKeyDown={
                  item.href
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          openCertificateLink(item.href);
                        }
                      }
                    : undefined
                }
                aria-label={item.href ? `Open certificate: ${item.title}` : undefined}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="mt-0 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.logoAlt || item.title}
                          className="h-12 w-12 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="font-sora text-[10px] font-semibold uppercase tracking-wide text-white/70">Logo</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="highlight-item-title font-sora text-sm sm:text-base font-semibold leading-snug text-white">
                        {item.title}
                      </p>
                      <p className="highlight-item-meta mt-1 font-manrope text-[11px] sm:text-sm font-medium text-primary/95">
                        {item.meta}
                      </p>

                      {summaryText ? (
                        <p className="mt-2 font-manrope text-xs sm:text-sm leading-relaxed text-white/75 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                          {summaryText}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {item.href ? (
                    <div className="shrink-0">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition hover:border-primary/45 hover:bg-primary hover:text-black"
                        aria-label={`Open certificate: ${item.title}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M14 3h7v7" />
                          <path d="M10 14L21 3" />
                          <path d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" />
                        </svg>
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {items.length > DEFAULT_VISIBLE_ITEMS ? (
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-4 inline-flex rounded-xl border border-white/20 bg-white/5 px-4 py-2 font-manrope text-sm font-semibold text-white/85 transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
        >
          {showAll ? "Show less" : "See more"}
        </button>
      ) : null}
    </>
  );
}

function DetailModal({ item, onClose }) {
  const isOpen = Boolean(item);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title = item.title;
  const meta = item.meta;
  const description = item.summary || item.description;
  const descriptionLines = Array.isArray(description)
    ? description
    : typeof description === "string" && description.includes("\n")
      ? description.split("\n").map((line) => line.trim()).filter(Boolean)
      : null;

  const rawImages = Array.isArray(item.images) ? item.images : null;
  const fallbackImage = item.imageSrc || item.image || item.logo;
  const images = rawImages && rawImages.length ? rawImages : fallbackImage ? [fallbackImage] : [];

  const imageAlt = item.imageAlt || item.logoAlt || title;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detail: ${title}`}
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#0b1f33] shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="font-sora text-xl font-semibold leading-snug text-white">{title}</p>
            {meta ? <p className="mt-1 font-manrope text-sm font-semibold text-primary/95">{meta}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/85 transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            aria-label="Close dialog"
          >
            <span className="font-bold text-4xl" aria-hidden="true">×</span>
          </button>
        </div>

        <div className="px-5 py-5">
          <div className="grid gap-5 md:grid-cols-[42rem_minmax(0,1fr)] md:items-start">
            <div className="md:sticky md:top-0">
              {images.length ? (
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="relative aspect-video w-full overflow-hidden bg-black/20">
                    <img
                      src={images[Math.min(activeImageIndex, images.length - 1)]}
                      alt={imageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />

                    {images.length > 1 ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur transition hover:border-primary/50 hover:bg-black/55 hover:text-primary"
                          aria-label="Previous image"
                        >
                          <span aria-hidden="true">‹</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 backdrop-blur transition hover:border-primary/50 hover:bg-black/55 hover:text-primary"
                          aria-label="Next image"
                        >
                          <span aria-hidden="true">›</span>
                        </button>
                      </>
                    ) : null}
                  </div>

                  {images.length > 1 ? (
                    <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-[#0b1f33] px-4 py-3">
                      {images.map((_, index) => {
                        const isActive = index === activeImageIndex;
                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setActiveImageIndex(index)}
                            className={
                              isActive
                                ? "h-2.5 w-7 rounded-full bg-primary"
                                : "h-2.5 w-2.5 rounded-full bg-white/25 hover:bg-white/40"
                            }
                            aria-label={`Show image ${index + 1} of ${images.length}`}
                            aria-current={isActive ? "true" : undefined}
                          />
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-6">
                  <p className="text-center font-manrope text-sm font-semibold text-white/60">No image</p>
                </div>
              )}
            </div>

            <div className="min-w-0">
              {descriptionLines ? (
                <ul className="list-disc space-y-1 pl-5 font-manrope text-sm sm:text-base leading-relaxed text-white/85">
                  {descriptionLines.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              ) : description ? (
                <p className="font-manrope text-sm sm:text-base leading-relaxed text-white/85">{description}</p>
              ) : (
                <p className="font-manrope text-sm sm:text-base leading-relaxed text-white/60">No description available.</p>
              )}

              {item.href ? (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-2 font-manrope text-sm font-semibold text-white/85 transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    Open link
                    <span aria-hidden="true" className="ml-2">↗</span>
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Highlights() {
  const [sectionRef, sectionVisible] = useReveal();
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState("all");
  const [detailItem, setDetailItem] = useState(null);

  const visibleExperiences = showAllExperiences ? EXPERIENCE_ITEMS : EXPERIENCE_ITEMS.slice(0, DEFAULT_VISIBLE_ITEMS);

  const scrollToHighlightsTop = () => {
    const element = document.getElementById("highlights");
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const switchPage = (sectionId) => {
    setSelectedSectionId(sectionId);
    requestAnimationFrame(scrollToHighlightsTop);
  };

  const openDetail = (item) => setDetailItem(item);
  const closeDetail = () => setDetailItem(null);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-underline");
            titleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );

    const titleElements = document.querySelectorAll(".highlights-sticky-title");
    titleElements.forEach((element) => titleObserver.observe(element));
    return () => titleObserver.disconnect();
  }, []);

  const renderSection = (sectionId) => {
    if (sectionId === "experience") {
      return (
        <>
          <TextualList items={visibleExperiences} onOpenDetail={openDetail} showOpenLink={false} />
          {EXPERIENCE_ITEMS.length > DEFAULT_VISIBLE_ITEMS ? (
            <button
              type="button"
              onClick={() => setShowAllExperiences((prev) => !prev)}
              className="mt-4 inline-flex rounded-xl border border-white/20 bg-white/5 px-4 py-2 font-manrope text-sm font-semibold text-white/85 transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              {showAllExperiences ? "Show less" : "See more"}
            </button>
          ) : null}
        </>
      );
    }

    if (sectionId === "certificates") {
      return <CertificateList items={CERTIFICATE_ITEMS} showAll={showAllCertificates} setShowAll={setShowAllCertificates} />;
    }

    if (sectionId === "tech-stack") {
      return (
        <ul className="mt-5 flex flex-wrap items-start gap-3">
          {TECH_STACK_ITEMS.map((tech, index) => (
            <li
              key={tech}
              className={`inline-flex w-fit whitespace-nowrap rounded-xl border border-white/10 bg-[#13283d] font-manrope text-base font-medium text-white/90 transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-[#18344d] ${
                index % 3 === 0 ? "px-5 py-3" : "px-4 py-2.5"
              }`}
            >
              {tech}
            </li>
          ))}
        </ul>
      );
    }

    if (sectionId === "achievement") {
      return <TextualList items={ACHIEVEMENT_ITEMS} onOpenDetail={openDetail} showOpenLink={false} />;
    }

    if (sectionId === "organizational-volunteering") {
      return <TextualList items={ORGANIZATION_ITEMS} onOpenDetail={openDetail} showOpenLink={false} />;
    }

    return null;
  };

  return (
    <>
      <section id="highlights" ref={sectionRef} className={`relative py-14 md:py-20 project-reveal ${sectionVisible ? "show" : ""}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-6">
        <div className="mb-0 lg:hidden">
          <h2 className="highlights-sticky-title category-title mt-2 mb-0 inline-block w-fit font-sora text-3xl md:text-4xl font-bold text-white">
            Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[17rem_minmax(0,1fr)]">
          <aside className="hidden lg:block lg:sticky lg:top-26 self-start lg:w-68">
            <h2 className="highlights-sticky-title category-title mb-8 inline-block w-fit font-sora text-3xl md:text-4xl font-bold text-white">
              Highlights
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
              <p className="font-manrope text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Navigate Highlights</p>

              <nav className="mt-3 hidden lg:flex lg:flex-col lg:gap-1.5">
                {NAV_ITEMS.map((section) => {
                  const isActive = selectedSectionId === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => switchPage(section.id)}
                      className={
                        isActive
                          ? "flex items-center gap-2.5 rounded-xl border border-primary/30 bg-primary/5 px-2.5 py-2 text-left text-primary text-sm font-semibold"
                          : "flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/0 px-2.5 py-2 text-left text-white/80 text-sm font-semibold hover:border-white/20 hover:bg-white/5 hover:text-primary transition"
                      }
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className={isActive ? "h-2 w-2 rounded-full bg-primary" : "h-2 w-2 rounded-full bg-white/25"} aria-hidden="true" />
                      <span className="leading-snug tracking-[-0.01em]">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="mt-10 md:mt-18 space-y-5">
            {selectedSectionId === "all"
              ? SECTION_ITEMS.map((section) => (
                  <SectionCard
                    key={section.id}
                    title={section.label}
                    description={section.description}
                    sectionId={section.id}
                    sectionRef={(el) => {
                      void el;
                    }}
                  >
                    {renderSection(section.id)}
                  </SectionCard>
                ))
              : (() => {
                  const section = SECTION_ITEMS.find((entry) => entry.id === selectedSectionId) || SECTION_ITEMS[0];
                  return (
                    <SectionCard
                      title={section.label}
                      description={section.description}
                      sectionId={section.id}
                      sectionRef={(el) => {
                        void el;
                      }}
                    >
                      {renderSection(section.id)}
                    </SectionCard>
                  );
                })()}
          </div>
        </div>
        </div>
      </section>

      <DetailModal key={detailItem?.title || detailItem?.meta || "detail"} item={detailItem} onClose={closeDetail} />
    </>
  );
}
