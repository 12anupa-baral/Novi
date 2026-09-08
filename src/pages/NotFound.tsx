//page not found
import ButtonLink from "../components/common/ButtonLinks";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 text-2xl font-semibold text-[var(--accent)]">404</p>

      <h1 className="mb-4 font-display text-4xl font-light text-[var(--fg)] md:text-5xl">
        Page not found
      </h1>

      <p className="mb-8 max-w-md text-sm leading-relaxed text-[var(--fg-muted)]">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <ButtonLink to="/" size="lg" rightIcon={ArrowRight}>
        Back to home
      </ButtonLink>
    </div>
  );
};

export default NotFound;
