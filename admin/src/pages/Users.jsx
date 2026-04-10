import React, { useState, useEffect } from 'react'
import client from '../api/client'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}

function getInitials(name) {
  return (name || 'U').split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

function getRoleColor(role) {
  return role === 'admin' ? 'badge-warning' : 'badge-info'
}

// ── Custom Delete Confirmation Modal ──────────────────────────────────────────
function DeleteConfirmModal({ user, onConfirm, onCancel, loading }) {
  if (!user) return null
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.15s ease'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '32px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        animation: 'slideUp 0.2s ease'
      }}>
        {/* Icon */}
        <div style={{
          width: '60px', height: '60px',
          background: 'rgba(239,68,68,0.12)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.7rem',
          margin: '0 auto 20px'
        }}>
          🗑️
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem',
          fontWeight: 700, color: 'var(--text-primary)',
          textAlign: 'center', marginBottom: '8px'
        }}>
          Delete User Account
        </h2>

        {/* Message */}
        <p style={{
          fontSize: '0.875rem', color: 'var(--text-secondary)',
          textAlign: 'center', marginBottom: '20px', lineHeight: 1.6
        }}>
          Are you sure you want to permanently delete this account? This action <strong style={{ color: '#ef4444' }}>cannot be undone</strong>.
        </p>

        {/* User card */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '12px 16px',
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.18)',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'rgba(239,68,68,0.15)', color: '#ef4444',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '1rem', flexShrink: 0
          }}>
            {getInitials(user.name)}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{user.name}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              flex: 1, padding: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              color: 'var(--text-secondary)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600, fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              flex: 1, padding: '12px',
              background: loading ? 'rgba(239,68,68,0.5)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700, fontSize: '0.9rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(239,68,68,0.35)',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}
          >
            {loading ? '⏳ Deleting…' : '🗑️ Yes, Delete'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.96) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [confirmUser, setConfirmUser] = useState(null)   // user pending deletion
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    setError(null)
    try {
      const res = await client.get('/admin/users')
      setUsers(res.data.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  async function confirmDelete() {
    setDeleting(true)
    try {
      await client.delete(`/admin/users/${confirmUser.id}`)
      setUsers(prev => prev.filter(u => u.id !== confirmUser.id))
      setConfirmUser(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user.')
    } finally {
      setDeleting(false)
    }
  }

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const adminCount = users.filter(u => u.role === 'admin').length
  const userCount = users.filter(u => u.role === 'user').length

  const stats = [
    { label: 'Total Accounts', value: users.length, icon: '👥', color: 'var(--info)', bg: 'var(--info-bg)' },
    { label: 'Regular Users', value: userCount, icon: '👤', color: 'var(--brand-primary)', bg: 'var(--warning-bg)' },
    { label: 'Admin Accounts', value: adminCount, icon: '🛡️', color: 'var(--success)', bg: 'var(--success-bg)' },
  ]

  return (
    <div>
      {/* Custom Delete Confirmation Modal */}
      <DeleteConfirmModal
        user={confirmUser}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmUser(null)}
        loading={deleting}
      />

      <div className="page-header">
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>👥</span> User Management
          </h1>
          <p>View and manage all registered accounts on the Sri Kanishka platform.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div className="stat-value">{loading ? '—' : s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">All Users</div>
            <div className="card-subtitle">
              {loading ? 'Loading…' : `${filteredUsers.length} of ${users.length} users shown`}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="search-bar" style={{ width: '240px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>🔍</span>
              <input
                type="text"
                placeholder="Search name, email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="input" style={{ width: '130px' }} value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--danger)', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        ) : loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⏳</div>
            Loading accounts…
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="empty-state">
            <div className="icon">👥</div>
            <h3>No users found</h3>
            <p>Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email Address</th>
                  <th>System Role</th>
                  <th>Account ID</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
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
                    <td style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                      {user.id}
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      {formatDate(user.createdAt)}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm"
                        style={{
                          background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                          border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px',
                          cursor: 'pointer', fontFamily: 'Inter, sans-serif', padding: '5px 12px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                        onClick={() => setConfirmUser(user)}
                      >
                        🗑 Delete
                      </button>
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
