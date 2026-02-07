import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getMonthGrid, getMonthName, getToday, formatDate } from '../../utils/dateUtils'
import './HeatMap.css'

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export function HeatMap({ completions = [], onDateClick }) {
    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())

    const todayStr = getToday()
    const monthGrid = getMonthGrid(currentYear, currentMonth)

    // Calculate completion levels (0-4)
    const getLevel = (dateStr) => {
        const count = completions.filter(c => c === dateStr).length
        if (count === 0) return 0
        if (count === 1) return 1
        if (count <= 3) return 2
        if (count <= 5) return 3
        return 4
    }

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(y => y - 1)
        } else {
            setCurrentMonth(m => m - 1)
        }
    }

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(y => y + 1)
        } else {
            setCurrentMonth(m => m + 1)
        }
    }

    const canGoNext = currentYear < today.getFullYear() ||
        (currentYear === today.getFullYear() && currentMonth < today.getMonth())

    return (
        <div className="heatmap-container">
            <div className="heatmap-header">
                <button className="heatmap-nav" onClick={prevMonth}>
                    <ChevronLeft size={20} />
                </button>
                <span className="heatmap-title">
                    {getMonthName(new Date(currentYear, currentMonth))} {currentYear}
                </span>
                <button
                    className="heatmap-nav"
                    onClick={nextMonth}
                    disabled={!canGoNext}
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <div className="heatmap-weekdays">
                {WEEKDAYS.map((day, i) => (
                    <span key={i} className="heatmap-weekday">{day}</span>
                ))}
            </div>

            <div className="heatmap-grid">
                {monthGrid.map(({ date, isCurrentMonth }, index) => {
                    const level = isCurrentMonth ? getLevel(date) : 0
                    const isToday = date === todayStr

                    return (
                        <div
                            key={index}
                            className={`heatmap-cell level-${level} ${isToday ? 'today' : ''} ${!isCurrentMonth ? 'faded' : ''}`}
                            onClick={() => isCurrentMonth && onDateClick && onDateClick(date)}
                            title={date}
                        >
                            <span className="heatmap-day">
                                {new Date(date + 'T12:00:00').getDate()}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div className="heatmap-legend">
                <span className="heatmap-legend-label">Menos</span>
                <div className="heatmap-legend-cells">
                    {[0, 1, 2, 3, 4].map(level => (
                        <div key={level} className={`heatmap-legend-cell level-${level}`} />
                    ))}
                </div>
                <span className="heatmap-legend-label">Mais</span>
            </div>
        </div>
    )
}
