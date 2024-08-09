import {Cursor} from "../components/Cursor.jsx";

export const Gallery = () => {
    return (
        <div className="w-full h-full bg-zinc-950 overflow-hidden">
            <Cursor />
            <div className="absolute w-full h-full grid grid-rows-[30%_31%_25%_14%]">
                <div className="flex gap-3">
                    <div className="bg-red-500 w-[20%] rounded-xl" />
                    <div className="bg-green-500 w-[33%] rounded-xl" />
                    <div className="bg-blue-500 w-[15%] rounded-xl" />
                    <div className="bg-yellow-500 w-[20%] rounded-xl" />
                    <div className="bg-violet-500 w-[10%] rounded-xl" />
                </div>
                <div className="flex gap-3">
                    <div className="bg-red-500" />
                </div>
                <div className="flex gap-3">
                    <div className="bg-red-500" />
                </div>
                <div className="flex gap-3">
                    <div className="bg-red-500" />
                </div>
            </div>
        </div>
    )
}