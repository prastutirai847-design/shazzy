import { ArrowRight, Search, X } from 'lucide-react'
import type { FormEvent } from 'react'
import { cx } from '../../lib/cx'
import styles from './MarketplaceSearch.module.css'

interface MarketplaceSearchProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  label: string
  placeholder: string
  describedBy?: string
  variant?: 'compact' | 'page'
  className?: string
}

export function MarketplaceSearch({
  value,
  onChange,
  onSubmit,
  label,
  placeholder,
  describedBy,
  variant = 'page',
  className,
}: MarketplaceSearchProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form
      role="search"
      aria-label={label}
      className={cx(styles.form, styles[variant], className)}
      onSubmit={handleSubmit}
    >
      <Search
        className={styles.icon}
        size={18}
        strokeWidth={1.8}
        aria-hidden="true"
      />

      <input
        className={styles.input}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        aria-describedby={describedBy}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
      />

      {value ? (
        <button
          type="button"
          className={styles.clear}
          aria-label="Clear search"
          onClick={() => onChange('')}
        >
          <X size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
      ) : null}

      <button
        type="submit"
        className={styles.submit}
        aria-label="Search marketplace listings"
      >
        <span className={styles.submitLabel}>Search</span>
        <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </form>
  )
}
