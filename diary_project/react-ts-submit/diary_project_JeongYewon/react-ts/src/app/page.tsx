import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Diary } from '../interface/diary'

export const DIARYKEY = "diary-storage";

/*interface Diary {
    id: string;
    title: string;
    content: string;
    date: Date;
    emotion: string;
    weather: string;
}*/

interface SaverProps{
    valid: boolean, 
    title: string, 
    contents: string, 
    selectedFeeling: string, 
    selectedWeather: string
}

const DiarySaver: React.FC<SaverProps> = ({valid, title, contents, selectedFeeling, selectedWeather}) => {
    const isValid = valid;

    function saveDiary() {
        /*
        setDiarySet(JSON.parse(localStorage.getItem("diary-storage")));

        const newDiaryObj: Diary = {
            id : window.crypto.randomUUID(),
            title : title,
            content : contents,
            date : new Date(),
            emotion : selectedFeeling!,
            weather : selectedWeather!,
        };

        setDiarySet(prev => [...prev, newDiaryObj]);
        aler(diarySet);
        localStorage.setItem("diary-storage", JSON.stringify([...diarySet, newDiaryObj])); // [0] 자리에 계속 덮어씌워짐.. 왜지 아마 비동기 때문?*/
        
        const storedData: Diary[] = JSON.parse(localStorage.getItem(DIARYKEY)!) || []; //local..()뒤에 ! 붙이면 되나? 막 남발하면 안된다는데
        const newDiaryObj = {
            id : window.crypto.randomUUID(),
            title : title,
            content : contents,
            date : new Date(),
            emotion : selectedFeeling!,
            weather : selectedWeather!,
            views : 1
        };
        
        localStorage.setItem(DIARYKEY, JSON.stringify([...storedData, newDiaryObj]));
    }

    return (
        <button 
            type="submit"
            className={`p-2 rounded-lg w-full border border-transparent ${isValid ? 'bg-emerald-100 text-emerald-600 hover:border-emerald-600' : 'bg-gray-100 text-gray-400 hover:text-gray-600 hover:border-gray-600'}`}
            disabled={!isValid}
            onClick={saveDiary}
        >
            {isValid ? '일기를 저장해 보아요' : '일기를 더 자세히 적어볼까요?'}
        </button>
    )
}

export const formatDate = (date: Date): string => {
    const strDate = date.toString();

    const year = strDate.substring(0,4);
    const month = strDate.substring(5,7);
    const day = strDate.substring(8,10);
    return `${year}. ${month}. ${day}.`;
};

const DiaryCard = () => {
    const storedData: Diary[] = JSON.parse(localStorage.getItem(DIARYKEY)!) || [];
    
    const emotionToEmoji = ( emotion: string ) => {
        var emoji;
        if (emotion === "bad"){
            emoji = "🤬";
        } else if (emotion === "soso"){
            emoji = "😗";
        } else if (emotion === "good"){
            emoji = "😙";
        } else if (emotion === "great"){
            emoji = "😃";
        } else {
            emoji = "😎";
        }
        return (
            <div>{emoji}</div>
        );
    }

    const weatherToEmoji = ( weather: string ) => {
        var emoji;
        if (weather === "cloud"){
            emoji = "☁";
        } else if (weather === "rain"){
            emoji = "🌧";
        } else if (weather === "snow"){
            emoji = "❄";
        } else {
            emoji = "☀";
        }
        return (
            <div>{emoji}</div>
        );
    }

    return(
        <div className="flex flex-col overflow-y-auto gap-2 w-full h-96 max-h-96">
            {storedData.length===0 && (
                <p className="flex items-center text-gray-400">일기를 적어보세요</p>
            )}
            {storedData.map((diary, index) => (
                <Link to={`detail/${diary.id}`} key={diary.id}>
                <button className="w-full flex flex-col items-start justify-center gap-1.5 p-3 hover:bg-gray-50 border border-gray-100 rounded-lg">
                    <h1>{diary.title}</h1>
                    <div className="flex flex-row items-center justify-between gap-1 w-full">
                        <span className="text-gray-400 text-sm">{formatDate(diary.date)}</span>
                        <div className="flex flex-row gap-1s">
                            {emotionToEmoji(diary.emotion)}
                            {weatherToEmoji(diary.weather)}
                        </div>
                    </div>
                </button>
                </Link>
            ))}
        </div>
    );
};

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
                className="text-2xl p-2 mt-4 rounded-lg border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-100 focus:border-transparent w-full"
                onChange={handleTitleChange}/>
            
            <div className="flex mt-6 gap-2">
                {feelings.map((feeling,index)=>(
                    <button
                    key={index}
                    type="button"
                    className={`p-1 rounded-lg text-sm border border-transparent ${selectedFeeling === feeling ? 'bg-emerald-100 text-emerald-600 hover:border-emerald-600' : 'bg-gray-100 text-gray-400 hover:text-gray-600 hover:border-gray-600'}`} //테두리가 나타날 때 버튼 크기도 변하는데 어떻게 고정하나용..
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
                    className={`p-1 rounded-lg text-sm border border-transparent ${selectedWeather === weather ? 'bg-blue-100 text-blue-600 hover:border-blue-600' : 'bg-gray-100 text-gray-400'} hover:text-gray-600 hover:border-gray-600`}
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
                className="p-1 rounded-lg resize-none border border-transparent focus:outline-none focus:ring-1 focus:ring-gray-100 focus:border-transparent h-1/2 w-full mb-2"
                onChange={handleContentsChange}/>
            <div>
                <DiarySaver
                    valid={isValid}
                    title={title}
                    contents={contents}
                    selectedFeeling={selectedFeeling}
                    selectedWeather={selectedWeather}
                />
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
            <div className="flex flex-col gap-4 p-4 rounded-lg bg-white border border-gray-100 h-2/3 min-h-[20rem]">
                <h1 className="text-xl text-emerald-600 mt-5">기록된 일기</h1>
                <DiaryCard />
                <Link to="/emotions">
                    <button type="submit" className="p-2 rounded-lg bg-emerald-100 text-emerald-600 w-full border border-transparent hover:border-emerald-600">감정 모아보기</button>
                </Link>
            </div>
        </div>
    );
}