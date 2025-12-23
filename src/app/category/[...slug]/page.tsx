import Link from 'next/link'
import getNotionArticles from '@/lib/notion'
import { getCategoryName } from '@/lib/categoryUtils'

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

  // Bài viết đầu tiên là featured
  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <>
      {/* Breadcrumb */}
      <div className="container search-container">
        <div className="headline bg0 flex-wr-sb-c p-rl-20 p-tb-8">
          <div className="f2-s-1 p-r-30 m-tb-6">
            <Link href="/" className="breadcrumb-item f1-s-3 cl9">
              Trang chủ
            </Link>
            <span className="breadcrumb-item f1-s-3 cl9">
              {categoryName}
            </span>
            {subCategoryName && (
              <span className="breadcrumb-item f1-s-3 cl9">
                {subCategoryName}
              </span>
            )}
          </div>

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
                <div className="how1 how1-cl2 flex-s-c m-b-30">
                  <h3 className="f1-m-2 cl2 tab01-title">
                    {subCategoryName || categoryName}
                  </h3>
                </div>

                {articles.length === 0 ? (
                  <div className="p-tb-50 text-center">
                    <p className="f1-s-1 cl6">Chưa có bài viết nào trong chuyên mục này.</p>
                  </div>
                ) : (
                  <>
                    {/* Featured article */}
                    {featuredArticle && (
                      <div className="row m-b-30">
                        <div className="col-12">
                          <div className="wrap-pic-w hov1 trans-03 m-b-15">
                            <Link href={`/articles/${featuredArticle.slug}`}>
                              <img 
                                src={featuredArticle.cover || '/images/post-38.jpg'} 
                                alt={featuredArticle.title}
                                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                              />
                            </Link>
                          </div>
                          <h3 className="p-b-10">
                            <Link href={`/articles/${featuredArticle.slug}`} className="f1-l-1 cl2 hov-cl10 trans-03">
                              {featuredArticle.title}
                            </Link>
                          </h3>
                          <span className="cl8">
                            <span className="f1-s-3">{formatDate(featuredArticle.createdAt)}</span>
                          </span>
                          {featuredArticle.summary && (
                            <p className="f1-s-1 cl6 p-t-15">
                              {featuredArticle.summary}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Article list */}
                    {otherArticles.map((article) => (
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
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-10 col-lg-4 p-b-30">
              <div className="p-l-10 p-rl-0-sr991 p-b-20">
                {/* Category Info */}
                <div className="p-b-30">
                  <div className="how1 how1-cl6 flex-s-c m-b-25">
                    <h3 className="f1-m-2 cl6 tab01-title">
                      Thông tin
                    </h3>
                  </div>
                  <ul className="p-t-10">
                    <li className="p-b-10">
                      <span className="f1-s-3 cl6">Chuyên mục: </span>
                      <Link href={`/category/${category}`} className="f1-s-3 cl10 hov-cl10">
                        {categoryName}
                      </Link>
                    </li>
                    {subCategoryName && (
                      <li className="p-b-10">
                        <span className="f1-s-3 cl6">Danh mục: </span>
                        <span className="f1-s-3 cl3">{subCategoryName}</span>
                      </li>
                    )}
                    <li className="p-b-10">
                      <span className="f1-s-3 cl6">Số bài viết: </span>
                      <span className="f1-s-3 cl3">{articles.length}</span>
                    </li>
                  </ul>
                </div>

                {/* Banner */}
                <div className="flex-c-s p-b-30">
                  <a href="#">
                    <img className="max-w-full" src="/images/banner-02.png" alt="IMG" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
