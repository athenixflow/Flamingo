"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback: ReactNode;
  /** Optional label shown in dev console */
  name?: string;
}

interface State {
  hasError: boolean;
}

/**
 * Graceful client-side error boundary for lazy 3D scenes and other risky
 * chunks. If the wrapped tree throws (including during a Promise rejection
 * propagated through suspense), we render `fallback` instead — keeping the
 * surrounding cinematic experience intact.
 */
export class ClientErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[ClientErrorBoundary${this.props.name ? ` · ${this.props.name}` : ""}]`,
        error,
        info,
      );
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
