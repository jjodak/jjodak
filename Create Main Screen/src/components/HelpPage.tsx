import { ArrowLeft, ChevronDown, Mail } from 'lucide-react';
import { useState } from 'react';
import '../styles/HelpPage.css';

/**
 * 도움말 페이지 Props
 */
interface HelpPageProps {
  onBack: () => void; // 뒤로가기 핸들러
}

// FAQ 데이터
const faqs = [
  {
    id: 1,
    question: '룰룩(Rule-Look)은 무엇인가요?',
    answer: '룰룩은 학교 학칙을 쉽게 찾아보고 궁금한 점을 물어볼 수 있는 학칙 챗봇 서비스입니다. AI 기반 챗봇을 통해 학칙에 대한 질문에 빠르게 답변을 받을 수 있습니다.',
  },
  {
    id: 2,
    question: '어떤 학교를 지원하나요?',
    answer: '현재 서울대학교, 연세대학교, 고려대학교, 성균관대학교, 한양대학교, 경희대학교, 중앙대학교, 이화여자대학교, 동양미래대학교, 서울과학기술대학교, 한국폴리텍대학교, 건국대학교 등을 지원합니다. 앞으로 더 많은 학교를 추가할 예정입니다.',
  },
  {
    id: 3,
    question: '챗봇 사용 방법을 알려주세요.',
    answer: '1. 홈 화면에서 "학칙 챗봇" 카드를 클릭합니다.\n2. 학교를 선택합니다.\n3. 학칙에 대해 궁금한 점을 입력하면 AI가 답변해드립니다.\n4. 추가 질문이 있다면 계속 대화를 이어갈 수 있습니다.',
  },
  {
    id: 4,
    question: '커뮤니티에서 무엇을 할 수 있나요?',
    answer: '커뮤니티에서는 학생들이 학칙 관련 질문을 공유하고 답변할 수 있습니다. 학사일정, 수업, 휴학/복학, 장학금 등 다양한 주제로 소통할 수 있으며, 좋아요와 댓글 기능을 통해 의견을 나눌 수 있습니다.',
  },
  {
    id: 5,
    question: '게시글은 익명으로 작성되나요?',
    answer: '네, 모든 게시글과 댓글은 기본적으로 익명으로 작성됩니다. 사용자의 개인정보는 보호되며, 다른 사용자에게는 "익명"으로만 표시됩니다.',
  },
  {
    id: 6,
    question: '학교를 변경하려면 어떻게 하나요?',
    answer: '프로필 > 학교 변경 메뉴에서 소속 학교를 변경할 수 있습니다. 학교를 변경하면 해당 학교의 학칙 정보를 챗봇으로 조회할 수 있습니다.',
  },
  {
    id: 7,
    question: '비밀번호를 잊어버렸어요.',
    answer: '죄송하지만 현재 비밀번호 찾기 기능은 준비 중입니다. 빠른 시일 내에 지원할 예정입니다. 불편을 드려 죄송합니다.',
  },
  {
    id: 8,
    question: '계정을 탈퇴하려면 어떻게 하나요?',
    answer: '프로필 > 위험 영역 > 계정 탈퇴 메뉴에서 탈퇴할 수 있습니다. 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없으니 신중하게 결정해주세요.',
  },
];

/**
 * 도움말 페이지 컴포넌트
 * FAQ 및 문의 기능 포함
 */
export function HelpPage({ onBack }: HelpPageProps) {
  
  // State 관리 (열린 FAQ ID 추적)
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  /**
   * FAQ 토글 핸들러
   */
  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  /**
   * 문의하기 버튼 클릭 핸들러
   */
  const handleContact = () => {
    alert('문의하기 기능은 준비 중입니다.\n\n이메일: support@rulelook.com');
  };

  return (
    <main className="help-page">
      
      {/* ========================================
          뒤로가기 버튼
          ======================================== */}
      <button className="help-back" onClick={onBack}>
        <ArrowLeft size={20} />
        뒤로가기
      </button>

      {/* ========================================
          페이지 헤더
          ======================================== */}
      <div className="help-header">
        <h2>도움말</h2>
        <p>자주 묻는 질문과 답변을 확인하세요</p>
      </div>

      {/* ========================================
          FAQ 섹션
          ======================================== */}
      <div className="help-section">
        <div className="help-section-title">자주 묻는 질문</div>
        <div className="help-faq-list">
          {faqs.map((faq) => (
            <div key={faq.id} className="help-faq-item">
              <div
                className="help-faq-question"
                onClick={() => toggleFaq(faq.id)}
              >
                <span className="help-faq-question-text">{faq.question}</span>
                <ChevronDown
                  className={`help-faq-icon ${openFaqId === faq.id ? 'open' : ''}`}
                  size={20}
                />
              </div>
              {openFaqId === faq.id && (
                <div className="help-faq-answer">
                  {faq.answer.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========================================
          문의하기
          ======================================== */}
      <div className="help-contact">
        <h3>더 궁금한 점이 있으신가요?</h3>
        <p>언제든지 문의해주세요. 빠르게 답변드리겠습니다.</p>
        <button className="help-contact-button" onClick={handleContact}>
          <Mail size={18} />
          문의하기
        </button>
      </div>
    </main>
  );
}
