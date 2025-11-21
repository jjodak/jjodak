import { ArrowLeft, ThumbsUp, MessageSquare, Send, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import '../styles/PostDetailPage.css';

/**
 * 댓글 인터페이스
 */
interface Comment {
  id: number;          // 댓글 고유 ID
  author: string;      // 작성자 이름
  content: string;     // 댓글 내용
  timeAgo: string;     // 작성 시간 (예: "방금 전", "1시간 전")
  replies: Reply[];    // 답글 목록
}

/**
 * 답글 인터페이스
 */
interface Reply {
  id: number;          // 답글 고유 ID
  author: string;      // 작성자 이름
  content: string;     // 답글 내용
  timeAgo: string;     // 작성 시간
}

/**
 * 게시글 상세 페이지 Props
 */
interface PostDetailPageProps {
  post: any;           // 게시글 데이터
  onBack: () => void;  // 뒤로가기 핸들러
}

/**
 * 게시글 상세 페이지 컴포넌트
 * 게시글 내용, 좋아요, 댓글 및 답글 기능 포함
 */
export function PostDetailPage({ post, onBack }: PostDetailPageProps) {
  // ========================================
  // State 관리
  // ========================================
  
  const [isLiked, setIsLiked] = useState(false);                    // 좋아요 상태
  const [likes, setLikes] = useState(post.likes);                   // 좋아요 수
  const [comments, setComments] = useState<Comment[]>([]);          // 댓글 목록
  const [commentText, setCommentText] = useState('');               // 댓글 입력 텍스트
  const [replyingTo, setReplyingTo] = useState<number | null>(null); // 답글 작성 중인 댓글 ID
  const [replyText, setReplyText] = useState('');                   // 답글 입력 텍스트
  const [editingComment, setEditingComment] = useState<number | null>(null); // 수정 중인 댓글 ID
  const [editText, setEditText] = useState('');                     // 댓글 수정 텍스트
  const [openMenuId, setOpenMenuId] = useState<number | null>(null); // 열린 메뉴 ID

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

  // ========================================
  // 좋아요 핸들러
  // ========================================
  
  /**
   * 좋아요 버튼 클릭 핸들러
   * 좋아요 상태를 토글하고 좋아요 수를 증감
   */
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  // ========================================
  // 댓글 관련 핸들러
  // ========================================
  
  /**
   * 새 댓글 추가 핸들러
   */
  const handleAddComment = () => {
    if (!commentText.trim()) return; // 빈 댓글은 무시
    
    const newComment: Comment = {
      id: comments.length + 1,
      author: '나',
      content: commentText,
      timeAgo: '방금 전',
      replies: [],
    };
    
    setComments([...comments, newComment]);
    setCommentText(''); // 입력창 초기화
  };

  /**
   * 답글 추가 핸들러
   * @param commentId - 답글을 추가할 댓글 ID
   */
  const handleAddReply = (commentId: number) => {
    if (!replyText.trim()) return; // 빈 답글은 무시
    
    const newReply: Reply = {
      id: Date.now(), // 고유 ID 생성 (타임스탬프 사용)
      author: '나',
      content: replyText,
      timeAgo: '방금 전',
    };
    
    // 해당 댓글의 replies 배열에 새 답글 추가
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment
    ));
    
    setReplyText('');        // 입력창 초기화
    setReplyingTo(null);     // 답글 입력 모드 해제
  };

  /**
   * 댓글 삭제 핸들러
   * @param commentId - 삭제할 댓글 ID
   */
  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    setOpenMenuId(null);
  };

  /**
   * 댓글 수정 완료 핸들러
   * @param commentId - 수정할 댓글 ID
   * @param newContent - 수정된 댓글 내용
   */
  const handleEditComment = (commentId: number, newContent: string) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, content: newContent }
        : comment
    ));
    setEditingComment(null); // 수정 모드 해제
    setEditText('');         // 수정 텍스트 초기화
  };

  /**
   * 답글 삭제 핸들러
   * @param commentId - 답글이 속한 댓글 ID
   * @param replyId - 삭제할 답글 ID
   */
  const handleDeleteReply = (commentId: number, replyId: number) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
        : comment
    ));
    setOpenMenuId(null);
  };

  return (
    <main className="post-detail-page">
      
      {/* ========================================
          뒤로가기 버튼
          ======================================== */}
      <div className="detail-back-section">
        <button className="detail-back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          뒤로가기
        </button>
      </div>

      {/* ========================================
          스크롤 가능한 콘텐츠 영역
          ======================================== */}
      <div className="detail-content">
        
        {/* 게시글 상세 정보 */}
        <div className="post-detail">
          
          {/* 카테고리 및 학교 정보 */}
          <div className="post-detail-header">
            <span className={`post-detail-badge ${getCategoryClass(post.category)}`}>
              {post.category}
            </span>
            <span className="post-detail-school">{post.school}</span>
          </div>
          
          {/* 게시글 제목 */}
          <h2>{post.title}</h2>
          
          {/* 게시글 본문 (줄바꿈 유지) */}
          <p className="post-detail-text">{post.content}</p>
          
          {/* 작성자 및 작성 시간 */}
          <div className="post-detail-author">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.timeAgo}</span>
          </div>

          {/* 좋아요 버튼 및 댓글 수 표시 */}
          <div className="post-actions">
            <button
              onClick={handleLike}
              className={`like-button ${isLiked ? 'liked' : ''}`}
            >
              {/* 좋아요 아이콘 (활성화 시 채워짐) */}
              <ThumbsUp size={16} fill={isLiked ? 'currentColor' : 'none'} />
              좋아요 {likes}
            </button>
            <div className="comment-count">
              <MessageSquare size={16} />
              <span>댓글 {comments.length}</span>
            </div>
          </div>
        </div>

        {/* ========================================
            댓글 섹션
            ======================================== */}
        <div className="comments-section">
          <h3>댓글 {comments.length}</h3>
          
          {/* 댓글 목록 */}
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-wrapper">
                
                {/* 댓글 카드 */}
                <div className="comment-card">
                  <div className="comment-header">
                    <div className="comment-author-info">
                      {/* 댓글 작성자 및 작성 시간 */}
                      <div className="comment-author">
                        <span className="comment-author-name">{comment.author}</span>
                        <span className="comment-time">{comment.timeAgo}</span>
                      </div>
                      
                      {/* 댓글 수정 모드 */}
                      {editingComment === comment.id ? (
                        <div className="comment-edit">
                          <textarea
                            className="comment-edit-textarea"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                          />
                          <div className="comment-edit-buttons">
                            <button 
                              className="comment-edit-button save"
                              onClick={() => handleEditComment(comment.id, editText)}
                            >
                              수정 완료
                            </button>
                            <button 
                              className="comment-edit-button cancel"
                              onClick={() => setEditingComment(null)}
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        // 댓글 내용 표시
                        <p className="comment-text">{comment.content}</p>
                      )}
                    </div>
                    
                    {/* 댓글 수정/삭제 메뉴 (본인이 작성한 댓글만) */}
                    {comment.author === '나' && editingComment !== comment.id && (
                      <div style={{ position: 'relative' }}>
                        <button 
                          className="comment-menu-button"
                          onClick={() => setOpenMenuId(openMenuId === comment.id ? null : comment.id)}
                        >
                          <MoreVertical size={16} />
                        </button>
                        
                        {openMenuId === comment.id && (
                          <div className="dropdown-menu" style={{ right: 0, top: '100%', marginTop: '4px' }}>
                            {/* 수정 메뉴 */}
                            <div 
                              className="dropdown-item"
                              onClick={() => {
                                setEditingComment(comment.id);
                                setEditText(comment.content);
                                setOpenMenuId(null);
                              }}
                            >
                              <Edit size={14} />
                              수정
                            </div>
                            {/* 삭제 메뉴 (빨간색) */}
                            <div 
                              className="dropdown-item delete"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              <Trash2 size={14} />
                              삭제
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* 답글 달기 버튼 */}
                  <button
                    className="reply-trigger"
                    onClick={() => setReplyingTo(comment.id)}
                  >
                    답글 달기
                  </button>
                </div>

                {/* ========================================
                    답글 목록 (들여쓰기)
                    ======================================== */}
                {comment.replies.length > 0 && (
                  <div className="replies-list">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply-card">
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                          <div style={{ flex: 1 }}>
                            {/* 답글 작성자 및 작성 시간 */}
                            <div className="comment-author">
                              <span className="comment-author-name">{reply.author}</span>
                              <span className="comment-time">{reply.timeAgo}</span>
                            </div>
                            {/* 답글 내용 */}
                            <p className="comment-text">{reply.content}</p>
                          </div>
                          
                          {/* 답글 삭제 메뉴 (본인이 작성한 답글만) */}
                          {reply.author === '나' && (
                            <div style={{ position: 'relative' }}>
                              <button 
                                className="comment-menu-button"
                                onClick={() => setOpenMenuId(openMenuId === reply.id ? null : reply.id)}
                              >
                                <MoreVertical size={16} />
                              </button>
                              
                              {openMenuId === reply.id && (
                                <div className="dropdown-menu" style={{ right: 0, top: '100%', marginTop: '4px' }}>
                                  <div 
                                    className="dropdown-item delete"
                                    onClick={() => handleDeleteReply(comment.id, reply.id)}
                                  >
                                    <Trash2 size={14} />
                                    삭제
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ========================================
                    답글 입력창 (답글 달기 버튼 클릭 시)
                    ======================================== */}
                {replyingTo === comment.id && (
                  <div className="reply-input-wrapper">
                    <div className="reply-input">
                      <input
                        placeholder="답글을 입력하세요..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddReply(comment.id);
                          }
                        }}
                      />
                      <button 
                        className="reply-send-button"
                        onClick={() => handleAddReply(comment.id)}
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================
          하단 고정 댓글 입력창 (하단 탭바 위)
          ======================================== */}
      <div className="comment-input-fixed">
        <div className="comment-input-container">
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddComment();
              }
            }}
          />
          <button 
            className="comment-send-button"
            onClick={handleAddComment}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}
