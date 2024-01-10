import { Link } from "react-router-dom";

interface EmojiBtnProps{
    toPath: string, 
    color: string, 
    emoji: string, 
    title: string, 
    description: string
}

const EmojiLinkButton: React.FC<EmojiBtnProps> = ({ toPath, color, emoji, title, description }) => { //타입 지정 어떻게 하지
    return (
        <Link to={toPath}>
            <button 
                className="group p-4 flex rounded-2xl border border-gray-50 hover:scale-110 hover:shadow-2xl transition-transform ease-in-out duration-400"
            >
                <div className={`text-6xl py-5 p-2 rounded-2xl border bg-${color}-50 border-${color}-100 group-hover:shadow-inner`} >
                    {emoji}
                </div>
                <div className="flex flex-col items-start justify-center w-full m-4">
                    <h1 className="text-2xl">{title}</h1>
                    <span className="text-ml text-gray-400">{description}</span>
                </div>
            </button>
        </Link>
    );
}

export default function EmotionLinkPage() {
    return (
        <div className="flex flex-col items-start justify-center gap-10">
            <div className="flex flex-col items-start justify-center gap-3">
                <h1 className="text-3xl text-gray-800 font-semibold">감정 상자</h1>
                <span className="text-gray-400">나만의 감정을 돌아보고 생각에 잠겨보아요 :)</span>
            </div>

            <div className="grid grid-cols-2 grid-rows-1 gap-5 items-start justify-center">
                <EmojiLinkButton
                toPath="/emotions/awesome"
                color="yellow"
                emoji="😎"
                title="Awesome"
                description="최고의 하루였어요"
                />

                <EmojiLinkButton
                toPath="/emotions/great"
                color="blue"
                emoji="😃"
                title="Great"
                description="멋진 하루였어요"
                />

                <EmojiLinkButton
                toPath="/emotions/good"
                color="green"
                emoji="😙"
                title="Good"
                description="좋은 하루였어요"
                />

                <EmojiLinkButton
                toPath="/emotions/soso"
                color="purple"
                emoji="😗"
                title="Soso"
                description="괜찮은 하루였어요"
                />

                <EmojiLinkButton
                toPath="/emotions/bad"
                color="red"
                emoji="🤬"
                title="Bad"
                description="최악의 하루였어요"
                />
            </div>
        </div>
    )
}
