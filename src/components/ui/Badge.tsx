import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'
import styles from './Badge.module.css'

interface BadgeProps {
  children: ReactNode
  variant?: 'soft' | 'neutral' | 'success' | 'accent'
  className?: string
}

export function Badge({ children, variant = 'soft', className }: BadgeProps) {
  return <span className={cx(styles.badge, styles[variant], className)}>{children}</span>
}
