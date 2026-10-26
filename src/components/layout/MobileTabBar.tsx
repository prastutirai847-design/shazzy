import { Plus } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { getSection, mobileTabSectionIds } from '../../data/sections'
import { cx } from '../../lib/cx'
import styles from './MobileTabBar.module.css'

export function MobileTabBar() {
  return (
    <nav className={styles.tabbar} aria-label="Mobile">
      <div className={styles.inner}>
        {mobileTabSectionIds.map((id) => {
          const section = getSection(id)
          const Icon = section.icon
          const isSell = section.id === 'sell'

          return (
            <NavLink
              key={section.id}
              to={section.path}
              end={section.id === 'home'}
              className={({ isActive }) =>
                cx(styles.tab, isSell && styles.sellTab, isActive && styles.active)
              }
            >
              {isSell ? (
                <span className={styles.sellIcon} aria-hidden="true">
                  <Plus size={24} strokeWidth={1.8} />
                </span>
              ) : (
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
              )}
              <span className={styles.label}>
                {isSell ? 'Sell' : (section.mobileLabel ?? section.label)}
              </span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
