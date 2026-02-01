import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroSection from "../HeroSection";

// Mock audio
const mockPlay = vi.fn().mockResolvedValue(undefined);
const mockPause = vi.fn();

beforeEach(() => {
  global.HTMLAudioElement = class {
    play = mockPlay;
    pause = mockPause;
    currentTime = 0;
    addEventListener = vi.fn();
    removeEventListener = vi.fn();
  } as unknown as typeof HTMLAudioElement;
});

describe("HeroSection", () => {
  it("renders the main heading", () => {
    render(<HeroSection />);
    expect(screen.getByText("kraogotthesauce")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<HeroSection />);
    expect(screen.getByText("Hip-Hop Music Producer")).toBeInTheDocument();
  });

  it("renders the one-liner", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/I craft custom hip-hop and experimental beats/i)
    ).toBeInTheDocument();
  });

  it("has a read more button", () => {
    render(<HeroSection />);
    expect(screen.getByText(/read more/i)).toBeInTheDocument();
  });
});
