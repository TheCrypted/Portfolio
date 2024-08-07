
export const BorderMarq = ({displacement}) => {

    return (
        <div style={{left: `${-window.innerWidth / 2 + displacement * 0.2}px`}}
            className="overflow-hidden w-[300%] flex relative border-y-2 border-black h-12">
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