import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import '../styles/SignupPage.css';

/**
 * 회원가입 페이지 Props
 */
interface SignupPageProps {
  onSignup: (userData: any) => void;  // 회원가입 성공 핸들러
  onLoginClick: () => void;           // 로그인 페이지로 이동
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
 * 회원가입 페이지 컴포넌트
 * 이메일, 비밀번호, 이름, 학교 선택, 약관 동의 포함
 */
export function SignupPage({ onSignup, onLoginClick }: SignupPageProps) {
  // ========================================
  // State 관리
  // ========================================
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    school: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });

  const [terms, setTerms] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  /**
   * 입력값 변경 핸들러
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // 실시간 유효성 검사
    if (field === 'email') {
      validateEmail(value);
    } else if (field === 'password') {
      validatePassword(value);
      checkPasswordStrength(value);
    } else if (field === 'passwordConfirm') {
      validatePasswordConfirm(value);
    } else if (field === 'name') {
      validateName(value);
    }
  };

  /**
   * 이메일 유효성 검사
   */
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: '' }));
    } else if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  /**
   * 비밀번호 유효성 검사
   */
  const validatePassword = (password: string) => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: '' }));
    } else if (password.length < 8) {
      setErrors(prev => ({ ...prev, password: '비밀번호는 8자 이상이어야 합니다.' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  /**
   * 비밀번호 확인 유효성 검사
   */
  const validatePasswordConfirm = (passwordConfirm: string) => {
    if (!passwordConfirm) {
      setErrors(prev => ({ ...prev, passwordConfirm: '' }));
    } else if (passwordConfirm !== formData.password) {
      setErrors(prev => ({ ...prev, passwordConfirm: '비밀번호가 일치하지 않습니다.' }));
    } else {
      setErrors(prev => ({ ...prev, passwordConfirm: '' }));
    }
  };

  /**
   * 이름 유효성 검사
   */
  const validateName = (name: string) => {
    if (!name) {
      setErrors(prev => ({ ...prev, name: '' }));
    } else if (name.length < 2) {
      setErrors(prev => ({ ...prev, name: '이름은 2자 이상이어야 합니다.' }));
    } else {
      setErrors(prev => ({ ...prev, name: '' }));
    }
  };

  /**
   * 비밀번호 강도 체크
   */
  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  /**
   * 비밀번호 강도 텍스트
   */
  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return '약함';
    if (passwordStrength === 2) return '보통';
    if (passwordStrength === 3) return '강함';
    return '매우 강함';
  };

  /**
   * 약관 전체 동의 토글
   */
  const handleAllTermsToggle = () => {
    const newValue = !terms.all;
    setTerms({
      all: newValue,
      service: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  /**
   * 개별 약관 동의 토글
   */
  const handleTermToggle = (field: string) => {
    const newTerms = { ...terms, [field]: !terms[field] };
    newTerms.all = newTerms.service && newTerms.privacy && newTerms.marketing;
    setTerms(newTerms);
  };

  /**
   * 회원가입 버튼 클릭 핸들러
   */
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // 최종 유효성 검사
    if (!formData.email || !formData.password || !formData.name || !formData.school) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (Object.values(errors).some(error => error !== '')) {
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }

    if (!terms.service || !terms.privacy) {
      alert('필수 약관에 동의해주세요.');
      return;
    }

    // 회원가입 성공
    onSignup(formData);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        
        {/* ========================================
            로고 섹션
            ======================================== */}
        <div className="signup-logo">
          <div className="signup-logo-icon">
            <BookOpen size={32} />
          </div>
          <h1>회원가입</h1>
          <p>룰룩과 함께 시작하세요</p>
        </div>

        {/* ========================================
            회원가입 폼
            ======================================== */}
        <form className="signup-form" onSubmit={handleSignup}>
          
          {/* 이메일 입력 */}
          <div className="signup-form-group">
            <label htmlFor="email" className="signup-label required">이메일</label>
            <input
              id="email"
              type="email"
              className={`signup-input ${errors.email ? 'error' : ''}`}
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            {errors.email && <span className="signup-error">{errors.email}</span>}
          </div>

          {/* 비밀번호 입력 */}
          <div className="signup-form-group">
            <label htmlFor="password" className="signup-label required">비밀번호</label>
            <input
              id="password"
              type="password"
              className={`signup-input ${errors.password ? 'error' : ''}`}
              placeholder="8자 이상 입력하세요"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            {errors.password && <span className="signup-error">{errors.password}</span>}
            
            {/* 비밀번호 강도 표시 */}
            {formData.password && (
              <>
                <div className="password-strength">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`password-strength-bar ${
                        passwordStrength >= level
                          ? passwordStrength === 1
                            ? 'weak'
                            : passwordStrength === 2
                            ? 'medium'
                            : 'strong'
                          : ''
                      }`}
                    />
                  ))}
                </div>
                <span className="password-strength-text">
                  {getPasswordStrengthText()}
                </span>
              </>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="signup-form-group">
            <label htmlFor="passwordConfirm" className="signup-label required">
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className={`signup-input ${errors.passwordConfirm ? 'error' : ''}`}
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.passwordConfirm}
              onChange={(e) => handleInputChange('passwordConfirm', e.target.value)}
            />
            {errors.passwordConfirm && (
              <span className="signup-error">{errors.passwordConfirm}</span>
            )}
          </div>

          {/* 이름 입력 */}
          <div className="signup-form-group">
            <label htmlFor="name" className="signup-label required">이름</label>
            <input
              id="name"
              type="text"
              className={`signup-input ${errors.name ? 'error' : ''}`}
              placeholder="홍길동"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            {errors.name && <span className="signup-error">{errors.name}</span>}
          </div>

          {/* 학교 선택 */}
          <div className="signup-form-group">
            <label htmlFor="school" className="signup-label required">학교</label>
            <select
              id="school"
              className="signup-select"
              value={formData.school}
              onChange={(e) => handleInputChange('school', e.target.value)}
            >
              <option value="">학교를 선택하세요</option>
              {schools.map((school) => (
                <option key={school} value={school}>
                  {school}
                </option>
              ))}
            </select>
          </div>

          {/* 약관 동의 */}
          <div className="signup-terms">
            <div className="signup-checkbox-wrapper">
              <input
                type="checkbox"
                id="terms-all"
                className="signup-checkbox"
                checked={terms.all}
                onChange={handleAllTermsToggle}
              />
              <label htmlFor="terms-all" className="signup-checkbox-label all">
                전체 동의
              </label>
            </div>
            
            <div className="signup-terms-divider" />
            
            <div className="signup-checkbox-wrapper">
              <input
                type="checkbox"
                id="terms-service"
                className="signup-checkbox"
                checked={terms.service}
                onChange={() => handleTermToggle('service')}
              />
              <label htmlFor="terms-service" className="signup-checkbox-label">
                [필수] 서비스 이용약관
              </label>
            </div>
            
            <div className="signup-checkbox-wrapper">
              <input
                type="checkbox"
                id="terms-privacy"
                className="signup-checkbox"
                checked={terms.privacy}
                onChange={() => handleTermToggle('privacy')}
              />
              <label htmlFor="terms-privacy" className="signup-checkbox-label">
                [필수] 개인정보 처리방침
              </label>
            </div>
            
            <div className="signup-checkbox-wrapper">
              <input
                type="checkbox"
                id="terms-marketing"
                className="signup-checkbox"
                checked={terms.marketing}
                onChange={() => handleTermToggle('marketing')}
              />
              <label htmlFor="terms-marketing" className="signup-checkbox-label">
                [선택] 마케팅 정보 수신 동의
              </label>
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <button type="submit" className="signup-button">
            회원가입
          </button>
        </form>

        {/* ========================================
            로그인 링크
            ======================================== */}
        <div className="signup-footer">
          이미 계정이 있으신가요?{' '}
          <span className="signup-footer-link" onClick={onLoginClick}>
            로그인
          </span>
        </div>
      </div>
    </div>
  );
}
