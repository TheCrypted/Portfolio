import {Cursor} from "../components/Cursor.jsx";
import React, {useEffect, useRef, useState} from "react";
import {LoadAnim} from "../components/LoadAnim.jsx";
import {useNavigate} from "react-router-dom";
import {Canvas} from "@react-three/fiber";
import {ReactiveLink} from "../helpers/ReactiveLink.jsx";
import me1 from "../assets/me1.png"
import building1 from "../assets/building1.png"
import building5 from "../assets/building5.png"
import building4 from "../assets/building4.png"
import building3 from "../assets/building3.png"
import hyperloop from "../assets/hyperloop.png"
import adamHand from "../assets/adam_hand.png"
import icChip from "../assets/ic_chip.png"
import {F1Car} from "../models/F1Car.jsx";
import {useMousePosition} from "../context/MousePositionProvider.jsx";
import {Marquee} from "../components/Marquee.jsx";
import DateObject from "react-date-object";
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";
import {Market} from "../components/Market.jsx";

const ObserverComponent = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current); // Stop observing once in view
                }
            },
            { threshold: 0.1 } // Adjust threshold as needed
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return <div className="w-full h-full" ref={ref}>{isVisible ? children : null}</div>;
};

export const Work = () => {
    const mindiv = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [bustY, setBustY] = useState(0)
    const navigate = useNavigate();
    const [diRot, setDiRot] = useState(0)
    const mousePos = useMousePosition();
    const track_arr = Array.from({length: 15}, (_, ind) => ind)
    const {setLinkOver} = queryLinkOver();

    const date = new DateObject({
        date: new Date(),
        format: "DD MMMM YYYY",
    });
    const time = new DateObject({
        date: new Date(),
        format: "HHMM",
    });

    useEffect(() => {

        mindiv.current.addEventListener("scroll", () => {
            setBustY(mindiv.current.scrollTop/100)
        })

        const interval = setInterval(() => setDiRot(prev => (prev + 0.01) % (Math.PI * 2)), 40)

        setTimeout(() => {
            setLoaded(true);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    const changePage = (dest) => {
        setLoaded(false);
        setTimeout(() => {
            navigate(dest)
        }, 2000)
    }

    const convertMouseCoordinnatesTo3d = (mousepos) => {
        const x = mousepos.x / window.innerWidth * 2 - 1;
        const y = - mousepos.y / window.innerHeight * 2 + 1;
        return [x, y, -4.0];
    }

    return (
        <>
            <LoadAnim loaded={loaded}/>
            <div ref={mindiv}
                 className="w-full cursor-none h-[120%] bg-[#110e2d] scrollbar overflow-x-hidden overflow-auto">
                <Cursor/>
                <div
                    className="cursor-none absolute z-40 top-0 w-full h-16 bg-[#1d184f] bg-opacity-30 backdrop-blur-2xl border-b border-gray-600 shadow-xl pl-14 grid grid-cols-[5%_5%_5%_30%_55%]">
                    <div onClick={() => changePage("/")}
                         className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">HOME
                    </div>
                    <div
                        className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">WORK
                    </div>
                    <div onClick={() => changePage("/Projects")}
                         className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">PROJECTS
                    </div>
                    <div className="absolute  right-0 full h-full flex items-center justify-center pr-14">
                        <div
                            className=" bg-gradient-to-br from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.05)] font-serif w-auto px-3 h-3/5 bg-opacity-20 text-gray-300 rounded-full flex items-center justify-center">
                            Website under active development
                        </div>
                    </div>
                </div>
                <div className="w-full h-4/5 relative">
                    <div
                        className="w-full absolute cursor-none flex  justify-between flex-col h-full text-[#110e2d] text-6xl mb-8">
                        {
                            track_arr.map(item => (
                                <Marquee key={item}
                                         className={`select-none ${item % 2 === 0 ? "-translate-x-36" : ""}`}>
                                    WORK EXPERIENCE
                                </Marquee>
                            ))
                        }
                    </div>
                    <div className="pointer-events-none w-full h-full absolute flex items-end justify-between">
                        <div style={{
                            backgroundImage: `url("${building4}")`,
                            backgroundPosition: `left ${-5 + bustY / 10}rem top 0rem`
                        }}
                             className="scale-x-[-1] grayscale w-1/4 h-4/5 flex items-end  bg-cover bg-center bg-no-repeat">
                            <div style={{
                                backgroundImage: `url("${building3}")`,
                                backgroundPosition: `left ${-5 + bustY / 2}rem top 0rem`
                            }} className={`grayscale w-full h-3/4 bg-cover bg-no-repeat`}/>
                        </div>
                        <div style={{backgroundImage: `url("${me1}")`}}
                             className="grayscale w-1/4 h-4/5 bg-cover bg-center bg-no-repeat"/>
                        <div style={{
                            backgroundImage: `url("${building5}")`,
                            backgroundPosition: `right ${-8 - bustY / 10}rem top 0rem`
                        }} className="grayscale w-1/4 h-4/5 flex items-end bg-cover bg-center bg-no-repeat">
                            <div style={{
                                backgroundImage: `url("${building1}")`,
                                backgroundPosition: `right ${-bustY / 2}rem top 0rem`
                            }} className="grayscale w-full h-2/3 bg-[right_0rem_top_0rem] bg-contain bg-no-repeat"/>
                        </div>
                    </div>
                </div>


                <div className="w-full relative cursor-none h-[60%]">
                    <div className="w-full relative h-full bg-[#110e2d] overflow-hidden">
                        <div className="absolute pl-14 pr-14 top-0 w-full h-full flex justify-between">
                            <div className="w-1/3 h-full flex items-center text-white">
                                <div>
                                    <div
                                        className="text-white flex items-center mb-2 justify-center font-serif text-3xl">
                                        Software Engineering Intern
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 h-full flex items-center justify-center">
                            </div>
                            <div className="w-1/3 h-full flex items-center">
                                <div>
                                    <div
                                        className="text-white flex items-end justify-center font-serif text-3xl mb-2">Bloomberg
                                    </div>
                                    <div
                                        className="text-gray-400 items-center flex justify-between text-2xl w-full font-serif italic mb-8">
                                        [C++, Kafka]
                                    </div>
                                    <div
                                        className="opacity-70 text-justify justify-center items-center text-white flex font-serif text-2xl">
                                        Redesigned critical trading infrastructure for the Electronic Trading team, engineering low-latency distributed systems with strict performance and reliability constraints.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full relative cursor-none pl-14">
                    <div className="w-full h-20 flex justify-between">
                        <div className="w-1/3"/>
                        <div className="w-1/3 grid grid-cols-2">
                            <div className="border-r-4 border-white border-opacity-40"/>
                        </div>
                        <div className="w-1/3"/>
                    </div>
                </div>
                <div className="w-full relative cursor-none h-[60%]">
                    <div style={{backgroundImage: `url("${adamHand}")`, backgroundPosition: 'center 0%', backgroundSize: '100% auto'}} className="w-full relative h-full bg-[#110e2d] bg-no-repeat overflow-hidden">
                        <div className="absolute pl-14 top-0 w-full h-full flex justify-between">
                            <div className="w-1/3 h-full flex items-center">
                                <div>
                                    <div
                                        className="text-white flex items-end justify-center font-serif text-3xl mb-2">Cadence Design Systems
                                    </div>
                                    <div
                                        className="text-gray-400 items-center flex justify-between text-2xl w-full font-serif italic mb-8">
                                        [C++, Python]
                                    </div>
                                    <div
                                        className="opacity-70 text-justify justify-center items-center text-white flex font-serif text-2xl">
                                        Built C++/Python pipelines for the flagship software Virtuoso to expose runtime metrics to external systems, enabling automated monitoring.
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 h-full flex items-center justify-center">
                                <img src={icChip} alt="IC Chip" style={{transform: `rotate(${bustY * 20}deg)`}} className="w-72 h-72 object-contain z-10"/>
                            </div>
                            <div className="w-1/3 h-full flex items-center text-white">
                                <div>
                                    <div
                                        className="text-white flex items-center mb-2 justify-center font-serif text-3xl">
                                        Software Engineering Intern
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full relative cursor-none pl-14">
                    <div className="w-full h-20 flex justify-between">
                        <div className="w-1/3"/>
                        <div className="w-1/3 grid grid-cols-2">
                            <div className="border-r-4 border-white border-opacity-40"/>
                        </div>
                        <div className="w-1/3"/>
                    </div>
                </div>
                <div className="w-full relative cursor-none h-[60%]">
                    <div className="w-full relative h-full bg-[#110e2d] overflow-hidden">
                        <Canvas camera={{position: [0, 0, 1]}}>
                            <pointLight position={convertMouseCoordinnatesTo3d(mousePos)} intensity={10}/>
                            <F1Car rotation={[Math.PI / 2, 0, 0]} position={[0.0, -1.0, -7.0]}/>
                        </Canvas>
                        <div className="absolute pl-14 top-0 w-full h-full flex justify-between">
                            <div className="w-1/3 h-full flex items-center">
                                <div>
                                    <div
                                        className="text-white flex items-end justify-center font-serif text-3xl mb-2">Edinburgh
                                        University Formula Student
                                    </div>
                                    <div
                                        className="text-gray-400 items-center flex justify-between text-2xl w-full font-serif italic mb-8">
                                        [C++, ReactJS, NodeJS, Bash, ROS] <ReactiveLink to="https://www.eufs.co"
                                                                                        classes="hover:underline">Website</ReactiveLink>
                                    </div>
                                    <div
                                        className="opacity-70 text-justify justify-center items-center text-white flex font-serif text-2xl">
                                        Developed 3D simulation tech as part of a 5-person subteam in the 7x AI class
                                        winning Formula Student UK team.
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 h-full grid grid-cols-2">
                                <div className="w-full h-20 border-white border-opacity-40 border-r-4"/>
                            </div>
                            <div className="w-1/3 h-full flex items-center text-white">
                                <div>
                                    <div
                                        className="text-white flex items-center mb-2 justify-center font-serif text-3xl">
                                        Simulation Software Developer
                                    </div>
                                    <div
                                        className="opacity-70 flex  text-justify justify-center font-serif text-xl">
                                        Best Simulation Winner Formula Student UK 2024
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full relative cursor-none bg-[#110e2d] h-[80%]">
                    <div className="flex justify-end">
                        <div
                            className="w-1/2 h-20 border-b-4 border-white border-opacity-40 border-l-4 rounded-bl-3xl"/>
                    </div>
                    <div className="absolute w-full h-full grid grid-rows-[30%_40%_30%]">
                        <div
                            className="w-full h-full flex items-end justify-between px-14 text-white font-serif text-3xl ">
                            <div>Motors and Levitation Software Developer</div>
                            <div className="opacity-70 italic">[C++]</div>

                        </div>
                        <ObserverComponent>
                            <div className="w-full h-full flex items-center">
                                <div style={{
                                    backgroundImage: `url("${hyperloop}")`,
                                    backgroundPosition: `center right ${bustY * 30}px`
                                }}
                                     className="text-white flex items-center justify-center font-serif text-8xl w-[300%] h-full bg-center bg-contain bg-repeat-x">
                                    <div className="mix-blend-difference">
                                        Hyperloop Edinburgh
                                    </div>
                                </div>
                            </div>
                        </ObserverComponent>
                        <div className="w-full h-full opacity-70 flex justify-center text-white text-3xl font-serif">
                            Built a comprehensive testing suite and extended software to incorporate levitation based
                            movement.
                        </div>
                    </div>
                </div>
                <div className="w-full h-40" />
                <div className="w-full relative cursor-none bg-[#110e2d] h-[60%]">
                    <Market />
                </div>
                <div
                    className="w-full relative grid grid-cols-[20%_60%_20%] h-[20%] pt-6 pb-6 bg-opacity-40 text-2xl font-serif text-white"> {/*  bg-[#191443]*/}
                    <div className="text-sm pl-14 flex items-center ">
                        <div>
                            <div>Aman Sharma</div>
                            <div><i>{date.format()}</i></div>
                            <div>{time.format()} &nbsp; hrs</div>
                        </div>
                    </div>
                    <div></div>
                    <div className="pr-14 flex text-right items-center text-sm justify-end">
                        <div>
                            <a href="https://www.linkedin.com/in/aman-sharma-992a6a285/"
                               onMouseEnter={() => setLinkOver(true)} onMouseLeave={() => setLinkOver(false)}>
                                <div className="transition-all hover:[filter:blur(1px)]">LinkedIn</div>
                            </a>
                            <a href="https://github.com/TheCrypted" onMouseEnter={() => setLinkOver(true)}
                               onMouseLeave={() => setLinkOver(false)}>
                                <div className="transition-all hover:[filter:blur(1px)]">Github</div>
                            </a>
                            <a href="https://www.kaggle.com/amansharma110" onMouseEnter={() => setLinkOver(true)}
                               onMouseLeave={() => setLinkOver(false)}>
                                <div className="transition-all hover:[filter:blur(1px)]">Kaggle</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}