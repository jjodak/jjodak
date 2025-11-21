import { ArrowLeft } from 'lucide-react';
import '../styles/PrivacyPage.css';

/**
 * 개인정보 처리방침 페이지 Props
 */
interface PrivacyPageProps {
  onBack: () => void; // 뒤로가기 핸들러
}

/**
 * 개인정보 처리방침 페이지 컴포넌트
 * 개인정보 수집, 이용, 보관, 파기 등에 대한 정책 표시
 */
export function PrivacyPage({ onBack }: PrivacyPageProps) {
  
  return (
    <main className="privacy-page">
      
      {/* ========================================
          뒤로가기 버튼
          ======================================== */}
      <button className="privacy-back" onClick={onBack}>
        <ArrowLeft size={20} />
        뒤로가기
      </button>

      {/* ========================================
          페이지 헤더
          ======================================== */}
      <div className="privacy-header">
        <h2>개인정보 처리방침</h2>
        <p>룰룩의 개인정보 처리방침을 확인하세요</p>
      </div>

      {/* ========================================
          업데이트 정보
          ======================================== */}
      <div className="privacy-updated">
        최종 업데이트: 2024년 1월 1일
      </div>

      {/* ========================================
          내용
          ======================================== */}
      <div className="privacy-content">
        
        {/* 1. 개인정보의 수집 및 이용 목적 */}
        <div className="privacy-section">
          <h3 className="privacy-section-title">1. 개인정보의 수집 및 이용 목적</h3>
          <div className="privacy-section-content">
            <p>
              룰룩(Rule-Look)은 다음의 목적을 위하여 개인정보를 처리합니다. 
              처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
              이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul>
              <li>회원 가입 및 관리</li>
              <li>학칙 챗봇 서비스 제공</li>
              <li>커뮤니티 서비스 제공</li>
              <li>고객 문의 및 불만 처리</li>
              <li>서비스 개선 및 통계 분석</li>
            </ul>
          </div>
        </div>

        <div className="privacy-divider" />

        {/* 2. 수집하는 개인정보 항목 */}
        <div className="privacy-section">
          <h3 className="privacy-section-title">2. 수집하는 개인정보 항목</h3>
          <div className="privacy-section-content">
            <p><strong>필수 항목:</strong></p>
            <ul>
              <li>이메일 주소</li>
              <li>비밀번호 (암호화 저장)</li>
              <li>이름</li>
              <li>소속 학교</li>
            </ul>
            <p><strong>자동 수집 항목:</strong></p>
            <ul>
              <li>서비스 이용 기록</li>
              <li>접속 로그</li>
              <li>기기 정보</li>
            </ul>
          </div>
        </div>

        <div className="privacy-divider" />

        {/* 3. 개인정보의 보유 및 이용 기간 */}
        <div className="privacy-section">
          <h3 className="privacy-section-title">3. 개인정보의 보유 및 이용 기간</h3>
          <div className="privacy-section-content">
            <p>
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 
              수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul>
              <li><strong>회원 정보:</strong> 회원 탈퇴 시까지</li>
              <li><strong>게시글 및 댓글:</strong> 회원 탈퇴 시까지 (단, 법령에 따라 보존할 필요가 있는 경우 해당 기간까지 보관)</li>
              <li><strong>서비스 이용 기록:</strong> 3개월</li>
            </ul>
          </div>
        </div>

        <div className="privacy-divider" />

        {/* 4. 개인정보의 제3자 제공 */}
        <div className="privacy-section">
          <h3 className="privacy-section-title">4. 개인정보의 제3자 제공</h3>
          <div className="privacy-section-content">
            <p>
              회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 
              제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </p>
            <p>
              현재 룰룩은 개인정보를 제3자에게 제공하지 않습니다.
            </p>
          </div>
        </div>

        <div className="privacy-divider" />

        {/* 5. 개인정보의 파기 */}
        <div className="privacy-section">
          <h3 className="privacy-section-title">5. 개인정보의 파기</h3>
          <div className="privacy-section-content">
            <p>
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 
              되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            </p>
            <p><strong>파기 절차:</strong></p>
            <ul>
              <li>회원 탈퇴 시 즉시 파기</li>
              <li>보유기간 만료 시 자동 파기</li>
            </ul>
            <p><strong>파기 방법:</strong></p>
            <ul>
              <li>전자적 파일 형태: 복구 불가능한 방법으로 영구 삭제</li>
              <li>종이 문서: 분쇄 또는 소각</li>
            </ul>
          </div>
        </div>

        <div className="privacy-divider" />

        {/* 6. 정보주체의 권리·의무 */}
        <div className="privacy-section">
          <h3 className="privacy-section-title">6. 정보주체의 권리·의무</h3>
          <div className="privacy-section-content">
            <p>정보주체는 언제든지 다음 각 호의 권리를 행사할 수 있습니다.</p>
            <ul>
              <li>개인정보 열람 요구</li>
              <li>개인정보 정정·삭제 요구</li>
              <li>개인정보 처리정지 요구</li>
              <li>개인정보 처리에 대한 동의 철회</li>
            </ul>
            <p>
              권리 행사는 프로필 {'>'} 프로필 수정 또는 계정 탈퇴 메뉴를 통해 직접 하실 수 있습니다.
            </p>
          </div>
        </div>

        <div className="privacy-divider" />

        {/* 7. 개인정보 보호책임자 */}
        <div className="privacy-section">
          <h3 className="privacy-section-title">7. 개인정보 보호책임자</h3>
          <div className="privacy-section-content">
            <p>
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 
              관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 
              개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <p><strong>개인정보 보호책임자:</strong></p>
            <ul>
              <li>이메일: privacy@rulelook.com</li>
              <li>전화: 준비 중</li>
            </ul>
          </div>
        </div>

        <div className="privacy-divider" />

        {/* 8. 개인정보 처리방침 변경 */}
        <div className="privacy-section">
          <h3 className="privacy-section-title">8. 개인정보 처리방침 변경</h3>
          <div className="privacy-section-content">
            <p>
              이 개인정보 처리방침은 2024년 1월 1일부터 적용되며, 법령 및 방침에 따른 
              변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 
              공지사항을 통하여 고지할 것입니다.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}