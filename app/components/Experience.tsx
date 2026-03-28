"use client";

import { AnimatePresence, motion } from "framer-motion";
import MacButtons from "./MacButtons";
import { minimizeVariants } from "./minimizeVariants";

interface Props {
  isMinimized?: boolean;
  onMinimize?: () => void;
  onRestore?: () => void;
}

const experiences = [
  {
    role: "Software Development Engineer",
    company: "Think41",
    period: "Nov 2024 – Present",
    location: "Bangalore, India",
    color: "var(--accent)",
    highlights: [
      "Delivered 3+ end-to-end client projects — conversational AI, real-time communication, and full-stack development using Django, FastAPI, LiveKit, Next.js, React, and React Native.",
      "Built production-grade conversational AI systems with STT/TTS, sentiment analysis, inactivity tracking, and dynamic document workflows — reducing manual effort by 50%+.",
      "Implemented scalable auth & communication flows for B2B apps using AWS SNS/SES/S3, Twilio, and JWT-based systems, supporting 20,000+ users.",
      "Led CI/CD, production deployments, and cross-service integrations ensuring 99.9% uptime and data integrity across distributed systems.",
      "Participated in peer code reviews and pair programming to foster continuous team learning.",
    ],
  },
];

const education = [
  {
    school: "JCT College of Engineering & Technology",
    degree: "B.E. Computer Science and Engineering",
    grade: "CGPA: 8.3",
    period: "June 2021 – May 2025",
    location: "Tamil Nadu, India",
  },
  {
    school: "St Joseph's Hr. Sec. School",
    degree: "Mathematics, Physics, Chemistry",
    grade: "83%",
    period: "June 2020 – May 2021",
    location: "Tamil Nadu, India",
  },
];

export default function Experience({ isMinimized, onMinimize }: Props) {
  return (
    <section id="experience" style={{ padding: isMinimized ? 0 : "80px 24px", overflow: "hidden" }}>
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            key="experience"
            variants={minimizeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ transformOrigin: "bottom center" }}
            className="max-w-5xl mx-auto space-y-8"
          >
        {/* Work experience window */}
        <div className="mac-window">
          <MacButtons title="experience.json" onMinimize={onMinimize} onClose={onMinimize} />
          <div style={{ padding: "40px", background: "var(--terminal-bg)" }}>
            <p className="text-sm font-medium mb-8 terminal-font" style={{ color: "var(--accent)" }}>
              # work_experience
            </p>
            {experiences.map((exp) => (
              <div key={exp.role}>
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{exp.role}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold" style={{ color: exp.color }}>{exp.company}</span>
                      <span style={{ color: "var(--border)" }}>·</span>
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{exp.location}</span>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium terminal-font"
                    style={{ background: "rgba(0,216,255,0.1)", color: "var(--accent)", border: "1px solid rgba(0,216,255,0.2)" }}
                  >
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3" style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
                      <span style={{ color: "var(--accent-green)", flexShrink: 0 }}>▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mac-window">
          <MacButtons title="education.json" />
          <div style={{ padding: "40px", background: "var(--terminal-bg)" }}>
            <p className="text-sm font-medium mb-8 terminal-font" style={{ color: "var(--accent-purple)" }}>
              # education
            </p>
            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {education.map((edu) => (
                <div
                  key={edu.school}
                  className="p-5 rounded-xl border card-hover"
                  style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
                >
                  <div className="text-xs font-medium mb-2 terminal-font" style={{ color: "var(--accent-purple)" }}>
                    {edu.period}
                  </div>
                  <h4 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{edu.school}</h4>
                  <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>{edu.degree}</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(191,90,242,0.1)", color: "var(--accent-purple)", border: "1px solid rgba(191,90,242,0.2)" }}
                  >
                    {edu.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
