import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import '../styles/LoginPage.css';

/**
 * 로그인 페이지 Props
 */
interface LoginPageProps {
  onLogin: (username: string) => void;  // 로그인 성공 핸들러
  onSignupClick: () => void;            // 회원가입 페이지로 이동
}

/**
 * 로그인 페이지 컴포넌트
 * 이메일/비밀번호 입력, 아이디 저장 포함
 */
export function LoginPage({ onLogin, onSignupClick }: LoginPageProps) {
  // ========================================
  // State 관리
  // ========================================
  
  const [email, setEmail] = useState('');           // 이메일
  const [password, setPassword] = useState('');     // 비밀번호
  const [rememberMe, setRememberMe] = useState(false); // 아이디 저장

  /**
   * 로그인 버튼 클릭 핸들러
   */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 간단한 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    // 로그인 성공 (실제로는 서버 API 호출)
    onLogin(email);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* ========================================
            로고 섹션
            ======================================== */}
        <div className="login-logo">
          <div className="login-logo-icon">
            <BookOpen size={32} />
          </div>
          <h1>룰룩</h1>
          <p>Rule-Look</p>
        </div>

        {/* ========================================
            로그인 폼
            ======================================== */}
        <form className="login-form" onSubmit={handleLogin}>
          
          {/* 이메일 입력 */}
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">이메일</label>
            <input
              id="email"
              type="email"
              className="login-input"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="login-form-group">
            <label htmlFor="password" className="login-label">비밀번호</label>
            <input
              id="password"
              type="password"
              className="login-input"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 아이디 저장 */}
          <div className="login-options">
            <div className="login-checkbox-wrapper">
              <input
                type="checkbox"
                id="remember"
                className="login-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="login-checkbox-label">
                아이디 저장
              </label>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        {/* ========================================
            회원가입 링크
            ======================================== */}
        <div className="login-footer">
          아직 계정이 없으신가요?{' '}
          <span className="login-footer-link" onClick={onSignupClick}>
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}
