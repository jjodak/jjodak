import { ArrowLeft, School, Check } from 'lucide-react';
import { useState } from 'react';
import '../styles/ChangeSchoolPage.css';

/**
 * 학교 변경 페이지 Props
 */
interface ChangeSchoolPageProps {
  currentSchool: string;  // 현재 학교
  onBack: () => void;     // 뒤로가기 핸들러
  onSave: (school: string) => void; // 저장 핸들러
}

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
 * 학교 변경 페이지 컴포넌트
 * 학교 검색 및 변경 기능 포함
 */
export function ChangeSchoolPage({ currentSchool, onBack, onSave }: ChangeSchoolPageProps) {
  
  // State 관리
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(currentSchool);

  // 검색 필터링
  const filteredSchools = schools.filter(school =>
    school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * 저장 버튼 클릭 핸들러
   */
  const handleSave = () => {
    if (!selectedSchool) {
      alert('학교를 선택해주세요.');
      return;
    }

    if (selectedSchool === currentSchool) {
      alert('현재 학교와 동일합니다.');
      return;
    }

    if (confirm(`학교를 "${selectedSchool}"(으)로 변경하시겠습니까?`)) {
      onSave(selectedSchool);
    }
  };

  return (
    <main className="change-school-page">
      
      {/* ========================================
          뒤로가기 버튼
          ======================================== */}
      <button className="change-school-back" onClick={onBack}>
        <ArrowLeft size={20} />
        뒤로가기
      </button>

      {/* ========================================
          페이지 헤더
          ======================================== */}
      <div className="change-school-header">
        <h2>학교 변경</h2>
        <p>소속 학교를 변경하세요</p>
      </div>

      {/* ========================================
          현재 학교
          ======================================== */}
      {currentSchool && (
        <div className="change-school-current">
          <div className="change-school-current-label">현재 학교</div>
          <div className="change-school-current-name">{currentSchool}</div>
        </div>
      )}

      {/* ========================================
          검색
          ======================================== */}
      <div className="change-school-search">
        <input
          type="text"
          className="change-school-search-input"
          placeholder="학교 이름을 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* ========================================
          학교 목록
          ======================================== */}
      <div className="change-school-list">
        {filteredSchools.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
            검색 결과가 없습니다.
          </div>
        ) : (
          filteredSchools.map((school) => (
            <div
              key={school}
              className={`change-school-item ${selectedSchool === school ? 'selected' : ''}`}
              onClick={() => setSelectedSchool(school)}
            >
              <div className="change-school-item-left">
                <div className="change-school-item-icon">
                  <School size={20} />
                </div>
                <div className="change-school-item-name">{school}</div>
              </div>
              {selectedSchool === school && (
                <Check className="change-school-item-check" size={20} />
              )}
            </div>
          ))
        )}
      </div>

      {/* ========================================
          저장 버튼
          ======================================== */}
      <button className="change-school-button" onClick={handleSave}>
        변경하기
      </button>
    </main>
  );
}
