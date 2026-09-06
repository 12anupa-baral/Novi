import { C } from "../theme/color";

const Pricing = () => {
  return (
    <div className="py-24">
      <h1 className="font-display text-4xl md:text-5xl font-light mb-6" style={{ color: C.fg }}>
        Pricing
      </h1>
      <p className="text-lg leading-relaxed" style={{ color: C.fgMuted }}>
        Free for teams up to 10 members.
        <br />
        Pro plans starting at $12/user/month – no surprises.
      </p>
    </div>
  );
}

export default Pricing