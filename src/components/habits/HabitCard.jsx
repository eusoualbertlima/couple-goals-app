import React from 'react'
import { Check, Flame } from 'lucide-react'
import { CATEGORIES } from '../../data/categories'
import './HabitCard.css'

export function HabitCard({
    habit,
    isCompleted,
    streak = 0,
    onToggle,
    onClick
}) {
    const category = CATEGORIES[habit.category] || CATEGORIES.health

    const handleToggle = (e) => {
        e.stopPropagation()
        onToggle && onToggle()
    }

    return (
        <div
            className={`habit-card ${isCompleted ? 'completed' : ''}`}
            onClick={onClick}
        >
            <div
                className="habit-card-icon"
                style={{ background: category.color }}
            >
                <span>{habit.icon || '✨'}</span>
            </div>

            <div className="habit-card-content">
                <h3 className="habit-card-name">{habit.name}</h3>
                <div className="habit-card-meta">
                    <span className="habit-card-category">{category.name}</span>
                    {habit.type === 'shared' && (
                        <span className="habit-card-shared">💕 Casal</span>
                    )}
                </div>
            </div>

            {streak > 0 && (
                <div className="habit-card-streak">
                    <Flame size={14} />
                    <span>{streak}</span>
                </div>
            )}

            <button
                className={`habit-card-check ${isCompleted ? 'checked' : ''}`}
                onClick={handleToggle}
                aria-label={isCompleted ? 'Marcar como não feito' : 'Marcar como feito'}
            >
                {isCompleted && <Check size={18} strokeWidth={3} />}
            </button>
        </div>
    )
}
