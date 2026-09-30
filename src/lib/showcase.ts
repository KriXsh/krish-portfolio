// Projects shown as live, interactive previews on /projects. Only list sites
// that allow embedding (no X-Frame-Options / frame-ancestors block).
// `repo` matches the GitHub repo name so stars and language come from GitHub.

export type LiveProject = {
  repo: string;
  title: string;
  url: string;
  blurb: string;
  tags: string[];
  /** On-site version of the project, if one exists (shown as "Try it out"). */
  tryHref?: string;
};

export const LIVE_PROJECTS: LiveProject[] = [
  {
    repo: "LMS-ED-teach",
    title: "LMS Portal",
    url: "https://lms-ed-teach-eight.vercel.app",
    blurb: "Hybrid online-learning portal: a production-level EdTech platform for courses and learners.",
    tags: ["Next.js 15", "TypeScript", "MongoDB"],
  },
  {
    repo: "StockX-ai",
    title: "StockX AI Portal",
    url: "https://stock-x-ai.vercel.app",
    blurb: "Stock research platform with live pricing, AI market recaps, sentiment-tagged news and pro charting.",
    tags: ["Next.js", "AI", "Market data"],
  },
  {
    repo: "Pathfinding-Visualizer",
    title: "Pathfinding Visualizer",
    url: "https://pathfinding-visualizer-theta-puce.vercel.app",
    tryHref: "/projects/pathfinding",
    blurb: "Draw walls, drop start and end nodes, and watch Dijkstra find the shortest path in real time.",
    tags: ["React", "Algorithms", "Graphs"],
  },
  {
    repo: "SortFusion-UI",
    title: "Sort-Fusion",
    url: "https://sort-fusion-ui.vercel.app",
    blurb: "Interactive visualizer for sorting algorithms, showing every swap and comparison as it happens.",
    tags: ["React", "Data structures", "Tailwind"],
  },
];

/** GitHub's own language colours, for the dots on repo cards. */
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Go: "#00ADD8",
};

export const languageColor = (lang: string | null) => (lang && LANGUAGE_COLORS[lang]) || "#8b949e";
