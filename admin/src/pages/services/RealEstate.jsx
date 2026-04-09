import React, { useState } from 'react'

const PROPERTIES = [
  { id: 'RE-001', title: 'Luxury Villa — Bani Park', type: 'Residential', location: 'Jaipur, Rajasthan', price: '₹2.5 Cr', status: 'available', area: '3200 sq ft', beds: 4, enquiries: 12 },
  { id: 'RE-002', title: 'Commercial Complex — Vaishali Nagar', type: 'Commercial', location: 'Jaipur, Rajasthan', price: '₹8 Cr', status: 'sold', area: '12000 sq ft', beds: null, enquiries: 5 },
  { id: 'RE-003', title: '3 BHK Flat — Mansarovar', type: 'Residential', location: 'Jaipur, Rajasthan', price: '₹85 L', status: 'available', area: '1450 sq ft', beds: 3, enquiries: 23 },
  { id: 'RE-004', title: 'Plot — Jagatpura', type: 'Plot', location: 'Jaipur, Rajasthan', price: '₹42 L', status: 'available', area: '500 sq yd', beds: null, enquiries: 18 },
  { id: 'RE-005', title: 'Office Space — MI Road', type: 'Commercial', location: 'Jaipur, Rajasthan', price: '₹1.8 Cr', status: 'reserved', area: '2400 sq ft', beds: null, enquiries: 7 },
]

const ENQUIRIES = [
  { id: 'REQ-001', name: 'Vikram Singh', email: 'vikram.s@email.com', property: 'Luxury Villa — Bani Park', budget: '₹2–3 Cr', status: 'new', date: '2026-04-06' },
  { id: 'REQ-002', name: 'Neha Gupta', email: 'neha.g@email.com', property: '3 BHK Flat — Mansarovar', budget: '₹80–90 L', status: 'follow-up', date: '2026-04-04' },
  { id: 'REQ-003', name: 'Sanjay Verma', email: 'sanjay.v@email.com', property: 'Plot — Jagatpura', budget: '₹40–50 L', status: 'closed', date: '2026-04-01' },
  { id: 'REQ-004', name: 'Aarti Joshi', email: 'aarti.j@email.com', property: 'Office Space — MI Road', budget: '₹1.5–2 Cr', status: 'new', date: '2026-04-05' },
]

const STATUS_COLORS = {
  available: 'badge-success',
  sold: 'badge-default',
  reserved: 'badge-warning',
  new: 'badge-info',
  'follow-up': 'badge-warning',
  closed: 'badge-success',
}

export default function RealEstate() {
  const [tab, setTab] = useState('properties')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  const filteredProps = PROPERTIES.filter(p => {
    const match = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'all' || p.type === typeFilter
    return match && matchType
  })

  const stats = [
    { label: 'Total Listings', value: PROPERTIES.length, icon: '🏗️', color: 'var(--brand-primary)', bg: 'var(--warning-bg)' },
    { label: 'Available', value: PROPERTIES.filter(p => p.status === 'available').length, icon: '✅', color: 'var(--success)', bg: 'var(--success-bg)' },
    { label: 'Sold', value: PROPERTIES.filter(p => p.status === 'sold').length, icon: '🔖', color: 'var(--text-secondary)', bg: 'rgba(255,255,255,0.05)' },
    { label: 'Total Enquiries', value: ENQUIRIES.length, icon: '📞', color: 'var(--info)', bg: 'var(--info-bg)' },
  ]

  return (
    <div>
      <div className="service-hero">
        <div className="service-hero-icon">🏗️</div>
        <div className="service-hero-text">
          <h1>Real Estate & Construction</h1>
          <p>Manage property listings, construction projects, and buyer enquiries.</p>
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
        <button className={`tab-btn${tab === 'properties' ? ' active' : ''}`} onClick={() => setTab('properties')}>🏠 Properties</button>
        <button className={`tab-btn${tab === 'enquiries' ? ' active' : ''}`} onClick={() => setTab('enquiries')}>📞 Enquiries</button>
      </div>

      {tab === 'properties' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Property Listings</div>
              <div className="card-subtitle">{filteredProps.length} properties</div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="search-bar" style={{ width: '200px' }}>
                <span style={{ color: 'var(--text-muted)' }}>🔍</span>
                <input placeholder="Search properties…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="input" style={{ width: '140px' }} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option value="all">All Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot</option>
              </select>
              <button className="btn btn-primary btn-sm">+ Add Listing</button>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Area</th>
                  <th>Enquiries</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProps.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{p.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>📍 {p.location}</div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{p.type}</td>
                    <td style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--brand-primary)' }}>{p.price}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{p.area}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{p.enquiries}</td>
                    <td><span className={`badge ${STATUS_COLORS[p.status]}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'enquiries' && (
        <div className="card">
          <div className="card-title" style={{ marginBottom: '16px' }}>Buyer Enquiries</div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Buyer</th>
                  <th>Property Interest</th>
                  <th>Budget</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {ENQUIRIES.map(e => (
                  <tr key={e.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar avatar-sm" style={{ background: 'rgba(245,158,11,0.2)', color: 'var(--brand-primary)' }}>{e.name[0]}</div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{e.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{e.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{e.property}</td>
                    <td style={{ fontWeight: 600, color: 'var(--brand-primary)', fontSize: '0.875rem' }}>{e.budget}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{e.date}</td>
                    <td><span className={`badge ${STATUS_COLORS[e.status]}`}>{e.status}</span></td>
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
