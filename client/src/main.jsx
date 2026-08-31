import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import DepthText from "./components/DepthText";
import Galaxy from "./components/Galaxy";
import GooeyNav from "./components/GooeyNav";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fallbackProjects = [
  {
    name: "Nexora",
    planet: "JUPITER",
    type: "MERN • REAL-TIME",
    description:
      "A modern full-stack real-time chat application with authentication, messaging, image sharing, voice-to-text and themes.",
    stack: ["React", "Node", "Express", "MongoDB"],
    live: "https://nexora-yazk.onrender.com",
    github: "https://github.com/vridhi14/Nexora",
  },
  {
    name: "Brainix",
    planet: "EARTH",
    type: "AI SAAS • PERN",
    description:
      "An AI-powered creative and productivity platform with content generation, image generation, resume review and a community.",
    stack: ["React", "Node", "Express", "PostgreSQL", "Gemini"],
    live: "https://brainix-rose.vercel.app",
    github: "https://github.com/vridhi14/Brainix",
  },
  {
    name: "AI Code Reviewer",
    planet: "MARS",
    type: "AI • DEVELOPER TOOL",
    description:
      "An AI-powered code review application that detects bugs, suggests improvements and provides optimization tips using Gemini.",
    stack: ["React", "Vite", "Tailwind", "Node", "Express"],
    live: "https://ai-code-reviewer-o6w9.onrender.com",
    github: "https://github.com/vridhi14/AI-Code-Reviewer",
  },
  {
    name: "Realtime Location",
    planet: "SATURN",
    type: "SOCKET.IO • REAL-TIME",
    description:
      "A real-time device location tracker that synchronizes live coordinates across connected clients on an interactive map.",
    stack: ["Node", "Express", "Socket.IO", "Leaflet"],
    live: "https://realtime-device-track-sv6k.onrender.com",
    github: "https://github.com/vridhi14/Realtime-Device-Track",
  },
];

