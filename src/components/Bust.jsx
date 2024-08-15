import React, {Suspense, useEffect, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import {BustModel} from "../models/BustModel.jsx";
import {Text} from "@react-three/drei";

export default function Bust({position, rotation}) {

    return (
        <Canvas dpr={[1, 2]} camera={{ position: [-20, 20, 20], fov: 25 }}>
            <Suspense >
                <directionalLight position={[10, 10, 0]} intensity={1.5} />
                <directionalLight position={[-10, 10, 5]} intensity={1} />
                <directionalLight position={[-10, 20, 0]} intensity={1.5} />
                <directionalLight position={[0, -10, 0]} intensity={0.25} />
                <Text color="rgb(12, 10, 32)" scale={6.0} fontWeight={0.4} position={[-4.0, 5.0, -3.0]}>&</Text>
                <BustModel rotation={rotation} scale={1.2} position={position} />
            </Suspense>
        </Canvas>
    );
}