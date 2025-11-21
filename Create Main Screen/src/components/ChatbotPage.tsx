import { Send, Bot, User as UserIcon, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import '../styles/ChatbotPage.css';

interface ChatbotPageProps {
  selectedSchool: string;
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatbotPage({ selectedSchool, onBack }: ChatbotPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `안녕하세요! ${selectedSchool} 학칙 도우미입니다. 궁금한 학칙에 대해 질문해주세요.`,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInputText('');

    // 봇 응답 시뮬레이션
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: '죄송합니다. 현재는 데모 버전입니다. 실제 학칙 정보는 연동 후 제공됩니다.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  return (
    <main className="chatbot-page">
      {/* Back Button */}
      <div className="chatbot-back-section">
        <button className="chatbot-back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          뒤로가기
        </button>
      </div>

      {/* Chatbot Header */}
      <div className="chatbot-header">
        <h2>{selectedSchool}</h2>
        <p>학칙에 대해 무엇이든 물어보세요</p>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-avatar">
                {message.sender === 'bot' ? <Bot size={20} /> : <UserIcon size={20} />}
              </div>
              <div className="message-content">
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="chat-input-fixed">
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <button 
            className="chat-send-button"
            onClick={handleSend}
            disabled={!inputText.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}
