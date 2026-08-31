import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

const projects = [
  {
    name: "Nexora",
    planet: "JUPITER",
    type: "MERN • REAL-TIME",
    description: "A modern full-stack real-time chat application with authentication, messaging, image sharing, voice-to-text and themes.",
    stack: ["React", "Node", "Express", "MongoDB", "Clerk", "ImageKit"],
    live: "https://nexora-yazk.onrender.com",
    github: "https://github.com/vridhi14/Nexora"
  },
  {
    name: "Brainix",
    planet: "EARTH",
    type: "AI SAAS • PERN",
    description: "An AI-powered creative and productivity platform with content generation, image generation, resume review and a community.",
    stack: ["React", "Node", "Express", "PostgreSQL", "Clerk", "Gemini"],
    live: "https://brainix-rose.vercel.app",
    github: "https://github.com/vridhi14/Brainix"
  },
  {
    name: "AI Code Reviewer",
    planet: "MARS",
    type: "AI • DEVELOPER TOOL",
    description: "An AI-powered code review application that detects bugs, suggests improvements and provides optimization tips using Gemini.",
    stack: ["React", "Vite", "Tailwind", "Node", "Express", "Gemini"],
    live: "https://ai-code-reviewer-o6w9.onrender.com",
    github: "https://github.com/vridhi14/AI-Code-Reviewer"
  },
  {
    name: "Realtime Location",
    planet: "SATURN",
    type: "SOCKET.IO • REAL-TIME",
    description: "A real-time device location tracker that synchronizes live coordinates across connected clients on an interactive map.",
    stack: ["Node", "Express", "Socket.IO", "Leaflet", "JavaScript"],
    live: "https://realtime-device-track-sv6k.onrender.com",
    github: "https://github.com/vridhi14/Realtime-Device-Track"
  }
];

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "vridhi-portfolio-api", time: new Date().toISOString() });
});

router.get("/projects", (_req, res) => {
  res.json(projects);
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, message: "Please fill in all fields." });
    }
    const saved = await Message.create({ name, email, message });
    res.status(201).json({ ok: true, message: "Message received. Thank you!", id: saved._id });
  } catch {
    res.status(500).json({ ok: false, message: "Unable to save your message right now." });
  }
});

export default router;
