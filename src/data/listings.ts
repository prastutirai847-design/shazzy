import calculatorImage from '../assets/listings/calculator.jpg'
import draftingSetImage from '../assets/listings/drafting-set.jpg'
import guitarImage from '../assets/listings/guitar.jpg'
import headphonesImage from '../assets/listings/headphones.jpg'
import keyboardImage from '../assets/listings/keyboard.jpg'
import labCoatImage from '../assets/listings/lab-coat.jpg'
import studyChairImage from '../assets/listings/study-chair.jpg'
import studyLampImage from '../assets/listings/study-lamp.jpg'
import textbooksImage from '../assets/listings/textbooks.jpg'
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
  // pickup: string
  // area: 'hostel' | 'academic' | 'main-gate'
  postedDays: number
  image?: string
  imageAlt?: string
}

export const listingCategories: ReadonlyArray<{ id: 'all' | ListingCategory; label: string }> = [
  { id: 'all', label: 'All items' },
  ...productCategories.map(({ id, label }) => ({ id, label })),
]

// Illustrative content for the marketplace preview. Not connected to real listings; prices are demo INR amounts sized for student budgets.
export const sampleListings: Listing[] = [
  {
    id: 'headphones',
    title: 'Noise-isolating over-ear headphones',
    description:
      'Bought these for late-night lab reports and long library sessions. The ear pads are in good shape, and the charging cable and travel pouch are included. I have switched to earbuds for the walk between classes, so these need a new desk.',
    category: 'electronics',
    condition: 'Like New',
    price: 1199,
    seller: { name: 'Ananya Rao', year: '3rd year' },
    // pickup: 'Hostel block C',
    // area: 'hostel',
    postedDays: 2,
    image: headphonesImage,
    imageAlt: 'Over-ear headphones.',
  },
  {
    id: 'calculator',
    title: 'Casio FX-991ES scientific calculator',
    description:
      'Used through first-year maths and physics. The slide cover is included and all the keys are working. I have moved to the calculator required for my branch, so this one is free to go.',
    category: 'engineering-essentials',
    condition: 'Good',
    price: 650,
    seller: { name: 'Rohan Mehta', year: '2nd year' },
    // pickup: 'Central library steps',
    // area: 'academic',
    postedDays: 1,
    image: calculatorImage,
    imageAlt: 'A Casio FX-991ES scientific calculator.',
  },
  {
    id: 'textbooks',
    title: 'Programming reference textbook bundle',
    description:
      'A set of programming and data structures reference books from my second year. The covers show some shelf wear, the pages are clean, and a few margin notes might actually help. Selling as a set because I am switching to PDFs.',
    category: 'books',
    condition: 'Good',
    price: 420,
    seller: { name: 'Sneha Iyer', year: '3rd year' },
    // pickup: 'Hostel block A common room',
    // area: 'hostel',
    postedDays: 4,
    image: textbooksImage,
    imageAlt: 'A shelf of programming language textbooks.',
  },
  {
    id: 'drafting-set',
    title: 'Engineering drawing instrument set',
    description:
      'A compass set in a zip case with the usual drawing attachments. I used it for one semester of engineering drawing and the pieces are complete. A practical addition to a first-year kit.',
    category: 'engineering-essentials',
    condition: 'Like New',
    price: 350,
    seller: { name: 'Aditya Kulkarni', year: '2nd year' },
    // pickup: 'Drawing hall noticeboard',
    // area: 'academic',
    postedDays: 3,
    image: draftingSetImage,
    imageAlt: 'A compass and drafting instrument set arranged in an open case.',
  },
  {
    id: 'lab-coat',
    title: 'White lab coat, medium',
    description:
      'One white lab coat in medium, washed and ready for a first-year chemistry or workshop lab. There are no stains or tears. I keep a spare and only need one this semester.',
    category: 'engineering-essentials',
    condition: 'Good',
    price: 250,
    seller: { name: 'Meera Nair', year: '2nd year' },
    // pickup: 'Chemistry lab corridor',
    // area: 'academic',
    postedDays: 5,
    image: labCoatImage,
    imageAlt: 'A white lab coat.',
  },
  {
    id: 'study-lamp',
    title: 'Warm LED study lamp',
    description:
      'A compact LED study lamp with a flexible neck that has lived on my hostel desk for a year. It still works reliably. I am selling it because my new room has a built-in light above the desk.',
    category: 'hostel-essentials',
    condition: 'Good',
    price: 450,
    seller: { name: 'Kabir Shah', year: '3rd year' },
    // pickup: 'Hostel block B',
    // area: 'hostel',
    postedDays: 2,
    image: studyLampImage,
    imageAlt: 'A study lamp.',
  },
  {
    id: 'study-chair',
    title: 'Folding study chair',
    description:
      'A sturdy folding chair that fits under a hostel desk. The cushion is clean and the frame folds flat for moving day. Pickup only; I can help carry it down to the block entrance.',
    category: 'hostel-essentials',
    condition: 'Good',
    price: 700,
    seller: { name: 'Ishita Sen', year: '2nd' },
    // pickup: 'Hostel block D entrance',
    // area: 'hostel',
    postedDays: 6,
    image: studyChairImage,
    imageAlt: 'A folding study chair.',
  },
  {
    id: 'guitar',
    title: 'Acoustic guitar with carry bag',
    description:
      'An acoustic guitar that got me through two years of campus open-mics. The strings were changed recently and the carry bag is included. I am graduating and cannot take it home, so it should go to someone who will keep playing.',
    category: 'hobbies-lifestyle',
    condition: 'Good',
    price: 2200,
    seller: { name: 'Arjun Menon', year: '4th year' },
    // pickup: 'Student activity centre',
    // area: 'academic',
    postedDays: 7,
    image: guitarImage,
    imageAlt: 'An acoustic guitar leaning against a bookcase.',
  },
  {
    id: 'keyboard',
    title: 'Compact mechanical keyboard',
    description:
      'A compact mechanical keyboard with cream keycaps and a braided USB-C cable. The switches are quiet enough for a shared room, all keys have been tested, and the original box is included. A comfortable upgrade from laptop keys.',
    category: 'electronics',
    condition: 'Like New',
    price: 1299,
    seller: { name: 'Devika Joshi', year: '3rd year' },
    // pickup: 'Computer lab annex',
    // area: 'academic',
    postedDays: 3,
    image: keyboardImage,
    imageAlt: 'A mechanical keyboard.',
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
