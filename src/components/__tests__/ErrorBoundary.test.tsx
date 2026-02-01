import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "../ErrorBoundary";

// Component that throws an error
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText("No error")).toBeInTheDocument();
  });

  it("renders error UI when there is an error", () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Return Home")).toBeInTheDocument();
    expect(screen.getByText("Refresh Page")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it("shows error details in development mode", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const originalEnv = import.meta.env.MODE;
    // @ts-expect-error - temporarily override env
    import.meta.env.MODE = "development";

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Error details/i)).toBeInTheDocument();

    // @ts-expect-error - restore env
    import.meta.env.MODE = originalEnv;
    consoleSpy.mockRestore();
  });
});
