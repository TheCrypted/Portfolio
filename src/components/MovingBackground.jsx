import {useEffect, useRef, useState} from "react";
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";
import ContentLoader, {Facebook} from "react-content-loader";

export const MovingBackground = ({children}) => {
    let mainRef = useRef(null);
    const [disp, setDisp] = useState(0);
    let icon_pos = [12, 278, 305, 189, 120, 342, 256, 73, 101, 414, 199, 160, 180, 45, 278, 333, 99, 188, 20, 234];
    const techIcons = [
        "https://cdn-icons-png.flaticon.com/512/919/919825.png", // Node.js
        "https://cdn-icons-png.flaticon.com/512/919/919852.png", // Python
        "https://www.svgrepo.com/show/353657/django-icon.svg", // TensorFlow
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPm9LONJfyfu-u05yRzqNRjBsWnXpjrLObnQ&s", // React
        "https://cdn-icons-png.flaticon.com/512/226/226777.png", // Java
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPm9LONJfyfu-u05yRzqNRjBsWnXpjrLObnQ&s", // Angular
        "https://cdn-icons-png.flaticon.com/512/6132/6132221.png", // Vue.js
        "https://cdn-icons-png.flaticon.com/512/732/732212.png", // HTML5
        "https://cdn-icons-png.flaticon.com/512/732/732190.png", // CSS3
        "https://cdn-icons-png.flaticon.com/512/919/919830.png", // JavaScript
        "https://cdn-icons-png.flaticon.com/512/919/919842.png", // TypeScript
        "https://cdn-icons-png.flaticon.com/512/603/603201.png", // Docker
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLjjCqpT9yFoRs4odDSt__6-0MDmq7q-VvmA&s", // Kubernetes
        "https://cdn-icons-png.flaticon.com/512/5968/5968342.png", // AWS
        "https://cdn-icons-png.flaticon.com/512/873/873120.png", // Azure
        "https://cdn-icons-png.flaticon.com/512/6124/6124995.png", // GitHub
        "https://cdn-icons-png.flaticon.com/512/733/733553.png", // PostgreSQL
        "https://cdn-icons-png.flaticon.com/512/528/528260.png", // MongoDB
        "https://cdn-icons-png.flaticon.com/512/528/528261.png", // MySQL
        "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-tensorflow-icon.png"  // Redis
    ];
    const {setLinkOver} = queryLinkOver()

    useEffect(() => {
        let interval = setInterval(() => setDisp(prev => (prev + 1) % window.innerWidth), 10);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div ref={mainRef} className="w-full overflow-hidden h-full relative">
            {
                icon_pos.map((item, i) => {
                    return (
                        <div style={{
                            backgroundImage: `url(${techIcons[i]})`,
                            left: (disp + i*200)% window.innerWidth - 100 + "px",
                            top: item + "px"
                        }} className="rounded-full bg-contain bg-center bg-no-repeat shadow-lg  border-black w-16 h-16 absolute bg-black">
                        </div>
                    )
                })
            }
            <div className="absolute w-full h-full transition-colors backdrop-blur-xl  bg-amber-950 bg-opacity-5 flex items-center justify-center">
                <div className="w-[90%] h-3/4 bg-amber-50 relative shadow-sm rounded-lg grid grid-rows-[10%_90%]">
                    <div className="w-full h-full bg-stone-300 rounded-t-lg grid grid-cols-[10%_80%_10%]">
                        <div />
                        <div className="bg-stone-200 text-stone-600 pl-4 font-serif text-sm"/>
                        <div className=" flex items-center justify-center gap-2">
                            <div className="rounded-full bg-blue-300 w-3 h-3" />
                            <div className="rounded-full bg-green-300 w-3 h-3" />
                            <div className="rounded-full bg-red-300 w-3 h-3" />
                        </div>
                    </div>
                    <div className="p-4 grid grid-cols-[70%_30%]">
                        <Facebook foregroundColor="#ffedd5" backgroundColor="#f5f5f4" />
                        <div className="flex text-amber-900 items-center justify-center hover:underline font-serif text-2xl w-full h-full bg-orange-100 bg-opacity-50 rounded-lg"/>
                    </div>
                    <div onMouseEnter={() => setLinkOver(true)} onMouseLeave={() => setLinkOver(false)} className="absolute hover:underline font-serif font-semibold text-4xl w-full h-full flex items-center justify-center">
                        Projects<b className="text-red-500">.</b>
                    </div>
                </div>

            </div>
        </div>
    )
}