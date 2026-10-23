import {Collapse} from "@mui/material";
import rayT from "../assets/ray_tracer.png"
import finwiz from "../assets/Finwiz.png"
import dse from "../assets/dse.png"
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";

const list = [rayT, finwiz, dse]
const desc_list = [
    "A physics based renderer that simulates light interaction through ray tracing equations written from\n" +
    "                scratch. The renderer also contains mathematical definitions for different materials, objects, textures\n" +
    "                and much more allowing one to build any combination of custom scenes and uses SDL to display the\n" +
    "                computation results.",
    "Financial analytics platform integrating global economic and stock market data from World Bank, IMF, and UN sources. Features interactive heatmaps, dynamic graphs, and portfolio simulation. Built with React-Globe.gl and Recharts, with scalable backend on EC2 and PostgreSQL on AWS RDS.",
    "Distributed search engine system capable of crawling, indexing, and ranking websites. Implemented crawler, indexer, TF-IDF scoring, and PageRank algorithms, processing up to 200,000 documents. Built with custom server libraries and Apache Spark imitations, deployed on AWS EC2 with distributed computing across 5+ nodes."
]

export const ProjBlock = ({children, open, ind, setOpen}) => {
    const {setLinkOver} = queryLinkOver();

    return (
        <>
        <div onMouseEnter={()=>setLinkOver(true)} onMouseLeave={()=>setLinkOver(false)} onClick={() => setOpen(ind === open ? null : ind)} className="w-auto border-l border-gray-400 px-4 hover:px-8 transition-all h-full [writing-mode:vertical-lr] text-6xl 2xl:text-7xl flex items-center justify-start text-white">
            {children}
        </div>
        <Collapse orientation="horizontal" in={open === ind} timeout="auto" unmountOnExit>
            <div className="relative text-lg  2xl:text-xl place-items-center items-center w-[600px] 2xl:w-[700px] grid grid-cols-2 p-4 h-full">
                <div className="pr-8">
                    {desc_list[ind]}
                </div>
                <div style={{backgroundImage: `url("${list[ind]}")`}} className="w-full h-5/6 shadow-xl opacity-70 bg-center rounded-xl bg-cover" />
            </div>
        </Collapse>
        </>
    )
}