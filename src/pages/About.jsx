import {Cursor} from "../components/Cursor.jsx";
import * as THREE from 'three'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'
import model from "./mac-draco.glb"
import {useSpring} from "@react-spring/three";
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { a as three } from '@react-spring/three'
import { a as web } from '@react-spring/web'
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";

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
    const [open, setOpen] = useState(true)
    const props = useSpring({ open: Number(open) })
    const {setLinkOver} = queryLinkOver()

    return (
        <>
        <Cursor />
        <div className="absolute scrollbar overflow-y-scroll cursor-none w-full h-full bg-[#1d184f] text-5xl text-white">
            <div className=" absolute top-0 w-full h-20 z-20 bg-[#1d184f] backdrop-blur-md bg-opacity-5 border-b border-indigo-800"></div>
            <div className="w-full h-20"></div>
            <div style={{backgroundImage: `url("../src/assets/name.png")`}} className="bg-no-repeat bg-contain bg-[center_top_1rem] relative w-full h-[90%]">
                <div className={`w-full h-full absolute transition-all ${open ? "backdrop-blur-sm" : ""}`}>
                        <Canvas onMouseEnter={() => setLinkOver(true)} onMouseLeave={() => setLinkOver(false)}  dpr={[1, 2]} camera={{position: [0, 0, -30], fov: 35}}>
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
            <div style={{fontFamily: "Chamberi Super Display"}} className="w-full text-white h-1/6 relative grid grid-cols-3">
                <div className="border-t border-white"></div>
                <div className="border-b border-white"></div>
                <div className="border-b border-white"></div>
            </div>
        </div>
    </>
    )
}