import { useState } from 'react';
import { Home, MessageCircle, Users, User, BookOpen } from 'lucide-react';
import { HomePage } from './components/HomePage';
import { SchoolSelectPage } from './components/SchoolSelectPage';
import { ChatbotPage } from './components/ChatbotPage';
import { CommunityPage } from './components/CommunityPage';
import { PostDetailPage } from './components/PostDetailPage';
import { WritePostPage } from './components/WritePostPage';
import './styles/reset.css';
import './styles/App.css';

/**
 * 룰룩(Rule-Look) 메인 애플리케이션 컴포넌트
 * 학칙 관련 챗봇 서비스의 전체 구조를 관리
 * 아이폰 14 프로 기준 모바일 형식 (393px)
 */
export default function App() {
  // ========================================
  // State 관리
  // ========================================
  
  // 하단 탭바의 활성화 상태 ('home' | 'chatbot' | 'community' | 'profile')
  const [activeTab, setActiveTab] = useState('home');
  
  // 현재 표시되는 페이지 상태
  const [currentPage, setCurrentPage] = useState<'home' | 'school-select' | 'chatbot' | 'community' | 'post-detail' | 'write-post'>('home');
  
  // 사용자가 선택한 학교 정보
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  
  // 커뮤니티 게시글 목록
  const [posts, setPosts] = useState<any[]>([]);
  
  // 현재 선택된 게시글 ID
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // ========================================
  // 네비게이션 핸들러
  // ========================================
  
  /**
   * 홈 화면에서 다른 페이지로 이동
   * @param page - 이동할 페이지 이름
   */
  const handleNavigate = (page: string) => {
    if (page === 'school-select') {
      setCurrentPage('school-select');
      setActiveTab('chatbot');
    } else if (page === 'community') {
      setCurrentPage('community');
      setActiveTab('community');
    }
  };

  /**
   * 학교 선택 후 챗봇 페이지로 이동
   * @param school - 선택한 학교 이름
   */
  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school);
    setCurrentPage('chatbot');
    setActiveTab('chatbot');
  };

  /**
   * 하단 탭바 클릭 핸들러
   * @param tab - 클릭한 탭 이름
   */
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentPage('home');
    } else if (tab === 'chatbot') {
      // 학교가 선택되어 있으면 챗봇 페이지로, 아니면 학교 선택 페이지로
      if (selectedSchool) {
        setCurrentPage('chatbot');
      } else {
        setCurrentPage('school-select');
      }
    } else if (tab === 'community') {
      setCurrentPage('community');
    }
  };

  // ========================================
  // 커뮤니티 관련 핸들러
  // ========================================
  
  /**
   * 게시글 클릭 시 상세 페이지로 이동
   * @param postId - 클릭한 게시글 ID
   */
  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
    setCurrentPage('post-detail');
  };

  /**
   * 글쓰기 버튼 클릭 시 글 작성 페이지로 이동
   */
  const handleWriteClick = () => {
    setCurrentPage('write-post');
  };

  /**
   * 새 게시글 작성 완료 시 처리
   * @param post - 작성한 게시글 데이터
   */
  const handlePostSubmit = (post: { category: string; title: string; content: string; school: string }) => {
    // 새 게시글 생성 (자동으로 ID, 작성자, 좋아요, 댓글 수 등 추가)
    const newPost = {
      id: posts.length + 1,
      ...post,
      author: '익명',
      likes: 0,
      comments: 0,
      timeAgo: '방금 전',
    };
    // 게시글 목록 맨 앞에 추가
    setPosts([newPost, ...posts]);
    // 커뮤니티 페이지로 돌아가기
    setCurrentPage('community');
  };

  /**
   * 게시글 상세 페이지에서 뒤로가기
   */
  const handleBackFromPost = () => {
    setCurrentPage('community');
    setSelectedPostId(null);
  };

  /**
   * 글 작성 페이지에서 뒤로가기
   */
  const handleBackFromWrite = () => {
    setCurrentPage('community');
  };

  /**
   * 상단 로고 클릭 시 홈으로 이동
   */
  const handleLogoClick = () => {
    setCurrentPage('home');
    setActiveTab('home');
  };

  /**
   * 뒤로가기 버튼 핸들러 (학교 선택 및 챗봇 페이지용)
   */
  const handleBack = () => {
    if (currentPage === 'school-select') {
      setCurrentPage('home');
      setActiveTab('home');
    } else if (currentPage === 'chatbot') {
      setCurrentPage('school-select');
    }
  };

  return (
    <div className="app-container">
      
      {/* ========================================
          상단 헤더: 로고와 앱 이름
          ======================================== */}
      <header className="app-header">
        <div className="logo-container" onClick={handleLogoClick}>
          {/* 로고 아이콘 */}
          <div className="logo-icon">
            <BookOpen size={24} />
          </div>
          {/* 앱 이름 */}
          <div className="logo-text">
            <h1>룰룩</h1>
            <p>Rule-Look</p>
          </div>
        </div>
      </header>

      {/* ========================================
          페이지 콘텐츠 영역
          현재 상태에 따라 다른 페이지 컴포넌트 렌더링
          ======================================== */}
      
      {/* 홈 화면 */}
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      
      {/* 학교 선택 화면 */}
      {currentPage === 'school-select' && <SchoolSelectPage onSchoolSelect={handleSchoolSelect} onBack={handleBack} />}
      
      {/* 챗봇 화면 */}
      {currentPage === 'chatbot' && selectedSchool && <ChatbotPage selectedSchool={selectedSchool} onBack={handleBack} />}
      
      {/* 커뮤니티 목록 화면 */}
      {currentPage === 'community' && <CommunityPage posts={posts} onPostClick={handlePostClick} onWriteClick={handleWriteClick} onBack={() => setCurrentPage('home')} />}
      
      {/* 게시글 상세 화면 */}
      {currentPage === 'post-detail' && selectedPostId && (
        <PostDetailPage 
          post={posts.find(p => p.id === selectedPostId)} 
          onBack={handleBackFromPost} 
        />
      )}
      
      {/* 글 작성 화면 */}
      {currentPage === 'write-post' && (
        <WritePostPage 
          onBack={handleBackFromWrite} 
          onSubmit={handlePostSubmit} 
        />
      )}

      {/* ========================================
          하단 네비게이션 탭바
          홈, 챗봇, 커뮤니티, 프로필 4개 탭
          ======================================== */}
      <nav className="bottom-nav">
        <div className="nav-buttons">
          
          {/* 홈 탭 */}
          <button
            onClick={() => handleTabClick('home')}
            className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
          >
            <Home size={24} />
            <span>홈</span>
          </button>
          
          {/* 챗봇 탭 */}
          <button
            onClick={() => handleTabClick('chatbot')}
            className={`nav-button ${activeTab === 'chatbot' ? 'active' : ''}`}
          >
            <MessageCircle size={24} />
            <span>챗봇</span>
          </button>
          
          {/* 커뮤니티 탭 */}
          <button
            onClick={() => handleTabClick('community')}
            className={`nav-button ${activeTab === 'community' ? 'active' : ''}`}
          >
            <Users size={24} />
            <span>커뮤니티</span>
          </button>
          
          {/* 프로필 탭 */}
          <button
            onClick={() => handleTabClick('profile')}
            className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <User size={24} />
            <span>프로필</span>
          </button>
        </div>
      </nav>
    </div>
  );
}