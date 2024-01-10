import { Link, useParams } from 'react-router-dom'

type DiaryDetailPageParams = {
    id: string
}

export default function DiaryDetailPage() {
    const { id } = useParams<DiaryDetailPageParams>()

    function deleteDiary() {
        
    }

    return (
        <div className="w-2/4 h-full py-20">
            <div className="flex flex-col gap-4 my-9">
                <h1 className="text-4xl font-medium">title</h1>
                <div className="flex flex-row gap-2">
                    <button className="flex-grow p-0.5 rounded-lg text-sm bg-gray-100 text-gray-400 hover:text-gray-600 hover:border hover:border-gray-600">date</button>
                    <button className="flex-grow p-0.5 rounded-lg text-sm bg-gray-100 text-gray-400 hover:text-gray-600 hover:border hover:border-gray-600">weather</button>
                    <Link to="/emotions" className="flex-grow">
                        <button className="w-full p-0.5 rounded-lg text-sm bg-gray-100 text-gray-400 hover:text-gray-600 hover:border hover:border-gray-600">feeling</button>
                    </Link>
                </div>
            </div>

            <div className="text-base text-gray-800 h-2/3">contents</div>

            <div className="w-full flex flex-row gap-2">
                <Link to="/" className="w-full">
                    <button className="p-2 rounded-lg bg-emerald-100 text-emerald-600 hover:border hover:border-emerald-600 w-full">
                        새로운 일기 작성하기
                    </button>
                </Link>
                <button 
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:border hover:border-red-600 w-full"
                    onClick={deleteDiary}
                >
                    현재 일기 삭제하기
                </button>
            </div>
        </div>            
    )
}
