import {useCallback, useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LoadAnim} from "../components/LoadAnim.jsx";
import {Cursor} from "../components/Cursor.jsx";
import {ProjectHelix} from "../components/ProjectHelix.jsx";
import {ProjectIndex} from "../components/ProjectIndex.jsx";
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";
import {useLoading} from "../context/LoadingProvider.jsx";
import {projects} from "../data/projects.js";
import {wrapIndex} from "../helpers/projectHelix.js";
import "./Projects.css";

function supportsWebGL() {
    try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!context) return false;
        context.getExtension('WEBGL_lose_context')?.loseContext();
        return true;
    } catch {
        return false;
    }
}

export const Projects = () => {
    const [loaded, setLoaded] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [webGL, setWebGL] = useState(supportsWebGL);
    const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const progress = useRef(0);
    const target = useRef(0);
    const root = useRef(null);
    const navigationTimer = useRef();
    const leaving = useRef(false);
    const navigate = useNavigate();
    const {isLoading} = useLoading();
    const {setLinkOver} = queryLinkOver();
    const ready = useCallback(() => {
        if (!leaving.current) setLoaded(true);
    }, []);
    const sceneError = useCallback(() => setWebGL(false), []);

    useEffect(() => {
        if (!webGL) ready();
    }, [webGL, ready]);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const change = () => setReducedMotion(media.matches);
        media.addEventListener('change', change);
        return () => media.removeEventListener('change', change);
    }, []);

    useEffect(() => {
        let frame;
        let previous;
        let currentIndex = 0;
        const animate = time => {
            const dt = previous === undefined ? 1 / 60 : Math.min((time - previous) / 1000, 0.05);
            previous = time;
            const difference = target.current - progress.current;
            progress.current = reducedMotion || Math.abs(difference) < 0.0001
                ? target.current
                : progress.current + difference * (1 - Math.exp(-10 * dt));
            const next = wrapIndex(Math.round(progress.current), projects.length);
            if (next !== currentIndex) {
                currentIndex = next;
                setActiveIndex(next);
            }
            // Bound numeric drift without changing the visible phase.
            if (Math.abs(target.current) > 10000) {
                const turns = Math.trunc(progress.current / projects.length) * projects.length;
                progress.current -= turns;
                target.current -= turns;
            }
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [reducedMotion]);

    useEffect(() => {
        const element = root.current;
        if (isLoading) return;
        let snapTimer;
        let touchY = null;
        const snap = () => { target.current = Math.round(target.current); };
        const scheduleSnap = () => {
            clearTimeout(snapTimer);
            snapTimer = setTimeout(snap, 160);
        };
        const wheel = event => {
            if (event.ctrlKey || event.target.closest('a')) return;
            event.preventDefault();
            const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1;
            const delta = event.deltaY * multiplier;
            if (reducedMotion) {
                if (!snapTimer && delta !== 0) target.current = Math.round(target.current) + Math.sign(delta);
                clearTimeout(snapTimer);
                snapTimer = setTimeout(() => { snapTimer = undefined; }, 180);
            } else {
                target.current += Math.max(-240, Math.min(240, delta)) / 380;
                scheduleSnap();
            }
        };
        const touchStart = event => {
            touchY = null;
            if (event.target.closest('a') || event.touches.length !== 1) return;
            clearTimeout(snapTimer);
            touchY = event.touches[0].clientY;
        };
        const touchMove = event => {
            if (event.touches.length !== 1) {
                touchY = null;
                return;
            }
            if (touchY === null) return;
            const nextY = event.touches[0].clientY;
            const delta = touchY - nextY;
            if (reducedMotion) {
                if (Math.abs(delta) > 36) {
                    target.current = Math.round(target.current) + Math.sign(delta);
                    touchY = null;
                }
            } else {
                target.current += delta / 240;
                touchY = nextY;
            }
        };
        const touchEnd = () => { touchY = null; snap(); };
        const keydown = event => {
            if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest('a, input, textarea, select')) return;
            if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) {
                event.preventDefault();
                clearTimeout(snapTimer);
                target.current = Math.round(target.current) + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1);
            }
        };
        element.addEventListener('wheel', wheel, {passive: false});
        element.addEventListener('touchstart', touchStart, {passive: true});
        element.addEventListener('touchmove', touchMove, {passive: true});
        element.addEventListener('touchend', touchEnd);
        element.addEventListener('touchcancel', touchEnd);
        window.addEventListener('keydown', keydown);
        return () => {
            clearTimeout(snapTimer);
            element.removeEventListener('wheel', wheel);
            element.removeEventListener('touchstart', touchStart);
            element.removeEventListener('touchmove', touchMove);
            element.removeEventListener('touchend', touchEnd);
            element.removeEventListener('touchcancel', touchEnd);
            window.removeEventListener('keydown', keydown);
        };
    }, [isLoading, reducedMotion]);

    useEffect(() => () => {
        clearTimeout(navigationTimer.current);
        setLinkOver(false);
    }, [setLinkOver]);

    const changePage = (event, destination) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        if (leaving.current) return;
        leaving.current = true;
        setLoaded(false);
        setLinkOver(false);
        navigationTimer.current = setTimeout(() => navigate(destination), 2000);
    };
    const hover = {onMouseEnter: () => setLinkOver(true), onMouseLeave: () => setLinkOver(false)};
    const select = index => {
        const current = Math.round(target.current);
        let offset = wrapIndex(index - current, projects.length);
        if (offset > projects.length / 2) offset -= projects.length;
        target.current = current + offset;
    };
    const project = projects[activeIndex];

    return (
        <main ref={root} className="projects-page" aria-label="Projects portfolio" aria-busy={isLoading}>
            <LoadAnim loaded={loaded}/>
            <Cursor/>
            <nav className="projects-nav" aria-label="Main navigation">
                <Link to="/" onClick={event => changePage(event, '/')} {...hover}>HOME</Link>
                <Link to="/Work" onClick={event => changePage(event, '/Work')} {...hover}>WORK</Link>
                <span aria-current="page">PROJECTS</span>
                <span className="projects-nav-status">Website under active development</span>
            </nav>
            <h1 className="sr-only">Projects</h1>
            {webGL ? (
                <div className="projects-scene" aria-hidden="true">
                    <ProjectHelix projects={projects} progress={progress} onReady={ready} onError={sceneError} reducedMotion={reducedMotion}/>
                </div>
            ) : (
                <div className="projects-static">
                    <img src={project.image} alt={`${project.name} project screenshot`}/>
                </div>
            )}
            <section className="projects-details" aria-live="polite" aria-atomic="true">
                <h2 className="sr-only">{project.name}</h2>
                <dl>
                    <div><dt>Stack</dt><dd>{project.tech}</dd></div>
                    <div><dt>Tools</dt><dd>{project.tools.join(', ')}</dd></div>
                    <div><dt>Focus</dt><dd>{project.skills.join(', ')}</dd></div>
                </dl>
            </section>
            <ProjectIndex projects={projects} progress={progress} activeIndex={activeIndex}
                onSelect={select} disabled={isLoading} onHover={setLinkOver}/>
            <div className="projects-count" aria-label={`Project ${activeIndex + 1} of ${projects.length}`}>
                <span className="projects-count-label">Selected projects</span>
                <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
                <span className="projects-count-total">/{String(projects.length).padStart(2, '0')}</span>
            </div>
        </main>
    );
};
