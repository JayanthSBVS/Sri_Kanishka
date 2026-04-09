import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

export default function Login() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--bg-base)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background */}
      <div style={{
        position: 'absolute', top: '-200px', left: '-200px',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '-200px', right: '-200px',
        width: '500px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Left panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        borderRight: '1px solid var(--border)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 900, color: '#0a0b0f',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(245,158,11,0.3)'
          }}>
            SK
          </div>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '8px'
          }}>
            Sri Kanishka
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Admin Control Panel
          </p>
        </div>

        {/* Form */}
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '6px'
            }}>
              Sign in to Admin
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Use your administrator credentials
            </p>
          </div>

          {error && (
            <div style={{
              background: 'var(--danger-bg)',
              border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '10px',
              padding: '12px 14px',
              marginBottom: '18px',
              display: 'flex', gap: '8px', alignItems: 'flex-start',
              fontSize: '0.85rem', color: 'var(--danger)'
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@srikanishka.com"
                required
                autoFocus
                className="input"
                style={{ fontSize: '0.9rem', padding: '12px 16px' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your admin password"
                  required
                  className="input"
                  style={{ fontSize: '0.9rem', padding: '12px 16px', paddingRight: '44px' }}
                />
                <button type="button" onClick={() => setShowPass(p => !p)} style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: '1rem'
                }}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '10px',
                background: loading ? 'rgba(245,158,11,0.5)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                border: 'none',
                color: '#0a0b0f',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(245,158,11,0.3)'
              }}
            >
              {loading ? '⏳ Signing in…' : '🔐 Sign In to Admin Panel'}
            </button>
          </form>

          {/* Hint */}
          <div style={{
            marginTop: '24px',
            padding: '14px',
            background: 'rgba(245,158,11,0.05)',
            border: '1px solid rgba(245,158,11,0.15)',
            borderRadius: '10px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            <strong style={{ color: 'var(--brand-primary)' }}>🔑 Default Admin</strong><br />
            Email: <code style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px' }}>admin@srikanishka.com</code><br />
            Password: <code style={{ color: 'var(--text-primary)', background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: '4px' }}>Admin@123</code>
          </div>
        </div>
      </div>

      {/* Right panel — decorative */}
      <div style={{
        flex: 1.2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '480px',
          position: 'relative', zIndex: 1
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '24px' }}>⚡</div>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '2.2rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '16px',
            lineHeight: 1.2
          }}>
            Manage Your <span style={{ color: 'var(--brand-primary)' }}>Services</span> With Power
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '36px' }}>
            Monitor users, manage all platform services, and track real-time activity across the Sri Kanishka ecosystem.
          </p>

          {/* Feature pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {['💻 IT Training', '💍 Matrimony', '🧘 Meditation', '🏗️ Real Estate', '✈️ Abroad', '🛒 Groceries'].map(f => (
              <span key={f} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                padding: '8px 16px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                fontWeight: 500
              }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '10%', right: '10%',
          width: '200px', height: '200px', borderRadius: '50%',
          border: '1px solid rgba(245,158,11,0.1)', opacity: 0.5
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', left: '5%',
          width: '140px', height: '140px', borderRadius: '50%',
          border: '1px solid rgba(59,130,246,0.1)', opacity: 0.5
        }} />
      </div>
    </div>
  )
}
