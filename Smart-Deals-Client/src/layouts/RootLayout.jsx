import React from 'react';
import Navbar from '../component/Header/Navbar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;