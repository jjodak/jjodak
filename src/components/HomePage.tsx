import { MessageCircle, Users } from 'lucide-react';
import '../styles/HomePage.css';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main className="home-page">
      {/* Welcome Section */}
      <div className="home-header">
        <h2>안녕하세요!</h2>
        <p>학칙을 쉽고 빠르게 확인하세요</p>
      </div>

      {/* Feature Cards */}
      <div className="feature-cards">
        {/* Chatbot Card */}
        <div className="feature-card">
          <div className="feature-card-header">
            <div className="feature-icon chatbot">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3>AI 챗봇</h3>
              <p>학칙을 물어보세요</p>
            </div>
          </div>
          <div className="feature-card-content">
            <p>
              궁금한 학칙을 AI에게 질문하고 즉시 답변을 받아보세요
            </p>
            <button 
              className="feature-button chatbot"
              onClick={() => onNavigate('school-select')}
            >
              챗봇 시작하기
            </button>
          </div>
        </div>

        {/* Community Card */}
        <div className="feature-card">
          <div className="feature-card-header">
            <div className="feature-icon community">
              <Users size={24} />
            </div>
            <div>
              <h3>커뮤니티</h3>
              <p>함께 나누는 공간</p>
            </div>
          </div>
          <div className="feature-card-content">
            <p>
              학칙에 대한 질문과 경험을 커뮤니티와 공유하세요
            </p>
            <button 
              className="feature-button community"
              onClick={() => onNavigate('community')}
            >
              커뮤니티 참여
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
