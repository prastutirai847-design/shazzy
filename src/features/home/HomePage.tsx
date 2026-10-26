import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Heart,
  MapPin,
  Plus,
  Recycle,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useRef, useState } from 'react'
import calculatorImage from '../../assets/listings/calculator.jpg'
import guitarImage from '../../assets/listings/guitar.jpg'
import headphonesImage from '../../assets/listings/headphones.jpg'
import { ProductCard } from '../../components/marketplace/ProductCard'
import {
  RecommendedListings,
  type RecommendedListingsState,
} from '../../components/marketplace/RecommendedListings'
import { Badge } from '../../components/ui/Badge'
import { Button, ButtonAnchor, ButtonLink } from '../../components/ui/Button'
import { CategoryTabs } from '../../components/ui/CategoryTabs'
import { EmptyState } from '../../components/ui/EmptyState'
import { FilterChip } from '../../components/ui/FilterChip'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { SegmentedControl } from '../../components/ui/SegmentedControl'
import {
  categoryLabels,
  productCategories,
  type ProductCategoryId,
} from '../../data/categories'
import {
  listingCategories,
  sampleCategoryCounts,
  sampleListings,
  sampleRecommendedListings,
  type Listing,
} from '../../data/listings'
import { sections } from '../../data/sections'
import { formatPrice } from '../../lib/formatPrice'
import { useWishlist } from '../wishlist/wishlist-context'
import { CategorySection } from './CategorySection'
import { DashboardWelcome } from './DashboardWelcome'
import styles from './HomePage.module.css'

type CategoryId = 'all' | ProductCategoryId
type SortId = 'curated' | 'newest' | 'price'
type FilterId = 'under-2000' | 'like-new' | 'hostel'

const sortOptions: ReadonlyArray<{ id: SortId; label: string }> = [
  { id: 'curated', label: 'Curated' },
  { id: 'newest', label: 'Newest' },
  { id: 'price', label: 'Low price' },
]

const filterOptions: ReadonlyArray<{ id: FilterId; label: string }> = [
  { id: 'under-2000', label: 'Under ₹2,000' },
  { id: 'like-new', label: 'Like new' },
  { id: 'hostel', label: 'Hostel pickup' },
]

const heroListing = sampleListings[0]
const recommendedState: RecommendedListingsState = {
  status: 'success',
  listings: sampleRecommendedListings,
}

