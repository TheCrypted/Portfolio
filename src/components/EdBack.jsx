import {useRef, useState} from "react";
import ed from "../assets/ed.png"
import penn from "../assets/penn.png"
import {ReactTyped} from "react-typed";

export const EdBack = () => {
    const heightRef = useRef(null);
    const [hover, setHover] = useState(false);
    const typedRef = useRef(null);

    const handleMouseEnter = () => {
        setHover(true)
    };

    const handleMouseLeave = () => {
        setHover(false)
    };

    return (
        <div className="w-full relative flex flex-col h-full pl-14 pr-14">
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={heightRef} className="w-full h-full opacity-50 hover:opacity-100 transition-opacity">
                <div  style={{left: "600px", backgroundImage: `url("${ed}")`, width: heightRef.current?.clientHeight - 60 + "px", height: heightRef.current?.clientHeight - 60 + "px"}} className="bg-cover z-20  shadow-xl animate-float-dif pt-4 bg-center rounded-lg absolute bg-blue-400"/>
                <div style={{left: "200px"}} className="w-2/3 top-8 h-auto animate-float absolute z-10 text-8xl">
                    University
                </div>
                <div style={{left: "200px"}} className="w-auto h-auto top-40 animate-float absolute z-30 text-8xl ">
                    of Edinburgh
                </div>
                <div style={{left: `${600 + heightRef.current?.clientHeight - 20}px`}} className="pt-6 w-full h-1/2 absolute">
                    <div className={`${hover ? "h-8" : "h-0"} relative w-fit transition-all duration-700 text-nowrap overflow-hidden`}>
                        BEng(Hons.) Computer Science
                        <div className="bg-red-500 w-8 h-8 z-50">dew
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full relative opacity-50 hover:opacity-100 transition-opacity">
                <div style={{
                    left: "420px",
                    backgroundImage: `url("${penn}")`,
                    width: heightRef.current?.clientHeight - 60 + "px",
                    height: heightRef.current?.clientHeight - 60 + "px"
                }} className="bg-cover z-20 shadow-xl animate-float-dif pt-4 bg-center rounded-lg absolute bg-blue-400"/>
                <div style={{left: "00px"}} className="w-2/3 top-16 h-full animate-float absolute z-10 text-8xl">
                    University
                </div>
                <div style={{left: "00px"}} className="w-auto h-auto top-48 animate-float absolute z-30 text-8xl ">
                    of Pennsylvania
                </div>
            </div>
        </div>
    )
}