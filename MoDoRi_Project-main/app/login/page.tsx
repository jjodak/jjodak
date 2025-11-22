'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        // 백엔드 연동 전 임시 로그인 처리
        console.log('로그인 시도:', email);
        localStorage.setItem('userEmail', email); // 프로필 페이지에서 보여주기 위해 저장
        router.push('/'); // 로그인 후 홈으로 이동
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-br from-blue-600 to-blue-700">
            <div className="w-full max-w-[360px] bg-white rounded-2xl p-8 shadow-xl">

                {/* 로고 섹션 */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                        <BookOpen size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-blue-600 mb-1">룰룩</h1>
                    <p className="text-sm text-gray-500">Rule-Look</p>
                </div>

                {/* 로그인 폼 */}
                <form onSubmit={handleLogin} className="flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">이메일</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder:text-gray-400"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all placeholder:text-gray-400"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">
                            아이디 저장
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors active:scale-[0.98]"
                    >
                        로그인
                    </button>
                </form>

                {/* 회원가입 링크 */}
                <div className="text-center mt-6 text-sm text-gray-500">
                    아직 계정이 없으신가요?{' '}
                    <Link href="/signup" className="text-blue-600 font-semibold hover:underline hover:text-blue-700">
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    );
}