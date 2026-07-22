// All copy verbatim from C1 01_content_brief.md — no rewording, no abridging.
// Ranges use `~` per C1's stated convention (no hyphen ranges).

export const nav = {
  logo: "EMBER & OAK",
  links: ["Origins", "Roast", "Brew", "Our Story", "Shop"],
  cta: "Shop the roast",
};

export const hero = {
  eyebrow: "SMALL BATCH · SINCE THE FIRST CRACK",
  headline: "We roast where the mountain leaves off.",
  sub: "Every bean travels from 1,500 meters of volcanic slope to a 200°C first crack — roasted by hand, in batches small enough to taste every one.",
  cta1: "Shop this week's roast",
  cta2: "Watch a roast",
};

export const story = {
  label: "OUR STORY",
  title: "Coffee is a process, not a product.",
  body: "Most beans are roasted by the ton and forgotten. We do it the slow way. Green coffee arrives at our door in paper sacks, still smelling of the farm. We cup every lot, build a roast curve by hand, and stand at the drum listening for the crack. What comes out is never the same twice — and that's exactly the point.",
};

export const origins = {
  label: "WHERE IT GROWS",
  title: "The best coffee is grown thin on the air.",
  body: "Above 1,200 meters the cherries ripen slowly. Cool nights and thin air stall the fruit just long enough for its sugars to concentrate and its seed to grow dense — and density is where flavor lives. We source only high-grown lots, between 1,200 and 1,800 meters, from farms we can name.",
  cards: [
    {
      country: "Ethiopia",
      region: "Yirgacheffe",
      altitude: "1,900m",
      notes: "blueberry, jasmine, bergamot",
      accent: "var(--org-ethiopia)",
      image: "/assets/images/cherries-picked.jpg",
      imageAlt: "Hands cupping freshly picked red coffee cherries against the tree's green leaves",
      pin: { top: "34%", left: "56%" },
    },
    {
      country: "Colombia",
      region: "Huila",
      altitude: "1,600m",
      notes: "caramel, red apple, cocoa",
      accent: "var(--org-colombia)",
      image: "/assets/images/green-beans-scoop.jpg",
      imageAlt: "A wooden scoop lifting raw green coffee beans from a burlap sack",
      pin: { top: "58%", left: "27%" },
    },
    {
      country: "Kenya",
      region: "Nyeri",
      altitude: "1,750m",
      notes: "blackcurrant, tomato, cane sugar",
      accent: "var(--org-kenya)",
      image: "/assets/images/beans-sea.jpg",
      imageAlt: "A vast spread of ripe coffee cherries drying in the sun",
      pin: { top: "46%", left: "58%" },
    },
  ],
};

export const roast = {
  label: "HOW WE ROAST",
  title: "From first crack to the last degree.",
  body: "Roasting is a conversation with heat. At around 200°C the beans hit first crack — the moment they open up and the real decisions begin. Drop early and you keep the fruit and the acidity. Stay in longer and the sugars caramelize into body and depth. Slide through our three profiles and watch the bean change.",
  levels: [
    {
      key: "light",
      name: "Light",
      temp: "196~205°C",
      time: "6~9분",
      notes: "과일향 · 산미",
      color: "var(--roast-light)",
      weight: 340,
      image: "/assets/images/roast-bean-light.jpg",
    },
    {
      key: "medium",
      name: "Medium",
      temp: "210~219°C",
      time: "7~11분",
      notes: "단맛 · 균형",
      color: "var(--roast-medium)",
      weight: 520,
      image: "/assets/images/roast-bean-medium.jpg",
    },
    {
      key: "dark",
      name: "Dark",
      temp: "225~245°C",
      time: "12~15분",
      notes: "바디 · 카라멜",
      color: "var(--roast-dark)",
      weight: 720,
      image: "/assets/images/roast-bean-dark.jpg",
    },
  ],
};

export const data = {
  label: "BY THE NUMBERS",
  title: "Small batch, measured to the degree.",
  body: "Nothing here is guesswork. Every cup rests on numbers — the altitude it grew at, the temperature it cracked at, the ratio it's brewed at. Here's the science behind the slowest coffee you'll drink this week.",
};

