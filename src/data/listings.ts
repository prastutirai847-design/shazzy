import booksImage from '../assets/listings/books.jpg'
import headphonesImage from '../assets/listings/headphones.jpg'
import jacketImage from '../assets/listings/jacket.jpg'
import keyboardImage from '../assets/listings/keyboard.jpg'
import lampImage from '../assets/listings/lamp.jpg'
import plantersImage from '../assets/listings/planters.jpg'
import { productCategories, type ProductCategoryId } from './categories'

export type ListingCategory = ProductCategoryId
export type ListingCondition = 'Like New' | 'Good' | 'Fair'

export interface Listing {
  id: string
  title: string
  description: string
  category: ListingCategory
  condition: ListingCondition
  price: number
  seller: {
    name: string
    year: string
  }
  pickup: string
  area: 'north' | 'east' | 'main'
  postedDays: number
  image?: string
  imageAlt?: string
}

export const listingCategories: ReadonlyArray<{ id: 'all' | ListingCategory; label: string }> = [
  { id: 'all', label: 'All finds' },
  ...productCategories.map(({ id, label }) => ({ id, label })),
]

// Illustrative content for the marketplace preview. Not connected to real listings; prices are demo INR amounts sized for student budgets.
export const sampleListings: Listing[] = [
  {
    id: 'headphones',
    title: 'Noise-cancelling over-ear headphones',
    description:
      'Bought these for long library sessions last semester and looked after them since. Noise cancelling still works cleanly, the ear pads are in good shape, and the charging cable and travel pouch are included. Selling because I have switched to earbuds for the walk between classes.',
    category: 'electronics',
    condition: 'Like New',
    price: 3499,
    seller: { name: 'Maya R.', year: 'Junior' },
    pickup: 'Library steps',
    area: 'main',
    postedDays: 2,
    image: headphonesImage,
    imageAlt: 'Charcoal over-ear headphones resting on a travertine block beside a cream knit blanket.',
  },
  {
    id: 'lamp',
    title: 'Pleated mushroom table lamp',
    description:
      'A warm little bedside lamp with a pleated shade and a solid walnut base. It has only been used in a non-smoking room and the inline switch works smoothly. I am downsizing before the end of term, so it needs a new desk to glow on.',
    category: 'furniture',
    condition: 'Like New',
    price: 899,
    seller: { name: 'Ines P.', year: 'Senior' },
    pickup: 'East Village mailroom',
    area: 'east',
    postedDays: 1,
    image: lampImage,
    imageAlt: 'A pleated cream mushroom lamp with a walnut base glowing on a bedside table.',
  },
  {
    id: 'books',
    title: 'Art history survey set',
    description:
      'A set of three survey texts covering ancient, medieval, and modern art. The pages are clean with light shelf wear on the covers and a few pencilled notes in the margins. Useful if you are taking the intro sequence next semester.',
    category: 'books',
    condition: 'Good',
    price: 1199,
    seller: { name: 'Theo K.', year: 'Sophomore' },
    pickup: 'North Hall lobby',
    area: 'north',
    postedDays: 4,
    image: booksImage,
    imageAlt: 'A stack of green, gold, and terracotta clothbound books on a wooden table.',
  },
  {
    id: 'keyboard',
    title: 'Cream 65% mechanical keyboard',
    description:
      'A compact 65% board with cream keycaps and a soft sage accent. It types quietly, the stabilisers are tuned, and it comes with its original braided cable. Used gently at a desk at home; I am moving to a smaller setup.',
    category: 'electronics',
    condition: 'Like New',
    price: 2499,
    seller: { name: 'Priya S.', year: 'Grad student' },
    pickup: 'North studio',
    area: 'north',
    postedDays: 3,
    image: keyboardImage,
    imageAlt: 'A cream and sage mechanical keyboard on a light oak desk next to a notebook.',
  },
  {
    id: 'planters',
    title: 'Hand-thrown planter duo',
    description:
      'Two hand-thrown stoneware planters in a warm sand glaze, one slightly taller than the other. Both have drainage holes and saucers. The pothos in the photo is staying with me, but the planters are ready for your next cutting.',
    category: 'other',
    condition: 'Good',
    price: 499,
    seller: { name: 'Noor A.', year: 'Sophomore' },
    pickup: 'Arts building',
    area: 'east',
    postedDays: 6,
    image: plantersImage,
    imageAlt: 'Two hand-thrown ceramic planters, one holding a trailing pothos plant.',
  },
  {
    id: 'jacket',
    title: 'Washed denim trucker jacket',
    description:
      'A broken-in denim trucker jacket with the soft, faded blue you cannot fake. It has honest wear at the cuffs and a sturdy zip, with no rips at the seams. Fits a relaxed medium; happy to share measurements before you commit.',
    category: 'accessories',
    condition: 'Fair',
    price: 699,
    seller: { name: 'Sam O.', year: 'Junior' },
    pickup: 'Student union',
    area: 'main',
    postedDays: 5,
    image: jacketImage,
    imageAlt: 'A washed-blue denim jacket hanging on a wooden hanger against a cream wall.',
  },
]

// Deterministic demo shortlist for the dashboard recommendation slot. Not personalized.
export const sampleRecommendedListings: ReadonlyArray<Listing> = sampleListings.slice(0, 3)

export function getListingById(listingId: string): Listing | undefined {
  return sampleListings.find((listing) => listing.id === listingId)
}

// Related finds favour the same category, then listings with the closest age in the demo data.
export function getRelatedListings(listing: Listing, limit = 3): Listing[] {
  const others = sampleListings
    .filter((candidate) => candidate.id !== listing.id)
    .sort((a, b) => a.postedDays - b.postedDays)
  const sameCategory = others.filter((candidate) => candidate.category === listing.category)
  const rest = others.filter((candidate) => candidate.category !== listing.category)

  return [...sameCategory, ...rest].slice(0, limit)
}

export const sampleCategoryCounts = productCategories.reduce(
  (counts, category) => {
    counts[category.id] = sampleListings.filter(
      (listing) => listing.category === category.id,
    ).length
    return counts
  },
  {} as Record<ProductCategoryId, number>,
)
