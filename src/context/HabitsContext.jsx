import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getToday, calculateStreak } from '../utils/dateUtils'

const HabitsContext = createContext()

export function HabitsProvider({ children }) {
    const [habits, setHabits] = useLocalStorage('couple-goals-habits', [])
    const [completions, setCompletions] = useLocalStorage('couple-goals-completions', {})

    // Generate unique ID
    const generateId = () => `habit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Add a new habit
    const addHabit = (habitData) => {
        const newHabit = {
            id: generateId(),
            createdAt: getToday(),
            ...habitData
        }
        setHabits(prev => [...prev, newHabit])
        return newHabit
    }

    // Update an existing habit
    const updateHabit = (id, updates) => {
        setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h))
    }

    // Delete a habit
    const deleteHabit = (id) => {
        setHabits(prev => prev.filter(h => h.id !== id))
        // Also remove completions for this habit
        setCompletions(prev => {
            const updated = { ...prev }
            delete updated[id]
            return updated
        })
    }

    // Toggle habit completion for today
    const toggleHabitCompletion = (habitId, date = getToday()) => {
        setCompletions(prev => {
            const habitCompletions = prev[habitId] || []
            const isCompleted = habitCompletions.includes(date)

            return {
                ...prev,
                [habitId]: isCompleted
                    ? habitCompletions.filter(d => d !== date)
                    : [...habitCompletions, date]
            }
        })
    }

    // Check if habit is completed for a date
    const isHabitCompleted = (habitId, date = getToday()) => {
        return (completions[habitId] || []).includes(date)
    }

    // Get completions for a habit
    const getHabitCompletions = (habitId) => {
        return completions[habitId] || []
    }

    // Get streak for a habit
    const getHabitStreak = (habitId) => {
        return calculateStreak(completions[habitId] || [])
    }

    // Get today's progress
    const getTodayProgress = () => {
        const today = getToday()
        const totalHabits = habits.length
        if (totalHabits === 0) return { completed: 0, total: 0, percentage: 0 }

        const completedToday = habits.filter(h => isHabitCompleted(h.id, today)).length
        return {
            completed: completedToday,
            total: totalHabits,
            percentage: Math.round((completedToday / totalHabits) * 100)
        }
    }

    // Get habits by category
    const getHabitsByCategory = (category) => {
        return habits.filter(h => h.category === category)
    }

    // Get total completions count
    const getTotalCompletions = () => {
        return Object.values(completions).reduce((acc, arr) => acc + arr.length, 0)
    }

    // Get best streak across all habits
    const getBestStreak = () => {
        if (habits.length === 0) return 0
        return Math.max(...habits.map(h => getHabitStreak(h.id)), 0)
    }

    const value = {
        habits,
        completions,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabitCompletion,
        isHabitCompleted,
        getHabitCompletions,
        getHabitStreak,
        getTodayProgress,
        getHabitsByCategory,
        getTotalCompletions,
        getBestStreak
    }

    return (
        <HabitsContext.Provider value={value}>
            {children}
        </HabitsContext.Provider>
    )
}

export function useHabits() {
    const context = useContext(HabitsContext)
    if (!context) {
        throw new Error('useHabits must be used within a HabitsProvider')
    }
    return context
}
