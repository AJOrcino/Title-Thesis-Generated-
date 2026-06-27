import { useState } from "react";
import titles from "./data/titles";

const majors = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Cybersecurity",
  "Data Science",
];

const templates = [
  "AI-powered {topic} for {major} using {method}",
  "Design and development of a {subject} {topic} for {major}",
  "A comparative study of {method} techniques for {topic}",
  "Evaluating {subject} approaches in {topic} for {major}",
  "Improving {topic} with {method} in {major}",
  "A secure {topic} framework for {major} using {method}",
  "Smart {topic} using {method} for {major}",
];

const subjects = [
  "AI-powered",
  "Cloud-based",
  "Blockchain-enabled",
  "Data-driven",
  "Smart",
  "Intelligent",
  "Mobile",
  "Adaptive",
];

const topics = [
  "student attendance system",
  "network intrusion detection system",
  "face recognition application",
  "recommendation engine",
  "smart traffic management platform",
  "e-commerce chatbot",
  "healthcare monitoring solution",
  "learning analytics dashboard",
  "predictive maintenance system",
  "virtual classroom assistant",
];

const methods = [
  "machine learning",
  "deep learning",
  "edge computing",
  "blockchain",
  "natural language processing",
  "computer vision",
  "data mining",
  "cloud computing",
];

const getToolsForTitle = (title, major) => {
  const normalizedTitle = (title || "").toLowerCase();
  const normalizedMajor = (major || "").toLowerCase();
  const tools = new Set();

  const addTools = (...items) => items.forEach((item) => tools.add(item));

  const isWebProject = /(web|website|online|dashboard|platform|portal|management system|e-commerce|chatbot|application)/.test(normalizedTitle);
  const isMobileProject = /(mobile|android|ios|app|phone|smartphone|flutter|react native)/.test(normalizedTitle);
  const isDesktopProject = /(desktop|windows|gui|software|client|pc|application)/.test(normalizedTitle);
  const isEmbeddedProject = /(iot|arduino|sensor|embedded|gsm|microcontroller|hardware)/.test(normalizedTitle);
  const isAiProject = /(machine learning|deep learning|ai|predictive|recommendation|analytics|vision|nlp|intelligent|recognition)/.test(normalizedTitle);
  const isSecurityProject = /(security|intrusion|cyber|secure|encryption|network|attack)/.test(normalizedTitle);
  const isDatabaseProject = /(database|sql|mysql|postgres|mongodb|query|record|inventory|attendance|management)/.test(normalizedTitle);

  if (isWebProject) {
    addTools("HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MySQL");
  }

  if (isMobileProject) {
    addTools("Flutter", "React Native", "Kotlin", "Swift", "Firebase");
  }

  if (isDesktopProject) {
    addTools("C#", ".NET", "Java", "Python", "Visual Studio");
  }

  if (isEmbeddedProject) {
    addTools("C/C++", "Arduino", "IoT", "Embedded Systems");
  }

  if (isAiProject) {
    addTools("Python", "TensorFlow", "Scikit-learn", "OpenCV");
  }

  if (isSecurityProject) {
    addTools("Cybersecurity", "Kali Linux", "Wireshark", "Nmap");
  }

  if (isDatabaseProject) {
    addTools("SQL", "MongoDB", "Database Design");
  }

  if (/(cloud|azure|aws|docker|serverless)/.test(normalizedTitle)) {
    addTools("Cloud Services", "Docker");
  }

  if (/(blockchain|smart contract|ethereum|solidity)/.test(normalizedTitle)) {
    addTools("Blockchain", "Solidity");
  }

  if (normalizedMajor.includes("data")) {
    addTools("Python", "Pandas", "Jupyter Notebook");
  }

  if (normalizedMajor.includes("cyber")) {
    addTools("Kali Linux", "Nmap", "Cybersecurity");
  }

  if (normalizedMajor.includes("software")) {
    addTools("Git", "Testing", "Agile");
  }

  if (normalizedMajor.includes("information")) {
    addTools("Linux", "Networking", "Cloud Services");
  }

  if (normalizedMajor.includes("computer")) {
    addTools("C++", "Algorithms", "Data Structures");
  }

  if (tools.size === 0) {
    addTools("HTML", "CSS", "JavaScript", "React", "Node.js", "Express");
  }

  return Array.from(tools);
};

const randomItem = (list) => list[Math.floor(Math.random() * list.length)];

const buildTitle = (major) => {
  if (Math.random() < 0.35 && titles.length > 0) {
    const baseTitle = randomItem(titles);
    return `${baseTitle} for ${major}`;
  }

  const template = randomItem(templates);
  return template
    .replace("{subject}", randomItem(subjects))
    .replace("{topic}", randomItem(topics))
    .replace("{method}", randomItem(methods))
    .replace("{major}", major);
};

const defaultTitle = "Click generate to create a research title for your computer-related major.";

