import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { WishlistContext } from './wishlist-context'

interface WishlistProviderProps {
  children: ReactNode
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [savedIds, setSavedIds] = useState<ReadonlySet<string>>(() => new Set())

  const toggleSaved = useCallback((listingId: string) => {
    setSavedIds((current) => {
      const next = new Set(current)

      if (next.has(listingId)) {
        next.delete(listingId)
      } else {
        next.add(listingId)
      }

      return next
    })
  }, [])

  const value = useMemo(() => ({ savedIds, toggleSaved }), [savedIds, toggleSaved])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
