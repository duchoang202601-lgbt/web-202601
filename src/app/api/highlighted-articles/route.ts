import { NextResponse } from 'next/server';
import { getHighlightedArticles } from '@/lib/notion';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('[API highlighted-articles] Fetching highlighted articles...');
    const articles = await getHighlightedArticles(5);
    console.log('[API highlighted-articles] Found articles:', articles.length);
    console.log('[API highlighted-articles] Articles:', JSON.stringify(articles, null, 2));
    return NextResponse.json(articles);
  } catch (error) {
    console.error('[API highlighted-articles] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch highlighted articles' },
      { status: 500 }
    );
  }
}

