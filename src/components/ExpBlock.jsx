import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {useState} from "react";
import im1 from "../assets/img_s.gif"
import im2 from "../assets/img_b.gif"
import im3 from "../assets/img_m.gif"
import im4 from "../assets/img_d.gif"

const icon = (
    <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
        <svg>
            <Box
                component="polygon"
                points="0,100 50,00, 100,100"
                sx={{
                    fill: (theme) => theme.palette.common.white,
                    stroke: (theme) => theme.palette.divider,
                    strokeWidth: 1,
                }}
            />
        </svg>
    </Paper>
);


export const ExpBlock = ({children, role, ind, rot, z}) => {
    const [hovering, setHovering] = useState(false);
    const resources = [im4, im2, im1, im3]

    return (
        <div className="w-full h-40 overflow-hidden flex flex-col">
            <div className="grid grid-cols-[60%_30%_10%] w-full h-full">
                <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="hover:blur-sm transition-all text-7xl 2xl:text-8xl pb-4 text-white flex items-end">
                    {children}
                </div>
                <div className="flex items-end pb-8 text-gray-500">
                    {role}
                </div>
                <div className="flex items-end pb-8 text-6xl justify-end">
                    {ind}
                </div>
                    <div style={{zIndex: 3 , backgroundImage: `url("${resources[parseInt(ind)]}")`, transform: `rotate(${rot}deg)`}} className={` animate-float bg-cover bg-no-repeat bg-center shadow-xl z-20 absolute ${hovering ? "right-52 xl:right-80" : "right-[-500px]"} w-80 h-80 rounded-2xl duration-1000 transition-all ${hovering ? "opacity-100" : "opacity-0"} rotate-${rot} bg-black shadow-x`}>
                </div>
            </div>
            <div style={{zIndex: z}} className={`w-full h-[0.5px] bg-white`}/>
        </div>
    )
}