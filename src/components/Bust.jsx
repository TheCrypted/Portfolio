import * as THREE from 'three';
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import bustModel from "../pages/mac-draco.glb"
import {BustModel} from "../models/BustModel.jsx";

export default function Bust({scrollDiv, position}) {
    return (
        <Canvas dpr={[1, 2]} camera={{ position: [-20, 20, 20], fov: 25 }}>
            <Suspense >
                <directionalLight position={[10, 10, 0]} intensity={1.5} />
                <directionalLight position={[-10, 10, 5]} intensity={1} />
                <directionalLight position={[-10, 20, 0]} intensity={1.5} />
                <directionalLight position={[0, -10, 0]} intensity={0.25} />
                <BustModel scrolldiv={scrollDiv} position={position} />
            </Suspense>
        </Canvas>
    );
}