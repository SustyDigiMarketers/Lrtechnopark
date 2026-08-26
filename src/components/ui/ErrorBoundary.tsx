import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare state: ErrorBoundaryState;
  declare props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Unhandled runtime error in LR Techno Park UI:', error, errorInfo);
  }

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    if (hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
            <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-5 text-blue-400">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2 tracking-tight">LR Techno Park System Interface</h2>
            <p className="text-sm text-slate-400 mb-6">
              A temporary client-side error occurred. Please refresh to restore the portal view.
            </p>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-blue-600/20"
            >
              Reload Portal & Reset Session
            </button>
            {error && (
              <p className="mt-4 text-xs font-mono text-slate-500 truncate max-w-full">
                {error.message}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
