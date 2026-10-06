// Homepage showcase, hand-picked. Everything else is on /projects.
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
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80&auto=format&fit=crop",
    tint: "from-emerald-400/40",
  },
  {
    title: "LMS Portal",
    date: "Live",
    description:
      "A hybrid online-learning portal: a production-level EdTech platform for courses and learners, built on the modern Next.js stack with TypeScript, Tailwind CSS and MongoDB.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "MongoDB"],
    link: "https://lms-ed-teach-eight.vercel.app/",
    type: "Live Demo",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80&auto=format&fit=crop",
    tint: "from-cyan/40",
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
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1400&q=80&auto=format&fit=crop",
    tint: "from-primary/40",
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
    tint: "from-violet/40",
  },
  {
    title: "Weather-App",
    date: "June 2022 - July 2022",
    description:
      "A full-stack weather forecasting tool providing real-time updates on temperature, precipitation, and wind speed. Features hourly and weekly forecasts via API integration.",
    tech: ["Node.js", "Express.js", "React.js", "HBS", "CSS"],
    link: "https://weather-app-krish.onrender.com/",
    type: "Live Demo",
    image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1400&q=80&auto=format&fit=crop",
    tint: "from-sky-400/40",
  },
  {
    title: "Car Rental System",
    date: "Aug 2024",
    description:
      "A robust Java-based application designed to manage car inventories, customer records, and rental transactions. Handles core functionalities like booking, availability checks, and returns.",
    tech: ["Java", "OOPs", "Car Inventory Management"],
    link: "https://github.com/KriXsh/Car-rental-system-Java",
    type: "GitHub",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80&auto=format&fit=crop",
    tint: "from-violet/40",
  },
];
