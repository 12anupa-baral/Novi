import { useState } from "react";
import { Check, X } from "lucide-react";
import { LinkedInIcon, GithubIcon } from "../../../icons";
import { C } from "../../../theme/color";
import { FOOTER_GROUPS } from "../../../data/Mockdata";
import Button from "../../common/Button";
import Input from "../../common/Input";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer id="footer" style={{ borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-14">
          {/* Brand column */}
          <div className="col-span-2">
            <a
              href="#"
              className="inline-flex items-center gap-2 font-display text-base font-medium mb-2"
              style={{ color: C.fg }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
                style={{ background: C.accent, color: C.bg }}
              >
                N
              </div>
              Novi
            </a>
            <p className="text-sm mb-6" style={{ color: C.fgMuted }}>
              One calm workspace for small, fast-moving teams.
            </p>
            <p className="text-xs mb-2.5" style={{ color: C.fgDim }}>
              Get product updates
            </p>

            {submitted ? (
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: C.green }}
              >
                <Check className="w-4 h-4" strokeWidth={2} />
                You're on the list
              </div>
            ) : (
              <form className="flex gap-2" onSubmit={handleSubmit}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  variant="light"
                  className="flex-1 min-w-0"
                />
                <Button type="submit" variant="primary" size="sm">
                  Subscribe
                </Button>
              </form>
            )}
          </div>

          {/* Footer groups */}
          {Object.entries(FOOTER_GROUPS).map(([group, links]) => (
            <div key={group}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: C.fgDim }}
              >
                {group}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-150"
                      style={{ color: C.fgMuted }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = C.fg)}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = C.fgMuted)
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: `1px solid ${C.border}` }}
        >
          <p className="text-xs" style={{ color: C.fgDim }}>
            © 2026 Novi Technologies, Inc.
          </p>

          <div className="flex items-center gap-5">
            {/* Social icons */}
            <a
              href="#"
              aria-label="X (Twitter)"
              className="transition-colors"
              style={{ color: C.fgDim }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.fgMuted)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.fgDim)}
            >
              <X className="w-4 h-4" />
            </a>

            <a
              href="#"
              aria-label="GitHub"
              className="transition-colors"
              style={{ color: C.fgDim }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.fgMuted)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.fgDim)}
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="transition-colors"
              style={{ color: C.fgDim }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.fgMuted)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.fgDim)}
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <span style={{ color: C.fgDim, opacity: 0.3 }}>·</span>

            {/* Legal links */}
            {["Privacy", "Terms"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs transition-colors"
                style={{ color: C.fgDim }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.fgMuted)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.fgDim)}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
