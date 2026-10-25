import { useEffect } from 'react'
import { BrowserRouter, matchPath, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { getListingById } from '../data/listings'
import { placeholderSections, sections } from '../data/sections'
import { BrowsePage } from '../features/browse/BrowsePage'
import { HomePage } from '../features/home/HomePage'
import { ListingDetailsPage } from '../features/listing/ListingDetailsPage'
import { NotFoundPage } from '../features/not-found/NotFoundPage'
import { SectionPlaceholderPage } from '../features/placeholder/SectionPlaceholderPage'
import { WishlistProvider } from '../features/wishlist/WishlistProvider'

function RouteEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      document.title = 'Campus Kart — Student marketplace'
      return
    }

    const listingMatch = matchPath('/listings/:listingId', pathname)

    if (listingMatch) {
      const listing = listingMatch.params.listingId
        ? getListingById(listingMatch.params.listingId)
        : undefined
      document.title = listing
        ? `${listing.title} · Campus Kart`
        : 'Listing not found · Campus Kart'
      return
    }

    const match = Object.values(sections).find((section) => section.path === pathname)
    document.title = match ? `${match.label} · Campus Kart` : 'Page not found · Campus Kart'
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <RouteEffects />
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<BrowsePage />} />
            <Route path="listings/:listingId" element={<ListingDetailsPage />} />
            {placeholderSections.map((section) => (
              <Route
                key={section.id}
                path={section.path.slice(1)}
                element={<SectionPlaceholderPage section={section} />}
              />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </WishlistProvider>
    </BrowserRouter>
  )
}
