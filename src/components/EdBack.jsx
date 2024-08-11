import {useRef, useState} from "react";
import ed from "../assets/ed.png"
import penn from "../assets/penn.png"
import {ReactTyped} from "react-typed";

export const EdBack = () => {
    const heightRef = useRef(null);
    const [hover, setHover] = useState(false);
    const [hover2, setHover2] = useState(false);

    const handleMouseEnter = () => {
        setHover(true)
    };

    const handleMouseLeave = () => {
        setHover(false)
    };

    const handleMouseEnter2 = () => {
        setHover2(true)
    };

    const handleMouseLeave2 = () => {
        setHover2(false)
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
                <div style={{left: `${550 + heightRef.current?.clientHeight - 20}px`}} className="flex items-center flex-wrap pt-6 w-full h-1/2 relative pr-14">
                    <div
                        className={`${hover ? "h-8" : "h-0"} mb-2 left-0 w-full transition-all duration-500 text-nowrap overflow-hidden`}>
                        BEng(Hons.) Computer Science
                    </div>
                    <div className={`${hover ? "h-8" : "h-0"} mb-2  w-full transition-all duration-700  overflow-hidden`}>
                        <i>Penultimate Year Student</i>
                    </div>
                    <div
                        className={`${hover ? "h-8" : "h-0"} mb-2  w-full transition-all duration-500 text-nowrap overflow-hidden`}>
                        Grade Classification: Expected First Class
                    </div>
                    <div
                        className={`${hover ? "h-24" : "h-0"} text-gray-300 text-sm w-full transition-all duration-700  overflow-hidden`}>
                        Relevant Modules: Computer Systems, Object Orientated Programming, <br/>
                        Algorithms and Data Structures, Foundational Data Science, <br/>
                        Software Engineering and Professional Practices, <br/>
                        Reasoning and Agents, Discrete Mathematics
                    </div>
                </div>
            </div>
            <div onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2} className="w-full h-full relative opacity-50 hover:opacity-100 transition-opacity">
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
                <div style={{left: `${410 + heightRef.current?.clientHeight}px`}}
                     className="flex items-center flex-wrap pt-6 w-full h-1/2 relative pr-14">
                    <div
                        className={`${hover2 ? "h-8" : "h-0"} mb-2 left-0 w-full transition-all duration-500 text-nowrap overflow-hidden`}>
                        BEng(Hons.) Computer Science
                    </div>
                    <div
                        className={`${hover2 ? "h-8" : "h-0"} mb-2  w-full transition-all duration-700  overflow-hidden`}>
                        <i>Academic Exchange</i>
                    </div>
                    <div
                        className={`${hover2 ? "h-8" : "h-0"} mb-2  w-full transition-all duration-500 text-nowrap overflow-hidden`}>
                        GPA: <i>Unreleased</i>
                    </div>
                    <div
                        className={`${hover2 ? "h-24" : "h-0"} text-gray-300 text-sm w-full transition-all duration-700  overflow-hidden`}>
                        Relevant Modules: FinTech, Database and Information <br/>
                        Systems, Computer and Network Security, Natural Language Processing, <br />
                        Applied Machine Learning, Compilers and Interpreters,<br/>
                        Computer Operating Systems
                    </div>
                </div>
            </div>
        </div>
    )
}