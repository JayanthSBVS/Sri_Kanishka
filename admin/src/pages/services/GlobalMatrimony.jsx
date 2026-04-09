import React, { useState, useEffect } from 'react'
import client from '../../api/client'

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function calcAge(dob) {
  if (!dob) return '—'
  const diff = Date.now() - new Date(dob).getTime()
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000)) + ' yrs'
}

const STATUS_COLORS = {
  active: 'badge-success',
  inactive: 'badge-default',
  pending: 'badge-warning',
  paid: 'badge-success',
  unpaid: 'badge-danger',
}

export default function GlobalMatrimony() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState('all')
  const [payFilter, setPayFilter] = useState('all')
  const [selectedProfile, setSelectedProfile] = useState(null)

  useEffect(() => {
    client.get('/admin/matrimony-profiles')
      .then(res => setProfiles(res.data.data || []))
      .catch(err => setError(err.response?.data?.message || 'Failed to load profiles'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = profiles.filter(p => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase()
    const matchSearch = fullName.includes(search.toLowerCase()) || p.email?.toLowerCase().includes(search.toLowerCase())
    const matchGender = genderFilter === 'all' || p.profileData?.gender === genderFilter
    const matchPay = payFilter === 'all' || p.paymentStatus === payFilter
    return matchSearch && matchGender && matchPay
  })

  const stats = [
    { label: 'Total Profiles', value: profiles.length, icon: '💍', color: '#ec4899', bg: 'rgba(236,72,153,0.1)' },
    { label: 'Active Profiles', value: profiles.filter(p => p.status === 'active').length, icon: '✅', color: 'var(--success)', bg: 'var(--success-bg)' },
    { label: 'Paid Members', value: profiles.filter(p => p.paymentStatus === 'paid').length, icon: '💳', color: 'var(--brand-primary)', bg: 'var(--warning-bg)' },
    { label: 'Male Profiles', value: profiles.filter(p => p.profileData?.gender === 'Male').length, icon: '👨', color: 'var(--info)', bg: 'var(--info-bg)' },
  ]

  return (
    <div>
      <div className="service-hero">
        <div className="service-hero-icon">💍</div>
        <div className="service-hero-text">
          <h1>Global Matrimony</h1>
          <p>Manage matrimony profiles, matches, and member payments. View detailed profile information.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="stat-value">{loading ? '—' : s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Matrimony Profiles</div>
            <div className="card-subtitle">{loading ? 'Loading…' : `${filtered.length} of ${profiles.length} profiles`}</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div className="search-bar" style={{ width: '200px' }}>
              <span style={{ color: 'var(--text-muted)' }}>🔍</span>
              <input placeholder="Search name, email…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="input" style={{ width: '120px' }} value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
              <option value="all">All Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select className="input" style={{ width: '130px' }} value={payFilter} onChange={e => setPayFilter(e.target.value)}>
              <option value="all">All Payment</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        {error && (
          <div style={{ padding: '20px', color: 'var(--danger)', fontSize: '0.9rem' }}>⚠️ {error}</div>
        )}

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>⏳ Loading profiles…</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">💍</div>
            <h3>No profiles found</h3>
            <p>Adjust your filters</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Education</th>
                  <th>Profession</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Registered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {p.profilePhoto ? (
                          <img src={`http://localhost:5000${p.profilePhoto}`} alt="" style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div className="avatar avatar-sm" style={{ background: 'rgba(236,72,153,0.2)', color: '#ec4899' }}>
                            {p.firstName?.[0]}{p.lastName?.[0]}
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{p.firstName} {p.lastName}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{p.profileData?.gender || '—'}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{calcAge(p.profileData?.dob)}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{p.profileData?.education || '—'}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{p.profileData?.profession || '—'}</td>
                    <td>
                      <span className={`badge ${STATUS_COLORS[p.paymentStatus] || 'badge-default'}`}>
                        {p.paymentStatus || 'unknown'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${STATUS_COLORS[p.status] || 'badge-default'}`}>
                        {p.status || 'unknown'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{timeAgo(p.createdAt)}</td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => setSelectedProfile(p)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <div className="modal-overlay" onClick={() => setSelectedProfile(null)}>
          <div className="modal" style={{ width: '540px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Profile Details</div>
              <button className="modal-close" onClick={() => setSelectedProfile(null)}>✕</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              {selectedProfile.profilePhoto ? (
                <img src={`http://localhost:5000${selectedProfile.profilePhoto}`} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div className="avatar avatar-lg" style={{ background: 'rgba(236,72,153,0.2)', color: '#ec4899' }}>
                  {selectedProfile.firstName?.[0]}{selectedProfile.lastName?.[0]}
                </div>
              )}
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.2rem' }}>{selectedProfile.firstName} {selectedProfile.lastName}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{selectedProfile.email}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>{selectedProfile.phone}</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <span className={`badge ${STATUS_COLORS[selectedProfile.paymentStatus] || 'badge-default'}`}>{selectedProfile.paymentStatus}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {Object.entries(selectedProfile.profileData || {}).map(([key, val]) => (
                <div key={key} style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.025)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '4px' }}>{key}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{val || '—'}</div>
                </div>
              ))}
            </div>
            {selectedProfile.transactionId && (
              <div style={{ marginTop: '14px', padding: '10px 14px', background: 'rgba(255,255,255,0.025)', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '4px' }}>Transaction ID</div>
                <div style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--brand-primary)' }}>{selectedProfile.transactionId}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
