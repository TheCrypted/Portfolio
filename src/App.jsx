import './App.css'
import {BorderMarq, BorderMarqY} from "./helpers/BorderMarq.jsx";
import {Cursor} from "./components/Cursor.jsx";
import {useMousePosition} from "./context/MousePositionProvider.jsx";
import {useState} from "react";

function App() {
    const mousePos = useMousePosition();

    const [yHalf, setYHalf] = useState(true)
    const [tHalf, setTHalf] = useState(true)
    const [bHalf, setBHalf] = useState(true)

    return (
        <div className="w-full bg-white h-full overflow-hidden">
            <Cursor/>
            <div className="w-full absolute bottom-0 h-12">
                <BorderMarq displacement={-mousePos.x}/>
            </div>
            <div className={`absolute right-0 bg-white overflow-hidden top-0 w-12 h-full`}>
                <BorderMarqY displacement={-mousePos.y}/>
            </div>
            <div className={`absolute bg-white overflow-hidden top-0 w-12 h-full`}>
                <BorderMarqY displacement={mousePos.y}/>
            </div>
            <div className="w-full h-12">
                <BorderMarq displacement={mousePos.x}/>
            </div>
            <div className="absolute w-full h-full top-0 p-12">
                <div className="bg-amber-50 w-full h-full flex flex-col">
                    <div className={`w-full transition-all ${yHalf ? "h-1/3" : "h-2/3"} flex border-b-2 border-black`}>
                        <div className={`transition-all ${!tHalf ? "w-2/3" : "w-1/3"} w-full`}></div>
                        <div onMouseEnter={() => setTHalf(true)} onMouseLeave={() => setTHalf(false)} className={`border-l-2 border-black transition-all ${tHalf ? "w-2/3" : "w-1/3"} w-full`}></div>
                    </div>
                    <div onMouseEnter={() => setYHalf(true)} onMouseLeave={() => setYHalf(false)} className={`w-full transition-all ${!yHalf ? "h-1/3" : "h-2/3"} flex`}>
                        <div className={`transition-all ${!bHalf ? "w-2/3" : "w-1/3"} w-full`}></div>
                        <div onMouseEnter={() => setBHalf(true)} onMouseLeave={() => setBHalf(false)} className={`border-l-2 border-black transition-all ${bHalf ? "w-2/3" : "w-1/3"} w-full`}></div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default App
