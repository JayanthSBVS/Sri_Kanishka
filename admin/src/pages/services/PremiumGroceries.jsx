import React, { useState } from 'react'

const PRODUCTS = [
  { id: 'GRO-001', name: 'Organic Whole Wheat Flour', category: 'Grains & Cereals', price: '₹120', stock: 45, unit: 'kg', status: 'in-stock' },
  { id: 'GRO-002', name: 'Cold-Pressed Mustard Oil', category: 'Oils & Ghee', price: '₹280', stock: 22, unit: 'litre', status: 'in-stock' },
  { id: 'GRO-003', name: 'Premium A2 Cow Ghee', category: 'Oils & Ghee', price: '₹780', stock: 8, unit: 'kg', status: 'low-stock' },
  { id: 'GRO-004', name: 'Desi Basmati Rice', category: 'Grains & Cereals', price: '₹95', stock: 0, unit: 'kg', status: 'out-of-stock' },
  { id: 'GRO-005', name: 'Organic Turmeric Powder', category: 'Spices', price: '₹180', stock: 60, unit: '100g', status: 'in-stock' },
  { id: 'GRO-006', name: 'Raw Forest Honey', category: 'Honey & Sweeteners', price: '₹450', stock: 15, unit: '500ml', status: 'in-stock' },
  { id: 'GRO-007', name: 'Amla Powder', category: 'Superfoods', price: '₹220', stock: 3, unit: '250g', status: 'low-stock' },
]

const ORDERS = [
  { id: 'ORD-001', customer: 'Anita Sharma', email: 'anita.s@email.com', items: 4, total: '₹1,240', status: 'delivered', date: '2026-04-05' },
  { id: 'ORD-002', customer: 'Rahul Mehta', email: 'rahul.m@email.com', items: 2, total: '₹860', status: 'processing', date: '2026-04-06' },
  { id: 'ORD-003', customer: 'Seema Jain', email: 'seema.j@email.com', items: 6, total: '₹2,100', status: 'shipped', date: '2026-04-04' },
  { id: 'ORD-004', customer: 'Mohan Lal', email: 'mohan.l@email.com', items: 1, total: '₹450', status: 'delivered', date: '2026-04-03' },
  { id: 'ORD-005', customer: 'Kavita Singh', email: 'kavita.sg@email.com', items: 3, total: '₹1,500', status: 'pending', date: '2026-04-06' },
]

const STATUS_COLORS = {
  'in-stock': 'badge-success',
  'low-stock': 'badge-warning',
  'out-of-stock': 'badge-danger',
  delivered: 'badge-success',
  processing: 'badge-warning',
  shipped: 'badge-info',
  pending: 'badge-default',
}

export default function PremiumGroceries() {
  const [tab, setTab] = useState('products')
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('all')

  const categories = ['all', ...new Set(PRODUCTS.map(p => p.category))]

  const filteredProducts = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'all' || p.category === catFilter
    return matchSearch && matchCat
  })

  const filteredOrders = ORDERS.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
  )

  const stats = [
    { label: 'Total Products', value: PRODUCTS.length, icon: '🛒', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    { label: 'In Stock', value: PRODUCTS.filter(p => p.status === 'in-stock').length, icon: '✅', color: 'var(--success)', bg: 'var(--success-bg)' },
    { label: 'Low Stock', value: PRODUCTS.filter(p => p.status === 'low-stock').length, icon: '⚠️', color: 'var(--brand-primary)', bg: 'var(--warning-bg)' },
    { label: 'Total Orders', value: ORDERS.length, icon: '📦', color: 'var(--info)', bg: 'var(--info-bg)' },
  ]

  return (
    <div>
      <div className="service-hero">
        <div className="service-hero-icon">🛒</div>
        <div className="service-hero-text">
          <h1>Premium Groceries</h1>
          <p>Manage organic product inventory, customer orders, and delivery tracking.</p>
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
        <button className={`tab-btn${tab === 'products' ? ' active' : ''}`} onClick={() => setTab('products')}>🥗 Products</button>
        <button className={`tab-btn${tab === 'orders' ? ' active' : ''}`} onClick={() => setTab('orders')}>📦 Orders</button>
      </div>

      {tab === 'products' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Product Inventory</div>
              <div className="card-subtitle">{filteredProducts.length} products</div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div className="search-bar" style={{ width: '200px' }}>
                <span style={{ color: 'var(--text-muted)' }}>🔍</span>
                <input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <select className="input" style={{ width: '170px' }} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
                {categories.map(c => (
                  <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
                ))}
              </select>
              <button className="btn btn-primary btn-sm">+ Add Product</button>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Unit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{p.category}</td>
                    <td style={{ fontWeight: 600, color: '#10b981' }}>{p.price}</td>
                    <td>
                      <span style={{ fontSize: '0.875rem', fontWeight: p.stock < 10 ? 700 : 400, color: p.stock === 0 ? 'var(--danger)' : p.stock < 10 ? 'var(--warning)' : 'var(--text-primary)' }}>
                        {p.stock}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{p.unit}</td>
                    <td><span className={`badge ${STATUS_COLORS[p.status]}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Customer Orders</div>
              <div className="card-subtitle">{filteredOrders.length} orders</div>
            </div>
            <div className="search-bar" style={{ width: '200px' }}>
              <span style={{ color: 'var(--text-muted)' }}>🔍</span>
              <input placeholder="Search orders…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{o.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="avatar avatar-sm" style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981' }}>{o.customer[0]}</div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{o.customer}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{o.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{o.items} items</td>
                    <td style={{ fontWeight: 700, color: '#10b981' }}>{o.total}</td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{o.date}</td>
                    <td><span className={`badge ${STATUS_COLORS[o.status]}`}>{o.status}</span></td>
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
