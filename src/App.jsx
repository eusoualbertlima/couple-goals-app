import React, { useState, useEffect } from 'react'
import { HabitsProvider } from './context/HabitsContext'
import { UserProvider, useUser } from './context/UserContext'
import { TabBar } from './components/navigation/TabBar'
import { Dashboard } from './pages/dashboard/Dashboard'
import { HabitList } from './pages/habits/HabitList'
import { Fitness } from './pages/fitness/Fitness'
import { Sleep } from './pages/sleep/Sleep'
import { Profile } from './pages/profile/Profile'
import { Onboarding } from './pages/onboarding/Onboarding'

function AppContent() {
    const [activeTab, setActiveTab] = useState('home')
    const { user, isUserSetup, settings } = useUser()
    const [showOnboarding, setShowOnboarding] = useState(false)

    useEffect(() => {
        if (!isUserSetup()) {
            setShowOnboarding(true)
        }
    }, [isUserSetup])

    // Apply theme to body
    useEffect(() => {
        document.body.setAttribute('data-theme', settings.theme || 'dark')
    }, [settings.theme])

    const handleOnboardingComplete = () => {
        setShowOnboarding(false)
    }

    const renderPage = () => {
        switch (activeTab) {
            case 'home':
                return <Dashboard />
            case 'habits':
                return <HabitList />
            case 'fitness':
                return <Fitness />
            case 'sleep':
                return <Sleep />
            case 'profile':
                return <Profile />
            default:
                return <Dashboard />
        }
    }

    if (showOnboarding) {
        return <Onboarding onComplete={handleOnboardingComplete} />
    }

    return (
        <div className="app">
            <main className="app-main">
                {renderPage()}
            </main>
            <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    )
}

export default function App() {
    return (
        <UserProvider>
            <HabitsProvider>
                <AppContent />
            </HabitsProvider>
        </UserProvider>
    )
}
