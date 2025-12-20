'use client';

import AdminLayout from '@/components/AdminLayout';

export default function DashboardPage() {
  return (
    <AdminLayout title="Dashboard">
      <div className="row">
        {/* Stats Cards */}
        <div className="col-md-6 col-lg-3 p-b-20">
          <div className="bg10 p-rl-25 p-tb-20" style={{ borderRadius: '10px' }}>
            <div className="flex-wr-sb-c">
              <div>
                <p className="f1-s-3 cl0">Tổng bài viết</p>
                <h4 className="f1-l-5 cl0">156</h4>
              </div>
              <div className="fs-40 cl0">
                <i className="fas fa-newspaper"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 p-b-20">
          <div className="bg-facebook p-rl-25 p-tb-20" style={{ borderRadius: '10px' }}>
            <div className="flex-wr-sb-c">
              <div>
                <p className="f1-s-3 cl0">Lượt xem</p>
                <h4 className="f1-l-5 cl0">45.2K</h4>
              </div>
              <div className="fs-40 cl0">
                <i className="fas fa-eye"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 p-b-20">
          <div className="bg-twitter p-rl-25 p-tb-20" style={{ borderRadius: '10px' }}>
            <div className="flex-wr-sb-c">
              <div>
                <p className="f1-s-3 cl0">Danh mục</p>
                <h4 className="f1-l-5 cl0">12</h4>
              </div>
              <div className="fs-40 cl0">
                <i className="fas fa-folder"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 p-b-20">
          <div className="bg-youtube p-rl-25 p-tb-20" style={{ borderRadius: '10px' }}>
            <div className="flex-wr-sb-c">
              <div>
                <p className="f1-s-3 cl0">Bình luận</p>
                <h4 className="f1-l-5 cl0">89</h4>
              </div>
              <div className="fs-40 cl0">
                <i className="fas fa-comments"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="p-t-30">
        <h4 className="f1-m-5 cl2 p-b-20">Bài viết gần đây</h4>
        <div className="table-responsive">
          <table className="table" style={{ width: '100%' }}>
            <thead>
              <tr className="bg3">
                <th className="f1-s-6 cl0 p-tb-15 p-lr-20">#</th>
                <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Tiêu đề</th>
                <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Danh mục</th>
                <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Ngày tạo</th>
                <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, title: 'Vĩnh biệt TTND. GS.TS.BS Hoàng Bảo Châu', category: 'Y học cổ truyền', date: '27/11/2025' },
                { id: 2, title: 'Bảo tồn và phát huy giá trị văn hóa...', category: 'Văn hóa', date: '25/11/2025' },
                { id: 3, title: 'Chăm sóc sức khỏe cộng đồng', category: 'Sức khỏe', date: '24/11/2025' },
                { id: 4, title: 'Năm 2025, xúc tiến thương mại...', category: 'Kinh tế', date: '23/11/2025' },
                { id: 5, title: 'Khai mạc Hội nghị lần thứ 10...', category: 'Chính trị', date: '22/11/2025' },
              ].map((article) => (
                <tr key={article.id} className="bo-1-bottom bocl11">
                  <td className="f1-s-1 cl6 p-tb-15 p-lr-20">{article.id}</td>
                  <td className="f1-s-1 cl2 p-tb-15 p-lr-20">{article.title}</td>
                  <td className="f1-s-1 cl6 p-tb-15 p-lr-20">{article.category}</td>
                  <td className="f1-s-1 cl6 p-tb-15 p-lr-20">{article.date}</td>
                  <td className="p-tb-15 p-lr-20">
                    <a href="#" className="f1-s-3 cl10 hov-cl2 trans-03 m-r-10">
                      <i className="fas fa-edit"></i> Sửa
                    </a>
                    <a href="#" className="f1-s-3 cl12 hov-cl2 trans-03">
                      <i className="fas fa-trash"></i> Xóa
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

