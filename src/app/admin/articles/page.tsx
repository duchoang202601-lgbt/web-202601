'use client';

import AdminLayout from '@/components/AdminLayout';

export default function AdminArticlesPage() {
  return (
    <AdminLayout title="Quản lý bài viết">
      {/* Action buttons */}
      <div className="flex-wr-sb-c p-b-30">
        <div className="pos-relative size-a-2 bo-1-rad-22 of-hidden bocl11">
          <input className="f1-s-1 cl6 plh9 s-full p-l-25 p-r-45" type="text" name="search" placeholder="Tìm kiếm bài viết..." />
          <button className="flex-c-c size-a-1 ab-t-r fs-20 cl2 hov-cl10 trans-03">
            <i className="zmdi zmdi-search"></i>
          </button>
        </div>
        <button className="size-a-2 bg10 bo-rad-23 hov-btn1 trans-03 p-rl-30 f1-s-2 cl0" style={{ border: 'none', cursor: 'pointer' }}>
          <i className="fas fa-plus m-r-10"></i>
          Thêm bài viết
        </button>
      </div>

      {/* Articles Table */}
      <div className="table-responsive">
        <table className="table" style={{ width: '100%' }}>
          <thead>
            <tr className="bg3">
              <th className="f1-s-6 cl0 p-tb-15 p-lr-20">
                <input type="checkbox" />
              </th>
              <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Hình ảnh</th>
              <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Tiêu đề</th>
              <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Danh mục</th>
              <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Trạng thái</th>
              <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Lượt xem</th>
              <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Ngày tạo</th>
              <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, image: '/images/post-01.jpg', title: 'Vĩnh biệt TTND. GS.TS.BS Hoàng Bảo Châu - Cây đại thụ ngành Đông y Việt Nam', category: 'Y học cổ truyền', status: 'Đã xuất bản', views: '702.976', date: '27/11/2025' },
              { id: 2, image: '/images/post-02.jpg', title: 'Ấm lòng với 1000 phần quà hỗ trợ trao tặng cho bà con vùng lũ Thái Nguyên', category: 'Tư vấn', status: 'Đã xuất bản', views: '45.231', date: '25/11/2025' },
              { id: 3, image: '/images/post-03.jpg', title: 'Doanh nhân thời kỳ mới: Tự hào - Yêu nước - Trí tuệ', category: 'Doanh nghiệp', status: 'Nháp', views: '12.456', date: '24/11/2025' },
              { id: 4, image: '/images/post-04.jpg', title: 'Bảo tồn và phát huy giá trị văn hóa, bản sắc của nền y học cổ truyền', category: 'Sống khỏe', status: 'Đã xuất bản', views: '89.234', date: '23/11/2025' },
              { id: 5, image: '/images/post-05.jpg', title: 'Khai mạc trọng thể Hội nghị lần thứ 10 Ban Chấp hành Trung ương Đảng', category: 'Chính trị', status: 'Đã xuất bản', views: '156.789', date: '22/11/2025' },
            ].map((article) => (
              <tr key={article.id} className="bo-1-bottom bocl11">
                <td className="p-tb-15 p-lr-20">
                  <input type="checkbox" />
                </td>
                <td className="p-tb-15 p-lr-20">
                  <img src={article.image} alt="IMG" style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                </td>
                <td className="f1-s-1 cl2 p-tb-15 p-lr-20" style={{ maxWidth: '250px' }}>
                  <span className="how-txt2">{article.title}</span>
                </td>
                <td className="f1-s-1 cl6 p-tb-15 p-lr-20">{article.category}</td>
                <td className="p-tb-15 p-lr-20">
                  <span 
                    className={`f1-s-3 p-tb-5 p-rl-15 borad-3 ${article.status === 'Đã xuất bản' ? 'bg10 cl0' : 'bg8 cl0'}`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="f1-s-1 cl6 p-tb-15 p-lr-20">{article.views}</td>
                <td className="f1-s-1 cl6 p-tb-15 p-lr-20">{article.date}</td>
                <td className="p-tb-15 p-lr-20">
                  <a href="#" className="f1-s-3 cl10 hov-cl2 trans-03 m-r-10" title="Sửa">
                    <i className="fas fa-edit"></i>
                  </a>
                  <a href="#" className="f1-s-3 cl17 hov-cl2 trans-03 m-r-10" title="Xem">
                    <i className="fas fa-eye"></i>
                  </a>
                  <a href="#" className="f1-s-3 cl12 hov-cl2 trans-03" title="Xóa">
                    <i className="fas fa-trash"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex-wr-c-c p-t-30">
        <a href="#" className="pagi-item flex-c-c m-all-5 trans-03">
          <i className="fas fa-chevron-left"></i>
        </a>
        <a href="#" className="pagi-item pagi-active flex-c-c m-all-5 trans-03">1</a>
        <a href="#" className="pagi-item flex-c-c m-all-5 trans-03">2</a>
        <a href="#" className="pagi-item flex-c-c m-all-5 trans-03">3</a>
        <span className="pagi-item flex-c-c m-all-5">...</span>
        <a href="#" className="pagi-item flex-c-c m-all-5 trans-03">10</a>
        <a href="#" className="pagi-item flex-c-c m-all-5 trans-03">
          <i className="fas fa-chevron-right"></i>
        </a>
      </div>
    </AdminLayout>
  );
}

