import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllArticles, 
  getFeaturedArticles, 
  getLatestArticles,
  getArticlesByCategory 
} from '@/lib/notion';

/**
 * GET /api/articles
 * 
 * Query params:
 * - status: 'published' | 'draft' | 'all' (default: 'published')
 * - category: string - Filter by category
 * - featured: 'true' | 'false' - Filter featured articles
 * - limit: number - Limit results
 * - type: 'featured' | 'latest' | 'category' - Shortcut queries
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const type = searchParams.get('type');
    const status = searchParams.get('status') as 'published' | 'draft' | 'all' | null;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    let articles;

    // Shortcut queries
    if (type === 'featured') {
      articles = await getFeaturedArticles(limit ? parseInt(limit) : 4);
    } else if (type === 'latest') {
      articles = await getLatestArticles(limit ? parseInt(limit) : 6);
    } else if (type === 'category' && category) {
      articles = await getArticlesByCategory(category, limit ? parseInt(limit) : undefined);
    } else {
      // Custom query
      articles = await getAllArticles({
        status: status || 'published',
        category: category || undefined,
        featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
        limit: limit ? parseInt(limit) : undefined,
      });
    }

    return NextResponse.json({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch articles',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

