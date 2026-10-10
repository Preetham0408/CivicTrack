import "./AuthForm.css";
```jsx
import { useState } from 'react'
import { signIn, signUp } from '../lib/auth'

export default function AuthForm({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      if (isSignup) {
        const result = await signUp({ fullName, email, password })

        if (result.session) {
          setMessage('Account created successfully!')
          if (onLogin) onLogin(result.user)
        } else {
          setMessage(
            'Account created! Please check your email to confirm your account, then log in.'
          )
        }
      } else {
        const result = await signIn({ email, password })
        setMessage('Login successful!')
        if (onLogin) onLogin(result.user)
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Create Your Account' : 'Welcome Back'}</h2>
        <p>
          {isSignup
            ? 'Join CivicTrack to report and track civic issues.'
            : 'Log in to continue to CivicTrack.'}
        </p>

        {isSignup && (
          <label>
            Full Name
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            minLength={6}
            required
          />
        </label>

        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-message">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading
            ? 'Please wait...'
            : isSignup
              ? 'Create Account'
              : 'Log In'}
        </button>

        <p className="auth-switch">
          {isSignup ? 'Already have an account?' : 'New to CivicTrack?'}{' '}
          <button
            type="button"
            className="auth-link"
            onClick={() => {
              setIsSignup(!isSignup)
              setError('')
              setMessage('')
            }}
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  )
}
```;
