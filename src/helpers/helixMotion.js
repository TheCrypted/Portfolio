const MAX_DISPLACEMENT = 0.26;
const MIN_GAP = 0.98;

export function createHelixMotion(count, progress = 0) {
    return {
        progress,
        speed: 0,
        particles: Array.from({length: count}, (_, index) => ({
            displacement: 0,
            velocity: 0,
            mass: 0.85 + (index % 5) * 0.12,
        })),
    };
}

// Small springs along the helix, with contact impulses passed between neighbours.
// Only relative displacement is simulated, so complete turns can recycle off-screen.
export function advanceHelixMotion(state, progress, delta, reducedMotion = false) {
    const travel = progress - state.progress;
    state.progress = progress;
    if (reducedMotion || Math.abs(travel) > 3 || delta <= 0 || delta > 0.1) {
        state.speed = 0;
        state.particles.forEach(particle => {
            particle.displacement = 0;
            particle.velocity = 0;
        });
        return state;
    }

    const speed = Math.max(-14, Math.min(14, travel / delta));
    const impulse = Math.max(-5, Math.min(5, speed - state.speed));
    state.speed = speed;
    state.particles.forEach(particle => {
        particle.velocity += impulse * 0.18 * particle.mass;
    });

    const steps = Math.ceil(delta / (1 / 120));
    const dt = delta / steps;
    for (let step = 0; step < steps; step++) {
        for (const particle of state.particles) {
            const force = -85 * particle.displacement - 8 * particle.velocity;
            particle.velocity += force / particle.mass * dt;
            particle.displacement += particle.velocity * dt;
            if (Math.abs(particle.displacement) > MAX_DISPLACEMENT) {
                particle.displacement = Math.sign(particle.displacement) * MAX_DISPLACEMENT;
                particle.velocity *= -0.15;
            }
        }

        // Two constraint passes distribute a soft bump through adjacent panels.
        for (let pass = 0; pass < 2; pass++) {
            for (let index = 0; index < state.particles.length; index++) {
                const left = state.particles[index];
                const right = state.particles[(index + 1) % state.particles.length];
                if (left === right) continue;
                const overlap = MIN_GAP - (1 + right.displacement - left.displacement);
                if (overlap <= 0) continue;
                const inverseLeft = 1 / left.mass;
                const inverseRight = 1 / right.mass;
                const inverseTotal = inverseLeft + inverseRight;
                left.displacement -= overlap * inverseLeft / inverseTotal;
                right.displacement += overlap * inverseRight / inverseTotal;
                const approach = left.velocity - right.velocity;
                if (approach > 0) {
                    const contactImpulse = 1.12 * approach / inverseTotal;
                    left.velocity -= contactImpulse * inverseLeft;
                    right.velocity += contactImpulse * inverseRight;
                }
            }
        }
    }
    return state;
}
