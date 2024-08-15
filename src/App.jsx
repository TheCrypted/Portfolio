import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {Gallery} from "./pages/Gallery.jsx";
import {About} from "./pages/About.jsx";
import {Background} from "./pages/Background.jsx";
import {Work} from "./pages/Work.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<About />}/>
            <Route path="/Gallery" element={<Gallery />}/>
            <Route path="/About" element={<Home />}/>
            <Route path="/Test" element={<Background />}/>
            <Route path="/Work" element={<Work />}/>
        </>
        ) ,  { basename: import.meta.env.BASE_URL }
)

function App() {
    return <RouterProvider router={router} />
}

export default App
