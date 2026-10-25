import { Link } from 'react-router-dom'
import { Logo } from '../brand/Logo'
import { PrimaryNav, SellCta, TrustNote } from './PrimaryNav'
import styles from './Sidebar.module.css'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Link to="/" className={styles.brand} aria-label="Campus Kart home">
        <Logo />
      </Link>

      <SellCta />

      <div className={styles.navArea}>
        <PrimaryNav />
      </div>

      <TrustNote />
    </aside>
  )
}
