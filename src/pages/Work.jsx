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
            console.log(mindiv.current.scrollTop/200)
            setBustY(mindiv.current.scrollTop/200)
        })
        setTimeout(() => {
            setLoaded(true);
        }, 1000);
    }, []);

    return (
        <>
            <LoadAnim loaded={loaded}/>
            <div ref={mindiv} className="w-full cursor-none h-full bg-[#1d184f] scrollbar overflow-x-hidden overflow-auto">
                <Cursor/>
                <div className="w-full cursor-none h-full">
                    <Bust position={[0, bustY/200, 0]} scrollDiv={mindiv.current} />
                </div>
                <div className="w-full cursor-none h-full">

                </div>

            </div>
        </>
    )
}