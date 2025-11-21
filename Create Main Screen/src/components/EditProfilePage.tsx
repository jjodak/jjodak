import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import '../styles/EditProfilePage.css';

/**
 * 프로필 수정 페이지 Props
 */
interface EditProfilePageProps {
  user: string;                           // 현재 사용자 이메일
  onBack: () => void;                     // 뒤로가기 핸들러
  onSave: (name: string, email: string) => void; // 저장 핸들러
}

/**
 * 프로필 수정 페이지 컴포넌트
 * 이름, 이메일 수정 기능 포함
 */
export function EditProfilePage({ user, onBack, onSave }: EditProfilePageProps) {
  
  // 이메일에서 이름 추출
  const userName = user.split('@')[0];
  const avatarLetter = userName.charAt(0).toUpperCase();
  
  // State 관리
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(user);

  /**
   * 저장 버튼 클릭 핸들러
   */
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!name || !email) {
      alert('이름과 이메일을 입력해주세요.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    // 저장
    onSave(name, email);
  };

  return (
    <main className="edit-profile-page">
      
      {/* ========================================
          뒤로가기 버튼
          ======================================== */}
      <button className="edit-profile-back" onClick={onBack}>
        <ArrowLeft size={20} />
        뒤로가기
      </button>

      {/* ========================================
          페이지 헤더
          ======================================== */}
      <div className="edit-profile-header">
        <h2>프로필 수정</h2>
        <p>사용자 정보를 수정하세요</p>
      </div>

      {/* ========================================
          아바타 섹션
          ======================================== */}
      <div className="edit-profile-avatar-section">
        <div className="edit-profile-avatar">
          {avatarLetter}
        </div>
        <button className="edit-profile-avatar-button" onClick={() => alert('프로필 사진 변경 기능은 준비 중입니다.')}>
          프로필 사진 변경
        </button>
      </div>

      {/* ========================================
          수정 폼
          ======================================== */}
      <form className="edit-profile-form" onSubmit={handleSave}>
        
        {/* 이름 */}
        <div className="edit-profile-form-group">
          <label htmlFor="name" className="edit-profile-label">이름</label>
          <input
            id="name"
            type="text"
            className="edit-profile-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>

        {/* 이메일 */}
        <div className="edit-profile-form-group">
          <label htmlFor="email" className="edit-profile-label">이메일</label>
          <input
            id="email"
            type="email"
            className="edit-profile-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
          <span className="edit-profile-hint">
            이메일 변경 시 재로그인이 필요합니다.
          </span>
        </div>

        {/* 비밀번호 (읽기 전용) */}
        <div className="edit-profile-form-group">
          <label htmlFor="password" className="edit-profile-label">비밀번호</label>
          <input
            id="password"
            type="password"
            className="edit-profile-input"
            value="••••••••"
            disabled
          />
          <span className="edit-profile-hint">
            비밀번호 변경은 별도 메뉴에서 가능합니다.
          </span>
        </div>

        {/* 저장 버튼 */}
        <button type="submit" className="edit-profile-button">
          저장
        </button>
      </form>
    </main>
  );
}
