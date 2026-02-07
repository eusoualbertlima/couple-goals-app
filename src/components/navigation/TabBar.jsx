import React from 'react'
import { Home, ListChecks, Dumbbell, Moon, User } from 'lucide-react'
import './TabBar.css'

const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'habits', label: 'Hábitos', icon: ListChecks },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'sleep', label: 'Sono', icon: Moon },
    { id: 'profile', label: 'Perfil', icon: User }
]

export function TabBar({ activeTab, onTabChange }) {
    return (
        <nav className="tab-bar">
            {tabs.map(tab => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id

                return (
                    <button
                        key={tab.id}
                        className={`tab-item ${isActive ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                        aria-label={tab.label}
                    >
                        <Icon className="tab-icon" size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="tab-label">{tab.label}</span>
                        {isActive && <span className="tab-indicator" />}
                    </button>
                )
            })}
        </nav>
    )
}
