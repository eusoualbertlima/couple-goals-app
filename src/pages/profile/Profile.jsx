import React, { useState } from 'react'
import { User, Heart, Settings, LogOut, Moon, Sun, Bell, Shield, ChevronRight, Edit2 } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import { useHabits } from '../../context/HabitsContext'
import './Profile.css'

export function Profile() {
    const { user, partner, settings, updateSettings, setupUser, logout } = useUser()
    const { habits, getTotalCompletions, getBestStreak } = useHabits()
    const [showNameEdit, setShowNameEdit] = useState(false)
    const [newName, setNewName] = useState(user?.name || '')

    const totalCompletions = getTotalCompletions()
    const bestStreak = getBestStreak()

    const handleSaveName = () => {
        if (newName.trim()) {
            setupUser({ ...user, name: newName.trim() })
            setShowNameEdit(false)
        }
    }

    const toggleTheme = () => {
        updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })
    }

    const toggleNotifications = () => {
        updateSettings({ notifications: !settings.notifications })
    }

    return (
        <div className="page profile-page">
            <div className="page-header">
                <h1 className="page-title">Perfil</h1>
            </div>

            <div className="page-content">
                {/* Profile Card */}
                <div className="profile-card">
                    <div className="profile-avatar">
                        <User size={40} />
                    </div>

                    {showNameEdit ? (
                        <div className="name-edit">
                            <input
                                type="text"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                placeholder="Seu nome"
                                autoFocus
                            />
                            <button className="btn btn-sm" onClick={handleSaveName}>Salvar</button>
                            <button className="btn btn-ghost btn-sm" onClick={() => setShowNameEdit(false)}>X</button>
                        </div>
                    ) : (
                        <div className="profile-info">
                            <h2 className="profile-name">
                                {user?.name || 'Seu Nome'}
                                <button className="edit-btn" onClick={() => setShowNameEdit(true)}>
                                    <Edit2 size={14} />
                                </button>
                            </h2>
                            <p className="profile-email">{user?.email || 'Configure seu perfil'}</p>
                        </div>
                    )}

                    {partner && (
                        <div className="partner-badge">
                            <Heart size={14} fill="currentColor" />
                            <span>Conectado com {partner.name}</span>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="profile-stats">
                    <div className="profile-stat">
                        <span className="stat-value">{habits.length}</span>
                        <span className="stat-label">Hábitos</span>
                    </div>
                    <div className="profile-stat">
                        <span className="stat-value">{totalCompletions}</span>
                        <span className="stat-label">Completados</span>
                    </div>
                    <div className="profile-stat">
                        <span className="stat-value">{bestStreak}</span>
                        <span className="stat-label">Melhor Streak</span>
                    </div>
                </div>

                {/* Settings */}
                <section className="settings-section">
                    <h3 className="section-title">Configurações</h3>

                    <div className="settings-list">
                        <div className="setting-item" onClick={toggleTheme}>
                            <div className="setting-icon">
                                {settings.theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                            </div>
                            <div className="setting-content">
                                <span className="setting-name">Tema</span>
                                <span className="setting-value">{settings.theme === 'dark' ? 'Escuro' : 'Claro'}</span>
                            </div>
                            <ChevronRight size={20} className="setting-arrow" />
                        </div>

                        <div className="setting-item" onClick={toggleNotifications}>
                            <div className="setting-icon">
                                <Bell size={20} />
                            </div>
                            <div className="setting-content">
                                <span className="setting-name">Notificações</span>
                                <span className="setting-value">{settings.notifications ? 'Ativadas' : 'Desativadas'}</span>
                            </div>
                            <div className={`toggle ${settings.notifications ? 'active' : ''}`}>
                                <div className="toggle-knob" />
                            </div>
                        </div>

                        <div className="setting-item">
                            <div className="setting-icon">
                                <Shield size={20} />
                            </div>
                            <div className="setting-content">
                                <span className="setting-name">Privacidade</span>
                                <span className="setting-value">Gerenciar dados</span>
                            </div>
                            <ChevronRight size={20} className="setting-arrow" />
                        </div>
                    </div>
                </section>

                {/* Couple Link */}
                {!partner && (
                    <section className="couple-section">
                        <h3 className="section-title">Conectar Parceiro(a)</h3>
                        <p className="section-text">
                            Conecte sua conta com seu parceiro(a) para compartilhar hábitos e acompanhar o progresso juntos.
                        </p>
                        <button className="btn btn-primary btn-full">
                            <Heart size={18} />
                            Gerar Código de Convite
                        </button>
                    </section>
                )}

                {/* Version Info */}
                <div className="app-info">
                    <p>Couple Goals v1.0.0</p>
                    <p>Feito para casais</p>
                </div>
            </div>
        </div>
    )
}
