import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";

const MainLayout=()=>{
    return(
        <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </div>
    )
}

export default MainLayout