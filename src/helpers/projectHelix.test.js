/* eslint-env node */
import test from "node:test";
import assert from "node:assert/strict";
import {Texture} from "three";
import {HELIX, coverTexture, createHelixGeometry, helixOffset, wrapIndex} from "./projectHelix.js";

const near = (actual, expected, tolerance = 1e-5) => {
    assert.ok(Math.abs(actual - expected) < tolerance, `${actual} should be within ${tolerance} of ${expected}`);
};

test("curved screenshot vertices stay on the cylinder at default and custom sizes", () => {
    for (const options of [{}, {radius: 5, arc: 0.8, rise: 1.1, height: 3}]) {
        const geometry = createHelixGeometry(options);
        const positions = geometry.attributes.position;
        const radius = options.radius ?? HELIX.radius;
        for (let i = 0; i < positions.count; i++) {
            near(Math.hypot(positions.getX(i), positions.getZ(i)), radius);
        }
        assert.ok(Number.isFinite(geometry.boundingSphere.radius));
        geometry.dispose();
    }
});

test("surface normals turn across the screenshot rather than describing a flat card", () => {
    const geometry = createHelixGeometry();
    const positions = geometry.attributes.position;
    const normals = geometry.attributes.normal;
    const rowWidth = geometry.parameters.widthSegments + 1;
    const left = rowWidth;
    const right = rowWidth * 2 - 1;
    assert.ok(normals.getX(left) < -0.4);
    assert.ok(normals.getX(right) > 0.4);
    for (let i = 0; i < normals.count; i++) {
        const radialDot = (normals.getX(i) * positions.getX(i) + normals.getZ(i) * positions.getZ(i)) / HELIX.radius;
        assert.ok(radialDot > 0.99, "normals should face out from the cylinder");
    }
    assert.ok(positions.getZ(Math.floor(rowWidth / 2)) > positions.getZ(0) + 0.4);
    geometry.dispose();
});

test("both horizontal edges slope along the helix while preserving screenshot height", () => {
    const geometry = createHelixGeometry();
    const positions = geometry.attributes.position;
    const rowWidth = geometry.parameters.widthSegments + 1;
    const bottomRow = positions.count - rowWidth;
    const topDrop = positions.getY(0) - positions.getY(rowWidth - 1);
    const bottomDrop = positions.getY(bottomRow) - positions.getY(positions.count - 1);
    assert.ok(topDrop > 0.5, "top edge should visibly descend around the cylinder");
    near(topDrop, bottomDrop);
    for (let column = 0; column < rowWidth; column++) {
        near(positions.getY(column) - positions.getY(bottomRow + column), HELIX.height);
    }
    geometry.dispose();
});

test("negative and multiple-turn indices wrap to valid project indices", () => {
    for (const [input, expected] of [[-11, 4], [-5, 0], [-1, 4], [0, 0], [6, 1], [15, 0]]) {
        assert.equal(wrapIndex(input, 5), expected);
    }
});

test("helix offsets retain fractional scrolling and recycle after all repeated turns", () => {
    const count = 5;
    near(helixOffset(0, 0, count), 0);
    near(helixOffset(0, 0.25, count), -0.25);
    near(helixOffset(0, -0.25, count), 0.25);
    for (const progress of [-101.25, -15, -0.5, 0, 4.9, 30.25, 104]) {
        for (let index = 0; index < count * HELIX.turns; index++) {
            const offset = helixOffset(index, progress, count);
            assert.ok(offset >= -count * HELIX.turns / 2 && offset < count * HELIX.turns / 2);
            near(helixOffset(index, progress + count * HELIX.turns, count), offset);
            near(helixOffset(index + count * HELIX.turns, progress, count), offset);
        }
    }
});

test("coverTexture centrally crops wide, tall and matching images without stretching", () => {
    for (const [width, height, aspect] of [[2000, 1000, 1], [1000, 2000, 1], [1800, 1200, 1.5], [1600, 900, 1.25]]) {
        const texture = new Texture({width, height});
        assert.equal(coverTexture(texture, aspect), texture);
        const {repeat, offset} = texture;
        assert.ok(repeat.x > 0 && repeat.x <= 1 && repeat.y > 0 && repeat.y <= 1);
        assert.ok(repeat.x === 1 || repeat.y === 1, "cover should fill one source dimension");
        near((width * repeat.x) / (height * repeat.y), aspect);
        near(offset.x + repeat.x / 2, 0.5);
        near(offset.y + repeat.y / 2, 0.5);
        assert.ok(texture.version > 0, "texture upload should be marked dirty");
        texture.dispose();
    }
});
