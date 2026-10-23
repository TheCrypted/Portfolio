/* React Three Fiber elements use Three.js properties rather than DOM attributes. */
/* eslint-disable react/no-unknown-property */
import {Component, Suspense, useEffect, useMemo, useRef} from "react";
import PropTypes from "prop-types";
import {Canvas, useFrame} from "@react-three/fiber";
import {useTexture} from "@react-three/drei";
import {BackSide, SRGBColorSpace} from "three";
import {coverTexture, createHelixGeometry, HELIX, helixOffset} from "../helpers/projectHelix.js";
import {advanceHelixMotion, createHelixMotion} from "../helpers/helixMotion.js";

class SceneBoundary extends Component {
    state = {failed: false};
    static getDerivedStateFromError() { return {failed: true}; }
    componentDidCatch() { this.props.onError(); }
    render() { return this.state.failed ? null : this.props.children; }
}
SceneBoundary.propTypes = {children: PropTypes.node, onError: PropTypes.func.isRequired};

function Ribbon({source, index, count, progress, motion}) {
    const group = useRef();
    const card = useRef();
    const material = useRef();
    const geometry = useMemo(() => createHelixGeometry(), []);
    const texture = useMemo(() => {
        const copy = source.clone();
        copy.colorSpace = SRGBColorSpace;
        return coverTexture(copy, HELIX.radius * HELIX.arc / HELIX.height);
    }, [source]);

    useEffect(() => () => {
        geometry.dispose();
        texture.dispose();
    }, [geometry, texture]);

    useFrame(() => {
        const offset = helixOffset(index, progress.current - motion.displacement, count);
        const theta = offset * HELIX.step;
        group.current.rotation.y = theta;
        group.current.position.y = -theta * HELIX.rise;
        const distance = Math.abs(offset);
        // Grow the front panel smoothly as it reaches the center.
        const focus = Math.exp(-Math.pow(distance / 0.7, 2));
        group.current.scale.setScalar(1 + 0.16 * focus);
        card.current.rotation.x = Math.max(-0.06, Math.min(0.06, motion.velocity * 0.03));
        card.current.rotation.z = Math.max(-0.09, Math.min(0.09, -motion.velocity * 0.045));
        // Full turns recycle beyond the scene's faded edges, never at a visible end.
        material.current.color.setScalar(Math.max(0.35, 1 - distance * 0.20));
    });

    return (
        <group ref={group}>
            <group ref={card} position={[0, 0, HELIX.radius]}>
                <group position={[0, 0, -HELIX.radius]}>
                    <mesh geometry={geometry}>
                        <meshBasicMaterial ref={material} map={texture} toneMapped={false}/>
                    </mesh>
                    <mesh geometry={geometry}>
                        <meshBasicMaterial side={BackSide} color="#110e2d"/>
                    </mesh>
                </group>
            </group>
        </group>
    );
}
Ribbon.propTypes = {
    source: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    progress: PropTypes.object.isRequired,
    motion: PropTypes.object.isRequired,
};

function Ribbons({projects, progress, onReady, reducedMotion}) {
    const sources = useTexture(projects.map(project => project.image));
    const motion = useMemo(() => createHelixMotion(projects.length, progress.current), [projects.length, progress]);
    useEffect(() => { onReady(); }, [onReady]);
    useFrame((_, delta) => {
        advanceHelixMotion(motion, progress.current, delta, reducedMotion);
    }, -1);
    return Array.from({length: HELIX.turns}, (_, turn) => projects.map((project, index) => (
        <Ribbon key={`${turn}-${project.name}`} source={sources[index]}
            index={index + (turn - Math.floor(HELIX.turns / 2)) * projects.length}
            count={projects.length} progress={progress} motion={motion.particles[index]}/>
    )));
}
Ribbons.propTypes = {
    projects: PropTypes.array.isRequired,
    progress: PropTypes.object.isRequired,
    onReady: PropTypes.func.isRequired,
    reducedMotion: PropTypes.bool.isRequired,
};

export function ProjectHelix({projects, progress, onReady, onError, reducedMotion}) {
    return (
        <SceneBoundary onError={onError}>
            <Canvas
                dpr={[1, 1.5]}
                camera={{position: [0, 0.65, 12.8], fov: 39, near: 0.1, far: 60}}
                gl={{alpha: true, antialias: true, powerPreference: 'high-performance'}}
                onCreated={({camera, gl}) => {
                    camera.lookAt(0, 0, 0);
                    gl.domElement.addEventListener('webglcontextlost', onError, {once: true});
                }}
            >
                <Suspense fallback={null}>
                    <Ribbons projects={projects} progress={progress} onReady={onReady} reducedMotion={reducedMotion}/>
                </Suspense>
            </Canvas>
        </SceneBoundary>
    );
}
ProjectHelix.propTypes = {...Ribbons.propTypes, onError: PropTypes.func.isRequired};
