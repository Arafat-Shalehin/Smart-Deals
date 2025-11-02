import React from 'react';
import Navbar from '../component/Header/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../component/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main className='min-h-screen'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;