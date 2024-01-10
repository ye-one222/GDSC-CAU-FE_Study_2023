import { useParams } from 'react-router-dom'

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
    return (
    
    <div className="flex flex-col gap-10 w-full md:w-2/3 items-start">
            <div className="flex flex-row gap-5 items-center justify-center">
                <Emotion
                    feeling={emotion!} //undefined이면 어떻게?? 근데 undefined일수가 없으니까 일단 !붙여
                />
            </div>
            <div>
                이제 해야한당..
            </div>
    </div>
    )
}
