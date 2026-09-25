import React from "react";

/**
 * Lazy chunk load fail hone (network blip / purana SW cache) par section
 * blank rehne se bachata hai — user ko retry milta hai.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Console ke alawa koi third-party logger nahi (privacy-friendly).
    console.error("Section failed to render:", error, info);
  }

  handleRetry = () => {
    // Naya chunk fetch karne ke liye soft reload safest hai.
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        className="mx-auto max-w-xl my-16 px-6 py-10 rounded-2xl glass-strong neon-ring text-center"
      >
        <span className="text-3xl" aria-hidden>
          ⚠️
        </span>
        <h3 className="font-display text-lg font-bold text-white mt-3 mb-2">
          This section failed to load
        </h3>
        <p className="text-sm text-slate-400 mb-5">
          Network ne cheating kar di. Reload kar do, wapis aa jayega.
        </p>
        <button
          type="button"
          onClick={this.handleRetry}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          Reload page
        </button>
      </div>
    );
  }
}
