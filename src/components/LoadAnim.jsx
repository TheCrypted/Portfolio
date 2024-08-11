import {useEffect, useState} from "react";

export const LoadAnim = ({loaded}) => {
    const [display, setDisplay] = useState(true)

    useEffect(() => {
        if(loaded){
            setTimeout(() => {
                setDisplay(false);
            }, 1000)
        }
    }, [loaded])

    return (
        <div className={`w-full h-full ${display ? "" : "hidden"} absolute z-50 flex`}>
            {
                Array.from({length: 16}).map((_, i) => (
                    <div key={i} style={{transition: `height ${i*100}ms`}} className={`bg-black w-full transition-transform ${loaded ? "h-0 " : "h-full border-b"} border-r border-gray-600`}/>
                    ))
            }
        </div>
    )
}