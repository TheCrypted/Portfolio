import {Cursor} from "../components/Cursor.jsx";
import * as THREE from 'three'
import { Environment, useGLTF, ContactShadows } from '@react-three/drei'
import model from "./mac-draco.glb"
import {useSpring} from "@react-spring/three";
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { a as three } from '@react-spring/three'
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";
import img from "../assets/img_a.jpg"
import {ExpBlock} from "../components/ExpBlock.jsx";
import {ProjBlock} from "../components/ProjBlock.jsx";
import {EdBack} from "../components/EdBack.jsx";
import {LoadAnim} from "../components/LoadAnim.jsx";
import {useMousePosition} from "../context/MousePositionProvider.jsx";
import DateObject from "react-date-object";
import {useNavigate} from "react-router-dom";

function Model({ open, hinge, ...props }) {
    const group = useRef()
    const { nodes, materials } = useGLTF(model)
    const [hovered, setHovered] = useState(false)
    useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        const { pointer } = state;

        // Adjust the rotation to follow the mouse position slightly
        group.current.rotation.x = THREE.MathUtils.lerp(
            group.current.rotation.x,
            open ? (Math.cos(t / 10) / 10 + 0.25 + pointer.y * 0.1) : 0,
            0.1
        );
        group.current.rotation.y = THREE.MathUtils.lerp(
            group.current.rotation.y,
            open ? (Math.sin(t / 10) / 4 + pointer.x * 0.1) : 0,
            0.1
        );
        group.current.rotation.z = THREE.MathUtils.lerp(
            group.current.rotation.z,
            open ? (Math.sin(t / 10) / 10) : 0,
            0.1
        );

        group.current.position.y = THREE.MathUtils.lerp(
            group.current.position.y,
            open ? (-2 + Math.sin(t)) / 3 : -4.3,
            0.1
        );
    })

    return (
        <group ref={group} {...props} onPointerOver={(e) => (e.stopPropagation(), setHovered(true))} onPointerOut={(e) => setHovered(false)} dispose={null}>
            <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
                    <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
                    <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
                </group>
            </three.group>
            <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
            <group position={[0, -0.1, 3.39]}>
                <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
                <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
            </group>
            <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
        </group>
    )
}


