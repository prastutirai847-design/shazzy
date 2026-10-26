import {
  BedDouble,
  BookOpen,
  DraftingCompass,
  Guitar,
  Laptop,
  Package,
  type LucideIcon,
} from 'lucide-react'

export type ProductCategoryId =
  | 'electronics'
  | 'engineering-essentials'
  | 'books'
  | 'hostel-essentials'
  | 'hobbies-lifestyle'
  | 'other'

export interface ProductCategory {
  id: ProductCategoryId
  label: string
  icon: LucideIcon
}

export const productCategories: ReadonlyArray<ProductCategory> = [
  { id: 'electronics', label: 'Electronics', icon: Laptop },
  {
    id: 'engineering-essentials',
    label: 'Engineering essentials',
    icon: DraftingCompass,
  },
  { id: 'books', label: 'Books & notes', icon: BookOpen },
  { id: 'hostel-essentials', label: 'Hostel essentials', icon: BedDouble },
  { id: 'hobbies-lifestyle', label: 'Hobbies & lifestyle', icon: Guitar },
  { id: 'other', label: 'Other items', icon: Package },
]

export const categoryLabels = Object.fromEntries(
  productCategories.map((category) => [category.id, category.label]),
) as Record<ProductCategoryId, string>
