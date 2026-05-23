// src/components/ErrorBoundary.jsx
import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="card p-8 max-w-sm w-full text-center">
            <p className="text-4xl mb-4">⚠️</p>
            <h2 className="text-white font-bold text-lg mb-2">Something went wrong</h2>
            <p className="text-slate-400 text-sm mb-6">
              {this.props.message || 'An unexpected error occurred. Please go back and try again.'}
            </p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="btn-primary w-full mb-2"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn-ghost w-full text-sm"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
