import React from 'react'
import './ProgressRing.css'

export function ProgressRing({
    progress = 0,
    size = 100,
    strokeWidth = 8,
    showPercentage = true,
    children
}) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (progress / 100) * circumference

    return (
        <div className="progress-ring-container" style={{ width: size, height: size }}>
            <svg
                className="progress-ring"
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E91E63" />
                        <stop offset="100%" stopColor="#9C27B0" />
                    </linearGradient>
                </defs>

                {/* Background ring */}
                <circle
                    className="progress-ring-bg"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />

                {/* Progress ring */}
                <circle
                    className="progress-ring-fill"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset
                    }}
                />
            </svg>

            <div className="progress-ring-content">
                {children ? children : (
                    showPercentage && (
                        <span className="progress-ring-text">{Math.round(progress)}%</span>
                    )
                )}
            </div>
        </div>
    )
}
