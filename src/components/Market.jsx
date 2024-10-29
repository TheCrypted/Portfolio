import {Canvas} from "@react-three/fiber";
import {Coin} from "../models/Coin.jsx";
import React, {useEffect, useState} from "react";
import {useMousePosition} from "../context/MousePositionProvider.jsx";

export const Market = () => {
    const [diRot, setDiRot] = useState(0)
    const mousePos = useMousePosition();

    useEffect(() => {
        const interval = setInterval(() => setDiRot(prev => (prev + 0.05) % (Math.PI * 2)), 40)

        return () => {
            clearInterval(interval);
        }
    }, []);

    const yRotation = (mousePos.x / window.innerWidth) * Math.PI * 2;

    return (
        <div className="w-full relative h-full flex">
            <div className="w-full h-full flex flex-col  justify-center pt-12">
                <div className=" ml-16 flex items-center justify-center  w-4/5 text-white text-4xl font-serif">Penn Blockchain</div>
                <div className="w-4/5 pl-16 flex items-center justify-between text-white mt-4 text-2xl font-serif pr-4">
                    <div>
                        Software Developer
                    </div>
                    <div className="opacity-70 italic">
                        [Solidity, MERN]
                    </div>
                </div>
                <div className="w-4/5 pl-16 flex items-center text-justify text-white mt-4 text-2xl font-serif opacity-70">
                    Developing and deploying smart contracts using Solidity for decentralized applications. With the aim to participate in hackathons,
                    and create innovative blockchain solutions.
                </div>
            </div>
            <div className="w-full h-full rounded-tl-3xl border-l-4 flex flex-col items-end justify-center  border-white border-opacity-40 border-t-4">
                <div className=" mr-16 flex items-center justify-center w-4/5 text-white text-4xl font-serif">
                    Edinburgh Investment Society
                </div>
                <div className="w-4/5 pr-16 flex items-center justify-between text-white mt-4 text-2xl font-serif">
                    <div>
                        Junior Analyst
                    </div>
                    <div className="opacity-70 italic">
                        [Python, PyData, Tensorflow]
                    </div>
                </div>
                <div
                    className="w-4/5 pr-16 flex items-center text-justify text-white mt-4 text-2xl font-serif opacity-70">
                    Developed and implemented ML-based trading algorithms as a member of the Quant Team at the Edinburgh University Trading and Investment Club.
                </div>
            </div>
            <div className="absolute w-full h-full flex items-center justify-center">
                <div className="w-80 h-80  bg-[#110e2d]">
                    <Canvas>
                        <pointLight position={[5, 4, 8]} intensity={1000}/>
                        <pointLight position={[5, -4, 8]} intensity={1000}/>
                        <pointLight position={[0, -3, 4]} intensity={1000}/>
                        <pointLight position={[0, 3, 4]} intensity={1000}/>
                        <Coin position={[0, 0, 3]} rotation={[-Math.PI / 2, 0, yRotation]}/>
                    </Canvas>
                </div>
            </div>
        </div>
    )
}