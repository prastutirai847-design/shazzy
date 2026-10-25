import { createContext, useContext } from 'react'

export interface WishlistContextValue {
  savedIds: ReadonlySet<string>
  toggleSaved: (listingId: string) => void
}

export const WishlistContext = createContext<WishlistContextValue | null>(null)

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }

  return context
}
