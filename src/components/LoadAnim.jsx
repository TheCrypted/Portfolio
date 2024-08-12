import {useEffect, useState} from "react";

export const LoadAnim = ({loaded}) => {
    const [display, setDisplay] = useState(true)

    useEffect(() => {
        if(loaded){
            setTimeout(() => {
                setDisplay(false);
            }, 2000)
        } else {
            setDisplay(true);
        }
    }, [loaded])

    return (
        <div style={{zIndex: display ? "" : "-100"}} className={`w-full h-full ${display ? "opacity-100" : "opacity-0"} cursor-none absolute z-50 flex`}>
            {
                Array.from({length: 16}).map((_, i) => (
                    <div key={i} style={{transition: `height 500ms ease-in-out ${i*100}ms`,
                        height: loaded ? '0' : '100%'
                    }} className={`bg-white w-full border border-black`}/>
                    ))
            }
        </div>
    )
}