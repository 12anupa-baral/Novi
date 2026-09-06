import { C } from "../theme/color";
import type { Notification, Testimonial, ColumnData } from "../types";

// Navigation

export const NAV_LINKS = ["About", "Product", "Pricing", "Blog"] as const;

// Live Board notifications
export const NOTIFS: Notification[] = [
  { text: "Lena marked Redesign settings as Done", icon: "✓", color: C.green },
  { text: "Marcus started Mobile app beta", icon: "→", color: C.accent },
  { text: "Sprint 9 is now 73% complete", icon: "▲", color: C.violet },
];

// Testimonials

export const QUOTES: Testimonial[] = [
  {
    quote: "We canceled three other tools the week we switched to Novi.",
    name: "Priya Mehta",
    role: "CPO, Fieldnote",
    initials: "PM",
    bg: "#251a3a",
  },
  {
    quote:
      "Standup got 10 minutes shorter because everyone already knows what's happening.",
    name: "Tom Carey",
    role: "Eng lead, Daybreak Labs",
    initials: "TC",
    bg: "#1a2e22",
  },
  {
    quote: "It's the first PM tool our designers actually open unprompted.",
    name: "Soo-Jin Park",
    role: "Design director, Arbor Co",
    initials: "SJ",
    bg: "#2a1a14",
  },
  {
    quote:
      "Migration from Asana took 20 minutes. I was skeptical it would actually work.",
    name: "Alex Rivera",
    role: "Founder, Patchwork",
    initials: "AR",
    bg: "#1a1a2e",
  },
  {
    quote:
      "Our remote team finally feels in sync. Threads + board is the combo we needed.",
    name: "Nina Koch",
    role: "Head of Product, Linea Studio",
    initials: "NK",
    bg: "#2a2a14",
  },
  {
    quote: "Every sprint since we started using Novi has shipped on time.",
    name: "James Osei",
    role: "CTO, Volta Build",
    initials: "JO",
    bg: "#1a2a2a",
  },
];

//Board columns
export const BOARD_COLUMNS: ColumnData[] = [
  {
    col: "To Do",
    dot: C.fgDim,
    count: 2,
    tasks: [
      {
        title: "Audit onboarding flow",
        tag: "UX",
        tc: "#251a3a",
        tt: C.violet,
        assignee: "L",
      },
      {
        title: "Write release notes",
        tag: "Docs",
        tc: "#1a2e22",
        tt: C.green,
        assignee: "M",
      },
    ],
  },
  {
    col: "In Progress",
    dot: C.accent,
    count: 1,
    tasks: [
      {
        title: "Redesign settings page",
        tag: "Design",
        tc: "#2a2a14",
        tt: C.accent,
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
    dot: C.green,
    count: 3,
    tasks: [
      {
        title: "Ship v2.4.0",
        tag: "Release",
        tc: "#1a2e22",
        tt: C.green,
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

//liveboard sidebaritems
export const SIDEBAR_ITEMS = [
  { icon: "⌂", label: "Home", active: false },
  { icon: "▦", label: "Sprint 9", active: true },
  { icon: "≡", label: "Backlog", active: false },
  { icon: "◷", label: "Timeline", active: false },
  { icon: "⌁", label: "Threads", active: false },
  { icon: "◈", label: "Docs", active: false },
] as const;