export const ig1 = {
  firstCrack: 200,
  axisMin: 190,
  axisMax: 250,
  rows: [
    { name: "Light", tempMin: 196, tempMax: 205, time: "6~9분", tag: "과일향 · 산미", color: "var(--roast-light)" },
    { name: "Medium", tempMin: 210, tempMax: 219, time: "7~11분", tag: "단맛 · 균형", color: "var(--roast-medium)" },
    { name: "Dark", tempMin: 225, tempMax: 245, time: "12~15분", tag: "바디 · 카라멜", color: "var(--roast-dark)" },
  ],
};

export const ig2 = {
  axisMin: 1000,
  axisMax: 2000,
  bandMin: 1200,
  bandMax: 1800,
  label: "고도 ↑ = 생두 밀도 ↑ = 향미 화합물 ↑",
  pins: [
    { name: "Yirgacheffe", altitude: 1900, color: "var(--org-ethiopia)" },
    { name: "Nyeri", altitude: 1750, color: "var(--org-kenya)" },
    { name: "Huila", altitude: 1600, color: "var(--org-colombia)" },
  ],
};

export const ig3 = {
  ratio: "1 : 16",
  tempMin: 92,
  tempMax: 96,
  gaugeMin: 80,
  gaugeMax: 100,
  tds: "TDS 1.15~1.35%",
};

export const ig4 = {
  from: { year: 2025, value: 111.5 },
  to: { year: 2033, value: 251.7 },
  cagr: "CAGR 10.8%",
  ageShare: { label: "18~24세", value: 32.3 },
  regionShare: { label: "북미", value: 50.7 },
};

export const brew = {
  label: "BREW IT RIGHT",
  title: "1 gram of coffee. 16 grams of water. One good morning.",
  body: "You did the hard part by buying beans worth brewing well. The rest is a ratio. Weigh 1 part coffee to 16 parts water, pour between 92 and 96°C, and give it four minutes. That's the golden cup — and it's easier than the espresso machine you almost bought.",
  steps: [
    { num: "01", name: "Dose", detail: "20g coffee, medium-fine grind", atSeconds: 0 },
    { num: "02", name: "Bloom", detail: "40g water at 94°C, wait 30s", atSeconds: 30 },
    { num: "03", name: "Pour", detail: "top up to 320g, finish by 3:30", atSeconds: 210 },
  ],
  totalSeconds: 210,
};

export const shop = {
  title: "Taste this week's roast.",
  body: "We roast in small batches and ship within 48 hours of the crack. Pick a bag, or let a subscription send a fresh roast to your door every two weeks — always named, always dated, never sitting on a shelf.",
  cta1: "Shop single origins",
  cta2: "Start a subscription",
  trust: [
    { icon: "package" as const, label: "Roasted to order" },
    { icon: "truck" as const, label: "Shipped within 48 hours" },
    { icon: "coffee" as const, label: "Free shipping over $40" },
  ],
};

export const footer = {
  tagline: "EMBER & OAK — roasted where the mountain leaves off.",
  columns: [
    { title: "Shop", links: ["Single Origins", "Subscriptions", "Gear"] },
    { title: "Learn", links: ["Origins", "Roast", "Brew"] },
    { title: "Company", links: ["Our Story", "Sustainability", "Contact"] },
  ],
  newsletterTitle: "Get the drop.",
  newsletterSub: "One email when a new roast lands. Nothing else.",
  copyright: "© 2026 Ember & Oak Roasters",
  marquee: "SMALL BATCH · ROASTED TO ORDER · SHIPPED WITHIN 48 HOURS · ",
  sources: [
    "Grand View Research — Specialty Coffee Market Report",
    "Sweet Maria's — Use All Five Senses to Determine Degree of Roast",
    "notNot Coffee — Coffee Roasting Time & Temperature Chart",
    "Coffee Hero — Altitude & the V60 Golden Ratio",
    "Methodical Coffee — Coffee-to-Water Ratio Guide",
    "Daily Rise Coffee — SCA Brewing Standards",
  ],
};
