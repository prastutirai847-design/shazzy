import {
  Bell,
  CirclePlus,
  Heart,
  House,
  LayoutGrid,
  MessageCircle,
  Search,
  Settings,
  Tag,
  UserRound,
  type LucideIcon,
} from 'lucide-react'

export type SectionId =
  | 'home'
  | 'search'
  | 'categories'
  | 'wishlist'
  | 'messages'
  | 'notifications'
  | 'sell'
  | 'my-listings'
  | 'profile'
  | 'settings'

export interface PlaceholderCopy {
  title: string
  description: string
}

export interface Section {
  id: SectionId
  label: string
  mobileLabel?: string
  path: string
  icon: LucideIcon
  summary: string
  placeholder?: PlaceholderCopy
}

export const sections: Record<SectionId, Section> = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: House,
    summary: 'Your campus marketplace at a glance.',
  },
  search: {
    id: 'search',
    label: 'Browse marketplace',
    mobileLabel: 'Browse',
    path: '/search',
    icon: Search,
    summary: 'Find what your campus is selling.',
  },
  categories: {
    id: 'categories',
    label: 'Categories',
    path: '/categories',
    icon: LayoutGrid,
    summary: 'Lab gear, tech, and hostel life.',
    placeholder: {
      title: 'The shelves are being stocked',
      description:
        'Curated shelves for engineering essentials, textbooks, tech, hostel gear, hobbies, and more will live here, each one filled by students on your campus.',
    },
  },
  wishlist: {
    id: 'wishlist',
    label: 'Wishlist',
    path: '/wishlist',
    icon: Heart,
    summary: 'Save the finds you love.',
    placeholder: {
      title: 'Wishlist saves are live',
      description:
        'Hearts now work across Home, Browse, and each product page for this visit. A dedicated wishlist page with saves that last between visits is still being built.',
    },
  },
  messages: {
    id: 'messages',
    label: 'Messages',
    path: '/messages',
    icon: MessageCircle,
    summary: 'Chat with buyers and sellers.',
    placeholder: {
      title: 'The inbox is being set up',
      description:
        'Chat with buyers and sellers, arrange a pickup on campus, and keep every conversation tied to the listing that started it.',
    },
  },
  notifications: {
    id: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    icon: Bell,
    summary: 'Drops, replies, and updates.',
    placeholder: {
      title: 'Notifications are warming up',
      description:
        'Updates on messages, saved finds, and fresh listings near your campus will show up here so you never miss a good one.',
    },
  },
  sell: {
    id: 'sell',
    label: 'Sell an item',
    path: '/sell',
    icon: CirclePlus,
    summary: 'Pass good things forward.',
    placeholder: {
      title: 'A simple way to sell is next',
      description:
        'A guided listing flow with photos, category suggestions, and pricing help is on the way. For now, this route is set up and ready for its feature stage.',
    },
  },
  'my-listings': {
    id: 'my-listings',
    label: 'My listings',
    path: '/my-listings',
    icon: Tag,
    summary: 'Manage what you are selling.',
    placeholder: {
      title: 'Your listings hub is next',
      description:
        'Track what you are selling, tidy up drafts, and mark items as sold — all from one calm, organised space.',
    },
  },
  profile: {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: UserRound,
    summary: 'Your campus identity.',
    placeholder: {
      title: 'Your profile is getting ready',
      description:
        'Your campus community, reviews, saved details, and selling history will come together here to build trust with other students.',
    },
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: Settings,
    summary: 'Make Campus Kart yours.',
    placeholder: {
      title: 'Settings will live here',
      description:
        'Controls for notifications, privacy, campus verification, and appearance preferences are planned for this space.',
    },
  },
}

export const navGroups: Array<{ label: string; items: SectionId[] }> = [
  { label: 'Explore', items: ['home', 'search', 'categories', 'wishlist'] },
  { label: 'Your space', items: ['messages', 'notifications', 'my-listings'] },
  { label: 'Account', items: ['profile', 'settings'] },
]

export const mobileTabSectionIds: SectionId[] = [
  'home',
  'search',
  'sell',
  'messages',
  'profile',
]

export const homeShortcutSectionIds: SectionId[] = [
  'search',
  'categories',
  'wishlist',
  'messages',
  'notifications',
  'my-listings',
  'profile',
  'settings',
]

export const placeholderSections = Object.values(sections).filter(
  (section) => section.id !== 'home' && section.id !== 'search',
)

export function getSection(id: SectionId): Section {
  return sections[id]
}
