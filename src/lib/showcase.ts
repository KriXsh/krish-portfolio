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
    blurb: "Watch Dijkstra, A*, BFS and DFS explore a grid node by node. Draw walls and weights, generate mazes, and drag markers to re-route live.",
    tags: ["Next.js", "TypeScript", "Graph algorithms"],
  },
  {
    repo: "SortFusion-UI",
    title: "Sort-Fusion",
    url: "https://sort-fusion-ui.vercel.app",
    tryHref: "/projects/sorting",
    blurb: "Eight sorting algorithms animated step by step, with live pseudocode, a scrubbable timeline and your own numbers.",
    tags: ["Next.js", "TypeScript", "Sorting algorithms"],
  },
];

/** GitHub's own language colours, for the dots on repo cards. */
// Each language gets its own shade from the rose palette (wine, blush, copper,
// champagne...) instead of GitHub's rainbow, so the charts sit in the theme.
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#c8475c",
  JavaScript: "#e3c4ab",
  Python: "#c08457",
  Java: "#e8a9a1",
  CSS: "#8e2236",
  HTML: "#d9a77f",
  Shell: "#9e4a6a",
  Go: "#b88a67",
};

export const languageColor = (lang: string | null) => (lang && LANGUAGE_COLORS[lang]) || "#6e575a";
