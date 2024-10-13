import im1 from "../assets/eufs.png"
import im2 from "../assets/helW.png"
import im3 from "../assets/plant.png"
import im4 from "../assets/ada.png"
import im5 from "../assets/htb.png"
import im6 from "../assets/hyp.png"
import {useState} from "react";
import {useMousePosition} from "../context/MousePositionProvider.jsx";
import ReactTextTransition, { presets } from "react-text-transition";

export const Awards = () => {
    let imgs = [im1, im2, im3, im4, im5, im6];
    const [hover, setHover] = useState(null);
    const mousePos = useMousePosition();

    const awards = ["Best Simulation Winner Formula Student UK 2024.",
        "Runners Up Best Project.",
        "Honorable mention for Main Challenge",
        "Overall first place and top place in the specific challenge.",
        "Honorable mention for Main Challenge",
        "Hyperloop One Global Winner, SpaceX Pod Finalist"]
    const projects = ["Extending Foxglove simulation with GUI controls",
        "Workout Tracker for easing access to new joiners.",
        "YOLOv8 based disease detection with geographical trend mapping.",
        "AI-driven recipe recommendation app for university students.",
        "YOLOv8 based disease detection with geographical trend mapping.",
        "Extending software to incorporate levitation based movement"]
    const impact = ["Fully functional GUI reducing CLI reliance",
        "Introduced to new technologies and efficient teamwork.",
        "Scalable infrastructure with automated CI/CD pipelines with a fully fleshed out full stack app.",
        "Created a practical solution that helps students optimize their available ingredients by suggesting relevant recipes.",
        "Scalable infrastructure with automated CI/CD pipelines with a fully fleshed out full stack app.",
        "Optimised existing motor control software."]
    const titles = ["Formula Student UK", "Hello World Hack 2023", "HackTheBurgh 2024", "AdaHack 2024", "HackTheBurgh 2024", "Hyperloop Edinburgh"]

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-[450px] flex justify-center pl-14 gap-2">
                {
                    imgs.map((item, i) => (
                        <div key={item.toString()}  className="h-[450px] w-auto flex items-center">
                            <div onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{backgroundImage: `url("${item}")`, height: `${hover && Math.abs(i - hover) <= 1 ? (hover === i ? 450 : 410) : 384}px`}} className={`bg-cover relative bg-center hover:animate-float hover:filter-none transition-all duration-700 [filter:grayscale(100%)]  w-16`}>

                            </div>
                        </div>
                    ))
                }
                <div className="h-full w-14" />
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-2/3 font-serif text-3xl text-white h-full flex items-center justify-center ">
                        <div className="h-auto w-auto text-gray-200 text-xl">
                            <div className="mb-4 flex gap-2">
                                <b>Awards:</b>
                                <ReactTextTransition>
                                    {hover !== null ? awards[hover] : awards[0]}
                                </ReactTextTransition>
                            </div>
                            <div className="mb-4 flex gap-2"><b>Project:</b>
                                <ReactTextTransition>
                                    {hover !== null ? projects[hover] : projects[0]}
                                </ReactTextTransition>
                            </div>
                            <div className="mb-4"><b>Key Features</b>:
                                <div>
                                    <li>Utilized TensorFlow for machine learning to analyze images of ingredients.</li>
                                    <li>Built frontend with ReactJS for a smooth user experience.</li>
                                    <li> Developed backend in C# for efficient processing.</li>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <b>Impact:</b>
                                <ReactTextTransition>
                                    {hover !== null ? impact[hover] : impact[0]}
                                </ReactTextTransition>
                            </div>
                        </div>
                        <div className="pl-4 h-auto italic w-auto [writing-mode:vertical-lr]">
                            {hover === null ? titles[0] : titles[hover]}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}