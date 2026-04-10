import React, { useState } from 'react'

const PROGRAMS = []

const REGISTRATIONS = []

const STATUS_COLOR = {
  active: 'badge-success',
  full: 'badge-danger',
  upcoming: 'badge-info',
  present: 'badge-success',
  absent: 'badge-danger',
  registered: 'badge-warning',
}

export default function MeditationSpirituality() {
  const [tab, setTab] = useState('programs')
  const [search, setSearch] = useState('')

  const filteredReg = REGISTRATIONS.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.program.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: 'Total Programs', value: PROGRAMS.length, icon: '🧘', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
    { label: 'Total Registrations', value: REGISTRATIONS.length, icon: '📋', color: 'var(--info)', bg: 'var(--info-bg)' },
    { label: 'Active Programs', value: PROGRAMS.filter(p => p.status === 'active').length, icon: '✅', color: 'var(--success)', bg: 'var(--success-bg)' },
    { label: 'Full Programs', value: PROGRAMS.filter(p => p.status === 'full').length, icon: '🔴', color: 'var(--danger)', bg: 'var(--danger-bg)' },
  ]

  return (
    <div>
      <div className="service-hero">
        <div className="service-hero-icon">🧘</div>
        <div className="service-hero-text">
          <h1>Meditation & Spirituality</h1>
          <p>Manage meditation programs, spiritual sessions, and participant registrations.</p>
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
        <button className={`tab-btn${tab === 'programs' ? ' active' : ''}`} onClick={() => setTab('programs')}>🧘 Programs</button>
        <button className={`tab-btn${tab === 'registrations' ? ' active' : ''}`} onClick={() => setTab('registrations')}>📋 Registrations</button>
      </div>

      {tab === 'programs' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Active Programs & Sessions</div>
            <button className="btn btn-primary btn-sm">+ Add Program</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Program</th>
                  <th>Type</th>
                  <th>Schedule</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {PROGRAMS.map(p => {
                  const pct = Math.round((p.booked / p.seats) * 100)
                  return (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 500 }}>{p.name}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{p.type}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{p.schedule}</td>
                      <td style={{ fontSize: '0.85rem' }}>{p.booked} / {p.seats}</td>
                      <td><span className={`badge ${STATUS_COLOR[p.status]}`}>{p.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, borderRadius: '3px', background: pct >= 100 ? 'var(--danger)' : '#8b5cf6' }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: '30px' }}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'registrations' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Participant Registrations</div>
              <div className="card-subtitle">{filteredReg.length} records</div>
            </div>
            <div className="search-bar" style={{ width: '220px' }}>
              <span style={{ color: 'var(--text-muted)' }}>🔍</span>
              <input placeholder="Search name, program…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Program</th>
                  <th>Registered</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {filteredReg.map(r => (
                  <tr key={r.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar avatar-sm" style={{ background: 'rgba(139,92,246,0.2)', color: '#8b5cf6' }}>{r.name[0]}</div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{r.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{r.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{r.program}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.date}</td>
                    <td><span className={`badge ${STATUS_COLOR[r.attendance]}`}>{r.attendance}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
