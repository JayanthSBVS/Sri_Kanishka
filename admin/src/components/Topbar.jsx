import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

const TITLES = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of all platform activity' },
  '/services/it-training': { title: 'IT Training & Consultancy', subtitle: 'Manage IT training enquiries and consultancy requests' },
  '/services/global-matrimony': { title: 'Global Matrimony', subtitle: 'Manage matrimony profiles and matches' },
  '/services/meditation': { title: 'Meditation & Spirituality', subtitle: 'Manage meditation sessions and spiritual programs' },
  '/services/real-estate': { title: 'Real Estate & Construction', subtitle: 'Manage property listings and construction projects' },
  '/services/abroad-consultancy': { title: 'Abroad Consultancy', subtitle: 'Manage visa, travel, and abroad study enquiries' },
  '/services/premium-groceries': { title: 'Premium Groceries', subtitle: 'Manage orders, inventory, and product listings' },
}

export default function Topbar({ sidebarCollapsed }) {
  const { adminUser, logout } = useAdminAuth()
  const location = useLocation()
  const info = TITLES[location.pathname] || { title: 'Admin Panel', subtitle: 'Sri Kanishka' }
  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: sidebarCollapsed ? '70px' : 'var(--sidebar-width)',
      right: 0,
      height: 'var(--topbar-height)',
      background: 'var(--bg-topbar)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '16px',
      zIndex: 99,
      transition: 'left 0.25s ease'
    }}>
      {/* Page title */}
      <div style={{ flex: 1 }}>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1.2
        }}>{info.title}</h2>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '1px' }}>
          {info.subtitle}
        </p>
      </div>

      {/* Live time */}
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{timeStr}</span>
        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{dateStr}</span>
      </div>

      {/* Main app link */}
      <a
        href="http://localhost:5173"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '0.8rem', color: 'var(--text-secondary)',
          background: 'var(--bg-surface)', border: '1px solid var(--border)',
          borderRadius: '8px', padding: '7px 12px',
          textDecoration: 'none', fontWeight: 500,
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-active)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        title="Open main website"
      >
        🌐 Main Site
      </a>

      {/* Logout */}
      <button
        onClick={logout}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '0.8rem', fontFamily: 'Inter, sans-serif',
          color: 'var(--danger)', background: 'var(--danger-bg)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '8px', padding: '7px 14px',
          cursor: 'pointer', fontWeight: 600,
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--danger-bg)'; }}
      >
        🚪 Logout
      </button>
    </header>
  )
}
