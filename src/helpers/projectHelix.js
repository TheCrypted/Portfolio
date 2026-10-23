import {PlaneGeometry} from "three";

export const HELIX = Object.freeze({
    radius: 3.2,
    step: Math.PI * 2 / 5,
    arc: Math.PI * 2 / 5 - 0.065,
    rise: 0.72,
    height: 2.45,
    turns: 5,
});

export const wrapIndex = (value, count) => ((value % count) + count) % count;

// Keep repeated turns close to the camera even after many complete rotations.
export const helixOffset = (index, progress, count) =>
    wrapIndex(index - progress + count * HELIX.turns / 2, count * HELIX.turns) - count * HELIX.turns / 2;

export function createHelixGeometry({radius = HELIX.radius, height = HELIX.height, arc = HELIX.arc, rise = HELIX.rise} = {}) {
    const geometry = new PlaneGeometry(1, height, 64, 4);
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
        const theta = positions.getX(i) * arc;
        const y = positions.getY(i);
        positions.setXYZ(i, radius * Math.sin(theta), y - rise * theta, radius * Math.cos(theta));
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    return geometry;
}

// Equivalent to object-fit: cover, without stretching the source screenshot.
export function coverTexture(texture, aspect) {
    const sourceAspect = texture.image.width / texture.image.height;
    texture.repeat.set(Math.min(1, aspect / sourceAspect), Math.min(1, sourceAspect / aspect));
    texture.offset.set((1 - texture.repeat.x) / 2, (1 - texture.repeat.y) / 2);
    texture.needsUpdate = true;
    return texture;
}
