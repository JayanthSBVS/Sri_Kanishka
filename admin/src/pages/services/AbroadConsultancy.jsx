import React, { useState } from 'react'

const APPLICATIONS = [
  { id: 'AC-001', name: 'Ankit Sharma', email: 'ankit.s@email.com', phone: '9876500001', destination: 'Canada', purpose: 'Study', visa: 'Student Visa', status: 'in-progress', date: '2026-04-05', university: 'University of Toronto' },
  { id: 'AC-002', name: 'Pooja Mishra', email: 'pooja.m@email.com', phone: '9876500002', destination: 'Australia', purpose: 'Work', visa: 'Work Visa', status: 'approved', date: '2026-04-02', university: null },
  { id: 'AC-003', name: 'Rohit Gupta', email: 'rohit.g@email.com', phone: '9876500003', destination: 'UK', purpose: 'Study', visa: 'Student Visa', status: 'documents-pending', date: '2026-04-01', university: 'University of Edinburgh' },
  { id: 'AC-004', name: 'Divya Nair', email: 'divya.n@email.com', phone: '9876500004', destination: 'Germany', purpose: 'Study', visa: 'Student Visa', status: 'new', date: '2026-03-30', university: 'TU Munich' },
  { id: 'AC-005', name: 'Sameer Khan', email: 'sameer.k@email.com', phone: '9876500005', destination: 'USA', purpose: 'Work', visa: 'H1B Visa', status: 'rejected', date: '2026-03-28', university: null },
  { id: 'AC-006', name: 'Kavya Reddy', email: 'kavya.r@email.com', phone: '9876500006', destination: 'New Zealand', purpose: 'PR', visa: 'PR Visa', status: 'in-progress', date: '2026-03-26', university: null },
]

const DESTINATIONS = [
  { country: '🇨🇦 Canada', applications: 12, approved: 8, icon: '🍁' },
  { country: '🇦🇺 Australia', applications: 18, approved: 14, icon: '🦘' },
  { country: '🇬🇧 United Kingdom', applications: 9, approved: 6, icon: '🎭' },
  { country: '🇩🇪 Germany', applications: 7, approved: 5, icon: '🏰' },
  { country: '🇺🇸 USA', applications: 15, approved: 10, icon: '🗽' },
  { country: '🇳🇿 New Zealand', applications: 5, approved: 4, icon: '🥝' },
]

const STATUS_COLORS = {
  new: 'badge-info',
  'in-progress': 'badge-warning',
  'documents-pending': 'badge-warning',
  approved: 'badge-success',
  rejected: 'badge-danger',
}

const STATUS_LABELS = {
  new: '🆕 New',
  'in-progress': '⏳ In Progress',
  'documents-pending': '📄 Docs Pending',
  approved: '✅ Approved',
  rejected: '❌ Rejected',
}

export default function AbroadConsultancy() {
  const [tab, setTab] = useState('applications')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [destFilter, setDestFilter] = useState('all')

  const filtered = APPLICATIONS.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.destination.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    const matchDest = destFilter === 'all' || a.destination === destFilter
    return matchSearch && matchStatus && matchDest
  })

  const stats = [
    { label: 'Total Applications', value: APPLICATIONS.length, icon: '✈️', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
    { label: 'In Progress', value: APPLICATIONS.filter(a => a.status === 'in-progress').length, icon: '⏳', color: 'var(--brand-primary)', bg: 'var(--warning-bg)' },
    { label: 'Approved', value: APPLICATIONS.filter(a => a.status === 'approved').length, icon: '✅', color: 'var(--success)', bg: 'var(--success-bg)' },
    { label: 'Destinations', value: DESTINATIONS.length, icon: '🌍', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  ]

  return (
    <div>
      <div className="service-hero">
        <div className="service-hero-icon">✈️</div>
        <div className="service-hero-text">
          <h1>Abroad Consultancy</h1>
          <p>Manage visa applications, study abroad programs, and international consultancy cases.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="tab-nav">
        <button className={`tab-btn${tab === 'applications' ? ' active' : ''}`} onClick={() => setTab('applications')}>📋 Applications</button>
        <button className={`tab-btn${tab === 'destinations' ? ' active' : ''}`} onClick={() => setTab('destinations')}>🌍 Destinations</button>
      </div>

      {tab === 'applications' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Visa & Study Applications</div>
              <div className="card-subtitle">{filtered.length} applications</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="search-bar" style={{ width: '190px' }}>
                <span style={{ color: 'var(--text-muted)' }}>🔍</span>
                <input placeholder="Search name…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="input" style={{ width: '150px' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="documents-pending">Docs Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select className="input" style={{ width: '140px' }} value={destFilter} onChange={e => setDestFilter(e.target.value)}>
                <option value="all">All Countries</option>
                {[...new Set(APPLICATIONS.map(a => a.destination))].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Destination</th>
                  <th>Purpose</th>
                  <th>Visa Type</th>
                  <th>Status</th>
                  <th>Applied</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar avatar-sm" style={{ background: 'rgba(6,182,212,0.2)', color: '#06b6d4' }}>{a.name[0]}</div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{a.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{a.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>{a.destination}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{a.purpose}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{a.visa}</td>
                    <td><span className={`badge ${STATUS_COLORS[a.status]}`}>{STATUS_LABELS[a.status]}</span></td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{a.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'destinations' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {DESTINATIONS.map(d => {
              const successRate = Math.round((d.approved / d.applications) * 100)
              return (
                <div key={d.country} className="card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '2rem' }}>{d.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{d.country}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{d.applications} applications</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Approvals</div>
                      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--success)' }}>{d.approved}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Success Rate</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: successRate >= 70 ? 'var(--success)' : 'var(--warning)' }}>{successRate}%</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${successRate}%`, background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', borderRadius: '2px' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
