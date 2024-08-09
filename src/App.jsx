import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {Home} from "./pages/Home.jsx";
import {Gallery} from "./pages/Gallery.jsx";
import {About} from "./pages/About.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />}/>
            <Route path="/Gallery" element={<Gallery />}/>
            <Route path="/About" element={<About />}/>
        </>
    )
)

function App() {
    return <RouterProvider router={router} />
}

export default App
