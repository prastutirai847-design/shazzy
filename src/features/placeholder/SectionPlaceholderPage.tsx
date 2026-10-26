import { Check, Clock3 } from 'lucide-react'
import { PageHeader } from '../../components/layout/PageHeader'
import { Badge } from '../../components/ui/Badge'
import { ButtonLink } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import type { Section } from '../../data/sections'
import styles from './SectionPlaceholderPage.module.css'

interface SectionPlaceholderPageProps {
  section: Section
}

export function SectionPlaceholderPage({ section }: SectionPlaceholderPageProps) {
  const Icon = section.icon
  const copy = section.placeholder ?? {
    title: `${section.label} is on the way`,
    description: section.summary,
  }

  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Campus Kart"
        title={section.label}
        description={section.summary}
        meta={<Badge variant="soft">In development</Badge>}
      />

      <section className={styles.card} aria-label={`${section.label} preview`}>
        <div className={styles.stateWrap}>
          <EmptyState icon={Icon} title={copy.title} description={copy.description}>
            <ButtonLink to="/" variant="secondary">
              Back to home
            </ButtonLink>
          </EmptyState>
        </div>

        <div className={styles.statusBar}>
          <div className={styles.statusList}>
            <span>
              <Check size={14} strokeWidth={1.8} aria-hidden="true" />
              Route connected
            </span>
            <span>
              <Check size={14} strokeWidth={1.8} aria-hidden="true" />
              Layout ready
            </span>
            <span className={styles.pending}>
              <Clock3 size={14} strokeWidth={1.8} aria-hidden="true" />
              Feature arriving in a later stage
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
