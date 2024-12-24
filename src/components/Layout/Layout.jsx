import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return <>
  <Navbar/>
  <div className="container min-h-[60vh] py-24">
  <Outlet/>
  </div>
  <Footer/>
  
  </>
}
