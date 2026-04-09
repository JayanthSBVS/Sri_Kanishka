import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import client from '../api/client'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Restore session from localStorage on app start
    const savedToken = localStorage.getItem('admin_token')
    const savedUser = localStorage.getItem('admin_user')
    if (savedToken && savedUser) {
      try {
        setAdminUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_user')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await client.post('/auth/login', { email, password })
    const { token, user } = res.data.data

    if (user.role !== 'admin') {
      throw new Error('Access denied. Admin credentials required.')
    }

    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_user', JSON.stringify(user))
    setAdminUser(user)
    return user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setAdminUser(null)
  }, [])

  const isAuthenticated = Boolean(adminUser)

  return (
    <AdminAuthContext.Provider value={{ adminUser, isAuthenticated, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
