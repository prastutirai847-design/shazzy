import { ArrowRight, Sparkles, TriangleAlert, type LucideIcon } from 'lucide-react'
import { useId, type ReactNode } from 'react'
import type { Listing } from '../../data/listings'
import { Badge } from '../ui/Badge'
import { Button, ButtonLink } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { ProductCard } from './ProductCard'
import styles from './RecommendedListings.module.css'

export type RecommendedListingsState =
  | { status: 'loading' }
  | { status: 'success'; listings: ReadonlyArray<Listing> }
  | { status: 'error'; message?: string }

interface RecommendedListingsProps {
  state: RecommendedListingsState
  savedIds: ReadonlySet<string>
  onToggleSave: (listing: Listing) => void
  onRetry?: () => void
  viewAllHref?: string
}

interface StatePanelProps {
  tone: 'empty' | 'error'
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

const skeletonKeys = ['one', 'two', 'three'] as const

function StatePanel({ tone, icon: Icon, title, description, action }: StatePanelProps) {
  return (
    <div
      className={styles.statePanel}
      data-tone={tone}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <span className={styles.stateIcon} aria-hidden="true">
        <Icon size={24} strokeWidth={1.8} />
      </span>
      <div className={styles.stateCopy}>
        <h3 className={styles.stateTitle}>{title}</h3>
        <p className={styles.stateText}>{description}</p>
      </div>
      {action ? <div className={styles.stateAction}>{action}</div> : null}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
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
  )
}

export function RecommendedListings({
  state,
  savedIds,
  onToggleSave,
  onRetry,
  viewAllHref,
}: RecommendedListingsProps) {
  const titleId = useId()
  let body: ReactNode

  if (state.status === 'loading') {
    body = (
      <div className={styles.loading} aria-busy="true">
        <div className={styles.grid} aria-hidden="true">
          {skeletonKeys.map((key) => (
            <SkeletonCard key={key} />
          ))}
        </div>
        <p className="sr-only" role="status">
          Loading recommended listings.
        </p>
      </div>
    )
  } else if (state.status === 'error') {
    body = (
      <StatePanel
        tone="error"
        icon={TriangleAlert}
        title="Recommended listings couldn’t load."
        description={
          state.message ??
          'The sample catalog didn’t respond. Try again in a moment, or browse the full marketplace.'
        }
        action={
          onRetry ? (
            <Button variant="secondary" size="sm" onClick={onRetry}>
              Try again
            </Button>
          ) : viewAllHref ? (
            <ButtonLink to={viewAllHref} variant="secondary" size="sm">
              Browse marketplace
            </ButtonLink>
          ) : undefined
        }
      />
    )
  } else if (state.listings.length === 0) {
    body = (
      <StatePanel
        tone="empty"
        icon={Sparkles}
        title="No sample picks right now."
        description="The demo shelf is empty for the moment. Check back after the next campus drop, or browse what else is around."
        action={
          viewAllHref ? (
            <ButtonLink to={viewAllHref} variant="secondary" size="sm">
              Browse marketplace
            </ButtonLink>
          ) : undefined
        }
      />
    )
  } else {
    body = (
      <div className={styles.grid}>
        {state.listings.map((listing) => (
          <ProductCard
            key={listing.id}
            product={listing}
            saved={savedIds.has(listing.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    )
  }

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <div className={styles.panel}>
        <SectionHeading
          eyebrow="A first look"
          title="Recommended listings."
          titleId={titleId}
          description="Three sample finds in a fixed catalog order. A preview of how recommendations will appear — not personalized or AI-ranked."
          meta={<Badge variant="accent">Sample picks</Badge>}
          action={
            viewAllHref ? (
              <ButtonLink
                to={viewAllHref}
                variant="secondary"
                size="sm"
                aria-label="View all marketplace listings"
              >
                View all
                <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </ButtonLink>
            ) : undefined
          }
        />
        {body}
      </div>
    </section>
  )
}
