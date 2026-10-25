import { X } from 'lucide-react'
import { useEffect, useRef, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../brand/Logo'
import { IconButton } from '../ui/IconButton'
import { PrimaryNav, SellCta, TrustNote } from './PrimaryNav'
import styles from './NavDrawer.module.css'

export const NAV_DIALOG_ID = 'app-navigation-drawer'
export const NAV_TRIGGER_ID = 'app-navigation-trigger'

interface NavDrawerProps {
  open: boolean
  onClose: () => void
}

export function NavDrawer({ open, onClose }: NavDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (open && !dialog.open) {
      returnFocusRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      dialog.showModal()
      dialog.focus()
    } else if (!open) {
      if (dialog.open) {
        dialog.close()
      }

      const returnFocus = returnFocusRef.current
      const fallbackFocus = document.getElementById(NAV_TRIGGER_ID)
      returnFocusRef.current = null

      const focusTarget =
        returnFocus && returnFocus.isConnected && returnFocus !== document.body
          ? returnFocus
          : fallbackFocus

      focusTarget?.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <dialog
      id={NAV_DIALOG_ID}
      ref={dialogRef}
      className={styles.drawer}
      tabIndex={-1}
      aria-labelledby="navigation-drawer-title"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      <div className={styles.panel}>
        <h2 id="navigation-drawer-title" className="sr-only">
          Navigation
        </h2>

        <div className={styles.header}>
          <Link to="/" className={styles.brand} aria-label="Campus Kart home" onClick={onClose}>
            <Logo />
          </Link>
          <IconButton label="Close navigation" onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </IconButton>
        </div>

        <SellCta onNavigate={onClose} />

        <div className={styles.navArea}>
          <PrimaryNav onNavigate={onClose} />
        </div>

        <TrustNote />
      </div>
    </dialog>
  )
}
