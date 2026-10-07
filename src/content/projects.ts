// Homepage showcase, hand-picked. Everything else is on /projects.
// Images are real screenshots of each project (public/projects/), toned to the
// site palette in the Projects section.
// Also read by the KAI chat assistant (src/lib/chat).
export const PROJECTS = [
  {
    title: "StockX AI Portal",
    date: "Live",
    description:
      "A professional stock research platform with live pricing, AI-generated market recaps, news with AI sentiment, advanced charting, earnings analysis and watchlists, all in one unified portal.",
    tech: ["Next.js", "AI Recaps", "AI Sentiment", "Live Market Data", "Vercel"],
    link: "https://stock-x-ai.vercel.app/",
    type: "Live Demo",
    image: "/projects/stockx.webp",
  },
  {
    title: "LMS Portal",
    date: "Live",
    description:
      "A hybrid online-learning portal: a production-level EdTech platform for courses and learners, built on the modern Next.js stack with TypeScript, Tailwind CSS and MongoDB.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "MongoDB"],
    link: "https://lms-ed-teach-eight.vercel.app/",
    type: "Live Demo",
    image: "/projects/lms.webp",
  },
  {
    title: "Pathfinding Visualizer",
    date: "June 2022 - Dec 2022",
    description:
      "An interactive visualizer for Dijkstra, A*, BFS and DFS. Draw walls and weighted terrain, generate mazes, and watch each search explore the grid node by node, then drag the start or target to re-route live.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    link: "https://pathfinding-visualizer-theta-puce.vercel.app/",
    type: "Live Demo",
    // Native, on-site version of the visualizer.
    tryHref: "/projects/pathfinding",
    image: "/projects/pathfinding.webp",
  },
  {
    title: "SortFusion",
    date: "Live",
    description:
      "An interactive visualizer for eight sorting algorithms, from Bubble to Quick, Merge and Heap sort. Step through every compare and swap, scrub the timeline, follow the highlighted pseudocode, or sort your own numbers.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    link: "https://sort-fusion-ui.vercel.app/",
    type: "Live Demo",
    // Native, on-site version of the visualizer.
    tryHref: "/projects/sorting",
    image: "/projects/sortfusion.webp",
  },
  {
    title: "Weather-App",
    date: "June 2022 - July 2022",
    description:
      "A full-stack weather forecasting tool providing real-time updates on temperature, precipitation, and wind speed. Features hourly and weekly forecasts via API integration.",
    tech: ["Node.js", "Express.js", "React.js", "HBS", "CSS"],
    link: "https://weather-app-krish.onrender.com/",
    type: "Live Demo",
    image: "/projects/weather.webp",
  },
];
