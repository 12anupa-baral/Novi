import type { ReactNode } from "react";

export interface Notification {
  text: string;
  icon: string;
  color: string;
}

export interface Step {
  num: string;
  title: string;
  body: string;
  visual: ReactNode;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  bg?: string;
}

export interface Task {
  title: string;
  tag: string;
  tc: string;
  tt: string;
  assignee: string;
  active?: boolean;
  done?: boolean;
}

export interface ColumnData {
  col: string;
  dot: string;
  count: number;
  tasks: Task[];
}
