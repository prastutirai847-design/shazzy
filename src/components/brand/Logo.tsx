import { useId } from 'react'
import { cx } from '../../lib/cx'
import styles from './Logo.module.css'

interface LogoProps {
  className?: string
  markOnly?: boolean
}

export function Logo({ className, markOnly = false }: LogoProps) {
  const gradientId = `logo-gradient-${useId().replaceAll(':', '')}`

  return (
    <span className={cx(styles.logo, className)} aria-hidden="true">
      <svg
        className={styles.mark}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="4" y1="1" x2="29" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#765AFF" />
            <stop offset="0.52" stopColor="#5B3DF5" />
            <stop offset="1" stopColor="#3E20C1" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
        <path
          d="M7.3 8.8H9.6L12.05 19.6A2.05 2.05 0 0 0 14.1 21.25H22.2A2 2 0 0 0 24.2 19.65L25.95 12.1H10.35"
          stroke="white"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14.8" cy="25.2" r="1.5" fill="white" />
        <circle cx="22.5" cy="25.2" r="1.5" fill="white" />
      </svg>
      {!markOnly && (
        <span className={styles.wordmark}>
          Campus <span className={styles.kart}>Kart</span>
        </span>
      )}
    </span>
  )
}
