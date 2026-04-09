import React, { useState } from 'react'

const ENQUIRIES = [
  { id: 'IT-001', name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '9876543210', course: 'Full Stack Development', status: 'new', date: '2026-04-05', message: 'Interested in your 6-month full stack course.' },
  { id: 'IT-002', name: 'Priya Nair', email: 'priya.nair@email.com', phone: '9845112233', course: 'Data Science & AI', status: 'contacted', date: '2026-04-04', message: 'Want to join the data science batch starting next month.' },
  { id: 'IT-003', name: 'Amit Sharma', email: 'amit.s@email.com', phone: '9123456789', course: 'Cloud & DevOps', status: 'enrolled', date: '2026-04-02', message: 'Looking for corporate training for a team of 10.' },
  { id: 'IT-004', name: 'Sunita Reddy', email: 'sunita.r@email.com', phone: '9988776600', course: 'Python Programming', status: 'new', date: '2026-04-01', message: 'Beginner in programming. Need guidance on starting Python.' },
  { id: 'IT-005', name: 'Kiran Mehta', email: 'kiran.m@email.com', phone: '9871234560', course: 'Cybersecurity', status: 'contacted', date: '2026-03-30', message: 'Want to switch career to cybersecurity.' },
]

const COURSES = [
  { name: 'Full Stack Development', duration: '6 months', enrolled: 24, capacity: 30, status: 'ongoing' },
  { name: 'Data Science & AI', duration: '4 months', enrolled: 18, capacity: 20, status: 'ongoing' },
  { name: 'Cloud & DevOps', duration: '3 months', enrolled: 12, capacity: 15, status: 'ongoing' },
  { name: 'Python Programming', duration: '2 months', enrolled: 30, capacity: 30, status: 'full' },
  { name: 'Cybersecurity', duration: '5 months', enrolled: 8, capacity: 25, status: 'upcoming' },
  { name: 'Web Design (UI/UX)', duration: '3 months', enrolled: 0, capacity: 20, status: 'upcoming' },
]

const STATUS_COLORS = {
  new: 'badge-info',
  contacted: 'badge-warning',
  enrolled: 'badge-success',
  ongoing: 'badge-success',
  full: 'badge-danger',
  upcoming: 'badge-default',
}

export default function ITTraining() {
  const [tab, setTab] = useState('enquiries')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [enquiries, setEnquiries] = useState(ENQUIRIES)

  const filtered = enquiries.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.course.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || e.status === statusFilter
    return matchSearch && matchStatus
  })

  function updateStatus(id, newStatus) {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e))
  }

  const stats = [
    { label: 'Total Enquiries', value: enquiries.length, icon: '📩', color: 'var(--info)', bg: 'var(--info-bg)' },
    { label: 'New Leads', value: enquiries.filter(e => e.status === 'new').length, icon: '🆕', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
    { label: 'Enrolled Students', value: enquiries.filter(e => e.status === 'enrolled').length, icon: '🎓', color: 'var(--success)', bg: 'var(--success-bg)' },
    { label: 'Active Courses', value: COURSES.filter(c => c.status === 'ongoing').length, icon: '📚', color: 'var(--brand-primary)', bg: 'var(--warning-bg)' },
  ]

  return (
    <div>
      <div className="service-hero">
        <div className="service-hero-icon">💻</div>
        <div className="service-hero-text">
          <h1>IT Training & Consultancy</h1>
          <p>Manage training enquiries, student enrollments, course schedules, and consultancy requests.</p>
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
        <button className={`tab-btn${tab === 'enquiries' ? ' active' : ''}`} onClick={() => setTab('enquiries')}>📩 Enquiries</button>
        <button className={`tab-btn${tab === 'courses' ? ' active' : ''}`} onClick={() => setTab('courses')}>📚 Courses</button>
      </div>

      {tab === 'enquiries' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Student Enquiries</div>
              <div className="card-subtitle">{filtered.length} records</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="search-bar" style={{ width: '220px' }}>
                <span style={{ color: 'var(--text-muted)' }}>🔍</span>
                <input placeholder="Search name, course…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="input" style={{ width: '140px' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="enrolled">Enrolled</option>
              </select>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{e.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar avatar-sm" style={{ background: 'rgba(59,130,246,0.2)', color: 'var(--info)' }}>
                          {e.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{e.name}</div>
                          <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>{e.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{e.course}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{e.phone}</td>
                    <td><span className={`badge ${STATUS_COLORS[e.status]}`}>{e.status}</span></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{e.date}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {e.status === 'new' && (
                          <button className="btn btn-ghost btn-sm" onClick={() => updateStatus(e.id, 'contacted')}>Contact</button>
                        )}
                        {e.status === 'contacted' && (
                          <button className="btn btn-sm" style={{ background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', fontFamily: 'Inter, sans-serif', cursor: 'pointer' }} onClick={() => updateStatus(e.id, 'enrolled')}>Enroll</button>
                        )}
                        {e.status === 'enrolled' && (
                          <span style={{ fontSize: '0.78rem', color: 'var(--success)' }}>✅ Active</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'courses' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title">Course Catalog</div>
            <button className="btn btn-primary btn-sm">+ Add Course</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Duration</th>
                  <th>Enrollment</th>
                  <th>Status</th>
                  <th>Occupancy</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map(c => {
                  const pct = Math.round((c.enrolled / c.capacity) * 100)
                  return (
                    <tr key={c.name}>
                      <td style={{ fontWeight: 500 }}>{c.name}</td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{c.duration}</td>
                      <td style={{ fontSize: '0.85rem' }}>{c.enrolled} / {c.capacity}</td>
                      <td><span className={`badge ${STATUS_COLORS[c.status]}`}>{c.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, borderRadius: '3px', background: pct >= 100 ? 'var(--danger)' : pct >= 80 ? 'var(--warning)' : 'var(--success)' }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: '30px', textAlign: 'right' }}>{pct}%</span>
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
    </div>
  )
}
