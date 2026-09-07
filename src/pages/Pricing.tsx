const Pricing = () => {
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
        Pricing
      </h1>

      <p
        className="
          text-lg
          leading-relaxed
          text-[var(--fg-muted)]
        "
      >
        Free for teams up to 10 members.
        <br />
        Pro plans starting at $12/user/month – no surprises.
      </p>
    </div>
  );
};

export default Pricing;