export function HomePage() {
  const [category, setCategory] = useState<CategoryId>('all')
  const [sort, setSort] = useState<SortId>('curated')
  const [activeFilters, setActiveFilters] = useState<Set<FilterId>>(new Set())
  const [liveMessage, setLiveMessage] = useState('')
  const { savedIds, toggleSaved: toggleWishlist } = useWishlist()
  const feedRef = useRef<HTMLElement>(null)

  const filteredListings = sampleListings.filter((listing) => {
    if (category !== 'all' && listing.category !== category) {
      return false
    }
    if (activeFilters.has('under-2000') && listing.price >= 2000) {
      return false
    }
    if (activeFilters.has('like-new') && listing.condition !== 'Like New') {
      return false
    }
    if (activeFilters.has('hostel') && listing.area !== 'hostel') {
      return false
    }
    return true
  })

  const visibleListings = [...filteredListings]

  if (sort === 'newest') {
    visibleListings.sort((a, b) => a.postedDays - b.postedDays)
  } else if (sort === 'price') {
    visibleListings.sort((a, b) => a.price - b.price)
  }

  const hasActiveFilters = activeFilters.size > 0
  const resultLabel = `${visibleListings.length} ${
    visibleListings.length === 1 ? 'sample find' : 'sample finds'
  }`
  const savedLabel = savedIds.size === 1 ? '1 saved this visit' : `${savedIds.size} saved this visit`

  function toggleFilter(id: FilterId) {
    setActiveFilters((current) => {
      const next = new Set(current)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  function clearFilters() {
    setActiveFilters(new Set<FilterId>())
  }

  function resetBrowse() {
    setCategory('all')
    clearFilters()
  }

  function selectCategory(categoryId: ProductCategoryId) {
    setCategory(categoryId)

    window.requestAnimationFrame(() => {
      feedRef.current?.scrollIntoView({ block: 'start' })

      const tab = document.getElementById(`category-tab-${categoryId}`)
      tab?.focus({ preventScroll: true })

      const tabStrip = tab?.closest('[role="tablist"]')?.parentElement
      if (tab && tabStrip) {
        const tabRect = tab.getBoundingClientRect()
        const stripRect = tabStrip.getBoundingClientRect()

        if (tabRect.left < stripRect.left || tabRect.right > stripRect.right) {
          tabStrip.scrollLeft +=
            tabRect.left - stripRect.left - (stripRect.width - tabRect.width) / 2
        }
      }
    })
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

  return (
    <div className={styles.page} id="top">
      <DashboardWelcome />

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowRule} aria-hidden="true" />
            Campus Kart · student marketplace
          </p>

          <h1 id="home-title" className={styles.title}>
            <span className={styles.titleLine}>Good finds,</span>
            <span className={styles.titleLine}>
              <span className={styles.accent}>already</span> on campus.
            </span>
          </h1>

          <p className={styles.heroText}>
            Textbooks, lab gear, and hostel-room essentials from students just
            across campus. Better prices, a smaller footprint, and a good story
            attached.
          </p>

          <div className={styles.heroActions}>
            <ButtonAnchor href="#campus-feed" size="lg" variant="primary">
              Browse the feed
              <ArrowDown size={18} strokeWidth={1.8} aria-hidden="true" />
            </ButtonAnchor>
            <ButtonLink to="/sell" size="lg" variant="secondary">
              <Plus size={18} strokeWidth={1.8} aria-hidden="true" />
              Sell something
            </ButtonLink>
          </div>

          <ul className={styles.promises} aria-label="How Campus Kart works">
            <li>
              <ShieldCheck size={14} strokeWidth={1.8} aria-hidden="true" />
              Students only
            </li>
            <li>
              <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
              Campus pickup
            </li>
            <li>
              <Recycle size={14} strokeWidth={1.8} aria-hidden="true" />
              Second chances
            </li>
          </ul>
        </div>

        <div className={styles.gallery} aria-hidden="true">
          <figure className={styles.frame}>
            <img
              src={heroListing.image ?? ''}
              alt=""
              width={1200}
              height={900}
              decoding="async"
            />
            <figcaption className={styles.frameCaption}>
              <span>Quiet-hour headphones</span>
              <strong>{formatPrice(heroListing.price)}</strong>
            </figcaption>
          </figure>

          <figure className={styles.smallFrame}>
            <img
              src={calculatorImage}
              alt=""
              width={1200}
              height={900}
              decoding="async"
            />
          </figure>

          <span className={styles.sticker}>
            <Sparkles size={14} strokeWidth={1.8} />
            Curated by campus
          </span>

          <span className={styles.locationTag}>
            <MapPin size={14} strokeWidth={1.8} />
            {heroListing.pickup}
          </span>
        </div>

        <div className={styles.heroStrip} aria-hidden="true">
          <img src={headphonesImage} alt="" width={1200} height={900} decoding="async" />
          <img src={calculatorImage} alt="" width={1200} height={900} decoding="async" />
          <img src={guitarImage} alt="" width={1200} height={900} decoding="async" />
        </div>
      </section>

      <CategorySection
        categories={productCategories}
        counts={sampleCategoryCounts}
        selectedCategory={category}
        onSelect={selectCategory}
      />

      <RecommendedListings
        state={recommendedState}
        savedIds={savedIds}
        onToggleSave={toggleSaved}
        viewAllHref={sections.search.path}
      />

      <section
        ref={feedRef}
        id="campus-feed"
        className={styles.feed}
        aria-labelledby="feed-title"
      >
        <SectionHeading
          eyebrow="The campus feed"
          title="Fresh from campus."
          titleId="feed-title"
          description="A first look at what students will browse: useful things, fair prices, and a short walk to pick them up."
          meta={<Badge variant="accent">Sample listings</Badge>}
        />

        <div className={styles.tabsRow}>
          <CategoryTabs
            items={listingCategories}
            value={category}
            onChange={(id) => setCategory(id as CategoryId)}
            label="Browse categories"
            panelId="campus-listings"
          />
        </div>

        <div
          id="campus-listings"
          className={styles.panel}
          role="tabpanel"
          aria-labelledby={`category-tab-${category}`}
        >
          <div className={styles.toolbar}>
            <div className={styles.filters}>
              <span className={styles.controlLabel}>Filter</span>
              <div className={styles.chipRow}>
                {filterOptions.map((filter) => (
                  <FilterChip
                    key={filter.id}
                    label={filter.label}
                    active={activeFilters.has(filter.id)}
                    onToggle={() => toggleFilter(filter.id)}
                  />
                ))}
                {hasActiveFilters ? (
                  <button type="button" className={styles.clear} onClick={clearFilters}>
                    Clear
                  </button>
                ) : null}
              </div>
            </div>

            <div className={styles.sortGroup}>
              <span className={styles.controlLabel}>Sort</span>
              <SegmentedControl
                options={sortOptions}
                value={sort}
                onChange={(id) => setSort(id as SortId)}
                label="Sort sample listings"
              />
            </div>
          </div>

          <div className={styles.resultRow}>
            <p className={styles.resultCount} aria-live="polite">
              {resultLabel}
            </p>
            {savedIds.size > 0 ? (
              <p className={styles.savedCount}>
                <Heart size={14} strokeWidth={1.8} fill="currentColor" aria-hidden="true" />
                {savedLabel}
              </p>
            ) : null}
          </div>

          {visibleListings.length > 0 ? (
            <div className={styles.listingsGrid}>
              {visibleListings.map((listing) => (
                <ProductCard
                  key={listing.id}
                  product={listing}
                  saved={savedIds.has(listing.id)}
                  onToggleSave={toggleSaved}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyWrap}>
              <EmptyState
                icon={Search}
                title={
                  hasActiveFilters
                    ? 'No sample finds match that mix.'
                    : `No sample finds in ${
                        category === 'all' ? 'this shelf' : categoryLabels[category]
                      } yet.`
                }
                description={
                  hasActiveFilters
                    ? 'Try clearing a filter, or show everything the sample feed has to offer.'
                    : 'This shelf is waiting for its first listing. Try another category or browse the whole sample feed.'
                }
              >
                <Button variant="secondary" onClick={resetBrowse}>
                  Show all sample finds
                </Button>
              </EmptyState>
            </div>
          )}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          {liveMessage}
        </p>
      </section>

      <section className={styles.sellBand} aria-labelledby="sell-band-title">
        <span className={styles.bandStar} aria-hidden="true">
          <Sparkles size={24} strokeWidth={1.8} />
        </span>

        <div className={styles.bandCopy}>
          <p className={styles.bandEyebrow}>
            <span className={styles.bandRule} aria-hidden="true" />
            Pass it forward
          </p>
          <h2 id="sell-band-title" className={styles.bandTitle}>
            Your old chapter is{' '}
            <span className={styles.accent}>someone&rsquo;s next find.</span>
          </h2>
          <p className={styles.bandText}>
            The shelf you have outgrown could kit out someone&rsquo;s first
            hostel room. Selling on Campus Kart is designed to stay simple,
            local, and kind.
          </p>
          <div className={styles.bandActions}>
            <ButtonLink to="/sell" variant="inverse" size="lg">
              Start a listing
              <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>

        <ol className={styles.steps} aria-label="How selling will work">
          <li>
            <span className={styles.stepIndex} aria-hidden="true">
              01
            </span>
            <div>
              <h3>Photograph it</h3>
              <p>Good daylight and an honest close-up go a long way.</p>
            </div>
          </li>
          <li>
            <span className={styles.stepIndex} aria-hidden="true">
              02
            </span>
            <div>
              <h3>Price it kindly</h3>
              <p>Start with what a student down the hall would happily pay.</p>
            </div>
          </li>
          <li>
            <span className={styles.stepIndex} aria-hidden="true">
              03
            </span>
            <div>
              <h3>Pass it on</h3>
              <p>Meet on campus and send your old favourite somewhere new.</p>
            </div>
          </li>
        </ol>
      </section>

      <footer className={styles.previewFooter}>
        <p>
          <strong>Marketplace preview.</strong> Sample listings are illustrative.
          Wishlist saves are shared across pages for this visit only and reset on
          reload. Accounts, messaging, and payments are not connected yet.
        </p>
        <a className={styles.backToTop} href="#top">
          Back to top
          <ArrowUp size={14} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </footer>
    </div>
  )
}
