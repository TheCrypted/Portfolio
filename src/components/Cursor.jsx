import {useEffect, useRef, useState} from "react";
import {useMousePosition} from "../context/MousePositionProvider.jsx";
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";
import {useLoading} from "../context/LoadingProvider.jsx";

export const Cursor = () => {
    const cursorSlow = useRef(null);
    const cursor = useRef(null);
    const mousePos = useMousePosition();
    const {linkOver} = queryLinkOver();
    const {isLoading} = useLoading();
    const [finePointer, setFinePointer] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(hover: hover) and (pointer: fine)');
        const updatePointer = () => setFinePointer(media.matches);
        updatePointer();
        media.addEventListener('change', updatePointer);
        return () => media.removeEventListener('change', updatePointer);
    }, []);

    useEffect(() => {
        if (!cursor.current || !cursorSlow.current) return;
        cursor.current.style.left = `${mousePos.x - cursor.current.clientWidth / 2}px`;
        cursor.current.style.top = `${mousePos.y - cursor.current.clientHeight / 2}px`;
        cursorSlow.current.style.left = `${mousePos.x - cursorSlow.current.clientWidth / 2}px`;
        cursorSlow.current.style.top = `${mousePos.y - cursorSlow.current.clientHeight / 2}px`;
    }, [mousePos]);

    const visibility = !finePointer || isLoading ? "hidden" : "visible";

    return (
        <>
            <div
                aria-hidden="true"
                style={{visibility, pointerEvents: "none", transition: "width 0.4s, height 0.4s, left 0.15s ease-out, top 0.15s ease-out", mixBlendMode: "difference"}}
                ref={cursorSlow}
                className={"mix-blend-difference rounded-full " + (linkOver ? "h-0 w-0" : "h-16 w-16") + " border-solid border-2 z-50 fixed cursor"}
            />
            <div
                aria-hidden="true"
                style={{visibility, pointerEvents: "none", transition: "width 0.2s, height 0.2s"}}
                ref={cursor}
                className={"transition-transform duration-600 mix-blend-difference bg-white rounded-full " + (linkOver ? "h-16 w-16" : "h-4 w-4") + " z-50 fixed cursor"}
            />
        </>
    );
};
