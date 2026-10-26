import { ArrowUpRight, Heart, ImageOff } from 'lucide-react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { categoryLabels } from '../../data/categories'
import { type Listing } from '../../data/listings'
import { cx } from '../../lib/cx'
import { formatPrice } from '../../lib/formatPrice'
import { Avatar } from '../ui/Avatar'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Listing
  saved: boolean
  onToggleSave: (product: Listing) => void
}

interface ImageRecord {
  src: string
  status: 'loaded' | 'error'
}

export function ProductCard({ product, saved, onToggleSave }: ProductCardProps) {
  const titleId = useId()
  const [imageRecord, setImageRecord] = useState<ImageRecord | null>(null)
  const imageSrc = product.image?.trim() ?? ''
  const imageStatus = !imageSrc
    ? 'error'
    : imageRecord?.src === imageSrc
      ? imageRecord.status
      : 'loading'
  const conditionKey = product.condition.toLowerCase().replace(/\s+/g, '-')

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.media}>
        {imageStatus === 'error' ? (
          <div className={styles.fallback}>
            <ImageOff size={24} strokeWidth={1.8} aria-hidden="true" />
            <span>Photo unavailable</span>
          </div>
        ) : (
          <>
            <span
              className={cx(styles.skeleton, imageStatus === 'loaded' && styles.skeletonHidden)}
              aria-hidden="true"
            />
            <img
              className={cx(styles.image, imageStatus === 'loaded' && styles.imageLoaded)}
              src={imageSrc}
              alt={product.imageAlt ?? ''}
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageRecord({ src: imageSrc, status: 'loaded' })}
              onError={() => setImageRecord({ src: imageSrc, status: 'error' })}
            />
          </>
        )}

        <span className={styles.condition} data-condition={conditionKey}>
          {product.condition}
        </span>

        <button
          type="button"
          className={cx(styles.save, saved && styles.saved)}
          aria-label={
            saved
              ? `Remove ${product.title} from your wishlist`
              : `Save ${product.title} to your wishlist`
          }
          aria-pressed={saved}
          onClick={() => onToggleSave(product)}
        >
          <Heart
            size={18}
            strokeWidth={1.8}
            fill={saved ? 'currentColor' : 'none'}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={styles.category}>{categoryLabels[product.category]}</span>
          <span className={styles.metaDot} aria-hidden="true">
            ·
          </span>
          <span className={styles.place}>
            <span className={styles.placeText}>{product.pickup}</span>
          </span>
        </p>

        <h3 id={titleId} className={styles.title}>
          <Link className={styles.titleLink} to={`/listings/${product.id}`}>
            {product.title}
          </Link>
        </h3>

        <span className={styles.seller}>
          <Avatar name={product.seller.name} size="xs" />
          <span className={styles.sellerText}>
            {product.seller.name}
            <span className={styles.year}> · {product.seller.year}</span>
          </span>
        </span>

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <Link
            className={styles.details}
            to={`/listings/${product.id}`}
            aria-label={`View details for ${product.title}`}
          >
            View details
            <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
