import os from "../assets/os.png";
import fpga from "../assets/fpga.png";
import dse from "../assets/dse.png";
import rayT from "../assets/ray_tracer.png";
import finwiz from "../assets/Finwiz.png";

export const projects = [
    {
        name: "PennOS",
        summary: "An operating systems project exploring Unix and systems programming in C++.",
        image: os,
        tech: "C++, Unix",
        client: "University Project",
        tools: ["GCC", "GDB", "Valgrind"],
        skills: ["C++", "Operating Systems", "Unix", "Systems Programming"],
    },
    {
        name: "RISC-V Processor",
        summary: "A RISC-V processor built with SystemVerilog and FPGA development tools.",
        image: fpga,
        tech: "SystemVerilog, FPGA",
        client: "University Project",
        tools: ["Vivado", "ModelSim"],
        skills: ["SystemVerilog", "FPGA", "Digital Design", "Computer Architecture"],
    },
    {
        name: "Search Engine",
        summary: "A distributed search engine for crawling, indexing and ranking web pages.",
        image: dse,
        tech: "Java, Spark, AWS",
        client: "University Project",
        tools: ["Apache Spark", "AWS EMR"],
        skills: ["Java", "Spark", "MapReduce", "AWS"],
    },
    {
        name: "Ray Tracer",
        summary: "A C++ renderer exploring ray tracing, materials and linear algebra.",
        image: rayT,
        tech: "C++, SDL",
        client: "University Project",
        tools: ["CLion", "SDL2"],
        skills: ["C++", "Linear Algebra", "Ray Tracing", "SDL"],
    },
    {
        name: "FinWiz",
        summary: "Financial analytics bringing together economic data, market insights and portfolio simulation.",
        image: finwiz,
        tech: "React, AWS, PostgreSQL",
        client: "Personal Project",
        tools: ["AWS", "Terraform"],
        skills: ["React", "AWS Lambda", "PostgreSQL", "D3.js"],
    },
];
