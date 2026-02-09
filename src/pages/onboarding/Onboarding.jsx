import React, { useState } from 'react'
import { Heart, ChevronRight, Check, Sparkles } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import { useHabits } from '../../context/HabitsContext'
import { DEFAULT_HABITS, CATEGORIES } from '../../data/categories'
import './Onboarding.css'

const STEPS = ['welcome', 'name', 'goals', 'habits', 'complete']

export function Onboarding({ onComplete }) {
    const [step, setStep] = useState(0)
    const [name, setName] = useState('')
    const [selectedGoals, setSelectedGoals] = useState([])
    const [selectedHabits, setSelectedHabits] = useState([])

    const { setupUser } = useUser()
    const { addHabit } = useHabits()

    const goals = [
        { id: 'health', label: 'Melhorar a saúde' },
        { id: 'relationship', label: 'Fortalecer relacionamento' },
        { id: 'productivity', label: 'Ser mais produtivo' },
        { id: 'mindfulness', label: 'Mais paz mental' },
        { id: 'finance', label: 'Organizar finanças' },
        { id: 'learning', label: 'Aprender mais' }
    ]

    const toggleGoal = (goalId) => {
        setSelectedGoals(prev =>
            prev.includes(goalId)
                ? prev.filter(g => g !== goalId)
                : [...prev, goalId]
        )
    }

    const toggleHabit = (index) => {
        setSelectedHabits(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    const nextStep = () => {
        if (step < STEPS.length - 1) {
            setStep(step + 1)
        }
    }

    const handleComplete = () => {
        // Save user
        setupUser({ name: name.trim() || 'Amor' })

        // Add selected habits
        selectedHabits.forEach(index => {
            const habit = DEFAULT_HABITS[index]
            addHabit({
                name: habit.name,
                category: habit.category,
                icon: habit.icon,
                type: 'individual',
                frequency: habit.frequency
            })
        })

        onComplete()
    }

    const renderStep = () => {
        switch (STEPS[step]) {
            case 'welcome':
                return (
                    <div className="onboarding-step welcome-step">
                        <div className="welcome-icon">
                            <Heart size={64} fill="currentColor" />
                        </div>
                        <h1>Couple Goals</h1>
                        <p>Construam hábitos saudáveis juntos e fortaleçam seu relacionamento!</p>
                        <button className="btn btn-primary btn-full" onClick={nextStep}>
                            Começar
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )

            case 'name':
                return (
                    <div className="onboarding-step">
                        <h2>Como podemos te chamar?</h2>
                        <p>Isso vai personalizar sua experiência</p>
                        <input
                            type="text"
                            className="name-input"
                            placeholder="Seu nome ou apelido"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            autoFocus
                        />
                        <button
                            className="btn btn-primary btn-full"
                            onClick={nextStep}
                            disabled={!name.trim()}
                        >
                            Continuar
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )

            case 'goals':
                return (
                    <div className="onboarding-step">
                        <h2>Quais são seus objetivos?</h2>
                        <p>Selecione suas principais metas</p>
                        <div className="goals-grid">
                            {goals.map(goal => (
                                <button
                                    key={goal.id}
                                    className={`goal-card ${selectedGoals.includes(goal.id) ? 'selected' : ''}`}
                                    onClick={() => toggleGoal(goal.id)}
                                >
                                    <span className="goal-label">{goal.label}</span>
                                    {selectedGoals.includes(goal.id) && (
                                        <Check size={18} className="goal-check" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <button
                            className="btn btn-primary btn-full"
                            onClick={nextStep}
                        >
                            Continuar
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )

            case 'habits':
                return (
                    <div className="onboarding-step">
                        <h2>Escolha seus primeiros hábitos</h2>
                        <p>Você pode adicionar mais depois</p>
                        <div className="habits-grid">
                            {DEFAULT_HABITS.map((habit, index) => (
                                <button
                                    key={index}
                                    className={`habit-option ${selectedHabits.includes(index) ? 'selected' : ''}`}
                                    onClick={() => toggleHabit(index)}
                                >
                                    <span className="habit-icon">{habit.icon}</span>
                                    <span className="habit-name">{habit.name}</span>
                                    {selectedHabits.includes(index) && (
                                        <Check size={16} className="habit-check" />
                                    )}
                                </button>
                            ))}
                        </div>
                        <button
                            className="btn btn-primary btn-full"
                            onClick={nextStep}
                        >
                            Continuar
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )

            case 'complete':
                return (
                    <div className="onboarding-step complete-step">
                        <div className="complete-icon">
                            <Sparkles size={64} />
                        </div>
                        <h1>Tudo pronto, {name || 'Amor'}!</h1>
                        <p>
                            Sua jornada de hábitos começa agora.
                            {selectedHabits.length > 0 && ` Adicionamos ${selectedHabits.length} hábitos para você começar.`}
                        </p>
                        <button className="btn btn-primary btn-full btn-lg" onClick={handleComplete}>
                            <Heart size={20} fill="currentColor" />
                            Vamos Começar!
                        </button>
                    </div>
                )
        }
    }

    return (
        <div className="onboarding">
            {/* Progress Dots */}
            <div className="onboarding-progress">
                {STEPS.map((_, index) => (
                    <div
                        key={index}
                        className={`progress-dot ${index === step ? 'active' : ''} ${index < step ? 'completed' : ''}`}
                    />
                ))}
            </div>

            {renderStep()}
        </div>
    )
}
