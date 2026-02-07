import React, { useState } from 'react'
import { X, Heart, Dumbbell, Brain, Target, BookOpen, PiggyBank, Moon, Droplets } from 'lucide-react'
import { useHabits } from '../../context/HabitsContext'
import { CATEGORIES } from '../../data/categories'
import './HabitForm.css'

const ICONS = [
    { id: '💧', label: 'Água' },
    { id: '🏋️', label: 'Treino' },
    { id: '🧘', label: 'Meditar' },
    { id: '📚', label: 'Ler' },
    { id: '😴', label: 'Dormir' },
    { id: '💕', label: 'Amor' },
    { id: '🚶', label: 'Caminhar' },
    { id: '💰', label: 'Economizar' },
    { id: '🍎', label: 'Comer bem' },
    { id: '✨', label: 'Geral' },
    { id: '💪', label: 'Força' },
    { id: '🎯', label: 'Foco' }
]

export function HabitForm({ onClose, editHabit = null }) {
    const { addHabit, updateHabit } = useHabits()

    const [name, setName] = useState(editHabit?.name || '')
    const [category, setCategory] = useState(editHabit?.category || 'health')
    const [icon, setIcon] = useState(editHabit?.icon || '✨')
    const [type, setType] = useState(editHabit?.type || 'individual')
    const [frequency, setFrequency] = useState(editHabit?.frequency || 'daily')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name.trim()) return

        const habitData = {
            name: name.trim(),
            category,
            icon,
            type,
            frequency
        }

        if (editHabit) {
            updateHabit(editHabit.id, habitData)
        } else {
            addHabit(habitData)
        }

        onClose()
    }

    const categories = Object.values(CATEGORIES)

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content habit-form-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{editHabit ? 'Editar Hábito' : 'Novo Hábito'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form className="habit-form" onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="form-group">
                        <label className="form-label">Nome do Hábito</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Ex: Beber 2L de água"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            autoFocus
                        />
                    </div>

                    {/* Icon Selection */}
                    <div className="form-group">
                        <label className="form-label">Ícone</label>
                        <div className="icon-grid">
                            {ICONS.map(ic => (
                                <button
                                    key={ic.id}
                                    type="button"
                                    className={`icon-btn ${icon === ic.id ? 'active' : ''}`}
                                    onClick={() => setIcon(ic.id)}
                                >
                                    {ic.id}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div className="form-group">
                        <label className="form-label">Categoria</label>
                        <div className="category-grid">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    className={`category-btn ${category === cat.id ? 'active' : ''}`}
                                    onClick={() => setCategory(cat.id)}
                                    style={{ '--cat-color': cat.color }}
                                >
                                    <span className="category-dot" style={{ background: cat.color }} />
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Type Toggle */}
                    <div className="form-group">
                        <label className="form-label">Tipo</label>
                        <div className="type-toggle">
                            <button
                                type="button"
                                className={`type-btn ${type === 'individual' ? 'active' : ''}`}
                                onClick={() => setType('individual')}
                            >
                                👤 Individual
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${type === 'shared' ? 'active' : ''}`}
                                onClick={() => setType('shared')}
                            >
                                💕 Casal
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary btn-full">
                        {editHabit ? 'Salvar Alterações' : 'Criar Hábito'}
                    </button>
                </form>
            </div>
        </div>
    )
}