function App() {
  const [selectedMajor, setSelectedMajor] = useState(majors[0]);
  const [title, setTitle] = useState("");
  const [history, setHistory] = useState([]);
  const [inactiveSelection, setInactiveSelection] = useState(null);

  const currentTools = getToolsForTitle(title, selectedMajor);
  const inactiveTools = inactiveSelection
    ? getToolsForTitle(inactiveSelection.title, inactiveSelection.major)
    : [];

  const generateTitle = () => {
    const nextTitle = buildTitle(selectedMajor);
    setTitle(nextTitle);
    setHistory((prev) => [{ title: nextTitle, major: selectedMajor }, ...prev].slice(0, 5));
  };

  const handleMajorChange = (value) => {
    if (value !== selectedMajor && title) {
      setInactiveSelection({ major: selectedMajor, title });
    }
    setSelectedMajor(value);
    setTitle("");
  };

  const copyTitle = async () => {
    try {
      await navigator.clipboard.writeText(title);
      window.alert("Title copied to clipboard.");
    } catch {
      window.alert("Unable to copy automatically. Please copy the title manually.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[32px] border border-slate-700 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Research Title Generator
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">
            Generate research title ideas for computer-related majors.
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300 sm:text-lg">
            This tool randomly generates research title ideas for your reference or
            inspiration. Choose a major and create titles for thesis, capstone,
            or research projects in computing fields.
          </p>
        </section>

        <section className="grid gap-8 items-start lg:grid-cols-[1.5fr_1fr]">
          <div className="mx-auto w-full max-w-[780px] rounded-[28px] border border-slate-700 bg-slate-900 p-8 shadow-xl shadow-slate-950/20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Major category
                </p>
                <p className="mt-2 text-slate-300">
                  Select the computer-related major you want to generate titles for.
                </p>
              </div>

              <div className="relative mt-4 w-full max-w-[320px] sm:mt-0">
                <select
                  value={selectedMajor}
                  onChange={(event) => handleMajorChange(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 pr-10 text-sm text-slate-100 outline-none appearance-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25 mt-7 ml-2"
                >
                  {majors.map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400 text-xs mt-7">
                  ▼
                </span>
              </div>
            </div>

            <div className="mt-10 rounded-[24px] border border-slate-700 bg-slate-950 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Generated title
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl break-words">
                {title || defaultTitle}
              </h2>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={generateTitle}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
              >
                Generate new title
              </button>
              <button
                onClick={copyTitle}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300 sm:w-auto"
              >
                Copy title
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <aside className="rounded-[28px] border border-slate-700 bg-slate-900 p-8 shadow-xl shadow-slate-950/10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Current title info
              </p>
              <div className="mt-5 rounded-[24px] border border-slate-700 bg-slate-950 p-5 max-h-[280px] overflow-y-auto">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Active selection details
                </p>
                <div className="mt-3 rounded-3xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Title
                  </p>
                  <p className="mt-2 min-h-[3rem] break-words text-slate-100">
                    {title || <span className="text-slate-500">None</span>}
                  </p>
                </div>
                <p className="mt-4 text-slate-300">
                  <span className="font-semibold text-cyan-300">Major selection:</span> {selectedMajor}
                </p>
                {title && (
                  <div className="mt-4 text-sm text-slate-300">
                    <p className="font-semibold text-cyan-300">Suggested tools</p>
                    <ul className="mt-2 space-y-2">
                      {currentTools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Inactive selection
                  </p>
                  {inactiveSelection ? (
                    <div className="mt-3 rounded-2xl bg-slate-950 p-3">
                      <p className="text-sm text-cyan-300">{inactiveSelection.major}</p>
                      <p className="mt-1 text-sm leading-snug text-slate-100">
                        {inactiveSelection.title || "No title generated"}
                      </p>
                      <div className="mt-4 text-sm text-slate-300">
                        <p className="font-semibold text-cyan-300">Suggested tools</p>
                        <ul className="mt-2 space-y-2">
                          {inactiveTools.map((tool) => (
                            <li key={tool}>{tool}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-2 text-slate-500">No inactive selection yet.</p>
                  )}
                </div>
              </div>
            </aside>

            <aside className="rounded-[28px] border border-slate-700 bg-slate-900 p-8 shadow-xl shadow-slate-950/10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Recent ideas
              </p>
              <p className="mt-2 text-slate-400">
                Keep a list of the most recent titles you generated for quick review.
              </p>
              <ul className="mt-6 space-y-4 max-h-[260px] overflow-y-auto pr-2">
                {history.length === 0 ? (
                  <li className="rounded-3xl border border-dashed border-slate-700 bg-slate-950 px-5 py-4 text-slate-500">
                    No recent titles yet. Generate a title to begin.
                  </li>
                ) : (
                  history.map((entry, index) => (
                    <li
                      key={`${entry.title}-${index}`}
                      className="rounded-3xl border border-slate-700 bg-slate-950 px-5 py-4"
                    >
                      <p className="text-sm font-semibold text-cyan-300">
                        {entry.major}
                      </p>
                      <p className="mt-2 text-slate-100">{entry.title}</p>
                    </li>
                  ))) }
              </ul>
            </aside>
          </div>
        </section>
      </div>
      <footer className="mt-12 text-center text-sm text-slate-400">
        Developed by Allen Jefferson Orcino
      </footer>
    </div>
  );
}

export default App;
