import { NextResponse } from 'next/server'
import { getFeaturedArticles } from '@/lib/notion'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const articles = await getFeaturedArticles(4)
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching featured articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured articles' },
      { status: 500 }
    )
  }
}

