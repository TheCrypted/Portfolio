import {useEffect, useRef} from "react";
import {useMousePosition} from "../context/MousePositionProvider.jsx";
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";

export const Cursor = () => {
    const cursorSlow = useRef(null)
    const cursor = useRef(null)
    const mousePos = useMousePosition();
    const {linkOver} = queryLinkOver();

    useEffect(() => {
        cursor.current.style.left = `${mousePos.x - cursor.current.clientWidth / 2}px`;
        cursor.current.style.top = `${mousePos.y - cursor.current.clientHeight / 2}px`;
        setTimeout(()=>{
            if (cursorSlow.current) {
                cursorSlow.current.style.left = `${mousePos.x - cursorSlow.current.clientWidth / 2}px`;
                cursorSlow.current.style.top = `${mousePos.y - cursorSlow.current.clientHeight / 2}px`;
            }
        }, 150)
    }, [mousePos]);

    return (
        <>
            <div style={{pointerEvents: "none", transition: "width 0.4s, height 0.4s", mixBlendMode: "difference"}} ref={cursorSlow} className={"mix-blend-difference rounded-full " + (linkOver ? "h-0 w-0" : "h-16 w-16") + " border-solid border-2 z-0 absolute cursor"} >
            </div>
            <div style={{pointerEvents: "none", transition: "width 0.2s, height 0.2s"}} ref={cursor} className={"transition-transform duration-600 mix-blend-difference bg-white rounded-full " + (linkOver ? "h-16 w-16" : "h-4 w-4" )+ " z-50 absolute cursor"} >
            </div>
        </>
    )
}