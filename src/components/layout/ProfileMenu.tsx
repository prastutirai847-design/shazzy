import { ChevronDown } from 'lucide-react'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { getSection } from '../../data/sections'
import { cx } from '../../lib/cx'
import { Avatar } from '../ui/Avatar'
import styles from './ProfileMenu.module.css'

const accountSectionIds = ['profile', 'my-listings', 'settings'] as const

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const [menuPathname, setMenuPathname] = useState(pathname)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  if (pathname !== menuPathname) {
    setMenuPathname(pathname)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleOutsidePointer(event: PointerEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsidePointer)

    return () => document.removeEventListener('pointerdown', handleOutsidePointer)
  }, [isOpen])

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget

    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setIsOpen(false)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Escape' || !isOpen) {
      return
    }

    event.stopPropagation()
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div
      ref={containerRef}
      className={styles.profileMenu}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? 'Close account menu' : 'Open account menu'}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Avatar />
        <ChevronDown className={styles.chevron} size={14} strokeWidth={2} aria-hidden="true" />
      </button>

      {isOpen ? (
        <div
          id={menuId}
          className={styles.popover}
          role="group"
          aria-label="Account shortcuts"
        >
          <div className={styles.identity}>
            <Avatar size="sm" />
            <div className={styles.identityCopy}>
              <p className={styles.identityTitle}>Your account</p>
              <p className={styles.identityMeta}>Profile preview</p>
            </div>
          </div>

          <nav className={styles.links} aria-label="Account">
            {accountSectionIds.map((id) => {
              const section = getSection(id)
              const Icon = section.icon

              return (
                <NavLink
                  key={section.id}
                  to={section.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => cx(styles.link, isActive && styles.linkActive)}
                >
                  <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                  <span>{section.label}</span>
                </NavLink>
              )
            })}
          </nav>

          <p className={styles.note}>Accounts and sign-in are coming in a later stage.</p>
        </div>
      ) : null}
    </div>
  )
}
