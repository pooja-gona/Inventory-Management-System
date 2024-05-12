import { Outlet } from "react-router-dom";

import React from "react";
import { Navbar } from "react-bootstrap";

const Layout = () => {
    return (
        <main>
            <Navbar/>
            <Outlet/>
        </main>
    )
}

export default Layout