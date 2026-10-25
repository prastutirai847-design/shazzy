import {
  Armchair,
  Backpack,
  Bike,
  BookOpen,
  Laptop,
  Package,
  type LucideIcon,
} from 'lucide-react'

export type ProductCategoryId =
  | 'books'
  | 'electronics'
  | 'cycles'
  | 'furniture'
  | 'accessories'
  | 'other'

export interface ProductCategory {
  id: ProductCategoryId
  label: string
  icon: LucideIcon
}

export const productCategories: ReadonlyArray<ProductCategory> = [
  { id: 'books', label: 'Books & Notes', icon: BookOpen },
  { id: 'electronics', label: 'Electronics', icon: Laptop },
  { id: 'cycles', label: 'Cycles', icon: Bike },
  { id: 'furniture', label: 'Furniture', icon: Armchair },
  { id: 'accessories', label: 'Accessories', icon: Backpack },
  { id: 'other', label: 'Other Items', icon: Package },
]

export const categoryLabels = Object.fromEntries(
  productCategories.map((category) => [category.id, category.label]),
) as Record<ProductCategoryId, string>
