import React, { useState } from 'react'
import { Moon, Sun, Clock, Star, Plus, TrendingUp } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { getToday, getLastNDays } from '../../utils/dateUtils'
import './Sleep.css'

export function Sleep() {
    const [sleepRecords, setSleepRecords] = useLocalStorage('couple-goals-sleep', [])
    const [showInput, setShowInput] = useState(false)
    const [bedTime, setBedTime] = useState('23:00')
    const [wakeTime, setWakeTime] = useState('07:00')
    const [quality, setQuality] = useState(3)

    const today = getToday()
    const todayRecord = sleepRecords.find(r => r.date === today)

    // Calculate sleep duration from times
    const calculateDuration = (bed, wake) => {
        const [bedH, bedM] = bed.split(':').map(Number)
        const [wakeH, wakeM] = wake.split(':').map(Number)

        let bedMins = bedH * 60 + bedM
        let wakeMins = wakeH * 60 + wakeM

        if (wakeMins < bedMins) {
            wakeMins += 24 * 60 // Next day
        }

        const durationMins = wakeMins - bedMins
        const hours = Math.floor(durationMins / 60)
        const mins = durationMins % 60

        return { hours, mins, total: durationMins }
    }

    // Get last 7 days data
    const last7Days = getLastNDays(7)
    const chartData = last7Days.map(date => {
        const record = sleepRecords.find(r => r.date === date)
        return {
            date,
            duration: record?.duration || null,
            quality: record?.quality || null
        }
    })

    // Calculate averages
    const avgDuration = sleepRecords.length > 0
        ? sleepRecords.reduce((acc, r) => acc + r.duration, 0) / sleepRecords.length
        : 0
    const avgQuality = sleepRecords.length > 0
        ? sleepRecords.reduce((acc, r) => acc + r.quality, 0) / sleepRecords.length
        : 0

    const handleAddSleep = () => {
        const { hours, mins, total } = calculateDuration(bedTime, wakeTime)

        const record = {
            date: today,
            bedTime,
            wakeTime,
            duration: total / 60, // In hours
            quality
        }

        const existingIndex = sleepRecords.findIndex(r => r.date === today)

        if (existingIndex >= 0) {
            const updated = [...sleepRecords]
            updated[existingIndex] = record
            setSleepRecords(updated)
        } else {
            setSleepRecords([...sleepRecords, record])
        }

        setShowInput(false)
    }

    const formatDuration = (hours) => {
        const h = Math.floor(hours)
        const m = Math.round((hours - h) * 60)
        return `${h}h ${m}m`
    }

    return (
        <div className="page sleep-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Sono</h1>
                    <p className="page-subtitle">Monitore sua qualidade de sono</p>
                </div>
            </div>

            <div className="page-content">
                {/* Last Night Card */}
                <div className="sleep-card main-card">
                    <div className="sleep-icon-wrapper">
                        <Moon size={32} />
                    </div>
                    <div className="sleep-info">
                        <span className="sleep-label">Última Noite</span>
                        <span className="sleep-value">
                            {todayRecord ? formatDuration(todayRecord.duration) : '--'}
                        </span>
                    </div>
                    {todayRecord && (
                        <div className="sleep-quality">
                            {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                    key={star}
                                    size={16}
                                    fill={star <= todayRecord.quality ? '#FFD700' : 'transparent'}
                                    stroke={star <= todayRecord.quality ? '#FFD700' : 'rgba(255,255,255,0.3)'}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats Row */}
                <div className="stats-row">
                    <div className="stat-card">
                        <span className="stat-label">Média</span>
                        <span className="stat-value">
                            {avgDuration > 0 ? formatDuration(avgDuration) : '--'}
                        </span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Qualidade</span>
                        <span className="stat-value">
                            {avgQuality > 0 ? avgQuality.toFixed(1) : '--'}
                        </span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Registros</span>
                        <span className="stat-value">{sleepRecords.length}</span>
                    </div>
                </div>

                {/* Chart */}
                <div className="chart-card">
                    <h3 className="chart-title">Últimos 7 dias</h3>
                    <div className="chart-container">
                        <div className="chart-bars">
                            {chartData.map((d, i) => {
                                const height = d.duration ? (d.duration / 12) * 100 : 0
                                const isToday = d.date === today

                                return (
                                    <div key={i} className="chart-bar-wrapper">
                                        <div
                                            className={`chart-bar ${isToday ? 'today' : ''} ${d.duration ? 'has-data' : ''}`}
                                            style={{ height: `${Math.max(height, 5)}%` }}
                                        >
                                            {d.duration && (
                                                <span className="chart-bar-value">{d.duration.toFixed(1)}h</span>
                                            )}
                                        </div>
                                        <span className="chart-bar-label">
                                            {new Date(d.date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3)}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="chart-baseline" style={{ bottom: `${(8 / 12) * 100}%` }}>
                            <span>8h ideal</span>
                        </div>
                    </div>
                </div>

                {/* Add Sleep Form */}
                {showInput ? (
                    <div className="sleep-form">
                        <div className="time-inputs">
                            <div className="time-input-group">
                                <label><Moon size={16} /> Dormi às</label>
                                <input
                                    type="time"
                                    value={bedTime}
                                    onChange={e => setBedTime(e.target.value)}
                                />
                            </div>
                            <div className="time-input-group">
                                <label><Sun size={16} /> Acordei às</label>
                                <input
                                    type="time"
                                    value={wakeTime}
                                    onChange={e => setWakeTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="quality-input">
                            <label>Qualidade do Sono</label>
                            <div className="stars-input">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        className={`star-btn ${star <= quality ? 'active' : ''}`}
                                        onClick={() => setQuality(star)}
                                    >
                                        <Star
                                            size={28}
                                            fill={star <= quality ? '#FFD700' : 'transparent'}
                                            stroke={star <= quality ? '#FFD700' : 'rgba(255,255,255,0.3)'}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button className="btn btn-primary" onClick={handleAddSleep}>
                                Salvar
                            </button>
                            <button className="btn btn-ghost" onClick={() => setShowInput(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <button className="btn btn-primary btn-full" onClick={() => setShowInput(true)}>
                        <Plus size={20} />
                        {todayRecord ? 'Atualizar Sono de Hoje' : 'Registrar Sono'}
                    </button>
                )}
            </div>
        </div>
    )
}
