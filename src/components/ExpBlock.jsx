import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {useState} from "react";

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


export const ExpBlock = ({children, role, ind, rot}) => {
    const [hovering, setHovering] = useState(false);
    return (
        <div className="w-full h-40 overflow-hidden flex flex-col">
            <div className="grid grid-cols-[60%_30%_10%] w-full h-full">
                <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="text-8xl pb-4 text-white flex items-end">
                    {children}
                </div>
                <div className="flex items-end pb-8 text-gray-500">
                    {role}
                </div>
                <div className="flex items-end pb-8 text-6xl justify-end">
                    {ind}
                </div>
                    <div style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/57133330/188281408-c67df9ee-fd1f-4b37-833b-f02848f1ce02.gif")', transform: `rotate(${rot}deg)`}} className={`z-0 absolute ${hovering ? "right-80" : "right-[-500px]"} w-80 h-80 rounded-2xl duration-1000 transition-all ${hovering ? "opacity-100" : "opacity-0"} rotate-${rot} bg-black shadow-x`}>
                </div>
            </div>
            <div className="z-20 w-full h-[0.5px] bg-white"/>
        </div>
    )
}