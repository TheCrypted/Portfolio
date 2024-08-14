import {Cursor} from "../components/Cursor.jsx";
import React, {Suspense, useEffect, useRef, useState} from "react";
import Bust from "../components/Bust.jsx";
import {LoadAnim} from "../components/LoadAnim.jsx";
import {Text} from "@react-three/drei";
import {useNavigate} from "react-router-dom";
import icb from "../assets/icb.png"

export const Work = () => {
    const mindiv = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [bustY, setBustY] = useState(0)
    const navigate = useNavigate();



    useEffect(() => {
        const handleScroll = () => {
            const scrollY = mindiv.current.scrollTop;
            const newPositions = [...positions];
            const newVelocity = [...velocity];

            // Physics calculations
            newPositions.forEach((pos, index) => {
                const force = scrollY - pos;
                newVelocity[index] += force * 0.1; // Apply force
                newVelocity[index] *= 0.8; // Apply friction
                newPositions[index] += newVelocity[index];
            });

            setVelocity(newVelocity);
            setPositions(newPositions);
        };

        mindiv.current.addEventListener("scroll", () => {
            setBustY(mindiv.current.scrollTop/100)
            handleScroll();
        })
        setTimeout(() => {
            setLoaded(true);
        }, 1000);
    }, []);

    const changePage = (dest) => {
        setLoaded(false);
        setTimeout(() => {
            navigate(dest)
        }, 2000)
    }

    const containerRef = useRef(null);
    const [positions, setPositions] = useState([0, 0, 0]); // For storing div positions
    const [velocity, setVelocity] = useState([0, 0, 0]);

    return (
        <>
            <LoadAnim loaded={loaded}/>
            <div ref={mindiv} className="w-full cursor-none h-[120%] bg-[#1d184f] scrollbar overflow-x-hidden overflow-auto">
                <Cursor/>
                <div className="cursor-none absolute z-40 top-0 w-full h-16 bg-[#1d184f] bg-opacity-30 backdrop-blur-2xl border-b border-gray-600 shadow-xl pl-14 grid grid-cols-[5%_5%_5%_60%_10%]">
                    <div onClick={() => changePage("/About")} className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">HOME
                    </div>
                    <div onClick={() => changePage("/Work")} className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">WORK
                    </div>
                    <div onClick={() => changePage("/Projects")} className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">PROJECTS
                    </div>
                    <div className="absolute  right-0 w-1/5 h-full flex items-center justify-center pr-14">
                        <div className=" bg-gradient-to-br from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.05)] font-serif w-full h-3/5 bg-opacity-20 text-gray-300 rounded-full flex items-center justify-center">
                            Website under active development
                        </div>
                    </div>
                </div>
                <div className="w-full relative cursor-none h-full ">
                    <Bust rotation={[0, bustY / 10 * Math.PI - 2.3, 0.4]} position={[bustY * 3 - 11, -3 - bustY / 20, bustY]}/>
                    <div className="top-0 w-full h-full text-white text-8xl font-serif absolute">
                        <div className="h-16 w-full "/>
                        <div className="w-full pt-12 pl-14 h-auto italic flex ">
                            Work
                        </div>
                        <div className="w-full h-auto pt-4 pl-14  italic">
                            Experience
                        </div>
                        <div className="container absolute w-1/3 h-1/2 right-0" ref={containerRef}>
                            <div className="shadow-lg box w-full h-1/4 relative bg-white bg-opacity-20 flex items-center rounded-l-xl" style={{transform: `translateY(${positions[0]}px)`}}>
                                <div style={{backgroundImage: `url("${icb}")`}} className="w-24 z-20 absolute h-24 bg-cover"/>
                                <div className=" w-full h-full rounded-l-xl backdrop-blur-xl absolute z-30  text-5xl pl-8 flex items-center p-4 ">
                                    Cadence
                                </div>
                            </div>

                            <div
                                className="box w-full h-1/4 bg-white bg-opacity-20 backdrop-blur-xl shadow-lg text-5xl pl-8 flex items-center p-4 rounded-l-xl"
                                style={{transform: `translateY(${positions[1]}px)`}}>
                                Cadence
                            </div>
                            <div
                                className="box w-full h-1/4 bg-white bg-opacity-20 backdrop-blur-xl shadow-lg text-5xl pl-8 flex items-center p-4 rounded-l-xl"
                                style={{transform: `translateY(${positions[2]}px)`}}>
                                Cadence
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full cursor-none h-full">

                </div>

            </div>
        </>
    )
}