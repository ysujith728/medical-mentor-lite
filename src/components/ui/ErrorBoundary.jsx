import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-rose-600 p-8 border border-rose-200 rounded-2xl bg-rose-50">
          <span className="material-symbols-outlined text-5xl mb-4">warning</span>
          <h2 className="font-inter text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-500 text-sm mb-4">A critical error occurred within this module.</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-rose-100 rounded-full font-semibold text-rose-700 hover:bg-rose-200 transition-colors">
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
