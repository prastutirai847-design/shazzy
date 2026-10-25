import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cx } from '../../lib/cx'
import styles from './QuickActionLink.module.css'

interface QuickActionLinkProps {
  to: string
  label: string
  icon: LucideIcon
  className?: string
}

export function QuickActionLink({
  to,
  label,
  icon: Icon,
  className,
}: QuickActionLinkProps) {
  return (
    <Link to={to} className={cx(styles.action, className)}>
      <span className={styles.icon} aria-hidden="true">
        <Icon size={17} strokeWidth={1.9} />
      </span>
      <span className={styles.label}>{label}</span>
      <ArrowUpRight
        className={styles.arrow}
        size={15}
        strokeWidth={1.9}
        aria-hidden="true"
      />
    </Link>
  )
}
