import {Collapse} from "@mui/material";
import rayT from "../assets/ray_tracer.png"
import cal from "../assets/cal.png"
import web_p from "../assets/web_p.png"
import groc from "../assets/groc.png"
import plant from "../assets/plant.png"
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";

const list = [cal, groc, web_p, rayT, plant]
const desc_list = [
    "A Calendar web app that provides lots of extra utility in the form of inbuilt Event creation/Booking that blends in directly with your schedule, email reminders for important events, automatic scheduling and much more. Full stack application built from scratch.",
    "A Full-stack application that finds and compares grocery prices in all major stores around you and displays them in the form of an interactive user interface that helps make buying groceries much more efficient. Web app also comes equipped with in app grocery lists aswell as email reminders for shopping trips.",
    "A chat web app with refined features including different chatrooms, live user status, pings, replies, email notifications. App implements real time messaging and the ability to send emails to other 'tagged' users directly in-app",
    "A physics based renderer that simulates light interaction through ray tracing equations written from\n" +
    "                scratch. The renderer also contains mathematical definitions for different materials, objects, textures\n" +
    "                and much more allowing one to build any combination of custom scenes and uses SDL to display the\n" +
    "                computation results.",
    "PlantGuardian uses image recognition and machine learning to detect plant diseases, alert farmers about pest infestations, suggest recipes based on vegetable photos, and visualize disease trends on a map for preventive measures."
]

export const ProjBlock = ({children, open, ind, setOpen}) => {
    const {setLinkOver} = queryLinkOver();

    return (
        <>
        <div onMouseEnter={()=>setLinkOver(true)} onMouseLeave={()=>setLinkOver(false)} onClick={() => setOpen(ind === open ? null : ind)} className="w-auto border-l border-gray-400 px-4 hover:px-8 transition-all h-full [writing-mode:vertical-lr] text-7xl flex items-center justify-start text-white">
            {children}
        </div>
        <Collapse orientation="horizontal" in={open === ind} timeout="auto" unmountOnExit>
            <div className="relative text-xl place-items-center items-center w-[700px] grid grid-cols-2 p-4 h-full">
                <div className="pr-8">
                    {desc_list[ind]}
                </div>
                <div style={{backgroundImage: `url("${list[ind]}")`}} className="w-full h-5/6 shadow-xl opacity-70 bg-center rounded-xl bg-cover" />
            </div>
        </Collapse>
        </>
    )
}