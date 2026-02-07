import React from 'react'
import { Flame, Heart, Trophy } from 'lucide-react'
import { useHabits } from '../../context/HabitsContext'
import { useUser } from '../../context/UserContext'
import { ProgressRing } from '../../components/common/ProgressRing'
import { HabitCard } from '../../components/habits/HabitCard'
import { getGreeting, getToday, formatDateReadable } from '../../utils/dateUtils'
import { QUOTES } from '../../data/categories'
import './Dashboard.css'

export function Dashboard() {
    const { user } = useUser()
    const {
        habits,
        getTodayProgress,
        toggleHabitCompletion,
        isHabitCompleted,
        getHabitStreak,
        getBestStreak,
        getTotalCompletions
    } = useHabits()

    const progress = getTodayProgress()
    const bestStreak = getBestStreak()
    const totalCompletions = getTotalCompletions()
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]

    // Get incomplete habits for today
    const incompleteHabits = habits.filter(h => !isHabitCompleted(h.id))
    const completedHabits = habits.filter(h => isHabitCompleted(h.id))

    return (
        <div className="page dashboard">
            <div className="page-header">
                <div className="dashboard-greeting">
                    <span className="greeting-text">{getGreeting()},</span>
                    <h1 className="greeting-name">{user?.name || 'Amor'} 💕</h1>
                </div>
                <div className="dashboard-date">{formatDateReadable(getToday())}</div>
            </div>

            <div className="page-content">
                {/* Quote Card */}
                <div className="quote-card">
                    <span className="quote-icon">✨</span>
                    <p className="quote-text">{randomQuote}</p>
                </div>

                {/* Progress Section */}
                <section className="dashboard-section">
                    <div className="progress-card">
                        <ProgressRing progress={progress.percentage} size={120} strokeWidth={10}>
                            <div className="progress-inner">
                                <span className="progress-count">{progress.completed}/{progress.total}</span>
                                <span className="progress-label">hábitos</span>
                            </div>
                        </ProgressRing>

                        <div className="progress-stats">
                            <div className="stat-item">
                                <div className="stat-icon fire">
                                    <Flame size={20} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value">{bestStreak}</span>
                                    <span className="stat-label">Melhor Streak</span>
                                </div>
                            </div>

                            <div className="stat-item">
                                <div className="stat-icon heart">
                                    <Heart size={20} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value">{totalCompletions}</span>
                                    <span className="stat-label">Total</span>
                                </div>
                            </div>

                            <div className="stat-item">
                                <div className="stat-icon trophy">
                                    <Trophy size={20} />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value">{progress.percentage}%</span>
                                    <span className="stat-label">Hoje</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Today's Habits */}
                {incompleteHabits.length > 0 && (
                    <section className="dashboard-section">
                        <h2 className="section-title">
                            Para Fazer Hoje
                            <span className="section-badge">{incompleteHabits.length}</span>
                        </h2>
                        <div className="habits-list">
                            {incompleteHabits.map(habit => (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                    isCompleted={false}
                                    streak={getHabitStreak(habit.id)}
                                    onToggle={() => toggleHabitCompletion(habit.id)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Completed Today */}
                {completedHabits.length > 0 && (
                    <section className="dashboard-section">
                        <h2 className="section-title">
                            Concluídos 🎉
                            <span className="section-badge success">{completedHabits.length}</span>
                        </h2>
                        <div className="habits-list">
                            {completedHabits.map(habit => (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                    isCompleted={true}
                                    streak={getHabitStreak(habit.id)}
                                    onToggle={() => toggleHabitCompletion(habit.id)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {habits.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">💕</div>
                        <h3 className="empty-title">Comece sua jornada juntos!</h3>
                        <p className="empty-text">
                            Adicione seu primeiro hábito e comecem a construir uma vida mais saudável como casal.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
