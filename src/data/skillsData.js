import { FiCode, FiDatabase, FiCpu, FiGithub, FiLayers, FiTerminal } from 'react-icons/fi';
import { SiReact, SiNextdotjs, SiTailwindcss, SiThreedotjs, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiDocker, SiFramer, SiGit, SiVercel } from 'react-icons/si';

export const skillsData = [
  {
    category: "Frontend Development",
    icon: "code",
    skills: [
      { name: "React", level: 95, icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", level: 90, icon: SiNextdotjs, color: "#ffffff" },
      { name: "Tailwind CSS", level: 95, icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Three.js / R3F", level: 85, icon: SiThreedotjs, color: "#000000" },
      { name: "Framer Motion / GSAP", level: 90, icon: SiFramer, color: "#E10098" }
    ]
  },
  {
    category: "Backend & Database",
    icon: "database",
    skills: [
      { name: "Node.js", level: 90, icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", level: 88, icon: SiExpress, color: "#ffffff" },
      { name: "MongoDB", level: 85, icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", level: 80, icon: SiPostgresql, color: "#4169E1" }
    ]
  },
  {
    category: "Tools & Cloud Platforms",
    icon: "tools",
    skills: [
      { name: "Git & GitHub", level: 92, icon: SiGit, color: "#F05032" },
      { name: "Docker", level: 75, icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", level: 90, icon: SiVercel, color: "#ffffff" },
      { name: "Terminal / Bash", level: 85, icon: FiTerminal, color: "#4EAA25" }
    ]
  }
];
