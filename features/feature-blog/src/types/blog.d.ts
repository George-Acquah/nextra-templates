type Heading = { id: string; text: string; level: number }

interface PaginatedResult<T> {
  data: T[]
  currentPage: number
  pageSize: number
  total: number
  totalPages: number
}

type BlogPostMetadata = {
  title: string
  description: string
  excerpt: string
  date: string
  updatedDate?: string
  tags: string[]
  ogImage: string
  image?: string
  readingTime: number
  featured?: boolean
  faqs?: {
    question: string
    answer: string
  }[]
  authorSlugs?: string[]
  canonicalUrl?: string
  wordCount?: number
}

type BlogPostData = {
  slug: string
  metadata: BlogPostMetadata
  component: React.FC
}

type AuthorData = {
  slug: string
  name: string
  bio: string
  description: string
  avatar?: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

type SchemaObject = { id: string; content: Record<string, unknown> }
