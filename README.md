# Aditya.OS — Futuristic Developer Portfolio

Aditya.OS is an ultra-premium, production-quality developer portfolio themed as an interactive operating system terminal. Its design is heavily inspired by Apple, Vercel, Linear, and Awwwards, showcasing high-fidelity animations, 3D graphics, and smooth interactive elements.

## 🚀 Live Demo & Showcase
- **OS Theme**: Custom bootscreen loader, mouse coordinates parallax, floating macOS dock.
- **3D Canvas**: Real-time floating holographic cyber-laptop responsive to pointer moves.
- **AI Terminal**: Built-in chatbot simulating terminal commands with smart predefined system answers.
- **Command Palette**: Fully keyboard-accessible search modal triggered via `Cmd/Ctrl + K`.

---

## 🛠️ Tech Stack & Architecture

- **Core**: React 19, Vite, Tailwind CSS, React Router, custom CSS backdrop filters (Glassmorphism).
- **Smooth Orchestration**: Lenis smooth scrolling, Framer Motion spring-physics, GSAP timeline.
- **Holographics**: Three.js, React Three Fiber (R3F), Drei.
- **Integrations**: EmailJS (with diagnostic payload preview panel), React Icons, React Helmet Async (SEO config).

---

## 📂 Directory Layout

```text
src/
├── assets/         # Project media and binary assets
├── components/
│   ├── common/     # SectionHeading, TechBadge, ThemeGlow
│   ├── ui/         # Cursor, ScrollProgress, MagneticButton, TiltCard, CommandPalette, FloatingDock, Loader
│   ├── chatbot/    # Terminal Chatbot accessory
│   └── three/      # React Three Fiber canvas
├── sections/       # Hero, About, Skills, Projects, Experience, Contact, Footer
├── data/           # Configurable mock logs, projects, and chatbot arrays
├── hooks/          # usePrefersReducedMotion hook
└── styles/         # Global style sheets (Lenis, Scrollbars, and animations)
```

---

## ⚙️ Local Installation & Development

To spin up the development environment, execute the following commands in your terminal:

```bash
# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Run the Vite local development server
npm run dev
```

The application will start on `http://localhost:3000`.

### 📧 Mail Server Customization (EmailJS)
To enable real-time mail dispatching via the Contact form, populate these keys in your `.env` file at the root:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```
If no keys are present, the contact form will operate in an interactive simulation mode, showing simulated transmissions.

---

## 📄 License
This project is licensed under the MIT License.
