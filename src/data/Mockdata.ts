import type { Notification, Testimonial, ColumnData } from "../types";

// Navigation

export const NAV_ROUTES = [
  {
    label: "Product",
    path: "/product",
  },
  {
    label: "Pricing",
    path: "/pricing",
  },
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "About",
    path: "/about",
  },
];

// Live Board notifications

export const NOTIFS: Notification[] = [
  {
    text: "Lena marked Redesign settings as Done",
    icon: "✓",
    color: "var(--green)",
  },
  {
    text: "Marcus started Mobile app beta",
    icon: "→",
    color: "var(--accent)",
  },
  {
    text: "Sprint 9 is now 73% complete",
    icon: "▲",
    color: "var(--violet)",
  },
];

// Testimonials

export const QUOTES: Testimonial[] = [
  {
    quote: "We canceled three other tools the week we switched to Novi.",
    name: "Priya Mehta",
    role: "CPO, Fieldnote",
    initials: "PM",
  },
  {
    quote:
      "Standup got 10 minutes shorter because everyone already knows what's happening.",
    name: "Tom Carey",
    role: "Eng lead, Daybreak Labs",
    initials: "TC",
  },
  {
    quote: "It's the first PM tool our designers actually open unprompted.",
    name: "Soo-Jin Park",
    role: "Design director, Arbor Co",
    initials: "SJ",
  },
  {
    quote:
      "Migration from Asana took 20 minutes. I was skeptical it would actually work.",
    name: "Alex Rivera",
    role: "Founder, Patchwork",
    initials: "AR",
  },
  {
    quote:
      "Our remote team finally feels in sync. Threads + board is the combo we needed.",
    name: "Nina Koch",
    role: "Head of Product, Linea Studio",
    initials: "NK",
  },
  {
    quote: "Every sprint since we started using Novi has shipped on time.",
    name: "James Osei",
    role: "CTO, Volta Build",
    initials: "JO",
  },
];

// Board columns

export const BOARD_COLUMNS: ColumnData[] = [
  {
    col: "To Do",
    dot: "var(--fg-dim)",
    count: 2,
    tasks: [
      {
        title: "Audit onboarding flow",
        tag: "UX",
        tc: "#251a3a",
        tt: "var(--violet)",
        assignee: "L",
      },
      {
        title: "Write release notes",
        tag: "Docs",
        tc: "#1a2e22",
        tt: "var(--green)",
        assignee: "M",
      },
    ],
  },
  {
    col: "In Progress",
    dot: "var(--accent)",
    count: 2,
    tasks: [
      {
        title: "Redesign settings page",
        tag: "Design",
        tc: "#2a2a14",
        tt: "var(--accent)",
        assignee: "K",
        active: true,
      },
      {
        title: "Fix auth token refresh",
        tag: "Eng",
        tc: "#2a1a14",
        tt: "#e0804a",
        assignee: "J",
      },
    ],
  },
  {
    col: "Done",
    dot: "var(--green)",
    count: 1,
    tasks: [
      {
        title: "Ship v2.4.0",
        tag: "Release",
        tc: "#1a2e22",
        tt: "var(--green)",
        assignee: "A",
        done: true,
      },
    ],
  },
];

// Footer

export const FOOTER_GROUPS: Record<string, string[]> = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Docs", "API", "Guides", "Status"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

// Live Board sidebar items

export const SIDEBAR_ITEMS = [
  { icon: "⌂", label: "Home", active: false },
  { icon: "▦", label: "Sprint 9", active: true },
  { icon: "≡", label: "Backlog", active: false },
  { icon: "◷", label: "Timeline", active: false },
  { icon: "⌁", label: "Threads", active: false },
  { icon: "◈", label: "Docs", active: false },
] as const;
