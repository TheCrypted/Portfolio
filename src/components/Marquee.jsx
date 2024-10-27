export const Marquee = ({className, children}) => {
    const repeatedChildren = Array(4).fill(children);

    return (
        <div className={"w-full flex " + className} >
            {
                repeatedChildren.map(item => {

                    return (
                        <div className="box2 to-top transition-all w-auto relative text-nowrap p-2 h-auto text-outline hover:blur-sm hover:bg-white flex justify-center items-center">
                            {item}
                        </div>
                    )
                })
            }
        </div>
    )
}