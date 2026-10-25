import { cx } from '../../lib/cx'
import styles from './SegmentedControl.module.css'

export interface SegmentedOption {
  id: string
  label: string
}

interface SegmentedControlProps {
  options: readonly SegmentedOption[]
  value: string
  onChange: (id: string) => void
  label: string
  className?: string
}

export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedControlProps) {
  return (
    <div className={cx(styles.control, className)} role="group" aria-label={label}>
      {options.map((option) => {
        const isActive = option.id === value

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            className={cx(styles.segment, isActive && styles.active)}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
