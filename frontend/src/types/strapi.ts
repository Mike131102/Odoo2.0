// Strapi 5 API Response Types (flat format — no .attributes wrapper)

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Strapi 5 rich-text block format
export interface StrapiRichTextBlock {
  type: string;
  children: { text: string; type?: string }[];
}
export type StrapiRichText = StrapiRichTextBlock[];

export function extractRichText(value: string | StrapiRichText | undefined): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value
    .flatMap((block) => block.children.map((c) => c.text))
    .join('\n');
}

export interface Homepage extends StrapiItem {
  heroTitle: string;
  heroSubtitle: string;
  heroCTAPrimary: string;
  heroCTASecondary?: string;
  heroCTAPrimaryLink?: string;
  heroCTASecondaryLink?: string;
  introTitle?: string;
  introText?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface Service extends StrapiItem {
  title: string;
  description: string;
  icon?: string;
  order: number;
  highlighted: boolean;
  detailText?: string;
  slug?: string;
}

export interface FAQ extends StrapiItem {
  question: string;
  answer: string | StrapiRichText;
  order: number;
  category?: string;
}

export interface BlogPost extends StrapiItem {
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  author?: string;
  category?: string;
  readingTime?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Global extends StrapiItem {
  companyName: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  footerText?: string;
  linkedinUrl?: string;
  xingUrl?: string;
  siteUrl?: string;
  impressumUrl?: string;
  datenschutzUrl?: string;
}