import { NextRequest, NextResponse } from 'next/server';
import { getArticleById, getArticleBySlug } from '@/lib/notion';

/**
 * GET /api/articles/[id]
 * 
 * Lấy bài viết theo ID hoặc slug
 * 
 * Query params:
 * - type: 'id' | 'slug' (default: 'id')
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'id';
    const { id } = params;

    let article;

    if (type === 'slug') {
      article = await getArticleBySlug(id);
    } else {
      article = await getArticleById(id);
    }

    if (!article) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Article not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch article',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

