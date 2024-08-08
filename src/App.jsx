import './App.css'
import {BorderMarq, BorderMarqY} from "./helpers/BorderMarq.jsx";
import {Cursor} from "./components/Cursor.jsx";
import {useMousePosition} from "./context/MousePositionProvider.jsx";
import {useState} from "react";
import {MovingBackground} from "./components/MovingBackground.jsx";
import {queryLinkOver} from "./context/LinkOverTrigger.jsx";


function App() {
    const mousePos = useMousePosition();
    const {setLinkOver} = queryLinkOver()

    const [yHalf, setYHalf] = useState(false)
    const [tHalf, setTHalf] = useState(false)
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
                    <div className={`w-full transition-all h-1/3 flex border-b-2 border-black`}>
                        <div className={`transition-all flex items-center justify-center w-2/3`}>
                            <MovingBackground />
                        </div>
                        <div onMouseEnter={() => setTHalf(true)} onMouseLeave={() => setTHalf(false)} className={`text-4xl font-semibold font-serif  bg-contain border-l-2 border-black transition-all duration-500 ${tHalf ? "w-2/3" : "w-1/3"} flex items-center justify-center`}>
                            Résumé<b className="text-green-500">.</b>
                        </div>
                    </div>
                    <div onMouseEnter={() => setYHalf(false)} onMouseLeave={() => setYHalf(true)} className={`w-full transition-all h-2/3 flex`}>
                        <div className={`text-4xl font-semibold font-serif flex items-center justify-center transition-all duration-500 ${!bHalf ? "w-2/3" : "w-1/3"}`}>
                            Miscellaneous<b className="text-yellow-500">.</b>
                        </div>
                        <div onMouseEnter={() => setBHalf(true)} onMouseLeave={() => setBHalf(false)} className={`text-nowrap flex items-center justify-end border-l-2 text-blue-950 py-2 ${bHalf ? "text-opacity-5" : "text-opacity-0"} font-serif relative text-7xl text-right border-black transition-all duration-500 ${bHalf ? "w-2/3" : "w-1/3"}`}>
                            Cadence Design Systems<br />
                            Formula Student<br />
                            Hyperloop Edinburgh<br />
                            InformaticsPals<br />
                            University of Edinburgh<br />
                            University of Pennsylvania<br />

                            <div onMouseEnter={() => setLinkOver(true)} onMouseLeave={() => setLinkOver(false)} className="hover:underline top-0 absolute w-full text-black h-full flex items-center justify-center font-semibold text-4xl">
                                About Me<b className="text-blue-600 ">.</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default App
