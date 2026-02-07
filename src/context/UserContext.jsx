import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useLocalStorage('couple-goals-user', null)
    const [partner, setPartner] = useLocalStorage('couple-goals-partner', null)
    const [settings, setSettings] = useLocalStorage('couple-goals-settings', {
        theme: 'dark',
        notifications: true,
        primaryColor: '#E91E63',
        coupleCode: null
    })

    // Generate a couple linking code
    const generateCoupleCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase()
        setSettings(prev => ({ ...prev, coupleCode: code }))
        return code
    }

    // Setup user profile
    const setupUser = (userData) => {
        setUser({
            id: `user_${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...userData
        })
    }

    // Link partner
    const linkPartner = (partnerData) => {
        setPartner({
            id: `partner_${Date.now()}`,
            linkedAt: new Date().toISOString(),
            ...partnerData
        })
    }

    // Update settings
    const updateSettings = (updates) => {
        setSettings(prev => ({ ...prev, ...updates }))
    }

    // Check if user is set up
    const isUserSetup = () => !!user

    // Check if has partner
    const hasPartner = () => !!partner

    // Clear all user data (logout)
    const logout = () => {
        setUser(null)
        setPartner(null)
        setSettings({
            theme: 'dark',
            notifications: true,
            primaryColor: '#E91E63',
            coupleCode: null
        })
    }

    const value = {
        user,
        partner,
        settings,
        setupUser,
        linkPartner,
        updateSettings,
        generateCoupleCode,
        isUserSetup,
        hasPartner,
        logout
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
