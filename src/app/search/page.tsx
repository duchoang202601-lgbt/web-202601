'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ArticleSidebar from '@/components/ArticleSidebar';
import SearchBox from '@/components/SearchBox';
import { getDisplayCategory, getCategoryUrl } from '@/lib/categoryUtils';

type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  cover: string;
  category: string;
  subCategory: string;
  createdAt: string;
};

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Nếu có từ khóa thì tìm kiếm, không thì lấy tất cả bài viết
    const url = query 
      ? `/api/search?q=${encodeURIComponent(query)}`
      : '/api/news-articles?limit=50';
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [query]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: 'long' });
  };

  return (
    <>
      {/* Breadcrumb + Search */}
      <div className="container search-container">
        <div className="bg0 flex-wr-sb-c p-rl-20 p-tb-8">
          {/* Breadcrumb */}
          <div className="f2-s-1 p-r-30 m-tb-6 flex-wr-s-c" style={{ fontSize: '13px' }}>
            <Link 
              href="/" 
              className="hov-cl10 trans-03"
              style={{ color: '#999' }}
            >
              Trang chủ
            </Link>
            <span style={{ color: '#ccc', margin: '0 12px' }}>&gt;</span>
            <span style={{ color: '#999' }}>
              {query ? 'Tìm kiếm' : 'Tất cả bài viết'}
            </span>
          </div>

          {/* Phần Tìm kiếm */}
          <SearchBox />
        </div>
      </div>

      {/* Search Results */}
      <section className="bg0 p-b-55">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8 p-b-30">
              <div className="p-r-10 p-r-0-sr991">
                {/* Search Header */}
                <div className="how2 how2-cl2 flex-s-c m-b-30">
                  <h3 className="f1-m-2 cl3 tab01-title">
                    {query ? 'Kết quả tìm kiếm' : 'Tất cả bài viết'}
                  </h3>
                </div>

                {/* Search Info */}
                <div className="flex-wr-sb-c m-b-30 p-rl-15">
                  <div className="f1-s-1 cl8">
                    {query ? (
                      <>
                        Từ khóa: <span className="cl2 f1-m-1">&quot;{query}&quot;</span>
                        {!isLoading && (
                          <span className="m-l-15">Tìm thấy: <span className="cl2">{articles.length}</span> bài viết</span>
                        )}
                      </>
                    ) : (
                      !isLoading && (
                        <>Tổng số: <span className="cl2">{articles.length}</span> bài viết</>
                      )
                    )}
                  </div>
                </div>

                {/* Articles List */}
                {isLoading ? (
                  <div className="p-tb-50 text-center">
                    <p className="f1-s-1 cl6">Đang tìm kiếm...</p>
                  </div>
                ) : articles.length > 0 ? (
                  articles.map((article) => (
                    <div key={article.id} className="flex-wr-sb-s bo-b-1 bocl11 p-b-20 m-b-20">
                      <Link 
                        href={`/articles/${article.slug}`}
                        className="size-w-8 wrap-pic-w hov1 trans-03 m-r-20 m-b-10"
                      >
                        <img 
                          src={article.cover || '/images/default-article.jpg'} 
                          alt={article.title}
                          style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                      </Link>

                      <div className="size-w-9">
                        <h5 className="p-b-10">
                          <Link 
                            href={`/articles/${article.slug}`}
                            className="f1-m-1 cl2 hov-cl10 trans-03"
                          >
                            {article.title}
                          </Link>
                        </h5>

                        <span className="f1-s-3 cl8">
                          {formatDate(article.createdAt)}
                          {(article.category || article.subCategory) && (
                            <>
                              <span className="m-rl-5">|</span>
                              <Link 
                                href={getCategoryUrl(article.category, article.subCategory)}
                                className="cl10 hov-cl10"
                              >
                                {getDisplayCategory(article.category, article.subCategory)}
                              </Link>
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-tb-50 text-center">
                    <p className="f1-s-1 cl6">
                      {query 
                        ? `Không tìm thấy bài viết nào với từ khóa "${query}"`
                        : 'Chưa có bài viết nào.'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-10 col-lg-4 p-b-30">
              <ArticleSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container p-t-70 p-b-140 text-center">
        <p className="f1-s-1 cl6">Đang tải...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
