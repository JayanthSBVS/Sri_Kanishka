import React, { useState, useEffect } from 'react'
import client from '../../api/client'

const COURSES = [
  'Full Stack Development',
  'Data Science & AI',
  'Cloud & DevOps',
  'Python Programming',
  'Cybersecurity',
  'Web Design (UI/UX)',
  'Java & Spring Boot',
  'React & Node.js',
  'Digital Marketing',
  'Other',
]

const STATUS_COLORS = {
  new: 'badge-info',
  contacted: 'badge-warning',
  enrolled: 'badge-success',
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  })
}

export default function ITTraining() {
  const [tab, setTab] = useState('enquiries')
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [courseFilter, setCourseFilter] = useState('all')
  const [updating, setUpdating] = useState(null)

  useEffect(() => { fetchEnquiries() }, [])

  async function fetchEnquiries() {
    setLoading(true)
    setError(null)
    try {
      const res = await client.get('/it-training/enquiries')
      setEnquiries(res.data.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load enquiries')
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id, newStatus) {
    setUpdating(id)
    try {
      await client.patch(`/it-training/enquiries/${id}/status`, { status: newStatus })
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e))
    } catch (err) {
      alert('Failed to update status.')
    } finally {
      setUpdating(null)
    }
  }

  const filtered = enquiries.filter(e => {
    const matchSearch = e.name?.toLowerCase().includes(search.toLowerCase())
      || e.email?.toLowerCase().includes(search.toLowerCase())
      || e.course?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || e.status === statusFilter
    const matchCourse = courseFilter === 'all' || e.course === courseFilter
    return matchSearch && matchStatus && matchCourse
  })

  const coursesInData = [...new Set(enquiries.map(e => e.course))]

  const stats = [
    { label: 'Total Enquiries', value: enquiries.length, icon: '📩', color: 'var(--info)', bg: 'var(--info-bg)' },
    { label: 'New Leads', value: enquiries.filter(e => e.status === 'new').length, icon: '🆕', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
    { label: 'Contacted', value: enquiries.filter(e => e.status === 'contacted').length, icon: '📞', color: 'var(--brand-primary)', bg: 'var(--warning-bg)' },
    { label: 'Enrolled', value: enquiries.filter(e => e.status === 'enrolled').length, icon: '🎓', color: 'var(--success)', bg: 'var(--success-bg)' },
  ]

  return (
    <div>
      <div className="service-hero">
        <div className="service-hero-icon">💻</div>
        <div className="service-hero-text">
          <h1>IT Training & Consultancy</h1>
          <p>Manage training enquiries from the website, update lead statuses, and track enrollments.</p>
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
            <div className="card-title">Course Enquiries</div>
            <div className="card-subtitle">
              {loading ? 'Loading…' : `${filtered.length} of ${enquiries.length} enquiries`}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div className="search-bar" style={{ width: '200px' }}>
              <span style={{ color: 'var(--text-muted)' }}>🔍</span>
              <input placeholder="Search name, course…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="input" style={{ width: '140px' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
            </select>
            <select className="input" style={{ width: '180px' }} value={courseFilter} onChange={e => setCourseFilter(e.target.value)}>
              <option value="all">All Courses</option>
              {coursesInData.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button className="btn btn-ghost btn-sm" onClick={fetchEnquiries}>🔄 Refresh</button>
          </div>
        </div>

        {error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--danger)' }}>⚠️ {error}</div>
        ) : loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>⏳ Loading enquiries…</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📩</div>
            <h3>No enquiries yet</h3>
            <p>Submissions from the website will appear here</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Experience</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{e.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar avatar-sm" style={{ background: 'rgba(59,130,246,0.2)', color: 'var(--info)' }}>
                          {e.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{e.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{e.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{e.phone}</td>
                    <td style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--info)' }}>{e.course}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{e.experience || '—'}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {e.message || '—'}
                    </td>
                    <td>
                      <span className={`badge ${STATUS_COLORS[e.status] || 'badge-default'}`}>{e.status}</span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {formatDate(e.createdAt)}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {e.status === 'new' && (
                          <button
                            disabled={updating === e.id}
                            className="btn btn-ghost btn-sm"
                            onClick={() => updateStatus(e.id, 'contacted')}
                          >
                            {updating === e.id ? '…' : '📞 Contact'}
                          </button>
                        )}
                        {e.status === 'contacted' && (
                          <button
                            disabled={updating === e.id}
                            className="btn btn-sm"
                            style={{ background: 'var(--success-bg)', color: 'var(--success)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                            onClick={() => updateStatus(e.id, 'enrolled')}
                          >
                            {updating === e.id ? '…' : '🎓 Enroll'}
                          </button>
                        )}
                        {e.status === 'enrolled' && (
                          <span style={{ fontSize: '0.78rem', color: 'var(--success)' }}>✅ Enrolled</span>
                        )}
                      </div>
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
