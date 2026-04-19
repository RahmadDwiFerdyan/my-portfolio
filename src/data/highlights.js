export const DEFAULT_VISIBLE_ITEMS = 3;

export const EXPERIENCE_ITEMS = [
  {
    title: "UI/UX Designer - EduKids",
    meta: "Project Case Study",
    summary: "Led user research, defined product goals, and crafted end-to-end learning flows for children and parents.",
    images: ["images/edukids/edukids-cover.png", "images/edukids/edukids-hifi.png", "images/edukids/edukids1.gif"]
  },
];

export const CERTIFICATE_ITEMS = [
  {
    title: "Google UX Design Professional Certificate",
    meta: "Google | 2026",
    href: "https://drive.google.com/file/d/1uwTPLaeMBXtLmzz_e0Uh8FNOi3Da1ZJn/view?usp=drive_link",
    logo: "icons/google.avif",
    logoAlt: "Google UX Design",
  },
  {
    title: "UI/UX and Product Management Bootcamp",
    meta: "Harisenin.com | 2025-2026",
    href: "https://drive.google.com/file/d/1BtDovGAx-WwtPjZ91bke1vsTmEfWf3Ba/view?usp=drive_link",
    logo: "icons/harisenin.jfif",
    logoAlt: "Harisenin UI UX Bootcamp",
  },
  {
    title: "UX Researcher Project-Based Internship",
    meta: "Telkom Digital Amoeba | 2026",
    href: "https://drive.google.com/file/d/1_uZBRbfaJ9fLnkS6B8-3H6V650vodhLM/view?usp=drive_link",
    logo: "icons/amoeba.jfif",
    logoAlt: "Telkom Digital Amoeba",
  },
];

export const TECH_STACK_ITEMS = ["Figma Workspace", "Framer", "Notion", "Miro", "Laravel", "JavaScript", "React.js", "TailwindCSS", "Git & GitHub"];

export const ACHIEVEMENT_ITEMS = [
  {
    title: "2nd Place – National English Poster Competition",
    meta: "English Week XXX | Universitas Negeri Surabaya | 2025",
    images: ["images/achievement/englishweek-doc.JPG", "images/achievement/englishweek-cert.jpg"],
  },
  {
    title: "Honorable Mention – English Writing Competition",
    meta: "JTI Internal Competition | 2024",
    images: ["images/achievement/writing.jfif"],
  },
];

export const ORGANIZATION_ITEMS = [
  {
    title: "Information Technology Department English Community – Politeknik Negeri Malang",
    meta: "Head of Creative Media Division 2025",
    summary: [
      "Lead the Creative Media Division and responsible for all digital design, social media, and multimedia.",
      "Oversee the creation of visual assets, motion graphics, and UI designs for content and events.",
    ],
    images: ["images/achievement/itdec.jfif", "images/achievement/itdec-1.jfif"]
  },
  {
    title: "PLAY IT! 2024 – Politeknik Negeri Malang",
    meta: "Publication, Design, and Documentation (PDD) Team Member 2024",
    summary: [
      "Designed visual materials to support event publications and promotion.",
      "Supported a national-scale event that reached hundreds of participants from various universities.",
    ],
    images: ["images/achievement/playit.jfif", "images/achievement/playit-1.jfif"]
  },
];

export const SECTION_ITEMS = [
  { id: "experience", label: "Experience", description: "Selected projects and hands-on roles." },
  { id: "tech-stack", label: "Tech Stack", description: "Tools and technologies I use actively." },
  { id: "certificates", label: "Certificates", description: "Credential links and completion records." },
  { id: "achievement", label: "Achievement", description: "Notable milestones and recognition." },
  {
    id: "organizational-volunteering",
    label: "Organizational & Volunteering",
    mobileLabel: "Org & Vol.",
    description: "Community and team collaboration journey.",
  },
];

export const NAV_ITEMS = [{ id: "all", label: "All" }, ...SECTION_ITEMS];
