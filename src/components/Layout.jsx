import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout = () => {
  return (
    <div className="bg border-2 border-danger ">
      <Navbar />
      <div className="main-layout-wrapper main-img p-1 p-md-2 min-vh-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
