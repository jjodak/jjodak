'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { School, Search, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

// 학교 목록 데이터
const schools = [
    { code: 'dongyang', name: '동양미래대학교' },
    { code: 'hanyang', name: '한양대학교' },
    { code: 'seoultech', name: '서울과학기술대학교' },
    { code: 'ansan', name: '안산대학교' },
    { code: 'soonchunhyang', name: '순천향대학교' },
];

interface SchoolSelectorProps {
    backUrl?: string;
    isEditMode?: boolean; // ⭐️ 수정 모드인지 확인하는 변수 추가
}

export default function SchoolSelector({ backUrl = '/', isEditMode = false }: SchoolSelectorProps) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 학교 클릭 시 처리 함수
    const handleSchoolClick = (schoolName: string) => {
        if (isEditMode) {
            // 1. 로컬 스토리지에 변경된 학교 저장 (선택 사항)
            localStorage.setItem('mySchool', schoolName);

            // 2. 알림 띄우기
            alert(`${schoolName}로 변경 완료 했습니다.`);

            // 3. 프로필 페이지로 복귀
            router.push('/profile');
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-6 pb-24">
            {/* 헤더 영역 */}
            <div className="flex items-center gap-2 mb-4 -ml-2 p-2 text-gray-600">
                <Link href={backUrl} className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1 transition-colors">
                    <ArrowLeft size={20} />
                    <span>뒤로가기</span>
                </Link>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">학교 선택</h2>
                <p className="text-sm text-gray-500">
                    {isEditMode ? "변경할 학교를 선택해주세요" : "학칙을 조회할 학교를 선택해주세요"}
                </p>
            </div>

            {/* 검색창 */}
            <div className="relative mb-6">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                />
                <input
                    type="text"
                    placeholder="학교명을 검색하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                />
            </div>

            {/* 학교 목록 그리드 */}
            <div className="grid grid-cols-2 gap-4">
                {filteredSchools.map((school) => {
                    // 공통 디자인 클래스
                    const cardClass = "flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-blue-600 hover:shadow-md hover:-translate-y-0.5 transition-all text-center decoration-0";

                    // 카드 내부 내용
                    const cardContent = (
                        <>
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <School size={24} />
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                                {school.name}
                            </div>
                        </>
                    );

                    // ⭐️ 수정 모드일 때는 div(클릭 이벤트), 아닐 때는 Link(페이지 이동)
                    return isEditMode ? (
                        <div
                            key={school.code}
                            onClick={() => handleSchoolClick(school.name)}
                            className={cardClass}
                        >
                            {cardContent}
                        </div>
                    ) : (
                        <Link
                            key={school.code}
                            href={`/chat/${school.code}`}
                            className={cardClass}
                        >
                            {cardContent}
                        </Link>
                    );
                })}

                {filteredSchools.length === 0 && (
                    <div className="col-span-2 py-12 text-center text-gray-500">
                        <School size={48} className="mx-auto mb-3 opacity-30" />
                        <p>검색 결과가 없습니다</p>
                    </div>
                )}
            </div>
        </div>
    );
}