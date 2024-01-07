import { useEffect, useState } from 'react';

const DiaryWriter = () => {
    const [title, setTitle]=useState('');
    const [contents, setContents]=useState('');
    const feelings = ['bad', 'soso','good','great','awesome'];
    const [selectedFeeling, setSelectedFeeling] = useState('');
    const weathers = ['cloud', 'rain','snow','sunny'];
    const [selectedWeather, setSelectedWeather] = useState('');
    const [isValid, setValid] = useState(false);

    const handleFeelingClick = (feeling:string) => {
        setSelectedFeeling(feeling);
    }

    const handleWeatherClick = (weather:string) => {
        setSelectedWeather(weather);
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value)
    }

    useEffect(() => {
        const invalidDiary =
            selectedFeeling === '' || selectedWeather === '' || title.length <= 2 || contents.length <= 5

        setValid(!invalidDiary)
    }, [title, contents, feelings, weathers])

    return (
        <form id="write-form" className="flex-col gap-4 p-4 rounded-lg bg-white border border-gray-100 h-2/3">
        <input
            required
            type="text" 
            //name="title" 
            placeholder="제목을 적어보세요" 
            className="text-2xl p-2 mt-4 rounded-lg border border-black-100 w-full"
            onChange={handleTitleChange}/>
        
        <div className="flex mt-6 gap-2">
            {feelings.map((feeling,index)=>(
                <button
                key={index}
                type="button"
                className={`p-1 rounded-lg text-sm ${selectedFeeling === feeling ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}
                name="feeling"
                value={feeling}
                onClick={()=>handleFeelingClick(feeling)}>
                    {feeling}
                </button>
            ))}
        </div>
        {/* 날씨 버튼 묶기 */}
        <div className="flex mt-2 mb-6 gap-2">
            {weathers.map((weather,index)=>(
                <button 
                key={index} 
                type="button" 
                className={`p-1 rounded-lg text-sm ${selectedWeather === weather ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
                name="weather" 
                value={weather}
                onClick={()=>handleWeatherClick(weather)}>
                    {weather}
                </button>
            ))}
        </div>
        
        <textarea 
            required 
            //name="content" 
            placeholder="오늘 당신의 하루는 어땠나요?" 
            className="p-1 rounded-lg resize-none border border-black-100 h-1/2 w-full"
            onChange={handleContentsChange}/>
        <div>
            <button 
                type="submit"
                className={`p-2 rounded-lg w-full ${isValid ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}
            >
                {isValid ? '일기를 저장해 보아요' : '일기를 더 자세히 적어볼까요?'}
            </button>
        </div>
    </form>     
    )
}

export default function DiaryHomePage() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 h-full md:grid md:grid-rows-1 md:grid-cols-[3fr,2fr] md:w-4/5 lg:w-2/3">
            {/* 첫화면 왼쪽 박스 */}
            <DiaryWriter />
            
            {/* 첫화면 오른쪽 박스 */}
            <div className="flex-col gap-4 p-4 rounded-lg bg-white border border-gray-100 h-2/3">
                <h1 className="text-xl text-emerald-600">기록된 일기</h1>
                <div className="flex flex-col items-center justify-center h-5/6">
                    <p className="text-gray-400">일기를 적어보세요</p>
                </div>
                <button type="submit" className="p-2 rounded-lg bg-emerald-100 text-emerald-600 w-full">감정 모아보기</button>
            </div>
        </div>
    );
}