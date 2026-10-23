import {useEffect, useId, useRef, useState} from "react";
import "./BloombergFeature.css";

const ROW_HEIGHT = 25;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const makeEvent = (sequence, energy = 0) => ({
    id: `EVT-${String(sequence).padStart(5, '0')}`,
    side: Math.sin(sequence * 2.39 + energy) > 0 ? 'BUY' : 'SELL',
    pair: ['EUR/USD', 'GBP/USD', 'USD/JPY'][sequence % 3],
    quantity: (1 + ((sequence * 7 + Math.round(energy * 4)) % 9)) * 100,
    state: sequence % 4 === 0 ? 'ROUTED' : 'MATCHED',
});

function drawMarket(canvas, state, bounds, staticMotion) {
    const context = canvas.getContext('2d');
    if (!context || !bounds.width || !bounds.height) return;
    const {width, height, ratio} = bounds;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    const left = width * 0.035;
    const right = width * 0.965;
    const bottom = height * 0.83;
    const phase = staticMotion ? 0.6 : state.phase;
    const energy = staticMotion ? 0 : state.speed + state.pulse;
    const bias = staticMotion ? 0 : (state.y - 0.5) * height * 0.25;
    const amplitude = height * (0.08 + Math.min(energy, 2) * 0.035);
    const value = index => height * 0.43 + bias
        + Math.sin(index * 0.12 + phase) * amplitude
        + Math.sin(index * 0.41 - phase * 0.8) * amplitude * 0.38
        + Math.cos(index * 0.027 + phase * 0.5) * height * 0.12;

    // The artwork has no background fill: every trace floats on the Work page.
    context.font = `700 ${height * 0.77}px Arial, sans-serif`;
    context.strokeStyle = 'rgba(185, 158, 138, 0.065)';
    context.lineWidth = 1;
    context.strokeText('B', width * 0.07, height * 0.78);
    context.font = '10px monospace';
    for (let row = 0; row < 5; row++) {
        const y = height * (0.16 + row * 0.14);
        context.beginPath();
        context.moveTo(left, y);
        context.lineTo(right, y);
        context.strokeStyle = 'rgba(179, 163, 196, 0.07)';
        context.stroke();
        context.fillStyle = 'rgba(179, 163, 196, 0.3)';
        context.fillText(String(105 - row * 5), right - 20, y - 8);
    }
    const points = 85;
    const spacing = (right - left) / (points - 1);
    for (let index = 0; index < points; index++) {
        const x = left + index * spacing;
        const open = value(index);
        const close = value(index + 0.9);
        const high = Math.min(open, close) - (5 + Math.abs(Math.sin(index * 2 + phase)) * 18);
        const low = Math.max(open, close) + (5 + Math.abs(Math.cos(index * 1.7 + phase)) * 17);
        const rising = close < open;
        context.strokeStyle = rising ? 'rgba(170, 190, 167, 0.5)' : 'rgba(203, 139, 138, 0.42)';
        context.fillStyle = rising ? 'rgba(170, 190, 167, 0.48)' : 'rgba(203, 139, 138, 0.38)';
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(x, high);
        context.lineTo(x, low);
        context.stroke();
        context.fillRect(x - Math.max(1.5, spacing * 0.23), Math.min(open, close), Math.max(3, spacing * 0.46), Math.max(2, Math.abs(close - open)));
        const volume = Math.abs(Math.sin(index * 1.3 + phase)) * height * 0.055 + Math.min(energy, 2) * 12;
        context.fillStyle = rising ? 'rgba(170, 190, 167, 0.11)' : 'rgba(203, 139, 138, 0.09)';
        context.fillRect(x - spacing * 0.25, bottom - volume, spacing * 0.5, volume);
    }
    context.beginPath();
    for (let index = 0; index < points; index++) {
        const x = left + index * spacing;
        const y = value(index) - height * 0.045;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
    }
    context.strokeStyle = '#e8b47e';
    context.lineWidth = width < 600 ? 1.7 : 2.2;
    context.stroke();
    const markerIndex = (staticMotion ? 0.7 : state.x) * (points - 1);
    const markerX = left + markerIndex * spacing;
    const markerY = value(markerIndex) - height * 0.045;
    context.beginPath();
    context.moveTo(markerX, height * 0.1);
    context.lineTo(markerX, bottom);
    context.setLineDash([2, 6]);
    context.strokeStyle = 'rgba(232, 180, 126, 0.25)';
    context.lineWidth = 1;
    context.stroke();
    context.setLineDash([]);
    context.beginPath();
    context.arc(markerX, markerY, 4 + Math.min(energy, 2) * 2, 0, Math.PI * 2);
    context.fillStyle = '#f2cfaa';
    context.fill();
    context.beginPath();
    context.arc(markerX, markerY, 11 + Math.min(energy, 2) * 9, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(242, 207, 170, 0.25)';
    context.stroke();
}

export const BloombergFeature = () => {
    const section = useRef(null);
    const canvas = useRef(null);
    const stream = useRef(null);
    const model = useRef({phase: 0.6, x: 0.7, y: 0.5, speed: 0, pulse: 0, sequence: 24, feed: 0, lastPointer: null});
    const [events, setEvents] = useState(() => Array.from({length: 24}, (_, index) => makeEvent(index)));
    const [inView, setInView] = useState(false);
    const [pageVisible, setPageVisible] = useState(() => !document.hidden);
    const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [bounds, setBounds] = useState({width: 0, height: 0, ratio: 1});
    const [pulseCount, setPulseCount] = useState(0);
    const id = useId();
    const active = inView && pageVisible && !reducedMotion;

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {threshold: 0.08});
        observer.observe(section.current);
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const motionChange = () => setReducedMotion(media.matches);
        const visibilityChange = () => setPageVisible(!document.hidden);
        media.addEventListener('change', motionChange);
        document.addEventListener('visibilitychange', visibilityChange);
        const resize = new ResizeObserver(([entry]) => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            const {width, height} = entry.contentRect;
            canvas.current.width = Math.round(width * ratio);
            canvas.current.height = Math.round(height * ratio);
            setBounds({width, height, ratio});
        });
        resize.observe(canvas.current);
        return () => {
            observer.disconnect();
            resize.disconnect();
            media.removeEventListener('change', motionChange);
            document.removeEventListener('visibilitychange', visibilityChange);
        };
    }, []);

    useEffect(() => {
        let frame;
        let previous;
        const draw = time => {
            const state = model.current;
            const delta = previous === undefined ? 0 : Math.min((time - previous) / 1000, 0.05);
            previous = time;
            if (active) {
                state.phase += delta * (0.65 + state.speed * 1.9 + state.pulse * 0.8);
                state.speed *= Math.exp(-delta * 2.4);
                state.pulse *= Math.exp(-delta * 1.5);
                state.feed += delta * (21 + state.speed * 95 + state.pulse * 70);
                if (state.feed >= ROW_HEIGHT) {
                    state.feed %= ROW_HEIGHT;
                    const event = makeEvent(state.sequence++, state.speed + state.pulse);
                    setEvents(previousEvents => [...previousEvents.slice(1), event]);
                }
                stream.current.style.transform = `translateY(${-state.feed}px)`;
            }
            drawMarket(canvas.current, state, bounds, reducedMotion);
            if (active) frame = requestAnimationFrame(draw);
        };
        draw(performance.now());
        return () => cancelAnimationFrame(frame);
    }, [active, bounds, reducedMotion]);

    const pulse = () => {
        if (reducedMotion || !active) return;
        model.current.pulse = Math.min(3, model.current.pulse + 1.4);
        setPulseCount(previous => previous + 1);
    };
    const pointerMove = event => {
        if (!active) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const state = model.current;
        const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        const y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
        const previous = state.lastPointer;
        if (previous) {
            const elapsed = Math.max(8, event.timeStamp - previous.time);
            const velocity = Math.hypot(x - previous.x, y - previous.y) * 1000 / elapsed;
            state.speed = clamp(state.speed + velocity * 0.12, 0, 2);
        }
        state.x = x;
        state.y = y;
        state.lastPointer = {x, y, time: event.timeStamp};
    };
    const keyboard = event => {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key) || !active) return;
        event.preventDefault();
        const state = model.current;
        if (event.key === 'ArrowUp') state.y = clamp(state.y - 0.1, 0, 1);
        if (event.key === 'ArrowDown') state.y = clamp(state.y + 0.1, 0, 1);
        if (event.key === 'ArrowLeft') state.x = clamp(state.x - 0.1, 0, 1);
        if (event.key === 'ArrowRight') state.x = clamp(state.x + 0.1, 0, 1);
        pulse();
    };

    return (
        <section ref={section} className="bloomberg-feature" data-active={active} data-reduced-motion={reducedMotion} aria-labelledby={`${id}-heading`}>
            <header className="bloomberg-feature-heading">
                <div className="bloomberg-feature-current">
                    <p className="bloomberg-feature-eyebrow"><span/> Current / Full-time</p>
                    <h2 id={`${id}-heading`}>Bloomberg<span className="bloomberg-feature-period">.</span></h2>
                    <p className="bloomberg-feature-role">Software Engineer</p>
                    <p className="bloomberg-feature-intro">Building systems and financial software.</p>
                </div>
                <div className="bloomberg-feature-past">
                    <p className="bloomberg-feature-eyebrow">Previously / Jun — Sep 2025</p>
                    <h3>Software Engineering Intern</h3>
                    <p className="bloomberg-feature-team">Electronic Trading <span> / </span> C++ · Kafka</p>
                    <p className="bloomberg-feature-description">Redesigned the FX auditing system during my internship, engineering for low-latency distributed environments with strict performance and reliability constraints.</p>
                </div>
            </header>
            <div className="bloomberg-market-stage" onPointerMove={pointerMove} onPointerLeave={() => { model.current.lastPointer = null; }} onPointerDown={event => { if (!event.target.closest('button')) pulse(); }}>
                <div className="bloomberg-trade-feed" aria-hidden="true">
                    <div className="bloomberg-trade-heading"><span>EVENT</span><span>SIDE</span><span>PAIR</span><span>SIZE</span><span>STATUS</span></div>
                    <div className="bloomberg-trade-window">
                        <div ref={stream} className="bloomberg-trade-stream">
                            {events.map(event => (
                                <div className="bloomberg-trade-event" key={event.id}>
                                    <span>{event.id}</span><span className={`bloomberg-trade-${event.side.toLowerCase()}`}>{event.side}</span><span>{event.pair}</span><span>{event.quantity}</span><span>{event.state}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <canvas ref={canvas} className="bloomberg-market-canvas" aria-hidden="true"/>
                <div className="bloomberg-market-footer">
                    <p className="bloomberg-feature-eyebrow">Financial systems / In motion</p>
                    <button className="bloomberg-market-pulse" type="button" onClick={pulse} onKeyDown={keyboard} disabled={reducedMotion} aria-describedby={`${id}-control-description`}>Inject signal <span aria-hidden="true">↗</span></button>
                    <p id={`${id}-control-description`} className="bloomberg-feature-sr-only">Move across the chart or activate this button to perturb the simulation. With the button focused, use arrow keys to move the chart marker.</p>
                    <span className="bloomberg-feature-sr-only" role="status">{pulseCount ? `Simulation signal ${pulseCount} injected.` : ''}</span>
                </div>
            </div>
        </section>
    );
};
