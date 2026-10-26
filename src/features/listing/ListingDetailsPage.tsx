import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ImageOff,
  MapPin,
  MessageCircle,
  PackageSearch,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/layout/PageHeader'
import { ProductCard } from '../../components/marketplace/ProductCard'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Button, ButtonLink } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { categoryLabels } from '../../data/categories'
import { getListingById, getRelatedListings, type Listing } from '../../data/listings'
import { cx } from '../../lib/cx'
import { formatPrice } from '../../lib/formatPrice'
import { useWishlist } from '../wishlist/wishlist-context'
import styles from './ListingDetailsPage.module.css'

const conditionVariants = {
  'Like New': 'success',
  Good: 'accent',
  Fair: 'neutral',
} as const

function getListingAge(postedDays: number): string {
  if (postedDays <= 0) {
    return 'today'
  }

  if (postedDays === 1) {
    return '1 day ago'
  }

  if (postedDays < 7) {
    return `${postedDays} days ago`
  }

  const weeks = Math.floor(postedDays / 7)
  return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
}

interface ListingMediaProps {
  listing: Listing
}

function ListingMedia({ listing }: ListingMediaProps) {
  const imageSrc = listing.image?.trim() ?? ''
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    imageSrc ? 'loading' : 'error',
  )

  return (
    <figure className={styles.mediaCard}>
      <div className={styles.mediaFrame}>
        {status === 'error' ? (
          <div className={styles.imageFallback}>
            <span className={styles.fallbackIcon} aria-hidden="true">
              <ImageOff size={26} strokeWidth={1.6} />
            </span>
            <p className={styles.fallbackTitle}>Photo unavailable</p>
            <span className={styles.fallbackText}>
              The sample photo for this listing could not be loaded.
            </span>
          </div>
        ) : (
          <>
            <span
              className={cx(styles.imageSkeleton, status === 'loaded' && styles.imageSkeletonHidden)}
              aria-hidden="true"
            />
            <img
              className={cx(styles.image, status === 'loaded' && styles.imageLoaded)}
              src={imageSrc}
              alt={listing.imageAlt ?? `${listing.title} sample photo`}
              width={1200}
              height={900}
              decoding="async"
              onLoad={() => setStatus('loaded')}
              onError={() => setStatus('error')}
            />
          </>
        )}
      </div>

      <figcaption className={styles.mediaCaption}>
        <span className={styles.mediaCategory}>{categoryLabels[listing.category]}</span>
        <span>Sample photo</span>
      </figcaption>
    </figure>
  )
}

function ListingNotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/search" className={styles.backLink}>
          <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          Back to marketplace
        </Link>
        <Badge variant="neutral">Listing not found</Badge>
      </div>

      <PageHeader
        eyebrow="Listing"
        title="This find is not on the shelf."
        description="The link may be out of date, the item may no longer be available, or this listing is not part of the demo catalog."
        meta={<Badge variant="neutral">Unavailable listing</Badge>}
      />

      <section className={styles.notFoundCard} aria-label="Listing not found">
        <EmptyState
          icon={PackageSearch}
          title="We could not find that listing."
          description="Check the address, or browse the marketplace to see what else is waiting on campus."
        >
          <ButtonLink to="/search" variant="primary">
            Browse marketplace
          </ButtonLink>
          <ButtonLink to="/" variant="secondary">
            Back to home
          </ButtonLink>
        </EmptyState>
      </section>
    </div>
  )
}

interface ListingDetailsViewProps {
  listing: Listing
}

