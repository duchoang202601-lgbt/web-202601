'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/useAuth';
import SearchBox from '@/components/SearchBox';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin/dashboard';
  const { isLoggedIn, login, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push(redirectUrl);
    }
  }, [isLoggedIn, loading, router, redirectUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = login(username, password);
    if (result.success) {
      setSuccess('Đăng nhập thành công!');
      setTimeout(() => {
        router.push(redirectUrl);
      }, 500);
    } else {
      setError(result.error || 'Đăng nhập thất bại');
    }
  };

  if (loading) {
    return <div className="container p-t-70 p-b-140">Đang tải...</div>;
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="container">
        <div className="headline bg0 flex-wr-sb-c p-rl-20 p-tb-8">
          <div className="f2-s-1 p-r-30 m-tb-6">
            <Link href="/" className="breadcrumb-item f1-s-3 cl9">
              Trang chủ
            </Link>
            <span className="breadcrumb-item f1-s-3 cl9">
              Đăng nhập
            </span>
          </div>

          <SearchBox />
        </div>
      </div>

      {/* Login Form */}
      <section className="bg0 p-b-140 p-t-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 p-b-30">
              <div className="p-r-10 p-r-0-sr991">
                <div className="bg0 p-t-40 p-b-40 p-lr-30 bo-1-rad-22 bocl11">
                  <h3 className="f1-l-3 cl2 p-b-30 text-center">
                    Đăng nhập
                  </h3>
                  
                  {/* Error message */}
                  {error && (
                    <div 
                      className="alert alert-danger p-tb-15 p-lr-20 m-b-20 bo-1-rad-22" 
                      role="alert" 
                      style={{ backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', color: '#721c24' }}
                    >
                      <span>{error}</span>
                    </div>
                  )}
                  
                  {/* Success message */}
                  {success && (
                    <div 
                      className="alert alert-success p-tb-15 p-lr-20 m-b-20 bo-1-rad-22" 
                      role="alert" 
                      style={{ backgroundColor: '#d4edda', border: '1px solid #c3e6cb', color: '#155724' }}
                    >
                      <span>{success}</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="p-t-20" style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                    <div className="p-b-25">
                      <label htmlFor="username" className="f1-s-2 cl2 p-b-10 d-block" style={{ paddingLeft: '5px' }}>
                        Tên đăng nhập
                      </label>
                      <input 
                        type="text" 
                        id="username" 
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="s-full bo-1-rad-22 bocl11 p-tb-10 p-lr-20 f1-s-1 cl6" 
                        placeholder="Nhập tên đăng nhập"
                        required
                        autoFocus
                        style={{ width: '100%', border: '1px solid #e0e0e0', paddingLeft: '5px' }}
                      />
                    </div>
                    
                    <div className="p-b-30">
                      <label htmlFor="password" className="f1-s-2 cl2 p-b-10 d-block" style={{ paddingLeft: '5px' }}>
                        Mật khẩu
                      </label>
                      <input 
                        type="password" 
                        id="password" 
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="s-full bo-1-rad-22 bocl11 p-tb-10 p-lr-20 f1-s-1 cl6" 
                        placeholder="Nhập mật khẩu"
                        required
                        style={{ width: '100%', border: '1px solid #e0e0e0', paddingLeft: '5px' }}
                      />
                    </div>
                    
                    <div className="p-b-20 text-center">
                      <button 
                        type="submit" 
                        className="size-a-2 bg1 bo-rad-23 hov-btn1 trans-03 p-rl-30 f1-s-2 cl0"
                        style={{ cursor: 'pointer', border: 'none' }}
                      >
                        Đăng nhập
                      </button>
                    </div>
                    
                    <div className="p-t-20 bo-1-top bocl11">
                      <p className="f1-s-1 cl6 text-center">
                        Thông tin đăng nhập mặc định:<br />
                        <span className="f1-s-2 cl2"><strong>Tên đăng nhập:</strong> admin</span><br />
                        <span className="f1-s-2 cl2"><strong>Mật khẩu:</strong> admin123</span>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container p-t-70 p-b-140">Đang tải...</div>}>
      <LoginForm />
    </Suspense>
  );
}
