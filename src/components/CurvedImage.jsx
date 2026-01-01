import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

export const CurvedImage = ({ imageUrl, position = [0, 0, 0], opacity = 1, scale = 1 }) => {
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, imageUrl);
    
    // Create curved geometry (cylinder segment)
    const geometry = useMemo(() => {
        const width = 4;
        const height = 2.5;
        const curveSegments = 32;
        const heightSegments = 1;
        const curveRadius = 5; // Radius of the curve
        const curveAngle = Math.PI / 4; // 45 degrees arc
        
        // Create a curved plane geometry
        const geo = new THREE.PlaneGeometry(width, height, curveSegments, heightSegments);
        const positions = geo.attributes.position.array;
        
        // Bend the plane around the horizontal axis (curve top and bottom backward)
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            
            // Normalize y position (-1 to 1)
            const normalizedY = y / (height / 2);
            
            // Calculate angle based on y position
            const angle = normalizedY * (curveAngle / 2);
            
            // Apply cylindrical transformation (curve around X axis)
            const newY = Math.sin(angle) * curveRadius;
            const newZ = Math.cos(angle) * curveRadius - curveRadius;
            
            positions[i + 1] = newY + y * 0.3; // Keep some original y, add curve
            positions[i + 2] = newZ;
        }
        
        geo.attributes.position.needsUpdate = true;
        geo.computeVertexNormals();
        
        return geo;
    }, []);
    
    return (
        <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
            <meshBasicMaterial 
                map={texture} 
                transparent 
                opacity={opacity}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// A simpler curved image using a cylinder segment
export const CurvedImageCylinder = ({ imageUrl, position = [0, 0, 0], opacity = 1, scale = 1, rotation = [0, 0, 0] }) => {
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, imageUrl);
    
    // Create cylinder segment geometry
    const geometry = useMemo(() => {
        // CylinderGeometry: radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength
        const radius = 6;
        const height = 3;
        const thetaLength = Math.PI / 3; // 60 degrees arc
        
        const geo = new THREE.CylinderGeometry(
            radius, radius, height, 
            64, 1, true, 
            -thetaLength / 2, thetaLength
        );
        
        // Rotate so it faces the camera
        geo.rotateX(Math.PI / 2);
        
        return geo;
    }, []);
    
    // Adjust UV mapping for the texture
    useMemo(() => {
        const uvs = geometry.attributes.uv.array;
        for (let i = 0; i < uvs.length; i += 2) {
            // Flip and adjust UVs for proper image display
            uvs[i] = 1 - uvs[i]; // Flip horizontally
        }
        geometry.attributes.uv.needsUpdate = true;
    }, [geometry]);
    
    return (
        <mesh 
            ref={meshRef} 
            position={position} 
            scale={scale} 
            rotation={rotation}
            geometry={geometry}
        >
            <meshBasicMaterial 
                map={texture} 
                transparent 
                opacity={opacity}
                side={THREE.FrontSide}
            />
        </mesh>
    );
};

