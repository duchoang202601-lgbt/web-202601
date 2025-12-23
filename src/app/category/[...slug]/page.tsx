import Link from 'next/link'
import getNotionArticles from '@/lib/notion'
import { getCategoryName } from '@/lib/categoryUtils'
import ArticleSidebar from '@/components/ArticleSidebar'

// Revalidate mỗi 60 giây
export const revalidate = 60

// Generate metadata động
export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  const category = params.slug?.[0] || ''
  const subCategory = params.slug?.[1] || ''
  
  const categoryName = getCategoryName(category)
  const subCategoryName = subCategory ? getCategoryName(subCategory) : ''
  
  const title = subCategoryName 
    ? `${subCategoryName} - ${categoryName}` 
    : categoryName
  
  return {
    title: `${title} - Viện văn hóa và chăm sóc sức khỏe cộng đồng`,
    description: `Danh sách bài viết trong chuyên mục ${title}`,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string[] } }) {
  // Parse slug: /category/[category] hoặc /category/[category]/[subCategory]
  const category = params.slug?.[0] || ''
  const subCategory = params.slug?.[1] || ''
  
  // Lấy tên tiếng Việt
  const categoryName = getCategoryName(category)
  const subCategoryName = subCategory ? getCategoryName(subCategory) : ''
  
  // Fetch articles từ Notion
  const { items: articles } = await getNotionArticles({
    category: category || undefined,
    subCategory: subCategory || undefined,
    limit: 10,
  })
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
    })
  }

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
            <Link 
              href={`/category/${category}`}
              className="hov-cl10 trans-03"
              style={{ color: '#999' }}
            >
              {categoryName}
            </Link>
            {subCategory && subCategoryName && (
              <>
                <span style={{ color: '#ccc', margin: '0 12px' }}>&gt;</span>
                <span style={{ color: '#999' }}>
                  {subCategoryName}
                </span>
              </>
            )}
          </div>

          {/* Phần Tìm kiếm */}
          <div className="pos-relative size-a-2 bo-1-rad-22 of-hidden bocl11 m-tb-6 search-section">
            <input className="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" type="text" name="search" placeholder="Tìm kiếm" />
            <button className="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03">
              <i className="zmdi zmdi-search"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Category Content */}
      <section className="bg0 p-b-55">
        <div className="container">
          <div className="row justify-content-center">
            {/* Main content */}
            <div className="col-md-10 col-lg-8 p-b-30">
              <div className="p-r-10 p-r-0-sr991">
                {/* Category title */}
                <div className="p-b-30 bo-b-1 bocl11 m-b-30">
                  <div className="how2 how2-cl2 flex-s-c">
                    <h3 className="f1-m-2 cl3 tab01-title">
                      {subCategoryName || categoryName}
                    </h3>
                  </div>
                  <div className="p-t-15">
                    <span className="f1-s-3 cl6">Chuyên mục: </span>
                    <Link href={`/category/${category}`} className="f1-s-3 cl10 hov-cl10">
                      {categoryName}
                    </Link>
                    <span className="f1-s-3 cl6 m-l-20">Số bài viết: </span>
                    <span className="f1-s-3 cl3">{articles.length}</span>
                  </div>
                </div>

                {articles.length === 0 ? (
                  <div className="p-tb-50 text-center">
                    <p className="f1-s-1 cl6">Chưa có bài viết nào trong chuyên mục này.</p>
                  </div>
                ) : (
                  <>
                    {/* Article list - Tất cả bài viết hiển thị giống nhau */}
                    {articles.map((article) => (
                      <div key={article.id} className="flex-wr-sb-s p-b-30 m-b-30 bo-b-1 bocl11">
                        <Link href={`/articles/${article.slug}`} className="size-w-8 wrap-pic-w hov1 trans-03">
                          <img 
                            src={article.cover || '/images/post-39.jpg'} 
                            alt={article.title}
                            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                          />
                        </Link>
                        <div className="size-w-9 p-l-25 p-l-0-sr991 p-t-10-sr991">
                          <h5 className="p-b-10">
                            <Link href={`/articles/${article.slug}`} className="f1-m-3 cl2 hov-cl10 trans-03">
                              {article.title}
                            </Link>
                          </h5>
                          <span className="cl8">
                            <span className="f1-s-3">{formatDate(article.createdAt)}</span>
                            {article.subCategory && (
                              <>
                                <span className="f1-s-3 m-rl-3">-</span>
                                <Link 
                                  href={`/category/${article.category}/${article.subCategory}`}
                                  className="f1-s-3 cl10 hov-cl10"
                                >
                                  {getCategoryName(article.subCategory)}
                                </Link>
                              </>
                            )}
                          </span>
                          {article.summary && (
                            <p className="f1-s-1 cl6 p-t-10 how-txt4">
                              {article.summary}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Pagination */}
                    <div className="flex-wr-c-c p-t-15">
                      <a 
                        href="#" 
                        className="flex-c-c pagi-item hov-btn1 trans-03 m-all-5"
                        style={{
                          width: '36px',
                          height: '36px',
                          border: '1px solid #17b978',
                          borderRadius: '3px',
                          color: '#17b978'
                        }}
                      >
                        <i className="fa fa-angle-left"></i>
                      </a>
                      <a 
                        href="#" 
                        className="flex-c-c pagi-item trans-03 m-all-5"
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: '#17b978',
                          borderRadius: '3px',
                          color: '#fff'
                        }}
                      >
                        1
                      </a>
                      <a 
                        href="#" 
                        className="flex-c-c pagi-item hov-btn1 trans-03 m-all-5"
                        style={{
                          width: '36px',
                          height: '36px',
                          border: '1px solid #ddd',
                          borderRadius: '3px',
                          color: '#666'
                        }}
                      >
                        2
                      </a>
                      <a 
                        href="#" 
                        className="flex-c-c pagi-item hov-btn1 trans-03 m-all-5"
                        style={{
                          width: '36px',
                          height: '36px',
                          border: '1px solid #ddd',
                          borderRadius: '3px',
                          color: '#666'
                        }}
                      >
                        3
                      </a>
                      <a 
                        href="#" 
                        className="flex-c-c pagi-item hov-btn1 trans-03 m-all-5"
                        style={{
                          width: '36px',
                          height: '36px',
                          border: '1px solid #17b978',
                          borderRadius: '3px',
                          color: '#17b978'
                        }}
                      >
                        <i className="fa fa-angle-right"></i>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-10 col-lg-4 p-b-30">
              {/* Article Sidebar - Popular, Subscribe, Documents */}
              <ArticleSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
