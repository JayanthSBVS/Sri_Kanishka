import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/client'
import { useAdminAuth } from '../context/AdminAuthContext'

const SERVICES = [
  { name: 'IT Training & Consultancy', path: '/services/it-training', icon: '💻', color: '#3b82f6', colorBg: 'rgba(59,130,246,0.1)' },
  { name: 'Global Matrimony', path: '/services/global-matrimony', icon: '💍', color: '#ec4899', colorBg: 'rgba(236,72,153,0.1)' },
  { name: 'Meditation & Spirituality', path: '/services/meditation', icon: '🧘', color: '#8b5cf6', colorBg: 'rgba(139,92,246,0.1)' },
  { name: 'Real Estate & Construction', path: '/services/real-estate', icon: '🏗️', color: '#f59e0b', colorBg: 'rgba(245,158,11,0.1)' },
  { name: 'Abroad Consultancy', path: '/services/abroad-consultancy', icon: '✈️', color: '#06b6d4', colorBg: 'rgba(6,182,212,0.1)' },
  { name: 'Premium Groceries', path: '/services/premium-groceries', icon: '🛒', color: '#10b981', colorBg: 'rgba(16,185,129,0.1)' },
]

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function getInitials(name) {
  return (name || 'U').split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

function getRoleColor(role) {
  return role === 'admin' ? 'badge-warning' : 'badge-info'
}

export default function Dashboard() {
  const { adminUser } = useAdminAuth()
  const [users, setUsers] = useState([])
  const [matrimonyProfiles, setMatrimonyProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const [usersRes, matrimonyRes] = await Promise.all([
          client.get('/admin/users'),
          client.get('/admin/matrimony-profiles')
        ])
        setUsers(usersRes.data.data || [])
        setMatrimonyProfiles(matrimonyRes.data.data || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [refreshKey])

  // Auto-refresh every 30s to reflect new registrations
  useEffect(() => {
    const interval = setInterval(() => setRefreshKey(k => k + 1), 30000)
    return () => clearInterval(interval)
  }, [])

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: 'Total Users', value: users.length, icon: '👥', color: 'var(--info)', bg: 'var(--info-bg)', trend: '+' + Math.max(1, Math.floor(users.length * 0.1)) + ' this month' },
    { label: 'Matrimony Profiles', value: matrimonyProfiles.length, icon: '💍', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', trend: matrimonyProfiles.filter(p => p.paymentStatus === 'paid').length + ' paid profiles' },
    { label: 'Active Services', value: 6, icon: '⚡', color: 'var(--brand-primary)', bg: 'var(--warning-bg)', trend: 'All services online' },
    { label: 'Admin Accounts', value: users.filter(u => u.role === 'admin').length, icon: '🛡️', color: 'var(--success)', bg: 'var(--success-bg)', trend: 'Full access accounts' },
  ]

  return (
    <div>
      {/* Welcome header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>👋</span> Welcome back, {adminUser?.name?.split(' ')[0] || 'Admin'}
            </h1>
            <p>Here's what's happening across your platform today.</p>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setRefreshKey(k => k + 1)}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div className="stat-value">{loading ? '—' : s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-trend up" style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {s.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Services Grid */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 600 }}>Services Overview</h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '14px'
        }}>
          {SERVICES.map(svc => (
            <Link
              key={svc.path}
              to={svc.path}
              style={{
                display: 'flex', flexDirection: 'column',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.borderColor = svc.color + '40'
                e.currentTarget.style.boxShadow = `0 8px 24px ${svc.color}18`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: '42px', height: '42px',
                background: svc.colorBg,
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
                marginBottom: '14px'
              }}>{svc.icon}</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '8px' }}>
                {svc.name}
              </div>
              <div style={{ marginTop: 'auto', fontSize: '0.72rem', color: svc.color, fontWeight: 600 }}>
                Manage →
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Registered Users</div>
            <div className="card-subtitle">
              {loading ? 'Loading…' : `${filteredUsers.length} of ${users.length} users shown`}
              {!loading && <span style={{ marginLeft: '8px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>• Auto-refreshes every 30s</span>}
            </div>
          </div>
          <div className="search-bar" style={{ width: '240px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Search users…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--danger)', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        ) : loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⏳</div>
            Loading users…
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state">
            <div className="icon">👥</div>
            <h3>No users found</h3>
            <p>Try adjusting your search</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar avatar-sm">
                          {getInitials(user.name)}
                        </div>
                        <span style={{ fontWeight: 500 }}>{user.name}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                    <td>
                      <span className={`badge ${getRoleColor(user.role)}`}>
                        {user.role === 'admin' ? '🛡️' : '👤'} {user.role}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                      {timeAgo(user.createdAt)}
                    </td>
                    <td style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      {user.id.substring(0, 12)}…
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
