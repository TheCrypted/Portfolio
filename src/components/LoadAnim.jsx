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
        <div className={`w-full h-full ${display ? "opacity-100" : "opacity-0 -z-10"} absolute z-50 flex`}>
            {
                Array.from({length: 16}).map((_, i) => (
                    <div key={i} style={{transition: `height 500ms ease-in-out ${i*100}ms`,
                        height: loaded ? '0' : '100%'
                    }} className={`bg-black w-full border-r border-gray-600 ${!loaded ? 'border-b' : ''}`}/>
                    ))
            }
        </div>
    )
}