'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Article, Category, MenuItem } from './notion';

// ============================================
// Types
// ============================================

interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data?: T;
  error?: string;
  message?: string;
}

interface UseQueryOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// ============================================
// Generic Fetch Hook
// ============================================

function useQuery<T>(
  url: string,
  options: UseQueryOptions = {}
): UseQueryResult<T> {
  const { enabled = true, refetchOnMount = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      const result: ApiResponse<T> = await response.json();

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url, enabled]);

  useEffect(() => {
    if (refetchOnMount) {
      fetchData();
    }
  }, [fetchData, refetchOnMount]);

  return { data, loading, error, refetch: fetchData };
}

// ============================================
// Article Hooks
// ============================================

/**
 * Hook lấy danh sách bài viết
 */
export function useArticles(options?: {
  status?: 'published' | 'draft' | 'all';
  category?: string;
  featured?: boolean;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (options?.status) params.set('status', options.status);
  if (options?.category) params.set('category', options.category);
  if (options?.featured !== undefined) params.set('featured', String(options.featured));
  if (options?.limit) params.set('limit', String(options.limit));

  const queryString = params.toString();
  const url = `/api/articles${queryString ? `?${queryString}` : ''}`;

  return useQuery<Article[]>(url);
}

/**
 * Hook lấy bài viết nổi bật
 */
export function useFeaturedArticles(limit: number = 4) {
  return useQuery<Article[]>(`/api/articles?type=featured&limit=${limit}`);
}

/**
 * Hook lấy bài viết mới nhất
 */
export function useLatestArticles(limit: number = 6) {
  return useQuery<Article[]>(`/api/articles?type=latest&limit=${limit}`);
}

/**
 * Hook lấy bài viết theo danh mục
 */
export function useArticlesByCategory(category: string, limit?: number) {
  const params = new URLSearchParams({ type: 'category', category });
  if (limit) params.set('limit', String(limit));
  
  return useQuery<Article[]>(`/api/articles?${params.toString()}`, {
    enabled: !!category,
  });
}

/**
 * Hook lấy bài viết theo ID
 */
export function useArticle(id: string) {
  return useQuery<Article>(`/api/articles/${id}`, {
    enabled: !!id,
  });
}

/**
 * Hook lấy bài viết theo slug
 */
export function useArticleBySlug(slug: string) {
  return useQuery<Article>(`/api/articles/${slug}?type=slug`, {
    enabled: !!slug,
  });
}

// ============================================
// Category Hooks
// ============================================

/**
 * Hook lấy tất cả danh mục
 */
export function useCategories() {
  return useQuery<Category[]>('/api/categories');
}

// ============================================
// Menu Hooks
// ============================================

type MenuItemWithChildren = MenuItem & { children: MenuItemWithChildren[] };

/**
 * Hook lấy menu (dạng tree)
 */
export function useMenu() {
  return useQuery<MenuItemWithChildren[]>('/api/menu?tree=true');
}

/**
 * Hook lấy menu (dạng flat)
 */
export function useMenuFlat() {
  return useQuery<MenuItem[]>('/api/menu?tree=false');
}

// ============================================
// Utility Functions
// ============================================

/**
 * Fetch articles từ client (không dùng hook)
 */
export async function fetchArticles(options?: {
  status?: 'published' | 'draft' | 'all';
  category?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Article[]> {
  const params = new URLSearchParams();
  if (options?.status) params.set('status', options.status);
  if (options?.category) params.set('category', options.category);
  if (options?.featured !== undefined) params.set('featured', String(options.featured));
  if (options?.limit) params.set('limit', String(options.limit));

  const queryString = params.toString();
  const url = `/api/articles${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(url);
  const result: ApiResponse<Article[]> = await response.json();

  if (result.success && result.data) {
    return result.data;
  }

  throw new Error(result.error || 'Failed to fetch articles');
}

/**
 * Fetch single article từ client
 */
export async function fetchArticle(idOrSlug: string, type: 'id' | 'slug' = 'id'): Promise<Article | null> {
  const url = type === 'slug' 
    ? `/api/articles/${idOrSlug}?type=slug`
    : `/api/articles/${idOrSlug}`;

  const response = await fetch(url);
  const result: ApiResponse<Article> = await response.json();

  if (result.success && result.data) {
    return result.data;
  }

  if (response.status === 404) {
    return null;
  }

  throw new Error(result.error || 'Failed to fetch article');
}

/**
 * Fetch categories từ client
 */
export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories');
  const result: ApiResponse<Category[]> = await response.json();

  if (result.success && result.data) {
    return result.data;
  }

  throw new Error(result.error || 'Failed to fetch categories');
}

/**
 * Fetch menu từ client
 */
export async function fetchMenu(asTree: boolean = true): Promise<MenuItem[] | MenuItemWithChildren[]> {
  const url = `/api/menu?tree=${asTree}`;
  const response = await fetch(url);
  const result: ApiResponse<MenuItem[] | MenuItemWithChildren[]> = await response.json();

  if (result.success && result.data) {
    return result.data;
  }

  throw new Error(result.error || 'Failed to fetch menu');
}

