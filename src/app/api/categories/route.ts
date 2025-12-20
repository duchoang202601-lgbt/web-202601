import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/notion';

/**
 * GET /api/categories
 * 
 * Lấy tất cả danh mục
 */
export async function GET() {
  try {
    const categories = await getAllCategories();

    return NextResponse.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch categories',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

