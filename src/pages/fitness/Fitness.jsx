import React, { useState } from 'react'
import { TrendingDown, TrendingUp, Scale, Plus, Target } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { getToday, formatDateReadable, getLastNDays } from '../../utils/dateUtils'
import './Fitness.css'

export function Fitness() {
    const [weightRecords, setWeightRecords] = useLocalStorage('couple-goals-weight', [])
    const [showInput, setShowInput] = useState(false)
    const [newWeight, setNewWeight] = useState('')
    const [goalWeight, setGoalWeight] = useLocalStorage('couple-goals-weight-goal', null)

    const today = getToday()
    const todayRecord = weightRecords.find(r => r.date === today)

    // Get last 7 records for chart
    const last7Days = getLastNDays(7)
    const chartData = last7Days.map(date => {
        const record = weightRecords.find(r => r.date === date)
        return { date, weight: record?.weight || null }
    })

    // Calculate stats
    const latestWeight = weightRecords.length > 0
        ? weightRecords.sort((a, b) => b.date.localeCompare(a.date))[0]?.weight
        : null

    const weekAgoWeight = weightRecords.find(r => r.date === getLastNDays(7)[0])?.weight
    const weekChange = latestWeight && weekAgoWeight ? latestWeight - weekAgoWeight : null

    const handleAddWeight = () => {
        const weight = parseFloat(newWeight)
        if (isNaN(weight) || weight <= 0) return

        const existingIndex = weightRecords.findIndex(r => r.date === today)

        if (existingIndex >= 0) {
            const updated = [...weightRecords]
            updated[existingIndex] = { date: today, weight }
            setWeightRecords(updated)
        } else {
            setWeightRecords([...weightRecords, { date: today, weight }])
        }

        setNewWeight('')
        setShowInput(false)
    }

    const maxWeight = Math.max(...chartData.filter(d => d.weight).map(d => d.weight), 0)
    const minWeight = Math.min(...chartData.filter(d => d.weight).map(d => d.weight), Infinity)
    const range = maxWeight - minWeight || 10

    return (
        <div className="page fitness-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Fitness</h1>
                    <p className="page-subtitle">Acompanhe seu progresso</p>
                </div>
            </div>

            <div className="page-content">
                {/* Current Weight Card */}
                <div className="weight-card main-card">
                    <div className="weight-icon-wrapper">
                        <Scale size={32} />
                    </div>
                    <div className="weight-info">
                        <span className="weight-label">Peso Atual</span>
                        <span className="weight-value">
                            {latestWeight ? `${latestWeight.toFixed(1)} kg` : '-- kg'}
                        </span>
                    </div>
                    {weekChange !== null && (
                        <div className={`weight-change ${weekChange < 0 ? 'down' : 'up'}`}>
                            {weekChange < 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                            <span>{Math.abs(weekChange).toFixed(1)} kg</span>
                        </div>
                    )}
                </div>

                {/* Stats Row */}
                <div className="stats-row">
                    <div className="stat-card">
                        <span className="stat-label">Meta</span>
                        <span className="stat-value">
                            {goalWeight ? `${goalWeight} kg` : '--'}
                        </span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Esta Semana</span>
                        <span className={`stat-value ${weekChange !== null && weekChange < 0 ? 'success' : ''}`}>
                            {weekChange !== null ? `${weekChange > 0 ? '+' : ''}${weekChange.toFixed(1)} kg` : '--'}
                        </span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Registros</span>
                        <span className="stat-value">{weightRecords.length}</span>
                    </div>
                </div>

                {/* Chart */}
                <div className="chart-card">
                    <h3 className="chart-title">Últimos 7 dias</h3>
                    <div className="chart-container">
                        <div className="chart-bars">
                            {chartData.map((d, i) => {
                                const height = d.weight
                                    ? ((d.weight - minWeight + range * 0.1) / (range * 1.2)) * 100
                                    : 0
                                const isToday = d.date === today

                                return (
                                    <div key={i} className="chart-bar-wrapper">
                                        <div
                                            className={`chart-bar ${isToday ? 'today' : ''} ${d.weight ? 'has-data' : ''}`}
                                            style={{ height: `${Math.max(height, 5)}%` }}
                                        >
                                            {d.weight && (
                                                <span className="chart-bar-value">{d.weight.toFixed(1)}</span>
                                            )}
                                        </div>
                                        <span className="chart-bar-label">
                                            {new Date(d.date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3)}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Add Weight Section */}
                {showInput ? (
                    <div className="add-weight-form">
                        <input
                            type="number"
                            className="weight-input"
                            placeholder="Ex: 75.5"
                            value={newWeight}
                            onChange={e => setNewWeight(e.target.value)}
                            step="0.1"
                            autoFocus
                        />
                        <button className="btn btn-primary" onClick={handleAddWeight}>
                            Salvar
                        </button>
                        <button className="btn btn-ghost" onClick={() => setShowInput(false)}>
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <button className="btn btn-primary btn-full" onClick={() => setShowInput(true)}>
                        <Plus size={20} />
                        {todayRecord ? 'Atualizar Peso de Hoje' : 'Registrar Peso'}
                    </button>
                )}
            </div>
        </div>
    )
}
