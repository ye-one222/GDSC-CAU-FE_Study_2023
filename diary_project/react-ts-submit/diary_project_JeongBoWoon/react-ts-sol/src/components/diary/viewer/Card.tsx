import { Diary } from '../../../interface/diary'
import { Link } from '../../common/Link'
import { tw, util } from '../../../styles'
import { dateFormat } from '../../../utils'

const icon = tw.style({
    width: 'w-6',
    height: 'h-6',
    padding: 'p-1',

    display: 'flex',
    alignItems: 'items-center',
    justifyContent: 'justify-center',

    borderRadius: 'rounded-full',
    borderWidth: 'border',
    borderColor: 'border-gray-100',
})

const emotionsEmoji: Record<Diary['emotion'], string> = {
    awesome: '😎',
    great: '😃',
    good: '😙',
    soso: '😗',
    bad: '🤬',
}
const DiaryEmotion = ({ emotion }: { emotion: Diary['emotion'] }) => {
    const emoji = emotionsEmoji[emotion]
    return <div className={icon.class}>{emoji}</div>
}
const weatherEmoji: Record<Diary['weather'], string> = {
    sunny: '☀️',
    cloud: '☁️',
    rain: '🌧',
    snow: '❄️',
}
const Weather = ({ weather }: { weather: Diary['weather'] }) => {
    const emoji = weatherEmoji[weather]
    return <div className={icon.class}>{emoji}</div>
}

const diaryCard = tw
    .style({
        display: 'flex',
        flexDirection: 'flex-col',
        alignItems: 'items-start',
        justifyContent: 'justify-center',
        gap: 'gap-1.5',

        padding: 'p-3',
        ':hover': {
            backgroundColor: 'hover:bg-gray-50',
        },
        transition: 'transition',
        cursor: 'cursor-pointer',
    })
    .compose(util.container.style)

export const DiaryCard = ({ date, emotion, title, weather, id }: Omit<Diary, 'content'>) => {
    const formattedDate = dateFormat(date)

    return (
        <Link to={`/detail/${id}`} className={diaryCard.class}>
            <h1 className="text-base text-gray-800">{title}</h1>

            <div className="flex flex-row items-center justify-between gap-1 w-full">
                <span className="text-gray-400 text-sm">{formattedDate}</span>
                <div className="flex flex-row gap-1s">
                    <DiaryEmotion emotion={emotion} />
                    <Weather weather={weather} />
                </div>
            </div>
        </Link>
    )
}
