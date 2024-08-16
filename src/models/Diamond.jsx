import {Caustics, CubeCamera, MeshRefractionMaterial, useGLTF} from "@react-three/drei";
import {useRef} from "react";
import di_glb from "../assets/dflat.glb"
import {useLoader} from "@react-three/fiber";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js";

export function Diamond(props) {
    const ref = useRef()
    const { nodes } = useGLTF(di_glb)

    const texture = useLoader(RGBELoader, 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr')

    return (
        <CubeCamera resolution={256} frames={1} envMap={texture}>
            {(texture) => (
                <Caustics>
                    <mesh ref={ref} geometry={nodes.Diamond_1_0.geometry} {...props}>
                        <MeshRefractionMaterial envMap={texture}  toneMapped={false} />
                    </mesh>
                </Caustics>
            )}
        </CubeCamera>
    )
}