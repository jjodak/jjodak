import { User, School, HelpCircle, Shield, LogOut, Trash2, ChevronRight } from 'lucide-react';
import '../styles/ProfilePage.css';

/**
 * 프로필 페이지 Props
 */
interface ProfilePageProps {
  user: string;           // 사용자 이메일
  onLogout: () => void;   // 로그아웃 핸들러
  onDeleteAccount: () => void; // 계정 탈퇴 핸들러
  onNavigate: (page: string) => void; // 페이지 이동 핸들러
}

/**
 * 프로필 페이지 컴포넌트
 * 사용자 정보, 설정, 로그아웃, 계정 탈퇴 기능 포함
 */
export function ProfilePage({ user, onLogout, onDeleteAccount, onNavigate }: ProfilePageProps) {
  
  // 이메일에서 이름 추출 (@ 앞부분)
  const userName = user.split('@')[0];
  
  // 이름의 첫 글자를 아바타로 표시
  const avatarLetter = userName.charAt(0).toUpperCase();

  /**
   * 메뉴 항목 클릭 핸들러
   */
  const handleMenuClick = (menu: string) => {
    switch (menu) {
      case 'edit-profile':
        onNavigate('edit-profile');
        break;
      case 'school':
        onNavigate('change-school');
        break;
      case 'help':
        onNavigate('help');
        break;
      case 'privacy':
        onNavigate('privacy');
        break;
      case 'logout':
        handleLogout();
        break;
      case 'delete':
        handleDeleteAccount();
        break;
    }
  };

  /**
   * 로그아웃 핸들러
   */
  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      onLogout();
    }
  };

  /**
   * 계정 탈퇴 핸들러
   */
  const handleDeleteAccount = () => {
    const confirmed = confirm(
      '정말로 계정을 탈퇴하시겠습니까?\n\n모든 데이터가 삭제되며 복구할 수 없습니다.'
    );
    
    if (confirmed) {
      const doubleConfirmed = confirm(
        '마지막 확인입니다.\n계정을 탈퇴하시겠습니까?'
      );
      
      if (doubleConfirmed) {
        onDeleteAccount();
      }
    }
  };

  return (
    <main className="profile-page">
      
      {/* ========================================
          페이지 헤더
          ======================================== */}
      <div className="profile-header">
        <h2>프로필</h2>
        <p>계정 정보 및 설정을 관리하세요</p>
      </div>

      {/* ========================================
          프로필 카드
          ======================================== */}
      <div className="profile-card">
        <div className="profile-info">
          {/* 아바타 */}
          <div className="profile-avatar">
            {avatarLetter}
          </div>
          
          {/* 사용자 정보 */}
          <div className="profile-details">
            <div className="profile-name">{userName}</div>
            <div className="profile-email">{user}</div>
          </div>
        </div>

        {/* 통계 */}
        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-label">작성한 글</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-label">댓글</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-value">0</div>
            <div className="profile-stat-label">좋아요</div>
          </div>
        </div>
      </div>

      {/* ========================================
          계정 설정
          ======================================== */}
      <div className="profile-section">
        <div className="profile-section-title">계정 설정</div>
        <div className="profile-menu">
          
          <div className="profile-menu-item" onClick={() => handleMenuClick('edit-profile')}>
            <div className="profile-menu-left">
              <User className="profile-menu-icon" size={20} />
              <span className="profile-menu-text">프로필 수정</span>
            </div>
            <ChevronRight className="profile-menu-arrow" size={20} />
          </div>

          <div className="profile-menu-item" onClick={() => handleMenuClick('school')}>
            <div className="profile-menu-left">
              <School className="profile-menu-icon" size={20} />
              <span className="profile-menu-text">학교 변경</span>
            </div>
            <ChevronRight className="profile-menu-arrow" size={20} />
          </div>
        </div>
      </div>

      {/* ========================================
          기타
          ======================================== */}
      <div className="profile-section">
        <div className="profile-section-title">기타</div>
        <div className="profile-menu">
          
          <div className="profile-menu-item" onClick={() => handleMenuClick('help')}>
            <div className="profile-menu-left">
              <HelpCircle className="profile-menu-icon" size={20} />
              <span className="profile-menu-text">도움말</span>
            </div>
            <ChevronRight className="profile-menu-arrow" size={20} />
          </div>

          <div className="profile-menu-item" onClick={() => handleMenuClick('privacy')}>
            <div className="profile-menu-left">
              <Shield className="profile-menu-icon" size={20} />
              <span className="profile-menu-text">개인정보 처리방침</span>
            </div>
            <ChevronRight className="profile-menu-arrow" size={20} />
          </div>
        </div>
      </div>

      {/* ========================================
          위험 영역
          ======================================== */}
      <div className="profile-danger-zone">
        <div className="profile-danger-title">위험 영역</div>
        <div className="profile-danger-menu">
          
          <div className="profile-danger-item" onClick={() => handleMenuClick('logout')}>
            <div className="profile-menu-left">
              <LogOut className="profile-menu-icon" size={20} />
              <span className="profile-menu-text">로그아웃</span>
            </div>
            <ChevronRight className="profile-menu-arrow" size={20} />
          </div>

          <div className="profile-danger-item" onClick={() => handleMenuClick('delete')}>
            <div className="profile-menu-left">
              <Trash2 className="profile-menu-icon" size={20} />
              <span className="profile-menu-text">계정 탈퇴</span>
            </div>
            <ChevronRight className="profile-menu-arrow" size={20} />
          </div>
        </div>
      </div>

      {/* ========================================
          버전 정보
          ======================================== */}
      <div className="profile-version">
        룰룩 Rule-Look v1.0.0
      </div>
    </main>
  );
}
