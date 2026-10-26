import { RotateCcw, SearchX, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '../../components/layout/PageHeader'
import { MarketplaceSearch } from '../../components/marketplace/MarketplaceSearch'
import { ProductCard } from '../../components/marketplace/ProductCard'
import { Badge } from '../../components/ui/Badge'
import { Button, ButtonLink } from '../../components/ui/Button'
import { CategoryTabs } from '../../components/ui/CategoryTabs'
import { EmptyState } from '../../components/ui/EmptyState'
import { FilterChip } from '../../components/ui/FilterChip'
import { SegmentedControl } from '../../components/ui/SegmentedControl'
import { listingCategories, type Listing } from '../../data/listings'
import { useWishlist } from '../wishlist/wishlist-context'
import {
  BROWSE_PARAMS,
  browseSortOptions,
  conditionOptions,
  DEFAULT_BROWSE_SORT,
  filterAndSortListings,
  hasActiveBrowseCriteria,
  parseBrowseCriteria,
  priceRangeOptions,
  type BrowseCategory,
  type BrowseSort,
  type ConditionFilterId,
  type PriceRangeId,
} from './browseFilters'
import { useBrowseCatalog } from './useBrowseCatalog'
import styles from './BrowsePage.module.css'

const skeletonKeys = ['one', 'two', 'three', 'four', 'five', 'six'] as const

export function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const catalog = useBrowseCatalog()
  const criteria = parseBrowseCriteria(searchParams)
  const [liveMessage, setLiveMessage] = useState('')
  const { savedIds, toggleSaved: toggleWishlist } = useWishlist()

  const visibleListings =
    catalog.status === 'success'
      ? filterAndSortListings(catalog.listings, criteria)
      : []
  const totalCount = catalog.status === 'success' ? catalog.listings.length : 0
  const hasActiveCriteria = hasActiveBrowseCriteria(criteria)
  const hasActiveFilters =
    criteria.category !== 'all' ||
    criteria.conditions.size > 0 ||
    criteria.priceRanges.size > 0

  const listingNoun = totalCount === 1 ? 'listing' : 'listings'
  const countLabel =
    catalog.status === 'loading'
      ? 'Loading sample listings…'
      : catalog.status === 'error'
        ? 'Sample listings unavailable.'
        : hasActiveCriteria
          ? `${visibleListings.length} of ${totalCount} sample ${listingNoun}`
          : `${totalCount} sample ${listingNoun}`

  function replaceParams(update: (params: URLSearchParams) => void) {
    const next = new URLSearchParams(searchParams)
    update(next)
    setSearchParams(next, { replace: true })
  }

  function handleSearchChange(value: string) {
    replaceParams((params) => {
      if (value) {
        params.set(BROWSE_PARAMS.query, value)
      } else {
        params.delete(BROWSE_PARAMS.query)
      }
    })
  }

  function handleSearchSubmit() {
    const query = criteria.query.trim()

    replaceParams((params) => {
      if (query) {
        params.set(BROWSE_PARAMS.query, query)
      } else {
        params.delete(BROWSE_PARAMS.query)
      }
    })
  }

  function selectCategory(category: BrowseCategory) {
    replaceParams((params) => {
      if (category === 'all') {
        params.delete(BROWSE_PARAMS.category)
      } else {
        params.set(BROWSE_PARAMS.category, category)
      }
    })
  }

  function toggleCondition(id: ConditionFilterId) {
    const nextConditions = new Set(criteria.conditions)

    if (nextConditions.has(id)) {
      nextConditions.delete(id)
    } else {
      nextConditions.add(id)
    }

    replaceParams((params) => {
      if (nextConditions.size === 0) {
        params.delete(BROWSE_PARAMS.condition)
        return
      }

      params.set(
        BROWSE_PARAMS.condition,
        conditionOptions
          .filter((option) => nextConditions.has(option.id))
          .map((option) => option.id)
          .join(','),
      )
    })
  }

  function togglePriceRange(id: PriceRangeId) {
    const nextRanges = new Set(criteria.priceRanges)

    if (nextRanges.has(id)) {
      nextRanges.delete(id)
    } else {
      nextRanges.add(id)
    }

    replaceParams((params) => {
      if (nextRanges.size === 0) {
        params.delete(BROWSE_PARAMS.price)
        return
      }

      params.set(
        BROWSE_PARAMS.price,
        priceRangeOptions
          .filter((option) => nextRanges.has(option.id))
          .map((option) => option.id)
          .join(','),
      )
    })
  }

  function selectSort(sort: BrowseSort) {
    replaceParams((params) => {
      if (sort === DEFAULT_BROWSE_SORT) {
        params.delete(BROWSE_PARAMS.sort)
      } else {
        params.set(BROWSE_PARAMS.sort, sort)
      }
    })

    setLiveMessage(
      sort === 'newest'
        ? 'Newest listings first.'
        : sort === 'price-asc'
          ? 'Sorted by price, low to high.'
          : 'Sorted by price, high to low.',
    )
  }

  function clearFilters() {
    replaceParams((params) => {
      params.delete(BROWSE_PARAMS.category)
      params.delete(BROWSE_PARAMS.condition)
      params.delete(BROWSE_PARAMS.price)
    })
    setLiveMessage('Filters cleared.')
  }

  function clearAll() {
    replaceParams((params) => {
      params.delete(BROWSE_PARAMS.query)
      params.delete(BROWSE_PARAMS.category)
      params.delete(BROWSE_PARAMS.condition)
      params.delete(BROWSE_PARAMS.price)
    })
    setLiveMessage('Search and filters cleared.')
  }

  function toggleSaved(listing: Listing) {
    const isSaved = savedIds.has(listing.id)

    toggleWishlist(listing.id)

    setLiveMessage(
      isSaved
        ? `${listing.title} removed from your wishlist.`
        : `${listing.title} saved for this visit.`,
    )
  }

  let resultsContent

  if (catalog.status === 'loading') {
    resultsContent = (
      <div className={styles.skeletonGrid} aria-hidden="true">
        {skeletonKeys.map((key) => (
          <div key={key} className={styles.skeletonCard}>
            <span className={styles.skeletonMedia} />
            <div className={styles.skeletonBody}>
              <span className={styles.skeletonMeta} />
              <span className={styles.skeletonTitle} />
              <span className={styles.skeletonTitleShort} />
              <span className={styles.skeletonSeller} />
              <div className={styles.skeletonFooter}>
                <span className={styles.skeletonPrice} />
                <span className={styles.skeletonAction} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  } else if (catalog.status === 'error') {
    resultsContent = (
      <div className={styles.errorPanel} role="alert">
        <span className={styles.errorIcon} aria-hidden="true">
          <TriangleAlert size={24} strokeWidth={1.8} />
        </span>
        <div className={styles.errorCopy}>
          <h3 className={styles.stateTitle}>Listings couldn’t load.</h3>
          <p className={styles.stateText}>
            {catalog.message ??
              'The demo catalog didn’t respond. Reload the page to try again.'}
          </p>
          <Button
            variant="secondary"
            size="sm"
            className={styles.stateButton}
            onClick={() => window.location.reload()}
          >
            Reload page
          </Button>
        </div>
      </div>
    )
  } else if (visibleListings.length === 0) {
    const hasSearch = criteria.query.trim().length > 0
    const title =
      hasSearch && hasActiveFilters
        ? 'No listings match this search and filter mix.'
        : hasSearch
          ? 'No listings match that search.'
          : hasActiveFilters
            ? 'No listings match these filters.'
            : 'No sample listings yet.'

    resultsContent = (
      <div className={styles.emptyWrap}>
        <EmptyState
          icon={SearchX}
          title={title}
          description={
            hasActiveCriteria
              ? 'Try a broader search or remove a condition or price filter. Search and filters are combined, so each one narrows the demo catalog.'
              : 'The demo catalog is empty right now. Sample listings will appear here once the catalog has items.'
          }
        >
          {hasActiveCriteria ? (
            <Button variant="secondary" onClick={clearAll}>
              Clear search &amp; filters
            </Button>
          ) : (
            <ButtonLink to="/" variant="secondary">
              Back to home
            </ButtonLink>
          )}
        </EmptyState>
      </div>
    )
  } else {
    resultsContent = (
      <div className={styles.grid}>
        {visibleListings.map((listing) => (
          <ProductCard
            key={listing.id}
            product={listing}
            saved={savedIds.has(listing.id)}
            onToggleSave={toggleSaved}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="The marketplace"
        title="Browse marketplace."
        description="Every sample find on the shelf, in one place. Search, combine filters, and sort the demo catalog to preview how campus discovery will work."
        meta={<Badge variant="accent">Demo catalog</Badge>}
      />

      <div className={styles.searchBlock}>
        <MarketplaceSearch
          value={criteria.query}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
          label="Search marketplace listings"
          placeholder="Search listings, sellers, or pickup spots"
          describedBy="browse-search-hint"
        />
        <p id="browse-search-hint" className={styles.searchHint}>
          Search covers titles, categories, conditions, sellers, and pickup
          spots. Search and filters are combined.
        </p>
      </div>

      <section className={styles.catalog} aria-labelledby="browse-catalog-title">
        <h2 id="browse-catalog-title" className="sr-only">
          Marketplace listings
        </h2>

        <div className={styles.controlPanel}>
          <div className={styles.tabsArea}>
            <CategoryTabs
              items={listingCategories}
              value={criteria.category}
              onChange={(id) => selectCategory(id as BrowseCategory)}
              label="Browse categories"
              panelId="browse-results"
            />
          </div>

          <div className={styles.toolbar}>
            <div className={styles.filterGroups}>
              <div
                className={styles.filterGroup}
                role="group"
                aria-labelledby="condition-filter-label"
              >
                <span className={styles.groupLabel} id="condition-filter-label">
                  Condition
                </span>
                <div className={styles.chipRow}>
                  {conditionOptions.map((option) => (
                    <FilterChip
                      key={option.id}
                      label={option.label}
                      active={criteria.conditions.has(option.id)}
                      onToggle={() => toggleCondition(option.id)}
                    />
                  ))}
                </div>
              </div>

              <div
                className={styles.filterGroup}
                role="group"
                aria-labelledby="price-filter-label"
              >
                <span className={styles.groupLabel} id="price-filter-label">
                  Price
                </span>
                <div className={styles.chipRow}>
                  {priceRangeOptions.map((option) => (
                    <FilterChip
                      key={option.id}
                      label={option.label}
                      active={criteria.priceRanges.has(option.id)}
                      onToggle={() => togglePriceRange(option.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.sortGroup}>
              <span className={styles.groupLabel}>Sort by</span>
              <SegmentedControl
                options={browseSortOptions}
                value={criteria.sort}
                onChange={(id) => selectSort(id as BrowseSort)}
                label="Sort sample listings"
                className={styles.sortControl}
              />
            </div>
          </div>

          <div className={styles.resultRow}>
            <p
              className={styles.resultCount}
              aria-live="polite"
              aria-atomic="true"
            >
              {countLabel}
            </p>
            {hasActiveFilters ? (
              <Button
                variant="ghost"
                size="sm"
                className={styles.clearButton}
                onClick={clearFilters}
              >
                <RotateCcw size={14} strokeWidth={1.8} aria-hidden="true" />
                Clear filters
              </Button>
            ) : null}
          </div>
        </div>

        <div
          id="browse-results"
          className={styles.results}
          role="tabpanel"
          aria-labelledby={`category-tab-${criteria.category}`}
          aria-busy={catalog.status === 'loading'}
        >
          {resultsContent}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {liveMessage}
        </p>
      </section>

      <p className={styles.catalogNote}>
        <strong>Demo catalog.</strong> Listings and product pages use the same
        sample data. Wishlist saves are shared across pages for this visit only
        and reset on reload. No accounts, messaging, or payments are connected.
      </p>
    </div>
  )
}
