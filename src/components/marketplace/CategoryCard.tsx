import { ArrowDown, Check } from 'lucide-react'
import type { ProductCategory, ProductCategoryId } from '../../data/categories'
import { cx } from '../../lib/cx'
import styles from './CategoryCard.module.css'

interface CategoryCardProps {
  category: ProductCategory
  count: number
  selected: boolean
  onSelect: (id: ProductCategoryId) => void
}

export function CategoryCard({
  category,
  count,
  selected,
  onSelect,
}: CategoryCardProps) {
  const Icon = category.icon
  const countLabel =
    count === 0 ? 'No sample items yet' : `${count} sample ${count === 1 ? 'item' : 'items'}`

  return (
    <button
      type="button"
      className={cx(styles.card, selected && styles.selected)}
      aria-label={`${category.label}, ${countLabel}`}
      aria-pressed={selected}
      onClick={() => onSelect(category.id)}
    >
      <span className={styles.top}>
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon size={20} strokeWidth={1.8} />
        </span>
        <span className={styles.affordance} aria-hidden="true">
          {selected ? (
            <Check size={14} strokeWidth={1.8} />
          ) : (
            <ArrowDown size={14} strokeWidth={1.8} />
          )}
        </span>
      </span>

      <span className={styles.body}>
        <span className={styles.label}>{category.label}</span>
        <span className={cx(styles.count, count === 0 && styles.countEmpty)}>
          {countLabel}
        </span>
      </span>

      <span className={styles.watermark} aria-hidden="true">
        <Icon size={104} strokeWidth={1.2} />
      </span>
    </button>
  )
}
