import {
  categoryLabels,
  productCategories,
  type ProductCategoryId,
} from '../../data/categories'
import type { Listing, ListingCondition } from '../../data/listings'

export type BrowseCategory = 'all' | ProductCategoryId
export type BrowseSort = 'newest' | 'price-asc' | 'price-desc'
export type ConditionFilterId = 'like-new' | 'good' | 'fair'
export type PriceRangeId = 'under-1000' | '1000-2000' | '2000-plus'

export interface BrowseCriteria {
  query: string
  category: BrowseCategory
  conditions: ReadonlySet<ConditionFilterId>
  priceRanges: ReadonlySet<PriceRangeId>
  sort: BrowseSort
}

interface ConditionOption {
  id: ConditionFilterId
  label: string
  value: ListingCondition
}

interface PriceRangeOption {
  id: PriceRangeId
  label: string
  min: number
  max?: number
}

export const BROWSE_PARAMS = {
  query: 'q',
  category: 'category',
  condition: 'condition',
  price: 'price',
  sort: 'sort',
} as const

export const conditionOptions: ReadonlyArray<ConditionOption> = [
  { id: 'like-new', label: 'Like new', value: 'Like New' },
  { id: 'good', label: 'Good', value: 'Good' },
  { id: 'fair', label: 'Fair', value: 'Fair' },
]

export const priceRangeOptions: ReadonlyArray<PriceRangeOption> = [
  { id: 'under-1000', label: 'Under ₹1,000', min: 0, max: 1000 },
  { id: '1000-2000', label: '₹1,000–₹2,000', min: 1000, max: 2000 },
  { id: '2000-plus', label: '₹2,000 & up', min: 2000 },
]

export const browseSortOptions: ReadonlyArray<{ id: BrowseSort; label: string }> = [
  { id: 'newest', label: 'Newest first' },
  { id: 'price-asc', label: 'Low price' },
  { id: 'price-desc', label: 'High price' },
]

export const DEFAULT_BROWSE_SORT: BrowseSort = 'newest'

const categoryIds = new Set<string>(['all', ...productCategories.map(({ id }) => id)])
const conditionById = new Map(conditionOptions.map((option) => [option.id, option]))
const priceRangeById = new Map(priceRangeOptions.map((option) => [option.id, option]))

function readList(value: string | null): string[] {
  return value
    ? value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : []
}

function isConditionFilterId(value: string): value is ConditionFilterId {
  return conditionById.has(value as ConditionFilterId)
}

function isPriceRangeId(value: string): value is PriceRangeId {
  return priceRangeById.has(value as PriceRangeId)
}

function isBrowseSort(value: string | null): value is BrowseSort {
  return browseSortOptions.some((option) => option.id === value)
}

export function parseBrowseCriteria(params: URLSearchParams): BrowseCriteria {
  const rawCategory = params.get(BROWSE_PARAMS.category)
  const sort = params.get(BROWSE_PARAMS.sort)

  return {
    query: params.get(BROWSE_PARAMS.query) ?? '',
    category:
      rawCategory && categoryIds.has(rawCategory)
        ? (rawCategory as BrowseCategory)
        : 'all',
    conditions: new Set(
      readList(params.get(BROWSE_PARAMS.condition)).filter(isConditionFilterId),
    ),
    priceRanges: new Set(
      readList(params.get(BROWSE_PARAMS.price)).filter(isPriceRangeId),
    ),
    sort: isBrowseSort(sort) ? sort : DEFAULT_BROWSE_SORT,
  }
}

export function hasActiveBrowseCriteria(criteria: BrowseCriteria): boolean {
  return (
    criteria.query.trim().length > 0 ||
    criteria.category !== 'all' ||
    criteria.conditions.size > 0 ||
    criteria.priceRanges.size > 0
  )
}

function searchableText(listing: Listing): string {
  return [
    listing.title,
    categoryLabels[listing.category],
    listing.condition,
    listing.seller.name,
    listing.seller.year,
    listing.pickup,
  ]
    .join(' ')
    .toLowerCase()
}

function matchesPrice(price: number, ranges: ReadonlyArray<PriceRangeOption>): boolean {
  if (ranges.length === 0) {
    return true
  }

  return ranges.some(
    (range) =>
      price >= range.min && (range.max === undefined || price < range.max),
  )
}

export function filterAndSortListings(
  listings: ReadonlyArray<Listing>,
  criteria: BrowseCriteria,
): Listing[] {
  const tokens = criteria.query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const selectedConditions = new Set(
    [...criteria.conditions].map((id) => conditionById.get(id)?.value),
  )
  const selectedRanges = [...criteria.priceRanges]
    .map((id) => priceRangeById.get(id))
    .filter((range): range is PriceRangeOption => range !== undefined)

  const visibleListings = listings.filter((listing) => {
    if (criteria.category !== 'all' && listing.category !== criteria.category) {
      return false
    }

    if (
      selectedConditions.size > 0 &&
      !selectedConditions.has(listing.condition)
    ) {
      return false
    }

    if (!matchesPrice(listing.price, selectedRanges)) {
      return false
    }

    if (tokens.length > 0) {
      const haystack = searchableText(listing)

      if (!tokens.every((token) => haystack.includes(token))) {
        return false
      }
    }

    return true
  })

  return visibleListings.sort((first, second) => {
    if (criteria.sort === 'price-asc') {
      return first.price - second.price || first.title.localeCompare(second.title)
    }

    if (criteria.sort === 'price-desc') {
      return second.price - first.price || first.title.localeCompare(second.title)
    }

    return first.postedDays - second.postedDays || first.title.localeCompare(second.title)
  })
}
