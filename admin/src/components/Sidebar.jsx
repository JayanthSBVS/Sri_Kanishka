import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

const NAV_ITEMS = [
  { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { path: '/services/it-training', icon: '💻', label: 'IT Training & Consultancy' },
  { path: '/services/global-matrimony', icon: '💍', label: 'Global Matrimony' },
  { path: '/services/meditation', icon: '🧘', label: 'Meditation & Spirituality' },
  { path: '/services/real-estate', icon: '🏗️', label: 'Real Estate & Construction' },
  { path: '/services/abroad-consultancy', icon: '✈️', label: 'Abroad Consultancy' },
  { path: '/services/premium-groceries', icon: '🛒', label: 'Premium Groceries' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const { adminUser } = useAdminAuth()
  const location = useLocation()

  const initials = adminUser?.name
    ?.split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'A'

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}
      style={{
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        width: collapsed ? '70px' : 'var(--sidebar-width)',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        transition: 'width 0.25s ease',
        overflow: 'hidden'
      }}
    >
      {/* Logo */}
      <div style={{
        padding: collapsed ? '22px 0' : '22px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        minHeight: '70px'
      }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', flexShrink: 0, fontWeight: 'bold', color: '#0a0b0f'
        }}>
          SK
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
              Sri Kanishka
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--brand-primary)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Admin Panel
            </div>
          </div>
        )}
        {!collapsed && (
          <button onClick={onToggle} style={{
            marginLeft: 'auto',
            background: 'none', border: 'none',
            color: 'var(--text-muted)', cursor: 'pointer',
            fontSize: '1.1rem', padding: '4px',
            borderRadius: '6px',
            transition: 'all 0.2s'
          }}
          title="Collapse sidebar"
          >
            ◀
          </button>
        )}
      </div>

      {collapsed && (
        <button onClick={onToggle} style={{
          background: 'none', border: 'none',
          color: 'var(--text-muted)', cursor: 'pointer',
          fontSize: '1.1rem', padding: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s'
        }}
        title="Expand sidebar"
        >
          ▶
        </button>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto', overflowX: 'hidden' }}>
        {!collapsed && (
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '8px 10px 6px', marginBottom: '4px' }}>
            Navigation
          </div>
        )}
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: collapsed ? '12px 0' : '10px 10px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '10px',
                marginBottom: '2px',
                textDecoration: 'none',
                color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(245, 158, 11, 0.2)' : 'transparent'}`,
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.875rem',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }
              }}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0, width: '22px', textAlign: 'center' }}>{item.icon}</span>
              {!collapsed && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* Admin profile footer */}
      <div style={{
        padding: collapsed ? '14px 0' : '14px 12px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: collapsed ? 'center' : 'flex-start'
      }}>
        <div style={{
          width: '34px', height: '34px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.8rem', fontWeight: 700, color: '#0a0b0f', flexShrink: 0
        }}>
          {initials}
        </div>
        {!collapsed && (
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {adminUser?.name || 'Admin'}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--brand-primary)', fontWeight: 500 }}>
              Administrator
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
