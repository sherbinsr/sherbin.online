import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import ShelbyTerminal from "./components/ShelbyTerminal";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />

      {/* Footer */}
      <footer style={{ padding: "32px 24px", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="terminal-font text-xs" style={{ color: "var(--text-secondary)" }}>
            © 2025 Sherbin S. Built with Next.js
          </span>
          <span className="terminal-font text-xs" style={{ color: "var(--text-secondary)" }}>
            Made in{" "}
            <span style={{ color: "var(--accent)" }}>Bangalore</span>{" "}
            🇮🇳
          </span>
        </div>
      </footer>

      {/* Shelby AI chat terminal */}
      <ShelbyTerminal />
    </main>
  );
}
