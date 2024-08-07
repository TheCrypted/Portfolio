import './App.css'
import {useEffect, useState} from "react";
import {BorderMarq} from "./helpers/BorderMarq.jsx";
import {Cursor} from "./components/Cursor.jsx";

function App() {
    const [disT, setDisT] = useState(0);

    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            setDisT(e.clientX)
            console.log(e.clientX, e.clientY);
        })
    }, []);

    return (
        <div className="w-full bg-white h-full overflow-x-hidden">
            <Cursor />
            <BorderMarq displacement={disT}/>

        </div>
    )
}

export default App
