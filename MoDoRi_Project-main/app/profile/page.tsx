'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, School, CircleHelp, Shield, LogOut, Trash2, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('Guest');

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedName = localStorage.getItem('userName');

        if (storedEmail) {
            setUserEmail(storedEmail);
            setUserName(storedName || storedEmail.split('@')[0]);
        } else {
            router.replace('/login');
        }
    }, [router]);

    const avatarLetter = userName.charAt(0).toUpperCase();

    const handleLogout = () => {
        if (confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            window.location.href = '/login';
        }
    };

    const handleDeleteAccount = () => {
        if (confirm('정말로 계정을 탈퇴하시겠습니까?')) {
            localStorage.clear();
            alert('탈퇴되었습니다.');
            window.location.href = '/login';
        }
    };

    const MenuSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-6">
            <div className="text-sm font-semibold text-gray-500 mb-3 pl-2">{title}</div>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                {children}
            </div>
        </div>
    );

    const MenuItem = ({ icon: Icon, text, onClick, isDanger = false }: any) => (
        <div
            onClick={onClick}
            className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-0 cursor-pointer transition-colors hover:bg-gray-50 active:bg-gray-100`}
        >
            <div className="flex items-center gap-3">
                <Icon size={20} className={isDanger ? "text-red-500" : "text-gray-500"} />
                <span className={`text-sm font-medium ${isDanger ? "text-red-500" : "text-gray-700"}`}>{text}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
        </div>
    );

    return (
        <main className="flex-1 p-6 pb-24 bg-gray-50 min-h-screen">
            <div className="max-w-[393px] mx-auto">
                {/* 헤더 */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">프로필</h2>
                    <p className="text-sm text-gray-500">계정 정보 및 설정을 관리하세요</p>
                </div>

                {/* 프로필 카드 */}
                <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-2xl font-semibold shadow-md">
                            {avatarLetter}
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-800 mb-1">{userName}</div>
                            <div className="text-sm text-gray-500">{userEmail}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                        {['작성한 글', '댓글', '좋아요'].map((label) => (
                            <div key={label} className="text-center">
                                <div className="text-2xl font-bold text-blue-600 mb-1">0</div>
                                <div className="text-xs text-gray-500">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 메뉴 섹션 */}
                <MenuSection title="계정 설정">
                    <MenuItem icon={User} text="프로필 수정" onClick={() => router.push('/profile/edit')} />

                    {/* ⭐️ [핵심] 학교 변경 시 '?from=profile' 꼬리표를 붙여줍니다 */}
                    <MenuItem
                        icon={School}
                        text="학교 변경"
                        onClick={() => router.push('/select-school?from=profile')}
                    />
                </MenuSection>

                <MenuSection title="기타">
                    <MenuItem icon={CircleHelp} text="도움말" onClick={() => router.push('/help')} />
                    <MenuItem icon={Shield} text="개인정보 처리방침" onClick={() => router.push('/privacy')} />
                </MenuSection>

                <div className="mt-8">
                    <div className="text-sm font-semibold text-red-500 mb-3 pl-2">위험 영역</div>
                    <div className="bg-white rounded-xl overflow-hidden border border-red-100 shadow-sm">
                        <MenuItem icon={LogOut} text="로그아웃" onClick={handleLogout} isDanger />
                        <MenuItem icon={Trash2} text="계정 탈퇴" onClick={handleDeleteAccount} isDanger />
                    </div>
                </div>

                <div className="text-center mt-8 p-4 text-xs text-gray-400">
                    룰룩 Rule-Look v1.0.0
                </div>
            </div>
        </main>
    );
}