export const About = () => {
    const [open, setOpen] = useState(true);
    const props = useSpring({ open: Number(open) });
    const {setLinkOver} = queryLinkOver();
    const [expand, setExpand] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const mousePos = useMousePosition();
    const navigate = useNavigate();

    const date = new DateObject({
        date: new Date(),
        format: "DD MMMM YYYY",
    });
    const time = new DateObject({
        date: new Date(),
        format: "HHMM",
    });

    useEffect(() => {
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

    return (
        <>
        <Cursor />
        <LoadAnim loaded={loaded}/>
            <div className="cursor-none absolute z-40 top-0 w-full h-16 bg-[#1d184f] bg-opacity-30 backdrop-blur-2xl border-b border-gray-600 shadow-xl pl-14 grid grid-cols-[5%_5%_5%_60%_10%]">
                <div onClick={() => changePage("/")} className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">HOME</div>
                <div onClick={() => changePage("/Work")} className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">WORK</div>
                <div onClick={() => changePage("/Projects")} className="font-serif text-white text-sm flex items-center transition-all hover:[filter:blur(1px)]">PROJECTS</div>
                <div className="absolute  right-0 w-1/5 h-full flex items-center justify-center pr-14">
                    <div className=" bg-gradient-to-br from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.05)] font-serif w-full h-3/5 bg-opacity-20 text-gray-300 rounded-full flex items-center justify-center">
                        Website under active development
                    </div>
                </div>
            </div>
            <div
                className="relative overflow-x-hidden scrollbar overflow-y-scroll cursor-none w-full h-full bg-[#1d184f] text-5xl text-white">
                <div className="w-full h-20"></div>
                <div style={{backgroundImage: `url("../src/assets/name.png")`}} className="bg-no-repeat bg-contain bg-[center_top_1rem] relative w-full h-[90%]">
                    <div className={`w-full h-full absolute transition-all ${open ? "backdrop-blur-sm" : ""}`}>
                        <Canvas onMouseEnter={() => setLinkOver(true)} onMouseLeave={() => setLinkOver(false)}
                                dpr={[1, 2]} camera={{position: [0, 0, -30], fov: 35}}>
                            <three.pointLight position={[10, 10, 10]} intensity={1.5} color={props.open.to([0, 1], ['#f0f0f0', '#d25578'])}/>
                            <Suspense fallback={null}>
                                <group rotation={[0, Math.PI, 0]} onClick={(e) => (e.stopPropagation(), setOpen(!open))}>
                                    <Model open={open} hinge={props.open.to([0, 1], [1.575, -0.425])}/>
                                </group>
                                <Environment preset="city"/>
                            </Suspense>
                            <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5}/>
                        </Canvas>
                    </div>
                </div>
                <div style={{fontFamily: "Chamberi Super Display"}} className="w-full text-2xl text-white h-auto relative pl-14">
                    About <b className="text-blue-600">/</b>
                    <div className="w-full h-auto flex">
                        <div className="w-1/2 text-white mt-6 mb-6 text-6xl">
                            Full-stack developer studying at the University of Edinburgh. Building scalable,
                            user-friendly applications.
                        </div>
                    </div>
                    <div className="absolute right-0 w-2/5 flex items-center top-0 h-full">
                        <div style={{backgroundImage: `url("${img}")`}} className="bg-cover bg-center bg-no-repeat shadow-xl w-full h-2/3 rounded-l-xl"/>
                    </div>
                </div>
                <div className="w-full h-16"/>
                <div className="w-full h-full pt-6 pb-6 text-2xl font-serif pl-14 pr-14 text-white">
                    Work Experience <b className="text-blue-600">/</b>
                    <div className="w-full overflow-hidden h-auto">
                        <ExpBlock ind={"00"} rot={-8} z={4} role="Spring Insight">Morgan Stanley</ExpBlock>
                        <ExpBlock ind={"01"} rot={7} z={1} role="Software Engineering Intern">Cadence</ExpBlock>
                        <ExpBlock ind={"02"} rot={-10} z={4} role="Simulation Software Engineer">Formula
                            Student</ExpBlock>
                        <ExpBlock ind={"03"} rot={12} z={1} role="Spring Insight">Mckinsey & Co</ExpBlock>
                    </div>
                </div>
                <div className="w-full "/>
                <div className="w-full h-full pt-6 pb-6 text-2xl font-serif text-white">
                    <div className="pl-14">
                        Background <b className="text-blue-600">/</b>
                    </div>
                    <div className="w-full pt-12 h-full flex">
                        <EdBack/>
                    </div>
                </div>
                <div className="w-full h-16"/>
                <div className="w-full h-2/3 pt-6 pb-6 text-2xl font-serif pl-14 pr-14 text-white">
                    Selected Projects <b className="text-blue-600">/</b>
                    <div className="w-full pt-12 h-full flex">
                        <ProjBlock open={expand} setOpen={setExpand} ind={0}>Calendar +</ProjBlock>
                        <ProjBlock open={expand} setOpen={setExpand} ind={1}>Grocery +</ProjBlock>
                        <ProjBlock open={expand} setOpen={setExpand} ind={2}>Web Chat +</ProjBlock>
                        <ProjBlock open={expand} setOpen={setExpand} ind={3}>Ray Tracer</ProjBlock>
                        <ProjBlock open={expand} setOpen={setExpand} ind={4}>Plant Guard</ProjBlock>
                    </div>
                </div>
                <div className="w-full h-20"/>
                <div className="w-full h-1/2 pt-6 pb-6 text-2xl font-serif text-white">
                    <div className="w-full h-auto text-8xl text-white text-nowrap overflow-hidden opacity-50">
                        <div style={{left: `${-500 + mousePos.x*0.2}px`}} className="relative">
                            Contact Me // Contact Me // Contact Me // Contact Me // Contact Me
                        </div>
                    </div>
                    <div onMouseEnter={() => setLinkOver(true)} onMouseLeave={() => setLinkOver(false)} className="w-full transition-colors h-auto text-8xl text-white text-nowrap overflow-hidden ">
                        <div style={{left: `${-500 - mousePos.x*0.2}px`}} className="relative">
                            Contact Me // Contact Me // Contact Me // Contact Me // Contact Me
                        </div>
                    </div>
                    <div className="w-full h-auto flex justify-center pt-12">
                        <a href="mailto:mail.aman@protonmail.com" className="outline-none">
                            <div onMouseEnter={() => setLinkOver(true)} onMouseLeave={() => setLinkOver(false)} className="cursor-none w-80 hover:[filter:blur(1px)] transition-all hover:scale-110 overflow-hidden h-12 text-white p-1 hover:bg-white hover:text-[#1d184f] px-4 text-2xl rounded-l-full rounded-r-full border-2 border-white flex items-center justify-center">
                                Contact Me
                            </div>
                        </a>
                    </div>
                </div>
                <div className="w-full grid grid-cols-[20%_60%_20%] h-1/6 pt-6 pb-6  bg-opacity-40 text-2xl font-serif text-white"> {/*  bg-[#191443]*/}
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
                            <a href="https://www.linkedin.com/in/aman-sharma-992a6a285/" onMouseEnter={() => setLinkOver(true)} onMouseLeave={() => setLinkOver(false)}><div className="transition-all hover:[filter:blur(1px)]">LinkedIn</div></a>
                            <a href="https://github.com/TheCrypted" onMouseEnter={() => setLinkOver(true)} onMouseLeave={() => setLinkOver(false)}><div className="transition-all hover:[filter:blur(1px)]">Github</div></a>
                            <a href="https://www.kaggle.com/amansharma110" onMouseEnter={() => setLinkOver(true)} onMouseLeave={() => setLinkOver(false)}><div className="transition-all hover:[filter:blur(1px)]">Kaggle</div></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}