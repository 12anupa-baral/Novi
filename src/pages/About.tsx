import { C } from "../theme/color";

const About = () => {
  return (
    <div className="py-24">
      <h1 className="font-display text-4xl md:text-5xl font-light mb-6" style={{ color: C.fg }}>
        About Novi
      </h1>
      <p className="text-lg leading-relaxed" style={{ color: C.fgMuted }}>
        We're building a calm workspace for small, fast‑moving teams.
        <br />
        No noise. No endless tab switching. Just clarity.
      </p>
    </div>
  );
}

export default About