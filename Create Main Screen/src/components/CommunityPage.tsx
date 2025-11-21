import { MessageSquare, ThumbsUp, Clock, Plus, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import '../styles/CommunityPage.css';

/**
 * 커뮤니티 페이지 컴포넌트의 Props
 */
interface CommunityPageProps {
  onPostClick: (postId: number) => void; // 게시글 클릭 핸들러
  onWriteClick: () => void;               // 글쓰기 버튼 클릭 핸들러
  onBack: () => void;                     // 뒤로가기 핸들러
  posts: any[];                           // 게시글 목록
}

// 카테고리 목록 (필터링에 사용)
const categories = ['전체', '질문', '정보공유', '자유'];

/**
 * 커뮤니티 페이지 컴포넌트
 * 게시글 목록, 카테고리 필터, 글쓰기 버튼 등을 포함
 */
export function CommunityPage({ onPostClick, onWriteClick, onBack, posts }: CommunityPageProps) {
  // 현재 선택된 카테고리 (기본값: '전체')
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 선택된 카테고리에 따라 게시글 필터링
  const filteredPosts = selectedCategory === '전체' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  /**
   * 카테고리별 CSS 클래스 반환
   * @param category - 카테고리 이름
   * @returns CSS 클래스 문자열
   */
  const getCategoryClass = (category: string) => {
    switch (category) {
      case '질문':
        return 'question';
      case '정보공유':
        return 'info';
      case '자유':
        return 'free';
      default:
        return '';
    }
  };

  return (
    <main className="community-page">
      
      {/* ========================================
          뒤로가기 버튼
          ======================================== */}
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={20} />
        뒤로가기
      </button>

      {/* ========================================
          페이지 헤더 (제목 및 설명)
          ======================================== */}
      <div className="community-header">
        <h2>커뮤니티</h2>
        <p>학칙에 대한 질문과 정보를 공유해보세요</p>
      </div>

      {/* ========================================
          카테고리 필터 버튼
          ======================================== */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ========================================
          게시글 목록
          ======================================== */}
      <div className="posts-list">
        {filteredPosts.length === 0 ? (
          // 게시글이 없을 때 표시되는 빈 상태 화면
          <div className="empty-state">
            <MessageSquare size={48} />
            <p>아직 작성된 글이 없습니다</p>
            <p>첫 번째 글을 작성해보세요!</p>
          </div>
        ) : (
          // 게시글 목록 렌더링
          filteredPosts.map((post) => (
            <div 
              key={post.id}
              className="post-card"
              onClick={() => onPostClick(post.id)}
            >
              {/* 게시글 헤더 (카테고리, 학교, 제목, 내용 미리보기) */}
              <div className="post-header">
                {/* 카테고리 뱃지 및 학교 이름 */}
                <span className={`post-badge ${getCategoryClass(post.category)}`}>
                  {post.category}
                </span>
                <span className="post-school">{post.school}</span>
              </div>
              
              {/* 제목 */}
              <h3 className="post-title">{post.title}</h3>
              
              {/* 내용 미리보기 (최대 2줄) */}
              <p className="post-content">{post.content}</p>

              {/* 게시글 푸터 (좋아요, 댓글 수, 작성 시간) */}
              <div className="post-footer">
                <div className="post-stats">
                  {/* 좋아요 수 */}
                  <div className="post-stat">
                    <ThumbsUp size={16} />
                    <span>{post.likes}</span>
                  </div>
                  {/* 댓글 수 */}
                  <div className="post-stat">
                    <MessageSquare size={16} />
                    <span>{post.comments}</span>
                  </div>
                </div>
                {/* 작성 시간 */}
                <div className="post-time">
                  <Clock size={14} />
                  <span>{post.timeAgo}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ========================================
          플로팅 글쓰기 버튼 (우측 하단 고정)
          ======================================== */}
      <button
        onClick={onWriteClick}
        className="floating-write-button"
      >
        <Plus size={24} />
      </button>
    </main>
  );
}
