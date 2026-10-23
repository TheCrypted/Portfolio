import {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {wrapIndex} from "../helpers/projectHelix.js";

export function ProjectIndex({projects, progress, activeIndex, onSelect, disabled, onHover}) {
    const rail = useRef();
    const items = useRef([]);

    useEffect(() => {
        let frame;
        let spacing = 170;
        const measure = () => {
            spacing = parseFloat(getComputedStyle(rail.current).getPropertyValue('--project-spacing')) || 170;
        };
        measure();
        window.addEventListener('resize', measure);
        const update = () => {
            items.current.forEach((item, index) => {
                if (!item) return;
                const offset = wrapIndex(index - progress.current + projects.length / 2, projects.length) - projects.length / 2;
                const distance = Math.abs(offset);
                item.style.transform = `translateY(calc(-50% + ${offset * spacing}px))`;
                const edgeFade = Math.max(0, Math.min(1, (2.4 - distance) / 0.4));
                item.style.opacity = Math.exp(-distance * 1.1) * edgeFade;
                item.style.visibility = distance < 2.4 ? 'visible' : 'hidden';
            });
            frame = requestAnimationFrame(update);
        };
        frame = requestAnimationFrame(update);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', measure);
        };
    }, [projects.length, progress]);

    return (
        <aside ref={rail} className="projects-index" aria-label="Project index">
            {projects.map((project, index) => (
                <button
                    ref={element => { items.current[index] = element; }}
                    key={project.name}
                    className="projects-index-item"
                    type="button"
                    aria-label={`Show ${project.name}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                    disabled={disabled}
                    onClick={() => onSelect(index)}
                    onFocus={() => onSelect(index)}
                    onMouseEnter={() => onHover(true)}
                    onMouseLeave={() => onHover(false)}
                >
                    <span className="projects-index-type">{project.client}</span>
                    <span className="projects-index-title">{project.name}</span>
                    <span className="projects-index-dash" aria-hidden="true">—</span>
                    <span className="projects-index-summary">{project.summary}</span>
                </button>
            ))}
        </aside>
    );
}

ProjectIndex.propTypes = {
    projects: PropTypes.array.isRequired,
    progress: PropTypes.object.isRequired,
    activeIndex: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onHover: PropTypes.func.isRequired,
};
