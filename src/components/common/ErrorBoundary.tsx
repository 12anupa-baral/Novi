import { Component, type ErrorInfo, type ReactNode } from "react";
import Button from "./Button";
import ButtonLink from "./ButtonLinks";
import { ArrowRight } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="mb-2 text-sm font-medium text-[var(--accent)]">
            Something went wrong
          </p>

          <h1 className="mb-4 font-display text-4xl font-light text-[var(--fg)]">
            We couldn't load this page
          </h1>

          <p className="mb-8 max-w-md text-sm leading-relaxed text-[var(--fg-muted)]">
            An unexpected error occurred. Try refreshing the page or return to
            the homepage.
          </p>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={this.handleReload}
            >
              Try again
            </Button>

            <ButtonLink to="/" size="lg" rightIcon={ArrowRight}>
              Back to home
            </ButtonLink>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
