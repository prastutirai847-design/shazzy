import { ArrowUpRight, Check, Plus, ShieldCheck } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { getSection, navGroups } from '../../data/sections'
import { cx } from '../../lib/cx'
import styles from './PrimaryNav.module.css'

interface NavigationProps {
  onNavigate?: () => void
}

export function SellCta({ onNavigate }: NavigationProps) {
  return (
    <NavLink
      to="/sell"
      onClick={onNavigate}
      className={({ isActive }) => cx(styles.sellCta, isActive && styles.sellCtaActive)}
    >
      {({ isActive }) => (
        <>
          <span className={styles.sellIcon} aria-hidden="true">
            <Plus size={18} strokeWidth={2.2} />
          </span>
          <span className={styles.sellLabel}>Sell an item</span>
          {isActive ? (
            <Check className={styles.sellArrow} size={17} strokeWidth={2.1} aria-hidden="true" />
          ) : (
            <ArrowUpRight
              className={styles.sellArrow}
              size={17}
              strokeWidth={1.9}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export function PrimaryNav({ onNavigate }: NavigationProps) {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {navGroups.map((group) => (
        <div key={group.label} className={styles.group}>
          <p className={styles.groupLabel}>{group.label}</p>
          <ul>
            {group.items.map((id) => {
              const section = getSection(id)
              const Icon = section.icon

              return (
                <li key={section.id}>
                  <NavLink
                    to={section.path}
                    end={section.id === 'home'}
                    onClick={onNavigate}
                    className={({ isActive }) => cx(styles.navLink, isActive && styles.active)}
                  >
                    <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
                    <span>{section.label}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function TrustNote() {
  return (
    <div className={styles.trustNote}>
      <span className={styles.trustIcon} aria-hidden="true">
        <ShieldCheck size={17} strokeWidth={1.9} />
      </span>
      <div>
        <p className={styles.trustTitle}>Made for student life</p>
        <p className={styles.trustCopy}>A student-only marketplace built around campus pickup.</p>
      </div>
    </div>
  )
}
