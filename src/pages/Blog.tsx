import { C } from "../theme/color";

const Blog=()=>{
  return (
    <div className="py-24">
      <h1 className="font-display text-4xl md:text-5xl font-light mb-6" style={{ color: C.fg }}>
        Blog
      </h1>
      <p className="text-lg leading-relaxed" style={{ color: C.fgMuted }}>
        Insights, updates, and stories from the Novi team.
        <br />
        Coming soon – stay tuned!
      </p>
    </div>
  );
}

export default Blog