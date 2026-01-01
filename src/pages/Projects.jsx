import {LoadAnim} from "../components/LoadAnim.jsx";
import {Cursor} from "../components/Cursor.jsx";
import {useEffect, useRef, useState, useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";

// Project images - import your project images here
import rayT from "../assets/ray_tracer.png"
import cal from "../assets/cal.png"
import web_p from "../assets/web_p.png"
import groc from "../assets/groc.png"
import htb from "../assets/htb.png"
import finwiz from "../assets/Finwiz.png"
import dse from "../assets/dse.png"
import os from "../assets/os.png"
import fpga from "../assets/fpga.png"
import htb2 from "../assets/htb2.png"
import ada from "../assets/ada.png"

/*
 * PROJECT CONFIGURATION
 * To add more projects, simply:
 * 1. Import the project image above
 * 2. Add a new object to the 'projects' array below with: { name, image, tech }
 * The carousel will automatically adjust to accommodate any number of projects.
 */

const projects = [
    { 
        name: "Hack-The-Burgh II", 
        image: htb2, 
        tech: "MERN, TensorFlow",
        client: "Hackathon",
        tools: ["MongoDB", "Express", "React", "Node.js"],
        skills: ["MERN Stack", "TensorFlow", "AI", "Full-Stack"],
    },
    { 
        name: "PennOS", 
        image: os, 
        tech: "C++, Unix",
        client: "University Project",
        tools: ["GCC", "GDB", "Valgrind"],
        skills: ["C++", "Operating Systems", "Unix", "Systems Programming"],
    },
    { 
        name: "RISCV Processor", 
        image: fpga, 
        tech: "SystemVerilog, FPGA",
        client: "University Project",
        tools: ["Vivado", "ModelSim"],
        skills: ["SystemVerilog", "FPGA", "Digital Design", "Computer Architecture"],
    },
    { 
        name: "Hack-The-Burgh", 
        image: htb, 
        tech: "Hackathon Project",
        client: "Hackathon",
        tools: ["Python", "TensorFlow"],
        skills: ["Python", "ML", "Hackathon"],
    },
    { 
        name: "AdaHack", 
        image: ada, 
        tech: "MERN Stack",
        client: "Hackathon",
        tools: ["MongoDB", "Express", "React", "Node.js"],
        skills: ["MERN Stack", "Full-Stack", "Hackathon"],
    },
    { 
        name: "Calendar +", 
        image: cal, 
        tech: "React, Node.js, MongoDB",
        client: "Personal Project",
        tools: ["Figma", "VS Code"],
        skills: ["React", "Node.js", "MongoDB", "REST API"],
    },
    { 
        name: "Grocery +", 
        image: groc, 
        tech: "React, Express, PostgreSQL",
        client: "Personal Project",
        tools: ["Figma", "PostgreSQL"],
        skills: ["React", "Express", "PostgreSQL", "Docker"],
    },
    { 
        name: "Web Chat +", 
        image: web_p, 
        tech: "Socket.io, React, Node.js",
        client: "Personal Project",
        tools: ["Socket.io", "Redis"],
        skills: ["WebSockets", "React", "Node.js", "Redis"],
    },
    { 
        name: "Ray Tracer", 
        image: rayT, 
        tech: "C++, SDL",
        client: "University Project",
        tools: ["CLion", "SDL2"],
        skills: ["C++", "Linear Algebra", "Ray Tracing", "SDL"],
    },
    { 
        name: "FinWiz", 
        image: finwiz, 
        tech: "React, AWS, PostgreSQL",
        client: "Personal Project",
        tools: ["AWS", "Terraform"],
        skills: ["React", "AWS Lambda", "PostgreSQL", "D3.js"],
    },
    { 
        name: "Search Engine", 
        image: dse, 
        tech: "Java, Spark, AWS",
        client: "University Project",
        tools: ["Apache Spark", "AWS EMR"],
        skills: ["Java", "Spark", "MapReduce", "AWS"],
    },
];

export const Projects = () => {
    const [loaded, setLoaded] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [targetScrollY, setTargetScrollY] = useState(0);
    const [headerVisible, setHeaderVisible] = useState(true);
    const navigate = useNavigate();
    const {setLinkOver} = queryLinkOver();
    const scrollTimeoutRef = useRef(null);
    const animationRef = useRef(null);
    
    const scrollPerProject = 300; // Scroll distance per project
    const maxScroll = (projects.length - 1) * scrollPerProject;

    // Smooth scroll animation towards target
    useEffect(() => {
        const animate = () => {
            setScrollY(prev => {
                const diff = targetScrollY - prev;
                if (Math.abs(diff) < 0.5) {
                    return targetScrollY;
                }
                // Smooth easing towards target
                return prev + diff * 0.15;
            });
            animationRef.current = requestAnimationFrame(animate);
        };
        
        animationRef.current = requestAnimationFrame(animate);
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [targetScrollY]);

    // Snap to nearest project when scrolling stops
    const snapToProject = useCallback(() => {
        const nearestIndex = Math.round(targetScrollY / scrollPerProject);
        const snappedScroll = nearestIndex * scrollPerProject;
        setTargetScrollY(Math.max(0, Math.min(maxScroll, snappedScroll)));
    }, [targetScrollY, maxScroll, scrollPerProject]);

    // Handle wheel events for virtual scrolling
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        
        setTargetScrollY(prev => {
            const newScroll = prev + e.deltaY * 0.6;
            return Math.max(0, Math.min(maxScroll, newScroll));
        });

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        
        // Set new timeout for snap - shorter delay for quicker snapping
        scrollTimeoutRef.current = setTimeout(() => {
            snapToProject();
        }, 100);
    }, [maxScroll, snapToProject]);

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });

        setTimeout(() => {
            setLoaded(true);
        }, 1000);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [handleWheel]);

    // Update header visibility based on scroll
    useEffect(() => {
        if (scrollY > 50) {
            setHeaderVisible(false);
        } else {
            setHeaderVisible(true);
        }
    }, [scrollY]);

    const changePage = (dest) => {
        setLoaded(false);
        setTimeout(() => {
            navigate(dest);
        }, 2000);
    };

    // Calculate which project is currently active
    const getActiveIndex = () => {
        return Math.round(scrollY / scrollPerProject);
    };

    // Cylinder parameters - increased spacing
    const cylinderRadius = 450;
    const anglePerItem = 50; // More degrees between each item for larger spacing
    
    // Calculate 3D cylinder position for project titles
    const getProjectStyle = (index) => {
        const progress = scrollY / scrollPerProject;
        const offset = index - progress;
        
        const angle = offset * anglePerItem;
        const angleRad = (angle * Math.PI) / 180;
        
        // 3D position on cylinder surface
        const y = Math.sin(angleRad) * cylinderRadius;
        const z = Math.cos(angleRad) * cylinderRadius - cylinderRadius;
        
        // Only show front half of cylinder
        const isVisible = Math.abs(angle) < 90;
        const isFocused = Math.abs(offset) < 0.35;
        
        // Opacity - unfocused items are much darker
        const normalizedAngle = Math.abs(angle) / 90;
        const opacity = isVisible ? Math.max(0, 1 - normalizedAngle * 1.3) : 0;
        
        return {
            y,
            z,
            angle,
            opacity,
            isVisible,
            isFocused,
        };
    };

    // Calculate 3D cylinder style for background images (vertical scroll)
    const imageRadius = 550; // Radius for image cylinder
    const imageAnglePerItem = 50; // Match title spacing
    
    const getImageStyle = (index) => {
        const progress = scrollY / scrollPerProject;
        const offset = index - progress;
        
        const angle = offset * imageAnglePerItem;
        const angleRad = (angle * Math.PI) / 180;
        
        // 3D position on vertical cylinder (same as titles)
        const y = Math.sin(angleRad) * imageRadius;
        const z = Math.cos(angleRad) * imageRadius - imageRadius;
        
        const isVisible = Math.abs(angle) < 90;
        const isFocused = Math.abs(offset) < 0.45;
        
        // Opacity based on position - smoother gradient
        const normalizedAngle = Math.abs(angle) / 90;
        const baseOpacity = isFocused ? 0.5 : 0.3;
        const opacity = isVisible ? Math.max(0, baseOpacity - normalizedAngle * 0.35) : 0;
        
        // Scale - smoother transition
        const scale = 0.8 + (1 - Math.min(1, Math.abs(offset))) * 0.25;
        
        return {
            transform: `translateY(${y}px) translateZ(${z}px) rotateX(${-angle}deg) scale(${scale})`,
            opacity: opacity,
            zIndex: Math.round(50 + z),
            visibility: isVisible ? 'visible' : 'hidden',
            transition: 'opacity 0.4s ease-out, transform 0.3s ease-out',
        };
    };

    const activeIndex = getActiveIndex();

    return (
        <>
            <LoadAnim loaded={loaded}/>
            <div className="w-full cursor-none h-full bg-[#1e1e4a] overflow-hidden">
                {/* Cursor with higher z-index */}
                <div className="fixed inset-0 z-[100] pointer-events-none">
                    <Cursor/>
                </div>
                
                {/* Header - hides on scroll */}
                <div
                    className={`cursor-none fixed z-50 top-0 w-full h-16 bg-[#1e1e4a] bg-opacity-80 backdrop-blur-xl border-b border-white/10 pl-14 grid grid-cols-[5%_5%_5%_30%_55%] transition-transform duration-500 ${
                        headerVisible ? 'translate-y-0' : '-translate-y-full'
                    }`}
                >
                    <div 
                        onClick={() => changePage("/")}
                        onMouseEnter={() => setLinkOver(true)} 
                        onMouseLeave={() => setLinkOver(false)}
                        className="font-serif text-white text-sm flex items-center transition-all hover:text-gray-400 pointer-events-auto"
                    >
                        HOME
                    </div>
                    <div 
                        onClick={() => changePage("/Work")}
                        onMouseEnter={() => setLinkOver(true)} 
                        onMouseLeave={() => setLinkOver(false)}
                        className="font-serif text-white text-sm flex items-center transition-all hover:text-gray-400 pointer-events-auto"
                    >
                        WORK
                    </div>
                    <div
                        onMouseEnter={() => setLinkOver(true)} 
                        onMouseLeave={() => setLinkOver(false)}
                        className="font-serif text-white text-sm flex items-center transition-all hover:text-gray-400 pointer-events-auto"
                    >
                        PROJECTS
                    </div>
                    <div className="absolute right-0 full h-full flex items-center justify-center pr-14">
                        <div
                            className="bg-gradient-to-br from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.05)] font-serif w-auto px-3 h-3/5 bg-opacity-20 text-gray-300 rounded-full flex items-center justify-center">
                            Website under active development
                        </div>
                    </div>
                </div>

                {/* Project Info Card - Left side */}
                <div 
                    className="fixed left-0 top-1/2 -translate-y-1/2 z-40 w-72 p-6"
                    style={{
                        backgroundColor: '#1e1e4a',
                        opacity: loaded ? 1 : 0,
                        transform: `translateY(-50%) translateX(${loaded ? '0' : '-100%'})`,
                        transition: 'opacity 0.5s, transform 0.5s',
                    }}
                >
                    <div className="font-serif">
                        {/* Client section - fixed height */}
                        <div className="border-b border-white/30 h-16 flex flex-col justify-center">
                            <div className="text-gray-400 text-xs font-medium tracking-wider mb-1">Client</div>
                            <div className="text-white truncate">
                                {projects[activeIndex]?.client}
                            </div>
                        </div>
                        
                        {/* Tool section - fixed height */}
                        <div className="border-b border-white/30 h-16 flex flex-col justify-center">
                            <div className="text-gray-400 text-xs font-medium tracking-wider mb-1">Tool</div>
                            <div className="text-white flex gap-3 overflow-hidden">
                                {projects[activeIndex]?.tools.map((t, i) => (
                                    <span key={i}>{t}</span>
                                ))}
                            </div>
                        </div>
                        
                        {/* Skill section - fixed height */}
                        <div className="h-20 flex flex-col justify-center">
                            <div className="text-gray-400 text-xs font-medium tracking-wider mb-1">Skill</div>
                            <div className="text-white flex flex-wrap gap-x-3 gap-y-1 overflow-hidden">
                                {projects[activeIndex]?.skills.map((s, i) => (
                                    <span key={i}>{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project images - CSS-based curved carousel */}
                <div 
                    className="fixed top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden" 
                    style={{ 
                        zIndex: 5,
                        perspective: '1200px',
                        perspectiveOrigin: 'center 50%',
                    }}
                >
                    <div 
                        style={{ 
                            transformStyle: 'preserve-3d',
                            width: '70%',
                            height: '60%',
                            position: 'relative',
                        }}
                    >
                        {projects.map((project, index) => {
                            const progress = scrollY / scrollPerProject;
                            const offset = index - progress;
                            
                            // Cylinder parameters
                            const anglePerItem = 35; // degrees between items
                            const radius = 600; // cylinder radius in pixels
                            
                            const angle = offset * anglePerItem;
                            const angleRad = (angle * Math.PI) / 180;
                            
                            // Position on cylinder surface
                            const y = Math.sin(angleRad) * radius;
                            const z = Math.cos(angleRad) * radius - radius;
                            
                            // Visibility - hide back-facing images (more than 70 degrees from front)
                            const isVisible = Math.abs(angle) < 70;
                            const isCentered = Math.abs(offset) < 0.5;
                            
                            // Opacity - centered images more visible, non-centered much more transparent
                            const normalizedAngle = Math.abs(angle) / 70;
                            const baseOpacity = isCentered ? 0.65 : 0.08;
                            const opacity = isVisible ? Math.max(0, baseOpacity * (1 - normalizedAngle * 0.7)) : 0;
                            
                            // Scale - larger when centered
                            const scale = 0.7 + (1 - Math.min(1, Math.abs(offset) * 0.5)) * 0.35;
                            
                            if (!isVisible || opacity < 0.02) return null;
                            
                            return (
                                <div
                                    key={`image-${index}`}
                                    className="absolute left-1/2 top-1/2 w-full flex justify-center"
                                    style={{
                                        transform: `translateX(-50%) translateY(-50%) translateY(${y}px) translateZ(${z}px) rotateX(${-angle}deg) scale(${scale})`,
                                        opacity: opacity,
                                        zIndex: Math.round(50 + z / 10),
                                        visibility: isVisible ? 'visible' : 'hidden',
                                        transformStyle: 'preserve-3d',
                                        backfaceVisibility: 'hidden',
                                        transition: 'opacity 0.3s ease-out',
                                    }}
                                >
                                    <img 
                                        src={project.image} 
                                        alt={project.name}
                                        className="h-auto rounded-xl"
                                        style={{
                                            maxHeight: '65vh',
                                            minWidth: '400px',
                                            objectFit: 'contain',
                                            filter: isCentered ? 'none' : 'brightness(0.7)',
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Project titles - 3D cylinder (above images) */}
                <div 
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden"
                    style={{ 
                        perspective: '1000px', 
                        perspectiveOrigin: 'center 40%',
                        paddingBottom: '10vh',
                        zIndex: 10, // Above the 3D canvas
                    }}
                >
                    <div 
                        style={{ 
                            transformStyle: 'preserve-3d',
                            transform: 'translateY(-5vh)'
                        }}
                    >
                        {projects.map((project, index) => {
                            const style = getProjectStyle(index);
                            const { y, z, angle, opacity, isVisible, isFocused } = style;
                            
                            return (
                                <div
                                    key={`title-${index}`}
                                    className="absolute flex flex-col items-center justify-center"
                                    style={{
                                        transform: `translateX(-50%) translateY(${y}px) translateZ(${z}px) rotateX(${-angle}deg)`,
                                        opacity: opacity,
                                        zIndex: Math.round(100 + z),
                                        visibility: isVisible ? 'visible' : 'hidden',
                                        pointerEvents: isFocused ? 'auto' : 'none',
                                        transformStyle: 'preserve-3d',
                                        left: '50%',
                                        transition: 'opacity 0.4s ease-out',
                                    }}
                                >
                                    <div 
                                        className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold whitespace-nowrap tracking-tighter text-center"
                                        onMouseEnter={() => setLinkOver(true)} 
                                        onMouseLeave={() => setLinkOver(false)}
                                        style={{ 
                                            backfaceVisibility: 'hidden',
                                            color: isFocused ? 'white' : 'rgb(55, 55, 55)',
                                            textShadow: isFocused ? '0 2px 12px rgba(0,0,0,0.5)' : 'none',
                                            transition: 'color 0.4s ease-out, text-shadow 0.4s ease-out',
                                        }}
                                    >
                                        {project.name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 text-gray-500 text-sm font-mono transition-opacity duration-500 z-40 ${scrollY > 50 ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex flex-col items-center gap-2">
                        <span>SCROLL TO EXPLORE</span>
                        <div className="w-px h-8 bg-gray-500 animate-pulse"/>
                    </div>
                </div>

                {/* Side indicators */}
                <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 opacity-60">
                    {projects.map((_, index) => (
                        <div
                            key={`indicator-${index}`}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === activeIndex ? 'bg-white/80 scale-150' : 'bg-white/30'
                            }`}
                        />
                    ))}
                </div>

                {/* Project counter */}
                <div className="fixed bottom-10 right-8 text-white/60 font-mono text-sm z-40">
                    <span className="text-2xl font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                    <span className="text-white/30"> / {String(projects.length).padStart(2, '0')}</span>
                </div>
            </div>
        </>
    );
};
