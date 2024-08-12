import {Cursor} from "../components/Cursor.jsx";
import React, {Suspense, useEffect, useRef, useState} from "react";
import Bust from "../components/Bust.jsx";
import {LoadAnim} from "../components/LoadAnim.jsx";

export const Work = () => {
    const mindiv = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [bustY, setBustY] = useState(0)
    const prev = useRef(0)

    useEffect(() => {
        mindiv.current.addEventListener("scroll", () => {
            setBustY(mindiv.current.scrollTop/100)
        })
        setTimeout(() => {
            setLoaded(true);
        }, 1000);
    }, []);

    return (
        <>
            <LoadAnim loaded={loaded}/>
            <div ref={mindiv} className="w-full cursor-none h-[120%] bg-[#1d184f] scrollbar overflow-x-hidden overflow-auto">
                <Cursor/>
                <div className="w-full cursor-none h-full ">
                    <Bust rotation={[0, bustY/10 * Math.PI-2.3, 0.4]} position={[bustY*3-11, -3-bustY/20, bustY]}/>
                </div>
                <div className="w-full cursor-none h-full">

                </div>

            </div>
        </>
    )
}