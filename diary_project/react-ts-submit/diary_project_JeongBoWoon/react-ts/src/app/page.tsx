//tailwind 사용 : css 프레임워크 -> 태그 안에 css속성넣기 

import React,{ useState} from "react";

const TitleComponent:React.FC=()=>{
    const titleStyle: React.CSSProperties={
        padding: '10px 80px',
        fontSize:'20px',
        marginBottom:'10px',
    }
    const [inputValue, setInputValue] = useState<string>('');   //초기값 설정
        
    const handleContextSubmit = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setInputValue(event.target.value);
    };
    
    return <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleContextSubmit}
                placeholder="제목을 적어보세요"
                style={titleStyle}
            />
    </div>;
}

const BtnComponent:React.FC<{ myValue: string}>=({ myValue }) => {
    
    if(myValue.length>15){  //final submit button
        const buttonStyle: React.CSSProperties={
            padding: '10px 80px',
        }
        return <span>
                <button style={buttonStyle} className="text-zinc-400 bg-zinc-100 rounded-[7px]">{myValue}</button><span>  </span>
            </span>;
    }else{  //feelings, weathers
        const buttonStyle: React.CSSProperties={
            padding: '1px 5px',
            marginBottom: '10px',
        };
        return (
            <span>
                <button style={buttonStyle} className="text-zinc-400 bg-zinc-100 rounded-[7px]">{myValue}</button><span>  </span>
            </span>
        );
    }
};

function Weather(){
    return <div>
            <BtnComponent myValue={"cloud"}/>
            <BtnComponent myValue={"rain"}/>
            <BtnComponent myValue={"snow"}/>
            <BtnComponent myValue={"sunny"}/>
        </div>;
}

function Feelings(){
    return <div>
            <BtnComponent myValue={"bad"}/>
            <BtnComponent myValue={"soso"}/>
            <BtnComponent myValue={"good"}/>
            <BtnComponent myValue={"great"}/>
            <BtnComponent myValue={"awesome"}/>
        </div>;
}

const CdntentComponent :React.FC = ()=>{
    const [inputValue, setInputValue] = useState<string>('');   //초기값 설정
    
    const handleContextSubmit = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setInputValue(event.target.value);
    };

    return <div>
            <textarea
                value={inputValue}
                onChange={handleContextSubmit}
                placeholder="오늘의 당신의 하루는 어땠나요?"
                rows={8}
                cols={48}
                />
    </div>;
    
}
export default function DiaryHomePage() {
    return (
        <div className="flex flex-row" >
            <div><TitleComponent/>
            <Feelings/>
            <Weather/>

            <CdntentComponent/>
            <BtnComponent myValue={"일기를 더 자세히 적어볼까요?"}/>
            </div>
            <div>
                <TitleComponent/>
                <Feelings/>
                <Weather/>

                <CdntentComponent/>
                <BtnComponent myValue={"일기를 더 자세히 적어볼까요?"}/>
            </div>
            
        </div>
    );
}