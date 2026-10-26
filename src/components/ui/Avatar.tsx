import { UserRound } from 'lucide-react'
import { cx } from '../../lib/cx'
import styles from './Avatar.module.css'

interface AvatarProps {
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

const iconSizes = { xs: 14, sm: 16, md: 18, lg: 24 } as const

function getInitials(name: string): string | null {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return null
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = name ? getInitials(name) : null

  return (
    <span className={cx(styles.avatar, styles[size], className)} aria-hidden="true">
      {initials ?? <UserRound size={iconSizes[size]} strokeWidth={1.8} />}
    </span>
  )
}
