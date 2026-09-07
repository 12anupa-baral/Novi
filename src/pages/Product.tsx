const Product = () => {
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
        Product
      </h1>

      <p
        className="
          text-lg
          leading-relaxed
          text-[var(--fg-muted)]
        "
      >
        Boards, threads, timelines – everything you need to ship faster.
        <br />
        Designed for real teams, not enterprise bloat.
      </p>
    </div>
  );
};

export default Product;
