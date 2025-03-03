import React, { useState } from "react";

const categories = {
    "건강 및 생활 습관": ["수면 시간", "카페인 섭취량", "물 섭취량", "병원 방문 횟수", "대기오염 지수"],
    "소비 및 경제": ["날씨(기온, 강수량 등)", "배달 주문량", "온라인 쇼핑 빈도", "외식 횟수", "편의점 이용 빈도"],
    "환경 및 대기오염": ["미세먼지 농도", "쓰레기 배출량", "전기 사용량", "수돗물 사용량", "재활용률"],
    "교통 및 이동": ["대중교통 이용률", "자전거 이용 빈도", "교통비 지출", "유가 변동", "도로 교통량"],
    "식품 및 영양": ["식품 물가 변동", "채소 과일 소비량", "가공식품 소비량", "패스트푸드 섭취 빈도", "음료(탄산, 커피 등) 소비량"],
    "기후 및 날씨 영향": ["기온 변화", "강수량 변화", "자외선 지수", "폭염 일수", "황사 발생 빈도"],
    "에너지 및 자원": ["전기차 충전소 이용률", "전력 소비량", "도시가스 사용량", "태양광 발전량", "수력 풍력 발전량"],
    "문화 및 여가": ["공원 방문 횟수", "영화 관람객 수", "도서관 이용 빈도", "콘서트 공연 관람 횟수", "스포츠 경기 관람 횟수"]
};

export default function KeywordSelector() {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState({});

    const handleCategorySelect = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else if (selectedCategories.length < 2) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const generateKeywords = () => {
        const keywords = {};
        selectedCategories.forEach((category) => {
            const words = categories[category];
            keywords[category] = words[Math.floor(Math.random() * words.length)];
        });
        setSelectedKeywords(keywords);
    };

    const resetSelection = () => {
        setSelectedCategories([]);
        setSelectedKeywords({});
    };

    return (
        <div className="p-4 max-w-md mx-auto text-center">
            <h2 className="text-xl font-bold mb-4">카테고리 선택</h2>
            <div className="mb-4 text-lg font-semibold">
                <p>첫 번째 카테고리: {selectedCategories[0] || "선택되지 않음"}</p>
                <p>두 번째 카테고리: {selectedCategories[1] || "선택되지 않음"}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.keys(categories).map((category) => (
                    <button
                        key={category}
                        className={`p-2 border rounded-lg ${selectedCategories.includes(category) ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => handleCategorySelect(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <button
                className="bg-green-500 text-white p-2 rounded-lg mt-2 mr-2"
                onClick={generateKeywords}
                disabled={selectedCategories.length !== 2}
            >
                키워드 선택하기
            </button>
            <button
                className="bg-red-500 text-white p-2 rounded-lg mt-2"
                onClick={resetSelection}
            >
                다시하기
            </button>
            <div className="mt-4">
                {Object.entries(selectedKeywords).map(([category, keyword]) => (
                    <p key={category} className="text-lg font-semibold">{category}: {keyword}</p>
                ))}
            </div>
        </div>
    );
}
