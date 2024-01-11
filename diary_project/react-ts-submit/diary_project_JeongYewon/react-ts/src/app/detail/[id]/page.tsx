import { Link, useParams } from 'react-router-dom'
import { Diary } from '../../../interface/diary'
import { DIARYKEY } from '../../../app/page'

type DiaryDetailPageParams = {
    id: string
}

const formatDate = (date: Date): string => {
    const strDate = date.toString();

    const year = strDate.substring(0,4);
    const month = strDate.substring(5,7);
    const day = strDate.substring(8,10);
    return `${year}년 ${month}월 ${day}일`;
};

export default function DiaryDetailPage() {
    const { id } = useParams<DiaryDetailPageParams>()
    const storedData: Diary[] = JSON.parse(localStorage.getItem(DIARYKEY)!) || [];

    function diaryTitle(id: string) {
        const diary = storedData.find(item => item.id===id);
        return (
            <h1 className="text-4xl font-medium">{diary?.title}</h1>
        )
    }

    function diaryContents(id: string) {
        const diary = storedData.find(item => item.id===id);
        return (
            <div className="text-base text-gray-800 h-2/3">{diary?.content}</div>
        )
    }

    function diaryDate(id: string) {
        const diary = storedData.find(item => item.id===id);
        return (
            <button className="flex-grow p-0.5 rounded-lg text-sm bg-gray-100 text-gray-400 border border-transparent hover:text-gray-600 hover:border-gray-600">{formatDate(diary.date)}</button>
        )
    }

    function diaryWeather(id: string) {
        const diary = storedData.find(item => item.id===id);
        return (
            <button className="flex-grow p-0.5 rounded-lg text-sm bg-gray-100 text-gray-400 border border-transparent hover:text-gray-600 hover:border-gray-600">{diary?.weather}</button>
        )
    }

    function diaryEmotion(id: string) {
        const diary = storedData.find(item => item.id===id);
        return (
            <Link to={`/emotions/${diary?.emotion}`} className="flex-grow">
                <button className="w-full p-0.5 rounded-lg text-sm bg-gray-100 text-gray-400 border border-transparent hover:text-gray-600 hover:border-gray-600">{diary?.emotion}</button>
            </Link>
        )
    }
    function deleteDiary() {
        localStorage.setItem(DIARYKEY,JSON.stringify(storedData.filter(user => user.id !== id)));
    }

    return (
        <div className="w-2/4 h-full py-20">
            <div className="flex flex-col gap-4 my-9">
                {diaryTitle(id!)}
                <div className="flex flex-row gap-2">
                    {diaryDate(id!)}
                    {diaryWeather(id!)}
                    {diaryEmotion(id!)}
                </div>
            </div>

            {diaryContents(id!)}

            <div className="w-full flex flex-row gap-2">
                <Link to="/" className="w-full">
                    <button className="p-2 rounded-lg bg-emerald-100 text-emerald-600 hover:border hover:border-emerald-600 w-full">
                        새로운 일기 작성하기
                    </button>
                </Link>
                <Link to="/" className="w-full">
                    <button 
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:border hover:border-red-600 w-full"
                        onClick={deleteDiary}
                    >
                        현재 일기 삭제하기
                    </button>
                </Link>
            </div>
        </div>            
    )
}
