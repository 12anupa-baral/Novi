import { C } from "../theme/color";

const Product = () => {
  return (
    <div className="py-24">
      <h1 className="font-display text-4xl md:text-5xl font-light mb-6" style={{ color: C.fg }}>
        Product
      </h1>
      <p className="text-lg leading-relaxed" style={{ color: C.fgMuted }}>
        Boards, threads, timelines – everything you need to ship faster.
        <br />
        Designed for real teams, not enterprise bloat.
      </p>
    </div>
  );
}

export default Product