import { Menu } from 'lucide-react'
import { useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { getSection, type SectionId } from '../../data/sections'
import { BROWSE_PARAMS } from '../../features/browse/browseFilters'
import { cx } from '../../lib/cx'
import { Logo } from '../brand/Logo'
import { MarketplaceSearch } from '../marketplace/MarketplaceSearch'
import { IconButton, IconLink } from '../ui/IconButton'
import { NAV_DIALOG_ID, NAV_TRIGGER_ID } from './NavDrawer'
import { ProfileMenu } from './ProfileMenu'
import styles from './TopBar.module.css'

type HeaderUnreadCounts = Partial<Record<'messages' | 'notifications', number>>

interface TopBarProps {
  isNavOpen: boolean
  onOpenNav: () => void
  unreadCounts?: HeaderUnreadCounts
}

interface HeaderActionProps {
  sectionId: SectionId
  unreadCount?: number
  className?: string
}

function HeaderAction({ sectionId, unreadCount = 0, className }: HeaderActionProps) {
  const section = getSection(sectionId)
  const Icon = section.icon
  const hasUnread = unreadCount > 0

  return (
    <IconLink
      to={section.path}
      label={hasUnread ? `${section.label}, ${unreadCount} unread` : section.label}
      className={cx(styles.headerAction, className)}
    >
      <Icon size={19} strokeWidth={1.9} aria-hidden="true" />
      {hasUnread ? (
        <span className={styles.unreadBadge} aria-hidden="true">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      ) : null}
    </IconLink>
  )
}

export function TopBar({ isNavOpen, onOpenNav, unreadCounts }: TopBarProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const isBrowsePage = pathname === '/search'
  const searchQuery = isBrowsePage
    ? (searchParams.get(BROWSE_PARAMS.query) ?? '')
    : ''
  const [searchDraft, setSearchDraft] = useState('')
  const searchValue = isBrowsePage ? searchQuery : searchDraft

  function updateQueryParam(value: string) {
    const next = new URLSearchParams(searchParams)

    if (value) {
      next.set(BROWSE_PARAMS.query, value)
    } else {
      next.delete(BROWSE_PARAMS.query)
    }

    setSearchParams(next, { replace: true })
  }

  function handleSearchChange(value: string) {
    if (isBrowsePage) {
      updateQueryParam(value)
      return
    }

    setSearchDraft(value)
  }

  function handleSearchSubmit() {
    const query = searchValue.trim()

    if (isBrowsePage) {
      updateQueryParam(query)
      return
    }

    setSearchDraft(query)
    const next = new URLSearchParams()

    if (query) {
      next.set(BROWSE_PARAMS.query, query)
    }

    navigate({ pathname: '/search', search: next.toString() })
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <IconButton
            id={NAV_TRIGGER_ID}
            label="Open navigation"
            className={styles.menuButton}
            onClick={onOpenNav}
            aria-haspopup="dialog"
            aria-expanded={isNavOpen}
            aria-controls={NAV_DIALOG_ID}
          >
            <Menu size={20} strokeWidth={2} />
          </IconButton>

          <Link to="/" className={styles.brand} aria-label="Campus Kart home">
            <Logo />
          </Link>

          <div className={styles.headerSearch}>
            <MarketplaceSearch
              variant="compact"
              value={searchValue}
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              label="Search the marketplace"
              placeholder="Search the campus"
            />
          </div>
        </div>

        <div className={styles.right}>
          <HeaderAction sectionId="wishlist" className={styles.wishlistAction} />
          <HeaderAction
            sectionId="messages"
            unreadCount={unreadCounts?.messages}
            className={styles.messagesAction}
          />
          <HeaderAction
            sectionId="notifications"
            unreadCount={unreadCounts?.notifications}
          />
          <span className={styles.divider} aria-hidden="true" />
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}
