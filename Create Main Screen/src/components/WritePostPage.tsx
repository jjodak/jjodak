import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import '../styles/WritePostPage.css';

/**
 * 글 작성 페이지 Props
 */
interface WritePostPageProps {
  onBack: () => void;  // 뒤로가기 핸들러
  onSubmit: (post: { category: string; title: string; content: string; school: string }) => void; // 작성 완료 핸들러
}

// 카테고리 목록
const categories = ['질문', '정보공유', '자유'];

// 학교 목록
const schools = [
  '서울대학교',
  '연세대학교',
  '고려대학교',
  '성균관대학교',
  '한양대학교',
  '경희대학교',
  '중앙대학교',
  '이화여자대학교',
  '동양미래대학교',
  '서울과학기술대학교',
  '한국폴리텍대학교',
  '건국대학교',
];

/**
 * 글 작성 페이지 컴포넌트
 * 카테고리, 학교, 제목, 본문을 입력하여 새 게시글 작성
 */
export function WritePostPage({ onBack, onSubmit }: WritePostPageProps) {
  // ========================================
  // State 관리
  // ========================================
  
  const [category, setCategory] = useState('');  // 선택한 카테고리
  const [school, setSchool] = useState('');      // 선택한 학교
  const [title, setTitle] = useState('');        // 입력한 제목
  const [content, setContent] = useState('');    // 입력한 본문

  /**
   * 작성 완료 버튼 핸들러
   * 모든 항목이 입력되었는지 확인 후 제출
   */
  const handleSubmit = () => {
    // 유효성 검사: 모든 항목이 입력되었는지 확인
    if (!category || !school || !title.trim() || !content.trim()) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    // 부모 컴포넌트로 데이터 전달
    onSubmit({
      category,
      title,
      content,
      school,
    });
  };

  return (
    <main className="write-post-page">
      
      {/* ========================================
          헤더 (뒤로가기 버튼 및 작성 완료 버튼)
          ======================================== */}
      <div className="write-header">
        {/* 뒤로가기 버튼 */}
        <button className="write-back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          뒤로가기
        </button>
        
        {/* 작성 완료 버튼 */}
        <button className="write-submit-button" onClick={handleSubmit}>
          작성 완료
        </button>
      </div>

      {/* ========================================
          글 작성 폼
          ======================================== */}
      <div className="write-form">
        <h2>글 작성</h2>

        {/* 카테고리 선택 */}
        <div className="form-group">
          <label htmlFor="category" className="form-label">카테고리</label>
          <select 
            id="category"
            className="form-select"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리를 선택하세요</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 학교 선택 */}
        <div className="form-group">
          <label htmlFor="school" className="form-label">학교</label>
          <select 
            id="school"
            className="form-select"
            value={school} 
            onChange={(e) => setSchool(e.target.value)}
          >
            <option value="">학교를 선택하세요</option>
            {schools.map((sch) => (
              <option key={sch} value={sch}>
                {sch}
              </option>
            ))}
          </select>
        </div>

        {/* 제목 입력 */}
        <div className="form-group">
          <label htmlFor="title" className="form-label">제목</label>
          <input
            id="title"
            className="form-input"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 본문 입력 */}
        <div className="form-group">
          <label htmlFor="content" className="form-label">본문</label>
          <textarea
            id="content"
            className="form-textarea"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </main>
  );
}
