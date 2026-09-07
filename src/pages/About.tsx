const About = () => {
  return (
    <div className="py-24">
      <h1
        className="
          mb-6
          font-display
          text-4xl font-light
          text-[var(--fg)]
          md:text-5xl
        "
      >
        About Novi
      </h1>

      <p
        className="
          text-lg
          leading-relaxed
          text-[var(--fg-muted)]
        "
      >
        We're building a calm workspace for small, fast-moving teams.
        <br />
        No noise. No endless tab switching. Just clarity.
      </p>
    </div>
  );
};

export default About;
