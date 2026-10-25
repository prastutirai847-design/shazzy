import { sampleListings, type Listing } from '../../data/listings'

export type BrowseCatalogState =
  | { status: 'loading' }
  | { status: 'success'; listings: ReadonlyArray<Listing> }
  | { status: 'error'; message?: string }

// Static demo source. Swap this function for a request while preserving the state contract.
export function useBrowseCatalog(): BrowseCatalogState {
  return { status: 'success', listings: sampleListings }
}
