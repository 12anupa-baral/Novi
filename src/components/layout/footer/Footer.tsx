import { useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "../../../icons";
import { FOOTER_GROUPS } from "../../../data/Mockdata";
import Button from "../../common/Button";
import Input from "../../common/Input";

const linkClasses = `
  text-sm
  text-[var(--fg-muted)]
  transition-colors duration-150
  hover:text-[var(--fg)]
  focus-visible:outline-none
  focus-visible:text-[var(--fg)]
`;

const socialLinkClasses = `
  text-[var(--fg-dim)]
  transition-colors duration-150
  hover:text-[var(--fg-muted)]
  focus-visible:outline-none
  focus-visible:text-[var(--fg-muted)]
`;

const legalLinkClasses = `
  text-xs
  text-[var(--fg-dim)]
  transition-colors duration-150
  hover:text-[var(--fg-muted)]
  focus-visible:outline-none
  focus-visible:text-[var(--fg-muted)]
`;

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="py-16 pb-8">
        {/* Main grid */}
        <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2">
            <a
              href="#"
              className="
                mb-2
                inline-flex items-center gap-2
                font-display text-base font-medium
                text-[var(--fg)]
                transition-colors
                hover:text-[var(--accent)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--focus-ring)]
                focus-visible:ring-offset-2
              "
            >
              <span
                className="
                  flex h-6 w-6
                  items-center justify-center
                  rounded-md
                  bg-[var(--accent)]
                  text-xs font-bold
                  text-[var(--bg)]
                "
              >
                N
              </span>
              Novi
            </a>

            <p className="mb-6 text-sm text-[var(--fg-muted)]">
              One calm workspace for small, fast-moving teams.
            </p>

            <p
              className="
                mb-2.5
                text-xs
                text-[var(--fg-dim)]
              "
            >
              Get product updates
            </p>

            {submitted ? (
              <div
                className="
                  flex items-center gap-2
                  text-sm
                  text-[var(--green)]
                "
                role="status"
              >
                <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                You're on the list
              </div>
            ) : (
              <form className="flex gap-2" onSubmit={handleSubmit}>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="you@company.com"
                  variant="light"
                  aria-label="Email address"
                  className="min-w-0 flex-1"
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
                className="
                    mb-4
                    text-xs font-semibold
                    uppercase tracking-widest
                    text-[var(--fg-dim)]
                  "
              >
                {group}
              </h4>

              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className={linkClasses}>
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
          className="
            flex flex-col
            items-center justify-between
            gap-4
            border-t border-[var(--border)]
            pt-6
            sm:flex-row
          "
        >
          <p className="text-xs text-[var(--fg-dim)]">
            © 2026 Novi Technologies, Inc.
          </p>

          <div className="flex items-center gap-5">
            {/* Social icons */}
            <a href="#" aria-label="X (Twitter)" className={socialLinkClasses}>
              <X aria-hidden="true" className="h-4 w-4" />
            </a>

            <a href="#" aria-label="GitHub" className={socialLinkClasses}>
              <GithubIcon aria-hidden="true" className="h-4 w-4" />
            </a>

            <a href="#" aria-label="LinkedIn" className={socialLinkClasses}>
              <LinkedInIcon aria-hidden="true" className="h-4 w-4" />
            </a>

            <span
              className="text-[var(--fg-dim)] opacity-30"
              aria-hidden="true"
            >
              ·
            </span>

            {/* Legal links */}
            {["Privacy", "Terms"].map((link) => (
              <a key={link} href="#" className={legalLinkClasses}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
