export default function EmotionLinkPage() {
    return (
        <div className="flex flex-col items-start justify-center gap-10">
            <div className="flex flex-col items-start justify-center gap-3">
                <h1 className="text-3xl text-gray-800 font-semibold">감정 상자</h1>
                <span className="text-gray-400">나만의 감정을 돌아보고 생각에 잠겨보아요 :)</span>
            </div>

            <div className="grid grid-cols-2 grid-rows-1 gap-5 items-start justify-center">
                <button className="p-4 flex rounded-2xl border border-gray-50">
                    <div className="text-6xl py-5 p-2 rounded-2xl bg-yellow-50 border border-yellow-100">
                        😎
                    </div>
                    <div className="flex flex-col items-start justify-center w-full m-4">
                        <h1 className="text-2xl">Awesome</h1>
                        <span className="text-ml text-gray-400">최고의 하루였어요</span>
                    </div>
                </button>

                <button className="p-4 flex rounded-2xl border border-gray-50">
                    <div className="text-6xl py-5 p-2 rounded-2xl bg-blue-50 border border-blue-100">
                        😃
                    </div>
                    <div className="flex flex-col items-start justify-center w-full m-4">
                        <h1 className="text-2xl">Great</h1>
                        <span className="text-ml text-gray-400">멋진 하루였어요</span>
                    </div>
                </button>

                <button className="p-4 flex rounded-2xl border border-gray-50">
                    <div className="text-6xl py-5 p-2 rounded-2xl bg-green-50 border border-green-100">
                        😙
                    </div>
                    <div className="flex flex-col items-start justify-center w-full m-4">
                        <h1 className="text-2xl">Good</h1>
                        <span className="text-ml text-gray-400">좋은 하루였어요</span>
                    </div>
                </button>

                <button className="p-4 flex rounded-2xl border border-gray-50">
                    <div className="text-6xl py-5 p-2 rounded-2xl bg-purple-50 border border-purple-100">
                        😗
                    </div>
                    <div className="flex flex-col items-start justify-center w-full m-4">
                        <h1 className="text-2xl">Soso</h1>
                        <span className="text-ml text-gray-400">괜찮은 하루였어요</span>
                    </div>
                </button>

                <button className="p-4 flex rounded-2xl border border-gray-50">
                    <div className="text-6xl py-5 p-2 rounded-2xl bg-red-50 border border-red-100">
                        🤬
                    </div>
                    <div className="flex flex-col items-start justify-center w-full m-4">
                        <h1 className="text-2xl">Bad</h1>
                        <span className="text-ml text-gray-400">최악의 하루였어요!</span>
                    </div>
                </button>
            </div>
        </div>
    )
}
