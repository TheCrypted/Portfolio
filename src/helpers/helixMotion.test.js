/* eslint-env node */
import test from "node:test";
import assert from "node:assert/strict";
import {advanceHelixMotion, createHelixMotion} from "./helixMotion.js";

const atRest = state => {
    assert.equal(state.speed, 0);
    for (const particle of state.particles) {
        assert.equal(particle.displacement, 0);
        assert.equal(particle.velocity, 0);
    }
};

const simulateDrive = rate => {
    const state = createHelixMotion(10);
    for (let frame = 1; frame <= rate * 2; frame++) {
        advanceHelixMotion(state, Math.sin(frame / rate * 3) * 0.5, 1 / rate);
    }
    return state;
};

test("scroll acceleration imparts inertia with different responses between panel masses", () => {
    const state = createHelixMotion(5);
    assert.equal(advanceHelixMotion(state, 0.02, 1 / 60), state);
    assert.ok(state.particles.every(particle => particle.displacement > 0 && particle.velocity > 0));
    assert.ok(new Set(state.particles.map(particle => particle.displacement)).size > 1);
    const initialDisplacement = state.particles[0].displacement;
    advanceHelixMotion(state, 0.04, 1 / 60);
    assert.ok(state.particles[0].displacement > initialDisplacement, "constant scrolling should preserve the imparted momentum");
});

test("damped springs return disturbed panels to rest after scrolling stops", () => {
    const state = simulateDrive(60);
    const progress = state.progress;
    assert.ok(state.particles.some(particle => Math.abs(particle.displacement) > 0.001));
    for (let frame = 0; frame < 600; frame++) {
        advanceHelixMotion(state, progress, 1 / 60);
    }
    for (const particle of state.particles) {
        assert.ok(Math.abs(particle.displacement) < 1e-7);
        assert.ok(Math.abs(particle.velocity) < 1e-7);
    }
});

test("neighbor contact separates overlapping panels and passes momentum to the next panel", () => {
    const state = createHelixMotion(2);
    state.particles[0].displacement = 0.15;
    state.particles[0].velocity = 1;
    state.particles[1].displacement = -0.15;
    advanceHelixMotion(state, 0, 1 / 120);
    const [left, right] = state.particles;
    assert.ok(1 + right.displacement - left.displacement >= 0.979999);
    assert.ok(right.velocity > 0, "the approaching panel should transfer momentum to its neighbor");
    assert.ok(left.velocity < right.velocity, "contact should stop panels approaching each other");
});

test("large progress rebases reset relative motion without leaving a wrap impulse", () => {
    for (const progress of [-100, 100]) {
        const state = createHelixMotion(10, progress > 0 ? -0.5 : 0.5);
        state.particles[0].displacement = 0.1;
        state.particles[0].velocity = 2;
        state.speed = 4;
        advanceHelixMotion(state, progress, 1 / 60);
        assert.equal(state.progress, progress);
        atRest(state);
        advanceHelixMotion(state, progress, 1 / 60);
        atRest(state);
    }
});

test("reduced motion immediately removes displacement and velocity during active scrolling", () => {
    const state = simulateDrive(60);
    const progress = state.progress + 0.05;
    advanceHelixMotion(state, progress, 1 / 60, true);
    assert.equal(state.progress, progress);
    atRest(state);
    advanceHelixMotion(state, progress + 0.2, 1 / 60, true);
    atRest(state);
});

test("tab resumes and invalid timesteps discard stale momentum", () => {
    for (const delta of [0, -1 / 60, 0.5]) {
        const state = createHelixMotion(5);
        state.particles[0].displacement = 0.2;
        state.particles[0].velocity = -3;
        state.speed = -2;
        advanceHelixMotion(state, 0.1, delta);
        atRest(state);
    }
});

test("the same scroll gesture remains stable across 30, 60 and 120 Hz", () => {
    const reference = simulateDrive(120);
    for (const rate of [30, 60]) {
        const state = simulateDrive(rate);
        for (let index = 0; index < state.particles.length; index++) {
            assert.ok(Math.abs(state.particles[index].displacement - reference.particles[index].displacement) < 0.025);
            assert.ok(Math.abs(state.particles[index].velocity - reference.particles[index].velocity) < 0.15);
        }
    }
});

test("rapid direction changes keep all panel positions and velocities finite and bounded", () => {
    const state = createHelixMotion(15);
    for (let frame = 0; frame < 1200; frame++) {
        const progress = Math.sin(frame * 0.75) * 0.8;
        advanceHelixMotion(state, progress, 1 / 60);
        for (const particle of state.particles) {
            assert.ok(Number.isFinite(particle.displacement) && Number.isFinite(particle.velocity));
            assert.ok(Math.abs(particle.displacement) <= 0.261);
        }
    }
});
