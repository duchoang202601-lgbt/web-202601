'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const router = useRouter();
  const { isLoggedIn, username, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, loading, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="container p-t-70 p-b-140">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <section className="bg0 p-t-30 p-b-140">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 p-b-30">
            <div className="bg3 p-rl-25 p-tb-30" style={{ borderRadius: '5px' }}>
              <h4 className="f1-m-5 cl0 p-b-20">Quản trị</h4>
              <p className="f1-s-1 cl11 p-b-20">
                Xin chào, <strong className="cl0">{username}</strong>
              </p>
              
              <nav>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li className="p-b-10">
                    <Link 
                      href="/admin/dashboard" 
                      className="f1-s-8 cl11 hov-cl10 trans-03"
                      style={{ display: 'block', padding: '10px 0' }}
                    >
                      <i className="fas fa-tachometer-alt m-r-10"></i>
                      Dashboard
                    </Link>
                  </li>
                  <li className="p-b-10">
                    <Link 
                      href="/admin/articles" 
                      className="f1-s-8 cl11 hov-cl10 trans-03"
                      style={{ display: 'block', padding: '10px 0' }}
                    >
                      <i className="fas fa-newspaper m-r-10"></i>
                      Quản lý bài viết
                    </Link>
                  </li>
                  <li className="p-b-10">
                    <Link 
                      href="/admin/menu" 
                      className="f1-s-8 cl11 hov-cl10 trans-03"
                      style={{ display: 'block', padding: '10px 0' }}
                    >
                      <i className="fas fa-bars m-r-10"></i>
                      Quản lý menu
                    </Link>
                  </li>
                  <li className="p-b-10">
                    <Link 
                      href="/admin/templates" 
                      className="f1-s-8 cl11 hov-cl10 trans-03"
                      style={{ display: 'block', padding: '10px 0' }}
                    >
                      <i className="fas fa-palette m-r-10"></i>
                      Quản lý template
                    </Link>
                  </li>
                  <li className="p-t-20 bo-1-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <button 
                      onClick={handleLogout}
                      className="f1-s-8 cl11 hov-cl10 trans-03"
                      style={{ 
                        display: 'block', 
                        padding: '10px 0', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      <i className="fas fa-sign-out-alt m-r-10"></i>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9 p-b-30">
            <div className="bg0 p-rl-30 p-tb-30 bo-1-rad-22 bocl11">
              <h3 className="f1-l-3 cl2 p-b-30">{title}</h3>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

