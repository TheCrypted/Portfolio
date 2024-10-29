import coin from "../assets/coin.glb"
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Coin(props) {
    const { nodes, materials } = useGLTF(coin)
    return (
        <group {...props} dispose={null}>
            <group  scale={4}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['16783_Zeus_v1_NEW001_oro2_0'].geometry}
                    material={materials.oro2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['16783_Zeus_v1_NEW001_oro2_0_1'].geometry}
                    material={materials.oro2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['16783_Zeus_v1_NEW001_oro2_0_2'].geometry}
                    material={materials.oro2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['16783_Zeus_v1_NEW001_oro2_0_3'].geometry}
                    material={materials.oro2}
                />
            </group>
        </group>
    )
}

