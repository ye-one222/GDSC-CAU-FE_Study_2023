import { Link, useParams } from 'react-router-dom'
import { DIARYKEY, formatDate  } from '../../../app/page'
import { Diary } from '../../../interface/diary'
import { useEffect, useState } from 'react'

type EmotionPageParams = {
    emotion: string
}

interface EmotionProps {
    feeling: string;
}

const Emotion: React.FC<EmotionProps> = ({ feeling }) => {
    let emoji: string;
    let color: string;
    let description: string;

    if (feeling === "awesome") {
        emoji = "😎"
        color = "yellow"
        description = "최고의 하루였어요"
    } else if (feeling === "great") {
        emoji="😃"
        color="blue"
        description="멋진 하루였어요"
    } else if (feeling === "good") {
        emoji="😙"
        color="green"
        description="좋은 하루였어요"
    } else if (feeling === "soso") {
        emoji="😗"
        color="purple"
        description="괜찮은 하루였어요"
    } else {
        emoji="🤬"
        color="red"
        description="최악의 하루였어요!"
    }

    return (
        <div className="flex flex-row gap-5 items-center justify-center">
            <div className={`text-6xl py-5 p-2 rounded-2xl border bg-${color}-50 border-${color}-100`} > {/* 이건 또 왜 되는겨 */}
                {emoji}
            </div>
            <h1 className="text-3xl font-medium">{description}</h1>
        </div>
    );
}

export default function EmotionPage() {
    const { emotion } = useParams<EmotionPageParams>()
    const storedData: Diary[] = JSON.parse(localStorage.getItem(DIARYKEY)!) || [];
    const resultData: Diary[] = storedData.filter(user => user.emotion === emotion);
    const [selectedIDs, setSelectedIDs] = useState<string[]>([]);
    const [isValid, setValid] = useState(false);
    const isResultDataExists = resultData.length > 0;
    
    function deleteDiaries() {
        const updatedData = storedData.filter(diary => !selectedIDs.includes(diary.id));
        localStorage.setItem(DIARYKEY, JSON.stringify(updatedData));

        window.location.reload(); //일단 새로고침되도록 했는데, 다른 방법 찾아보기
    }

    useEffect(() => {
        setValid(selectedIDs.length > 0);
      }, [selectedIDs]);

    return (    
        <div className="flex flex-col gap-10 w-full md:w-2/3 items-start">
            <div className="flex flex-row gap-5 items-center justify-center">
                <Emotion
                    feeling={emotion!} //undefined이면 어떻게?? 근데 undefined일수가 없으니까 일단 !붙여
                />
            </div>

            {resultData.map((diary, index) => (
                <div className="flex flex-row items-center justify-between gap-4 w-full border border-gray-100 rounded-lg p-2">
                    <input
                        type="checkbox"
                        className="w-4 h-4 accent-gray-50"
                        onChange={({target: {checked}})=> {
                            if(checked){
                                setSelectedIDs((prevSelectedIDs) => [...prevSelectedIDs, diary.id]);
                            }else{
                                setSelectedIDs((prevSelectedIDs) =>
                                    prevSelectedIDs.filter((id) => id !== diary.id)
                                );
                            }
                        }}
                    />
                    <Link to={`/detail/${diary.id}`} key={diary.id} className="flex flex-row items-center justify-between gap-4 w-full rounded-lg hover:bg-gray-100">
                        <div>{diary.title}</div>
                        <div className="flex flex-row gap-2 justify-center items-center">
                            <span className="text-gray-400">{formatDate(diary.date)}</span>
                            <span className="text-gray-400">조회수: {diary.views}</span>
                        </div>
                    </Link>
                </div>
            ))}
            {isResultDataExists ? 
                <button 
                    className={`p-2 rounded-lg border border-transparent ${isValid ? 'bg-red-100 text-red-600 hover:border-red-600 w-full' : 'bg-gray-100 text-gray-600 hover:border-gray-600 w-full'}`}
                    onClick={deleteDiaries}
                    disabled={!isValid}
                >
                    {isValid ? `선택된 ${selectedIDs.length}개의 일기를 삭제합니다` : '선택된 일기가 없습니다'}
                </button>
            : 
                <div className="text-gray-400">아직 적지 않았어요</div>
            }
        </div>
    )
}
