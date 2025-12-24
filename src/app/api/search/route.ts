import { NextRequest, NextResponse } from 'next/server';
import getNotionArticles from '@/lib/notion';

// Normalize Vietnamese text for better search
function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // Decompose Unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .trim();
}

// Search with multiple strategies
function matchesSearch(title: string, query: string): boolean {
  const titleLower = title.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Strategy 1: Direct match (with Vietnamese diacritics)
  if (titleLower.includes(queryLower)) {
    return true;
  }
  
  // Strategy 2: Normalized match (without diacritics)
  const titleNormalized = normalizeVietnamese(title);
  const queryNormalized = normalizeVietnamese(query);
  if (titleNormalized.includes(queryNormalized)) {
    return true;
  }
  
  // Strategy 3: Match each word in query
  const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);
  if (queryWords.length > 1) {
    const allWordsMatch = queryWords.every(word => 
      titleLower.includes(word) || normalizeVietnamese(title).includes(normalizeVietnamese(word))
    );
    if (allWordsMatch) {
      return true;
    }
  }
  
  return false;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    
    if (!query.trim()) {
      return NextResponse.json([]);
    }

    // Get all articles (limit to 100 for performance)
    const { items: allArticles } = await getNotionArticles({ limit: 100 });
    
    // Filter articles by title using multiple search strategies
    const filteredArticles = allArticles.filter(article => 
      matchesSearch(article.title, query.trim())
    );

    return NextResponse.json(filteredArticles);
  } catch {
    return NextResponse.json([]);
  }
}

