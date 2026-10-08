// Real recommendations only - copy them from your LinkedIn profile
// (Profile → Recommendations → Received) with the author's permission.
// The homepage section and /testimonials page stay hidden while this is empty.
// Order = display order (the homepage spotlight starts with the first one).

export type Testimonial = {
  name: string;
  /** Their LinkedIn headline, e.g. "Engineering Manager at Acme". */
  headline: string;
  /** LinkedIn's relationship line, e.g. "managed Krishnendu directly". */
  relationship: string;
  /** Month and year as LinkedIn shows it, e.g. "March 2025". */
  date: string;
  text: string;
  /** Link to their LinkedIn profile (optional). */
  profileUrl?: string;
  /** Square photo URL (optional - initials are shown otherwise). */
  avatar?: string;
  /** The line the homepage spotlight shows: copied word for word from `text`
      ("…" marks words left out). Entries without one stay on /testimonials. */
  highlight?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  // Direct manager first.
  {
    name: "Naresh Ahirwar",
    headline: "🇮🇳 Lead Engineer @Invincible | System Design Enthusiast | Microservices | AWS | ELK | Redis | Docker",
    relationship: "managed Krishnendu directly",
    date: "December 21, 2024",
    text: "Had a great time working with Krish. He's more confident than his code, but he always managed to deliver the features on his own. All the best, buddy! Enjoy!",
    highlight: "Had a great time working with Krish… he always managed to deliver the features on his own.",
  },
  {
    name: "Shriyansh Agarwal",
    headline: "Software Engineer II | Crafting Reliable & Scalable Products | AI/ML, Cloud & Full Stack",
    relationship: "worked with Krishnendu but on different teams",
    date: "June 20, 2024",
    text: "I have had the privilege of working with Krishnendu, a remarkable Software Engineer specializing in backend development. His expertise in the MERN stack and a passion for DevOps and cloud innovations make him an exceptional asset to any team.\n\nKrishnendu excels in creating high-velocity server-side applications and avant-garde digital solutions. His AWS expertise spans EC2, S3, and CI/CD pipelines, ensuring seamless deployments. He has architected over 350 APIs, enhancing system efficiency with Redis cache memory and conducting thorough API tests using Postman for reliability.\n\nHis dedication to performance optimization is evident in his work with MongoDB and SQL databases, achieving a 40% reduction in query response time and a 25% increase in efficiency. His implementation of an RBAC framework with JWT authentication showcases his commitment to robust security.\n\nKrishnendu's ability to merge frontend finesse, backend prowess, and DevOps intrigue sets him apart. He views every challenge as an opportunity for growth and innovation.\n\nI highly recommend Krishnendu for any role that values his skills and propels him into new realms of expertise. His contributions are invaluable, and he will continue to excel and inspire in all his future endeavors.",
    highlight:
      "He has architected over 350 APIs, enhancing system efficiency with Redis cache memory…",
  },
  {
    name: "Pranjul Mishra",
    headline: "Full Stack Developer | Backend Lead | DevOps | Software Engineer II at Roboi Pvt. Ltd.",
    relationship: "worked with Krishnendu on the same team",
    date: "June 16, 2024",
    text: "I have had the privilege of collaborating with Krishnendu for the past year, during which time he consistently showcased exceptional proficiency as a back-end developer. His expertise is evidenced by the development of numerous APIs deployed both nationally and internationally. He adeptly managed various AWS instances and services, contributing significantly to operational efficiency.\n\nHe distinguished himself as our primary resource for DevOps and microservices development, reflecting his deep knowledge and proactive approach in these areas. His commitment to continuous learning is commendable, having pursued multiple professional development opportunities both within our organization and externally.\n\nHis project management skills are exemplary, consistently delivering results ahead of schedule, even under tight deadlines. He is characterized by his remarkable patience, leadership in development contexts, and a supportive colleague that ensures he is always available to assist when needed.",
    highlight:
      "He distinguished himself as our primary resource for DevOps and microservices development, reflecting his deep knowledge and proactive approach in these areas.",
  },
  {
    name: "Dilip Yadav",
    headline: "Performance Marketing Specialist at Invincible | Market Research, Workflow Optimization & End-to-End Execution",
    relationship: "was senior to Krishnendu but didn't manage Krishnendu directly",
    date: "May 8, 2024",
    text: "I had the pleasure of collaborating with Krishnendu at Invincible Ocean, where their expertise in backend development, including Node.js, and DevOps played a crucial role in our projects. Krishnendu's skill in architecting scalable systems, implementing DevOps best practices, managing authentication, and building both in-house and public APIs, including features such as whitelist IP and white-label websites, significantly contributed to our success. With their strong technical skills and collaborative approach, Krishnendu is a valuable asset to any team.",
    highlight:
      "Krishnendu's skill in architecting scalable systems, implementing DevOps best practices… significantly contributed to our success.",
  },
  {
    name: "Trishant Pahwa",
    headline: "I like to scale!",
    relationship: "worked with Krishnendu but on different teams",
    date: "February 23, 2024",
    text: "Krishnendu has a deep inclination towards learning new technologies. In multiple scenarios, he showcased his efforts to optimise the current algorithms and architecture of the projects he's working on.\n\nAnyhow, as a backend developer, he is diligent and hard-working, a great hustler. As it is his initial stage of his career, he has been trying his level best to explore new technologies, code architectures, optimise the algorithms in terms of time complexity.\n\nWith his continuous efforts, I deeply believe that he is a great asset to the company, a great team-player, and most importantly fun to work around with.",
    highlight:
      "In multiple scenarios, he showcased his efforts to optimise the current algorithms and architecture of the projects he's working on.",
  },
];

export const LINKEDIN_RECOMMENDATIONS_URL = "https://www.linkedin.com/in/krish-me/details/recommendations/";
