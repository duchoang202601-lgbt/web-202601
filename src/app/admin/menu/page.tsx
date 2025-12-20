'use client';

import AdminLayout from '@/components/AdminLayout';

export default function AdminMenuPage() {
  return (
    <AdminLayout title="Quản lý menu">
      <div className="row">
        {/* Menu List */}
        <div className="col-md-8 p-b-30">
          <h4 className="f1-m-5 cl2 p-b-20">Danh sách menu</h4>
          
          <div className="table-responsive">
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr className="bg3">
                  <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Thứ tự</th>
                  <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Tên menu</th>
                  <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Link</th>
                  <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Menu cha</th>
                  <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Trạng thái</th>
                  <th className="f1-s-6 cl0 p-tb-15 p-lr-20">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, order: 1, name: 'Tin tức', link: '/', parent: '-', status: 'Hiển thị' },
                  { id: 2, order: 2, name: 'Chính trị', link: '/category/chinh-tri', parent: 'Tin tức', status: 'Hiển thị' },
                  { id: 3, order: 3, name: 'Kinh tế', link: '/category/kinh-te', parent: 'Tin tức', status: 'Hiển thị' },
                  { id: 4, order: 4, name: 'Sức khỏe cộng đồng', link: '#', parent: '-', status: 'Hiển thị' },
                  { id: 5, order: 5, name: 'Tư vấn', link: '/category/tu-van', parent: 'Sức khỏe cộng đồng', status: 'Hiển thị' },
                  { id: 6, order: 6, name: 'Sống khỏe', link: '/category/song-khoe', parent: 'Sức khỏe cộng đồng', status: 'Hiển thị' },
                  { id: 7, order: 7, name: 'Văn hóa', link: '/category', parent: '-', status: 'Hiển thị' },
                  { id: 8, order: 8, name: 'Y học cổ truyền', link: '#', parent: '-', status: 'Hiển thị' },
                ].map((menu) => (
                  <tr key={menu.id} className="bo-1-bottom bocl11">
                    <td className="f1-s-1 cl6 p-tb-15 p-lr-20 text-center">{menu.order}</td>
                    <td className="f1-s-1 cl2 p-tb-15 p-lr-20">{menu.name}</td>
                    <td className="f1-s-1 cl6 p-tb-15 p-lr-20">{menu.link}</td>
                    <td className="f1-s-1 cl6 p-tb-15 p-lr-20">{menu.parent}</td>
                    <td className="p-tb-15 p-lr-20">
                      <span className="f1-s-3 bg10 cl0 p-tb-5 p-rl-15 borad-3">
                        {menu.status}
                      </span>
                    </td>
                    <td className="p-tb-15 p-lr-20">
                      <a href="#" className="f1-s-3 cl10 hov-cl2 trans-03 m-r-10">
                        <i className="fas fa-edit"></i>
                      </a>
                      <a href="#" className="f1-s-3 cl12 hov-cl2 trans-03">
                        <i className="fas fa-trash"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Menu Form */}
        <div className="col-md-4 p-b-30">
          <div className="bg3 p-rl-25 p-tb-30" style={{ borderRadius: '10px' }}>
            <h4 className="f1-m-5 cl0 p-b-20">Thêm menu mới</h4>
            
            <form>
              <div className="p-b-20">
                <label className="f1-s-2 cl0 p-b-10 d-block">Tên menu</label>
                <input 
                  type="text" 
                  className="s-full bo-1-rad-3 bocl11 p-tb-10 p-lr-15 f1-s-1 cl6"
                  placeholder="Nhập tên menu"
                  style={{ width: '100%', border: '1px solid #555' }}
                />
              </div>

              <div className="p-b-20">
                <label className="f1-s-2 cl0 p-b-10 d-block">Link</label>
                <input 
                  type="text" 
                  className="s-full bo-1-rad-3 bocl11 p-tb-10 p-lr-15 f1-s-1 cl6"
                  placeholder="Nhập link"
                  style={{ width: '100%', border: '1px solid #555' }}
                />
              </div>

              <div className="p-b-20">
                <label className="f1-s-2 cl0 p-b-10 d-block">Menu cha</label>
                <select 
                  className="s-full bo-1-rad-3 bocl11 p-tb-10 p-lr-15 f1-s-1 cl6"
                  style={{ width: '100%', border: '1px solid #555' }}
                >
                  <option value="">-- Không có --</option>
                  <option value="1">Tin tức</option>
                  <option value="2">Sức khỏe cộng đồng</option>
                  <option value="3">Văn hóa</option>
                  <option value="4">Y học cổ truyền</option>
                </select>
              </div>

              <div className="p-b-20">
                <label className="f1-s-2 cl0 p-b-10 d-block">Thứ tự</label>
                <input 
                  type="number" 
                  className="s-full bo-1-rad-3 bocl11 p-tb-10 p-lr-15 f1-s-1 cl6"
                  placeholder="Nhập thứ tự"
                  style={{ width: '100%', border: '1px solid #555' }}
                />
              </div>

              <button 
                type="submit"
                className="s-full bg10 bo-rad-3 hov-btn1 trans-03 p-tb-12 f1-s-2 cl0"
                style={{ border: 'none', cursor: 'pointer', width: '100%' }}
              >
                <i className="fas fa-plus m-r-10"></i>
                Thêm menu
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

