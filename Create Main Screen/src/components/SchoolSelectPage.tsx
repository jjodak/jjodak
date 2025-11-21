import { School, ChevronRight, Search, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import '../styles/SchoolSelectPage.css';

interface SchoolSelectPageProps {
  onSchoolSelect: (school: string) => void;
  onBack: () => void;
}

const schools = [
  { id: 1, name: '서울대학교', location: '서울' },
  { id: 2, name: '연세대학교', location: '서울' },
  { id: 3, name: '고려대학교', location: '서울' },
  { id: 4, name: '성균관대학교', location: '서울' },
  { id: 5, name: '한양대학교', location: '서울' },
  { id: 6, name: '경희대학교', location: '서울' },
  { id: 7, name: '중앙대학교', location: '서울' },
  { id: 8, name: '이화여자대학교', location: '서울' },
  { id: 9, name: '동양미래대학교', location: '서울' },
  { id: 10, name: '서울과학기술대학교', location: '서울' },
  { id: 11, name: '한국폴리텍대학교', location: '서울' },
  { id: 12, name: '건국대학교', location: '서울' },
];

export function SchoolSelectPage({ onSchoolSelect, onBack }: SchoolSelectPageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="school-select-page">
      {/* Back Button */}
      <button className="school-back-button" onClick={onBack}>
        <ArrowLeft size={20} />
        뒤로가기
      </button>

      {/* Header Section */}
      <div className="school-header">
        <h2>학교 선택</h2>
        <p>학칙을 조회할 학교를 선택해주세요</p>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <Search 
          style={{ 
            position: 'absolute', 
            left: '12px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            color: '#9ca3af'
          }} 
          size={20} 
        />
        <input
          type="text"
          placeholder="학교명을 검색하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '2.5rem' }}
        />
      </div>

      {/* School Grid */}
      <div className="schools-grid">
        {filteredSchools.map((school) => (
          <div 
            key={school.id}
            className="school-card"
            onClick={() => onSchoolSelect(school.name)}
          >
            <div className="school-icon">
              <School size={24} />
            </div>
            <div className="school-name">{school.name}</div>
          </div>
        ))}
        
        {filteredSchools.length === 0 && (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '3rem 0', 
            color: '#6b7280' 
          }}>
            <School size={48} style={{ margin: '0 auto 0.75rem', opacity: 0.3 }} />
            <p>검색 결과가 없습니다</p>
          </div>
        )}
      </div>
    </main>
  );
}
