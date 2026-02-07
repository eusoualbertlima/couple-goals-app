import React, { useState } from 'react'
import { Plus, Filter, X } from 'lucide-react'
import { useHabits } from '../../context/HabitsContext'
import { HabitCard } from '../../components/habits/HabitCard'
import { HeatMap } from '../../components/habits/HeatMap'
import { HabitForm } from './HabitForm'
import { CATEGORIES } from '../../data/categories'
import './HabitList.css'

export function HabitList() {
    const { habits, toggleHabitCompletion, isHabitCompleted, getHabitStreak, completions } = useHabits()
    const [showForm, setShowForm] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)

    // Filter habits by category
    const filteredHabits = selectedCategory
        ? habits.filter(h => h.category === selectedCategory)
        : habits

    // Get all completions for heatmap
    const allCompletions = Object.values(completions).flat()

    const categories = Object.values(CATEGORIES)

    return (
        <div className="page habits-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Meus Hábitos</h1>
                    <p className="page-subtitle">{habits.length} hábitos ativos</p>
                </div>
            </div>

            <div className="page-content">
                {/* HeatMap */}
                <section className="habits-section">
                    <h2 className="section-title">📅 Consistência</h2>
                    <HeatMap completions={allCompletions} />
                </section>

                {/* Category Filter */}
                <div className="category-filter">
                    <button
                        className={`filter-chip ${!selectedCategory ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(null)}
                    >
                        Todos
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{ '--cat-color': cat.color }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Habits List */}
                <section className="habits-section">
                    <h2 className="section-title">
                        {selectedCategory ? CATEGORIES[selectedCategory].name : 'Todos os Hábitos'}
                        <span className="section-count">({filteredHabits.length})</span>
                    </h2>

                    {filteredHabits.length > 0 ? (
                        <div className="habits-list">
                            {filteredHabits.map(habit => (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                    isCompleted={isHabitCompleted(habit.id)}
                                    streak={getHabitStreak(habit.id)}
                                    onToggle={() => toggleHabitCompletion(habit.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-habits">
                            <p>Nenhum hábito {selectedCategory ? 'nesta categoria' : 'ainda'}.</p>
                            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                                <Plus size={18} />
                                Criar Hábito
                            </button>
                        </div>
                    )}
                </section>
            </div>

            {/* FAB */}
            <button className="fab" onClick={() => setShowForm(true)}>
                <Plus size={24} />
            </button>

            {/* Add Habit Modal */}
            {showForm && (
                <HabitForm onClose={() => setShowForm(false)} />
            )}
        </div>
    )
}