const skillGroups = {
  "Core CS": ["OOPS", "OS", "DBMS", "CN"],
  Frontend: ["HTML", "CSS", "Tailwind", "React"],
  Backend: ["Node", "Express", "JWT", "Authentication", "Socket.IO"],
  Database: ["MongoDB", "PostgreSQL"],
  Languages: ["Java", "JavaScript"],
  "Problem Solving": ["DSA in Java"],
};

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [filter, setFilter] = useState("ALL");
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [apiState, setApiState] = useState("checking");
  const [activeSection, setActiveSection] = useState("about");
  useReveal();

  useEffect(() => {
    fetch(`${API}/projects`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setProjects(data);
        setApiState("online");
      })
      .catch(() => setApiState("offline"));
  }, []);

  const filtered = useMemo(
    () =>
      filter === "ALL" ? projects : projects.filter((p) => p.planet === filter),
    [projects, filter],
  );

  useEffect(() => {
    const sections = ["about", "stack", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
      },
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  async function submitContact(e) {
    e.preventDefault();
    setSending(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSent(true);
      e.currentTarget.reset();
    } catch {
      // Keep the portfolio useful even when the backend is not configured.
      window.location.href = `mailto:rajeevvridhi@gmail.com?subject=Portfolio%20contact%20from%20${encodeURIComponent(form.get("name"))}&body=${encodeURIComponent(form.get("message"))}`;
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="app">
      {/* 🌌 Galaxy Background */}
      <div className="galaxy-background">
        <Galaxy />
      </div>

      <div className="noise" />
      <div className="star-layer star-one" />
      <div className="star-layer star-two" />
      <div className="cursor-orb" />
      <div className="progress-bar" />

      <header className="nav">
        <a href="#home" className="logo">
          <span className="logo-sun" />
          VRIDHI<span className="acid">.</span>
        </a>
        <button className="menu-btn" onClick={() => setMenu((v) => !v)}>
          {menu ? "CLOSE" : "MENU"}
        </button>
        <GooeyNav
          items={[
            { label: "ABOUT", href: "#about" },
            { label: "STACK", href: "#stack" },
            { label: "PROJECTS", href: "#projects" },
            { label: "CONTACT", href: "#contact" },
          ]}
          initialActiveIndex={0}
          isOpen={menu}
        />
        <a className="nav-pill" href="mailto:rajeevvridhi@gmail.com">
          LET'S TALK ↗
        </a>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-left reveal">
            <div className="availability">
              <span /> OPEN TO OPPORTUNITIES
            </div>
            <div className="tiny-label">
              FULL STACK DEVELOPER / MERN / JAVA DSA
            </div>
            <h1>
              I build{" "}
              <DepthText
                layers={34}
                depth={2.4}
                faceColor="#f8fafc"
                depthColor="#D9FF5F"
                tilt={7.5}
                pointerTracking
                smoothing={0.14}
                perspective={900}
                autoOrbit
                orbitSpeed={0.35}
                fontSize="clamp(3rem, 12vw, 7rem)"
                fontWeight={900}
                shadow
                text="things"
                className="things-depth"
              />
              <br />
              that work.
            </h1>
            <p className="hero-desc">
              Hi, I'm Vridhi — a full-stack developer who turns ideas into
              responsive interfaces, scalable APIs and real-time experiences.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="acid-btn">
                VIEW MY WORK <b>↗</b>
              </a>
              <a href="#contact" className="line-btn">
                CONTACT ME
              </a>
            </div>
            <div className="hero-socials">
              <a
                href="https://github.com/vridhi14"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB ↗
              </a>
              <a
                href="https://leetcode.com/u/vrii/"
                target="_blank"
                rel="noreferrer"
              >
                LEETCODE ↗
              </a>
              <a
                href="https://www.linkedin.com/in/vridhi-rajeev"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN ↗
              </a>
            </div>
          </div>

          <div className="portrait-wrap reveal">
            <div className="portrait-orbit orbit-x" />
            <div className="portrait-orbit orbit-y" />
            <div className="portrait-ring ring-a" />
            <div className="portrait-ring ring-b" />
            <div className="portrait-frame">
              <img src="/profile.png" alt="Vridhi Rajeev" />
              <div className="scanline" />
            </div>
            <div className="floating-chip chip-one">
              REACT <span>✦</span>
            </div>
            <div className="floating-chip chip-two">
              NODE.JS <span>✦</span>
            </div>
            <div className="floating-chip chip-three">
              JAVA / DSA <span>✦</span>
            </div>
            <div className="portrait-caption">
              VRIDHI / 01
              <br />
              <span>DEVELOPER ON ORBIT</span>
            </div>
          </div>
        </section>

        <div className="marquee">
          <div>
            REACT ✦ NODE ✦ EXPRESS ✦ MONGODB ✦ POSTGRESQL ✦ SOCKET.IO ✦ JAVA ✦
            DSA ✦
          </div>
          <div>
            REACT ✦ NODE ✦ EXPRESS ✦ MONGODB ✦ POSTGRESQL ✦ SOCKET.IO ✦ JAVA ✦
            DSA ✦
          </div>
        </div>

        <section id="about" className="section about reveal">
          <div className="section-tag">01 / ABOUT</div>
          <div className="about-grid">
            <div>
              <p className="eyebrow">THE DEVELOPER BEHIND THE CODE</p>
              <h2>
                Curious mind.
                <br />
                <span>Builder energy.</span>
              </h2>
            </div>
            <div className="about-copy">
              <p className="big">
                I like taking a problem from{" "}
                <strong>"how does this work?"</strong> to{" "}
                <strong>"I built this."</strong>
              </p>
              <p>
                I'm focused on full-stack web development with the MERN
                ecosystem, while strengthening my Java + DSA skills and core CS
                fundamentals.
              </p>
              <div className="about-stats">
                <div>
                  <b>13+</b>
                  <span>PUBLIC REPOS</span>
                </div>
                <div>
                  <b>4</b>
                  <span>FEATURED BUILDS</span>
                </div>
                <div>
                  <b>∞</b>
                  <span>THINGS TO LEARN</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className="section stack reveal">
          <div className="section-tag">02 / STACK</div>
          <div className="stack-head">
            <h2>
              My <span>orbit.</span>
            </h2>
            <p>
              My current toolkit — from CS fundamentals to production-ready
              full-stack development.
            </p>
          </div>
          <div className="stack-grid">
            {Object.entries(skillGroups).map(([group, skills]) => (
              <div className="stack-card" key={group}>
                <div className="stack-card-top">
                  <span>✦</span>
                  {group}
                </div>
                <div className="stack-list">
                  {skills.map((s, i) => (
                    <div key={s}>
                      <span>0{i + 1}</span>
                      <b>{s}</b>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="learning-banner">
            <div className="learning-dot" />
            <div>
              <small>CURRENTLY LEVELING UP</small>
              <b>JAVA DSA + SYSTEM DESIGN THINKING</b>
            </div>
            <span>↗</span>
          </div>
        </section>

        <section id="projects" className="section projects reveal">
          <div className="section-tag">03 / PROJECTS</div>
          <div className="projects-head">
            <div>
              <p className="eyebrow">SELECTED MISSIONS</p>
              <h2>
                Built in my <span>universe.</span>
              </h2>
            </div>
            <div className="filter-row">
              {["ALL", "EARTH", "MARS", "JUPITER", "SATURN"].map((x) => (
                <button
                  key={x}
                  className={filter === x ? "active" : ""}
                  onClick={() => setFilter(x)}
                >
                  {x}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {filtered.map((p, i) => (
              <article className={`project-card card-${i % 4}`} key={p.name}>
                <div className="project-visual">
                  <div className="pv-grid" />
                  <div className="pv-orbit pv-a" />
                  <div className="pv-orbit pv-b" />
                  <div className="pv-planet">
                    <span>{p.planet[0]}</span>
                  </div>
                  <div className="pv-code">{`{ ${p.name.toUpperCase()} }`}</div>
                  <span className="pv-label">
                    {String(i + 1).padStart(2, "0")} / MISSION
                  </span>
                </div>
                <div className="project-content">
                  <div className="project-type">
                    {p.type}
                    <span>↗</span>
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={p.live} target="_blank" rel="noreferrer">
                      LIVE DEMO ↗
                    </a>
                    <a href={p.github} target="_blank" rel="noreferrer">
                      SOURCE ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section architecture reveal">
          <div className="section-tag">04 / HOW I THINK</div>
          <div className="architecture-grid">
            <div>
              <p className="eyebrow">FROM UI → API → DATABASE</p>
              <h2>
                Full-stack,
                <br />
                <span>not half-way.</span>
              </h2>
            </div>
            <div className="terminal">
              <div className="terminal-top">
                <span>● ● ●</span>
                <span>portfolio / architecture</span>
                <span>01</span>
              </div>
              <pre>{`client
  ↓  HTTP / JSON
Express API
  ↓  auth + validation
MongoDB
  ↓
persistent data

Socket.IO
  ↕
real-time events

React
  → state → UI`}</pre>
              <div className="terminal-status">
                <span /> API READY <span className="api-dot" />{" "}
                {apiState.toUpperCase()}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact reveal">
          <div className="contact-glow" />
          <div className="section-tag">05 / CONTACT</div>
          <div className="contact-grid">
            <div>
              <p className="eyebrow">SEND A TRANSMISSION</p>
              <h2>
                Let's build
                <br />
                <span>something stellar.</span>
              </h2>
              <p className="contact-copy">
                Have an internship, project, collaboration or just a cool idea?
                Send it my way.
              </p>
              <div className="social-big">
                <a
                  href="https://github.com/vridhi14"
                  target="_blank"
                  rel="noreferrer"
                >
                  GITHUB <span>↗</span>
                </a>
                <a
                  href="https://leetcode.com/u/vrii/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LEETCODE <span>↗</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/vridhi-rajeev"
                  target="_blank"
                  rel="noreferrer"
                >
                  LINKEDIN <span>↗</span>
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitContact}>
              <label>
                YOUR NAME
                <input
                  name="name"
                  required
                  placeholder="enter your name here"
                />
              </label>
              <label>
                EMAIL
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="youremail@email.com"
                />
              </label>
              <label>
                MESSAGE
                <textarea
                  name="message"
                  required
                  rows="5"
                  placeholder="Tell me what we're building..."
                />
              </label>
              <button className="acid-btn" disabled={sending}>
                {sending
                  ? "TRANSMITTING..."
                  : sent
                    ? "TRANSMITTED ✓"
                    : "SEND TRANSMISSION ↗"}
              </button>
              {sent && (
                <p className="success">
                  Message stored successfully in the portfolio API.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <span>© VRIDHI RAJEEV</span>
        <span>REACT × NODE × MONGODB</span>
        <a href="#home">BACK TO ORBIT ↑</a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
