import {Cursor} from "../components/Cursor.jsx";
import React, {Suspense, useEffect, useRef, useState} from "react";
import Bust from "../components/Bust.jsx";
import {LoadAnim} from "../components/LoadAnim.jsx";
import {useNavigate} from "react-router-dom";
import {Canvas} from "@react-three/fiber";
import {Stars} from "../components/Stars.jsx";
import {ReactiveLink} from "../helpers/ReactiveLink.jsx";
import {Diamond} from "../models/Diamond.jsx";

export const Work = () => {
    const mindiv = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [bustY, setBustY] = useState(0)
    const navigate = useNavigate();
    const [diRot, setDiRot] = useState(0)


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

    const containerRef = useRef(null);

    return (
        <>
            <LoadAnim loaded={loaded}/>
            <div ref={mindiv}
                 className="w-full cursor-none h-[120%] bg-[#1d184f] scrollbar overflow-x-hidden overflow-auto">
                <Cursor/>
                <div
                    className="cursor-none absolute z-40 top-0 w-full h-16 bg-[#1d184f] bg-opacity-30 backdrop-blur-2xl border-b border-gray-600 shadow-xl pl-14 grid grid-cols-[5%_5%_5%_30%_55%]">
                    <div onClick={() => changePage("/")}
                         className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">HOME
                    </div>
                    <div
                        className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">WORK
                    </div>
                    <div
                        className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">PROJECTS
                    </div>
                    <div className="absolute  right-0 full h-full flex items-center justify-center pr-14">
                        <div
                            className=" bg-gradient-to-br from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.05)] font-serif w-auto px-3 h-3/5 bg-opacity-20 text-gray-300 rounded-full flex items-center justify-center">
                            Website under active development
                        </div>
                    </div>
                </div>
                <div className="w-full relative cursor-none h-full ">
                    <Bust rotation={[0, bustY / 10 * Math.PI - 2.3, 0.4]}
                          position={[bustY * 3 - 11, -3 - bustY / 20, bustY]}/>
                    <div className="top-0 w-full h-full text-white text-8xl font-serif absolute">
                        <div className="h-16 w-full "/>
                        <div className="w-full pt-12 pl-14 h-auto italic flex ">
                            Projects
                        </div>
                        <div className="w-full h-auto pt-8 pl-28 italic">
                            Competitions
                        </div>
                        <div className="container absolute w-1/3 h-1/2 right-0" ref={containerRef}>
                            <div
                                className="hover:[filter:blur(2px)] transition-all box w-full h-1/5 bg-white bg-opacity-20 backdrop-blur-xl shadow-lg text-5xl pl-8 flex items-center p-4 rounded-l-xl">
                                Ray Tracing Sim
                            </div>
                            <div
                                className="hover:[filter:blur(2px)] transition-all box w-full h-1/5 bg-white bg-opacity-15 backdrop-blur-xl shadow-lg text-5xl pl-8 flex items-center p-4 rounded-l-xl">
                                Calendar Plus
                            </div>
                            <div
                                className="hover:[filter:blur(2px)] transition-all box w-full h-1/5 bg-white bg-opacity-10 backdrop-blur-xl shadow-lg text-5xl pl-8 flex items-center p-4 rounded-l-xl">
                                Sentiment Bot
                            </div>
                            <div
                                className="hover:[filter:blur(2px)] transition-all box w-full h-1/5 bg-white bg-opacity-5 backdrop-blur-xl shadow-lg text-5xl pl-8 flex items-center p-4 rounded-l-xl">
                                Grocery Plus
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full relative rounded-t-3xl cursor-none bg-[#141137] h-[80%]">
                    <Canvas camera={{position: [0, 0, 1]}}>
                        <Stars scroll={bustY}/>
                        <Diamond rotation={[0.0, diRot, bustY / 10]} position={[4.0, -0.5, -4.0]}/>
                    </Canvas>
                    <div className="absolute top-0 w-full h-full grid grid-cols-2 place-items-center">
                        <div className="w-3/4 h-auto text-white gap-6 flex flex-wrap font-serif text-4xl">
                            <div className="w-full h-auto text-5xl">
                                Ray Tracing Simulator
                            </div>
                            <div className="text-gray-400 flex justify-between text-3xl w-full italic">
                                [C++, SDL] <ReactiveLink to="https://github.com/TheCrypted/RayTracing" classes="hover:underline animate-float">Github</ReactiveLink>
                            </div>
                            <div className="w-full text-justify text-3xl">
                                A physics based renderer that simulates light interaction through ray tracing equations
                                written from scratch.
                                The renderer contains mathematical definitions for different materials, objects,
                                textures and much more allowing one
                                to build any combination of custom scenes.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full relative cursor-none bg-[#141137] h-[80%]">
                    <div className="w-full h-full rounded-t-3xl bg-[#110e2d]">

                    </div>
                </div>

            </div>
        </>
    )
}