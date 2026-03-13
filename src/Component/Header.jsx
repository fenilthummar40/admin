import React, {useEffect, useState} from "react";
import {assets} from "../assets/image/assets.js";
import {IconMoon, IconSun, IconTextDirectionRtl, IconWorld} from "@tabler/icons-react";
import {Link} from "react-router-dom";

function Header() {

    const [rtl, setRtl] = useState(false);
    useEffect(() => {
        const savedRTL = localStorage.getItem("rtl");

        if (savedRTL === "true") {
            setRtl(true);
            document.documentElement.setAttribute("dir", "rtl");
        } else {
            setRtl(false);
            document.documentElement.setAttribute("dir", "ltr");
        }
    }, []);

    const toggleRTL = () => {
        const newValue = !rtl;
        setRtl(newValue);

        if (newValue) {
            document.documentElement.setAttribute("dir", "rtl");
        } else {
            document.documentElement.setAttribute("dir", "ltr");
        }
        localStorage.setItem("rtl", newValue);
    };

    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        setDarkMode(!darkMode);
    };

    return (
        <>
            <section>
                <div className='flex items-center justify-between px-8 py-2'>
                    <div>
                        <img className="w-32 dark:hidden" src={assets.logo} alt="logo"/>
                        <img className="w-32 dark:block hidden" src={assets.dark_logo} alt="logo"/>
                    </div>

                    <div className="flex items-center gap-5">
                        <div>
                            <IconWorld className="w-5 h-5 cursor-pointer dark:text-white"/>
                        </div>
                        <button onClick={toggleTheme} className="cursor-pointer">
                            {darkMode ? (
                                <IconSun className="w-5 h-5 dark:text-white"/>
                            ) : (
                                <IconMoon className="w-5 h-5 dark:text-white"/>
                            )}
                        </button>
                        <Link to=""><IconTextDirectionRtl className="w-5 h-5 cursor-pointer dark:text-white"
                                                          onClick={toggleRTL}/>
                        </Link>
                        <Link to="/" className='px-5 py-2 bg-primary-gradient rounded-full text-white'>Logout</Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Header;
