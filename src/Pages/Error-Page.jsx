import React from "react";
import {assets} from "../assets/image/assets.js";
import {IconHome} from "@tabler/icons-react";
import {Link} from "react-router-dom";

function ErrorPage() {
    return (
        <>
            <section className='h-screen bg-primary-gradient flex items-center justify-center'>
                <div className='max-w-7xl mx-auto flex items-center justify-center flex-col'>
                    <img src={assets.error_page} alt="logo"/>
                    <h1 className='text-sm sm:text-2xl px-5 text-center text-white'>Website owners should regularly
                        check for and fix broken links using tools like Google Search Console or other link-checking
                        software.</h1>

                    <Link to='/' className='border mt-5 px-5 py-2 rounded-full text-white flex items-center gap-4'>
                        <IconHome className="w-5 h-5"/> Home
                    </Link>
                </div>
            </section>
        </>
    );
}

export default ErrorPage;
