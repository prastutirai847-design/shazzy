import { cx } from '../../lib/cx'
import styles from './FilterChip.module.css'

interface FilterChipProps {
  label: string
  active: boolean
  onToggle: () => void
}

export function FilterChip({ label, active, onToggle }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cx(styles.chip, active && styles.active)}
      onClick={onToggle}
    >
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </button>
  )
}
