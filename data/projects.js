export const categories = [ "Full Stack", "Frontend", "AI / ML", "Open Source"];

export const projects = [
 {
  id: "scene-pe-scene",
  title: "Scene Pe Scene",
  tagline: "Bollywood movie guessing game with blur-reveal mechanics and live scoring",
  image:
    "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1400&auto=format&fit=crop",
  category: "Frontend",
  tech: ["React", "Vite", "CSS3", "Vercel"],
  year: "2025",
  links: { demo: "https://scenepesceneindianstudies.vercel.app/", repo: "http://github.com/shaikabdullah1058/scene-pe-scene" },
  caseStudy: {
    problem:
      "Wanted to build a fun, shareable quiz game around Indian cinema that went beyond simple multiple-choice — something that rewarded genuine film knowledge and created tension through time pressure and progressive image reveals rather than just guessing from a list.",
    architecture:
      "Built as a single-page React app with Vite for instant HMR during development and a sub-second Vercel cold start in production. Game state is managed entirely in React hooks — no external store needed. Each round runs a 30-second countdown timer via setInterval synced to an SVG ring animation. Images load blurred at 18px and sharpen progressively when players spend reveal tokens, with CSS transitions handling the visual state. A fuzzy answer matcher normalises input and checks word overlap so 'DDLJ' and 'Dilwale Dulhania Le Jayenge' both score correctly.",
    learnings:
      "Discovered that timer drift compounds badly when setInterval is combined with React re-renders — solved it by storing the interval ref outside the render cycle with useRef and clearing aggressively on every state transition. Also found that blur-then-reveal is far more engaging than a static image, since it gives players a second decision point mid-round.",
    metrics: [
      { label: "Questions", value: "30+ across Bollywood & Telugu" },
      { label: "Difficulty tiers", value: "3 (Easy / Medium / Hard)" },
      { label: "Bundle size", value: "< 120 KB gzipped" },
    ],
  },
},
];
