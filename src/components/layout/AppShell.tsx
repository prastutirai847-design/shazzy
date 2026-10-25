import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MobileTabBar } from './MobileTabBar'
import { NavDrawer } from './NavDrawer'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import styles from './AppShell.module.css'

export function AppShell() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { pathname } = useLocation()
  const [lastPathname, setLastPathname] = useState(pathname)
  const mainRef = useRef<HTMLElement>(null)
  const focusedPathname = useRef(pathname)

  const closeNav = useCallback(() => setIsNavOpen(false), [])

  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setIsNavOpen(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0)

    if (focusedPathname.current === pathname) {
      return
    }

    focusedPathname.current = pathname
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className={styles.app}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>

      <Sidebar />

      <div className={styles.main}>
        <TopBar isNavOpen={isNavOpen} onOpenNav={() => setIsNavOpen(true)} />

        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          className={styles.content}
        >
          <div key={pathname} className={styles.contentInner}>
            <Outlet />
          </div>
        </main>

        <MobileTabBar />
      </div>

      <NavDrawer open={isNavOpen} onClose={closeNav} />
    </div>
  )
}
