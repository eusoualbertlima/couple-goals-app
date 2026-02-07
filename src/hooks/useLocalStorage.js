import { useState, useEffect } from 'react'

/**
 * Custom hook for persisting state in localStorage
 * @param {string} key - localStorage key
 * @param {any} initialValue - default value if key doesn't exist
 */
export function useLocalStorage(key, initialValue) {
    // Get initial value from localStorage or use provided initial value
    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    // Update localStorage whenever value changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }, [key, value])

    return [value, setValue]
}
