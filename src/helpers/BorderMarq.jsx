
export const BorderMarq = ({displacement}) => {

    return (
        <div style={{left: `${-window.innerWidth / 2 + displacement * 0.02}px`}}
            className="overflow-hidden w-[300%] bg-white flex relative border-y-2 border-black h-12">
            {
                Array.from({length: 20}).map((item, ind) => {
                    return (
                        <div key={ind} className="relative px-2 h-full flex text-xl italic items-center justify-center font-serif">
                            Aman Sharma
                        </div>

                    )
                })
            }
        </div>
    )
}

export const BorderMarqY = ({displacement}) => {

    return (
        <div style={{top: `${-window.innerWidth / 2 + displacement * 0.02}px`}} className="w-12 h-[300%] relative border-x-2 border-black bg-white">
            {
                Array.from({length: 20}).map((item, ind) => {
                    return (
                        <div key={ind} className="py-2  w-full flex text-xl italic items-center justify-center font-serif [writing-mode:vertical-rl]">
                            Aman Sharma
                        </div>
                    )
                })
            }

        </div>
    )
}