'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ⭐️ 여기가 수정되었습니다.
import Link from 'next/link';
import { ArrowLeft, Camera } from 'lucide-react';

export default function EditProfilePage() {
    const router = useRouter();

    // 입력 폼 상태
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatarLetter, setAvatarLetter] = useState('');

    useEffect(() => {
        // 1. 저장된 정보 불러오기
        const storedEmail = localStorage.getItem('userEmail');
        const storedName = localStorage.getItem('userName'); // 이름도 저장했다면 불러옴

        if (storedEmail) {
            setEmail(storedEmail);
            // 이름이 따로 없으면 이메일 앞부분 사용
            const defaultName = storedEmail.split('@')[0];
            setName(storedName || defaultName);
            setAvatarLetter((storedName || defaultName).charAt(0).toUpperCase());
        } else {
            // 로그인 정보 없으면 튕겨내기
            router.replace('/login');
        }
    }, [router]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        if (!name.trim() || !email.trim()) {
            alert('이름과 이메일을 입력해주세요.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('올바른 이메일 형식을 입력해주세요.');
            return;
        }

        // 2. 정보 저장 (localStorage 업데이트)
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name); // 이름 별도 저장

        alert('프로필이 수정되었습니다.');
        router.push('/profile'); // 프로필 페이지로 이동
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            <div className="max-w-[393px] mx-auto bg-white min-h-screen">

                {/* 헤더 */}
                <div className="sticky top-0 bg-white z-10 px-4 py-4 flex items-center gap-3 border-b border-gray-100">
                    <Link href="/profile" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-gray-700" />
                    </Link>
                    <h1 className="text-lg font-bold text-gray-900">프로필 수정</h1>
                </div>

                <div className="p-6">
                    {/* 아바타 섹션 */}
                    <div className="flex flex-col items-center mb-8 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-md">
                            {avatarLetter}
                        </div>
                        <button
                            type="button"
                            onClick={() => alert('프로필 사진 변경 기능은 준비 중입니다.')}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                        >
                            <Camera size={16} />
                            프로필 사진 변경
                        </button>
                    </div>

                    {/* 수정 폼 */}
                    <form onSubmit={handleSave} className="flex flex-col gap-6">

                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-semibold text-gray-700">이름</label>
                            <input
                                id="name"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름을 입력하세요"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-700">이메일</label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                            />
                            <p className="text-xs text-gray-400 pl-1">
                                * 이메일을 변경하면 로그인 아이디도 변경됩니다.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 opacity-60">
                            <label htmlFor="password" className="text-sm font-semibold text-gray-700">비밀번호</label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 cursor-not-allowed"
                                value="••••••••"
                                disabled
                            />
                            <p className="text-xs text-gray-400 pl-1">
                                비밀번호 변경은 현재 지원하지 않습니다.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                        >
                            저장하기
                        </button>
                    </form>
                </div>

            </div>
        </main>
    );
}