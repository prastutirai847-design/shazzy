import { Plus } from 'lucide-react'
import { getSection, type SectionId } from '../../data/sections'
import { QuickActionLink } from '../../components/ui/QuickActionLink'
import { ButtonLink } from '../../components/ui/Button'
import styles from './DashboardWelcome.module.css'

interface QuickAction {
  sectionId: SectionId
  label: string
}

const quickActions: ReadonlyArray<QuickAction> = [
  { sectionId: 'search', label: 'Browse products' },
  { sectionId: 'sell', label: 'Sell an item' },
  { sectionId: 'wishlist', label: 'View wishlist' },
  { sectionId: 'messages', label: 'Open messages' },
  { sectionId: 'my-listings', label: 'View my listings' },
]

export function DashboardWelcome() {
  return (
    <section className={styles.welcome} aria-labelledby="dashboard-welcome-greeting">
      <div className={styles.top}>
        <div className={styles.copy}>
          <p id="dashboard-welcome-greeting" className={styles.greeting}>
            Welcome to <span className={styles.serif}>Campus Kart.</span>
          </p>
          <p className={styles.subtitle}>
            Discover and exchange pre-owned items with students on your campus.
          </p>
        </div>

        <div className={styles.cta}>
          <ButtonLink to="/sell" size="lg" className={styles.ctaButton}>
            <Plus size={17} strokeWidth={2} aria-hidden="true" />
            Sell an Item
          </ButtonLink>
        </div>
      </div>

      <nav className={styles.quick} aria-labelledby="quick-actions-label">
        <div className={styles.quickHeader}>
          <p id="quick-actions-label" className={styles.quickLabel}>
            Quick actions
          </p>
          <p className={styles.quickNote}>
            Each action opens its in-development preview.
          </p>
        </div>

        <div className={styles.quickGrid}>
          {quickActions.map((action) => {
            const section = getSection(action.sectionId)

            return (
              <QuickActionLink
                key={action.sectionId}
                to={section.path}
                label={action.label}
                icon={section.icon}
              />
            )
          })}
        </div>
      </nav>
    </section>
  )
}
