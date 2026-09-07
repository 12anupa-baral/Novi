const Blog = () => {
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
        Blog
      </h1>

      <p
        className="
          text-lg
          leading-relaxed
          text-[var(--fg-muted)]
        "
      >
        Insights, updates, and stories from the Novi team.
        <br />
        Coming soon – stay tuned!
      </p>
    </div>
  );
};

export default Blog;
