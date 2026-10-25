import { useRef, type KeyboardEvent } from 'react'
import { cx } from '../../lib/cx'
import styles from './CategoryTabs.module.css'

export interface CategoryTabItem {
  id: string
  label: string
}

interface CategoryTabsProps {
  items: readonly CategoryTabItem[]
  value: string
  onChange: (id: string) => void
  label: string
  panelId: string
}

export function CategoryTabs({ items, value, onChange, label, panelId }: CategoryTabsProps) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % items.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + items.length) % items.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = items.length - 1
    }

    if (nextIndex === null) {
      return
    }

    event.preventDefault()
    const nextItem = items[nextIndex]
    onChange(nextItem.id)
    buttonRefs.current[nextIndex]?.focus()
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label={label}>
        {items.map((item, index) => {
          const isActive = item.id === value

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`category-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              ref={(node) => {
                buttonRefs.current[index] = node
              }}
              className={cx(styles.tab, isActive && styles.active)}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
