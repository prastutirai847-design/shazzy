import { Compass } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Badge } from '../../components/ui/Badge'
import { ButtonLink } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="404"
        title="This page is not on the map."
        description="The link may be out of date, or this corner of Campus Kart has not been built yet."
        meta={<Badge variant="neutral">Page not found</Badge>}
      />

      <section className={styles.card} aria-label="Page not found">
        <EmptyState
          icon={Compass}
          title="We could not find that page."
          description="Check the address, or head back home to keep exploring Campus Kart."
        >
          <ButtonLink to="/" variant="primary">
            Back to home
          </ButtonLink>
        </EmptyState>
      </section>
    </div>
  )
}
