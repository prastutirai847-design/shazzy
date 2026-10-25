import { CategoryCard } from '../../components/marketplace/CategoryCard'
import { SectionHeading } from '../../components/ui/SectionHeading'
import type { ProductCategory, ProductCategoryId } from '../../data/categories'
import styles from './CategorySection.module.css'

interface CategorySectionProps {
  categories: ReadonlyArray<ProductCategory>
  counts: Record<ProductCategoryId, number>
  selectedCategory: 'all' | ProductCategoryId
  onSelect: (id: ProductCategoryId) => void
}

export function CategorySection({
  categories,
  counts,
  selectedCategory,
  onSelect,
}: CategorySectionProps) {
  return (
    <section className={styles.section} aria-labelledby="category-section-title">
      <SectionHeading
        eyebrow="Browse the catalog"
        title="Browse by category."
        titleId="category-section-title"
        description="Textbooks, tech, cycles, and the useful odds and ends of campus life. Choose a shelf to filter the sample listings below."
      />

      <ul className={styles.grid}>
        {categories.map((category) => (
          <li key={category.id} className={styles.item}>
            <CategoryCard
              category={category}
              count={counts[category.id]}
              selected={selectedCategory === category.id}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
