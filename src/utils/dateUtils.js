// Date formatting and manipulation utilities

/**
 * Format date to YYYY-MM-DD string
 */
export function formatDate(date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

/**
 * Get today's date as YYYY-MM-DD
 */
export function getToday() {
    return formatDate(new Date())
}

/**
 * Check if a date is today
 */
export function isToday(dateStr) {
    return dateStr === getToday()
}

/**
 * Get date for N days ago
 */
export function getDaysAgo(n) {
    const date = new Date()
    date.setDate(date.getDate() - n)
    return formatDate(date)
}

/**
 * Get array of dates for last N days
 */
export function getLastNDays(n) {
    const dates = []
    for (let i = n - 1; i >= 0; i--) {
        dates.push(getDaysAgo(i))
    }
    return dates
}

/**
 * Get the start of the week (Sunday)
 */
export function getWeekStart(date = new Date()) {
    const d = new Date(date)
    const day = d.getDay()
    d.setDate(d.getDate() - day)
    return formatDate(d)
}

/**
 * Get array of dates for current week
 */
export function getCurrentWeekDates() {
    const weekStart = new Date(getWeekStart())
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart)
        d.setDate(d.getDate() + i)
        return formatDate(d)
    })
}

/**
 * Get month name in Portuguese
 */
export function getMonthName(date) {
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
    return months[new Date(date).getMonth()]
}

/**
 * Get short weekday name in Portuguese
 */
export function getWeekdayShort(date) {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    return days[new Date(date).getDay()]
}

/**
 * Get greeting based on time of day
 */
export function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
}

/**
 * Format date as readable string (e.g., "7 de Fevereiro")
 */
export function formatDateReadable(dateStr) {
    const d = new Date(dateStr + 'T12:00:00')
    const day = d.getDate()
    const month = getMonthName(d)
    return `${day} de ${month}`
}

/**
 * Calculate streak from array of completion dates
 */
export function calculateStreak(completions) {
    if (!completions || completions.length === 0) return 0

    const sortedDates = [...completions].sort().reverse()
    const today = getToday()
    const yesterday = getDaysAgo(1)

    // Check if the streak is active (completed today or yesterday)
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
        return 0
    }

    let streak = 1
    let currentDate = sortedDates[0]

    for (let i = 1; i < sortedDates.length; i++) {
        const expectedPrev = getDaysAgo(
            Math.round((new Date(currentDate) - new Date(sortedDates[0])) / (1000 * 60 * 60 * 24)) + 1
        )

        if (sortedDates[i] === getDayBefore(currentDate)) {
            streak++
            currentDate = sortedDates[i]
        } else {
            break
        }
    }

    return streak
}

/**
 * Get the day before a given date string
 */
export function getDayBefore(dateStr) {
    const d = new Date(dateStr + 'T12:00:00')
    d.setDate(d.getDate() - 1)
    return formatDate(d)
}

/**
 * Check if a date falls within the last N days
 */
export function isWithinLastNDays(dateStr, n) {
    const date = new Date(dateStr + 'T12:00:00')
    const nDaysAgo = new Date()
    nDaysAgo.setDate(nDaysAgo.getDate() - n)
    nDaysAgo.setHours(0, 0, 0, 0)
    return date >= nDaysAgo
}

/**
 * Get dates for a month grid (including padding days from prev/next month)
 */
export function getMonthGrid(year, month) {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPadding = firstDay.getDay()
    const endPadding = 6 - lastDay.getDay()

    const dates = []

    // Previous month padding
    for (let i = startPadding - 1; i >= 0; i--) {
        const d = new Date(year, month, -i)
        dates.push({ date: formatDate(d), isCurrentMonth: false })
    }

    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const d = new Date(year, month, i)
        dates.push({ date: formatDate(d), isCurrentMonth: true })
    }

    // Next month padding
    for (let i = 1; i <= endPadding; i++) {
        const d = new Date(year, month + 1, i)
        dates.push({ date: formatDate(d), isCurrentMonth: false })
    }

    return dates
}