function ListingDetailsView({ listing }: ListingDetailsViewProps) {
  const { savedIds, toggleSaved } = useWishlist()
  const [liveMessage, setLiveMessage] = useState('')
  const saved = savedIds.has(listing.id)
  const relatedListings = getRelatedListings(listing)
  const categoryHref = `/search?category=${listing.category}`

  function handleToggleSave(target: Listing) {
    const isSaved = savedIds.has(target.id)

    toggleSaved(target.id)
    setLiveMessage(
      isSaved
        ? `${target.title} removed from your wishlist.`
        : `${target.title} saved for this visit.`,
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/search" className={styles.backLink}>
          <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          Back to marketplace
        </Link>
        <Badge variant="accent">Sample listing</Badge>
      </div>

      <div className={styles.layout}>
        <div className={styles.mediaColumn}>
          <ListingMedia key={listing.id} listing={listing} />

          <aside className={styles.meetupNote} aria-label="Campus meetup tip">
            <span className={styles.meetupIcon} aria-hidden="true">
              <MapPin size={16} strokeWidth={1.9} />
            </span>
            <div>
              <p className={styles.meetupTitle}>Plan a campus meetup</p>
              <p className={styles.meetupText}>
                Agree on a public spot like the central library steps or main
                gate before you exchange.
              </p>
            </div>
          </aside>
        </div>

        <article className={styles.infoCard} aria-labelledby="listing-title">
          <p className={styles.eyebrow}>
            <Link to={categoryHref} className={styles.categoryLink}>
              {categoryLabels[listing.category]}
            </Link>
            <span className={styles.eyebrowDot} aria-hidden="true">
              ·
            </span>
            <span>Listed {getListingAge(listing.postedDays)}</span>
          </p>

          <h1 id="listing-title" className={styles.title}>
            {listing.title}
          </h1>

          <div className={styles.priceRow}>
            <p className={styles.price}>{formatPrice(listing.price)}</p>
            <Badge variant={conditionVariants[listing.condition]}>{listing.condition}</Badge>
          </div>

          <div className={styles.actions}>
            <ButtonLink
              to="/messages"
              variant="primary"
              size="lg"
              className={styles.actionButton}
              aria-label={`Contact ${listing.seller.name} about ${listing.title}`}
            >
              <MessageCircle size={17} strokeWidth={2} aria-hidden="true" />
              Contact seller
            </ButtonLink>

            <Button
              variant="secondary"
              size="lg"
              className={styles.actionButton}
              aria-pressed={saved}
              onClick={() => handleToggleSave(listing)}
            >
              <Heart
                size={17}
                strokeWidth={1.9}
                fill={saved ? 'currentColor' : 'none'}
                aria-hidden="true"
              />
              {saved ? 'Saved to wishlist' : 'Save to wishlist'}
            </Button>
          </div>

          <p className={styles.actionNote}>
            <MessageCircle size={13} strokeWidth={1.9} aria-hidden="true" />
            Contact seller opens the Messages preview. Live chat is not connected
            in this demo.
          </p>

          <section className={styles.section} aria-labelledby="about-heading">
            <h2 id="about-heading" className={styles.sectionTitle}>
              About this find
            </h2>
            <p className={styles.description}>{listing.description}</p>
          </section>

          <section className={styles.section} aria-labelledby="details-heading">
            <h2 id="details-heading" className={styles.sectionTitle}>
              Listing details
            </h2>
            <dl className={styles.facts}>
              <div>
                <dt>Category</dt>
                <dd>
                  <Link to={categoryHref} className={styles.factLink}>
                    {categoryLabels[listing.category]}
                  </Link>
                </dd>
              </div>
              <div>
                <dt>Condition</dt>
                <dd>{listing.condition}</dd>
              </div>
              <div>
                <dt>Pickup</dt>
                <dd>{listing.pickup}</dd>
              </div>
              <div>
                <dt>Listed</dt>
                <dd>{getListingAge(listing.postedDays)}</dd>
              </div>
            </dl>
          </section>

          <section className={styles.sellerCard} aria-labelledby="seller-heading">
            <div className={styles.sellerHeading}>
              <Avatar name={listing.seller.name} size="lg" />
              <div className={styles.sellerCopy}>
                <p className={styles.sellerEyebrow}>Seller</p>
                <h2 id="seller-heading" className={styles.sellerName}>
                  {listing.seller.name}
                </h2>
                <p className={styles.sellerMeta}>{listing.seller.year}</p>
              </div>
            </div>
            <p className={styles.privacyNote}>
              <ShieldCheck size={14} strokeWidth={1.9} aria-hidden="true" />
              Only the seller&rsquo;s name, year, and pickup spot are shown.
              Private contact details stay hidden.
            </p>
          </section>

          <p className="sr-only" role="status" aria-live="polite">
            {liveMessage}
          </p>
        </article>
      </div>

      {relatedListings.length > 0 ? (
        <section className={styles.related} aria-labelledby="related-heading">
          <SectionHeading
            eyebrow="Keep looking"
            title="More nearby finds."
            titleId="related-heading"
            description="Other sample listings from the same campus catalog, starting with this category."
            meta={<Badge variant="accent">Sample picks</Badge>}
            action={
              <ButtonLink to="/search" variant="secondary" size="sm">
                Browse all
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </ButtonLink>
            }
          />

          <div className={styles.relatedGrid}>
            {relatedListings.map((related) => (
              <ProductCard
                key={related.id}
                product={related}
                saved={savedIds.has(related.id)}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        </section>
      ) : null}

      <p className={styles.demoNote}>
        <strong>Sample listing.</strong> This page reads from the Campus Kart demo
        catalog. Photos, seller details, and availability are illustrative; no
        payments or real contact details are connected.
      </p>
    </div>
  )
}

export function ListingDetailsPage() {
  const { listingId = '' } = useParams()
  const listing = getListingById(listingId)

  if (!listing) {
    return <ListingNotFound />
  }

  return <ListingDetailsView key={listing.id} listing={listing} />
}
