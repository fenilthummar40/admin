import React, {useEffect, useState} from "react";

function Scroll() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {show && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 bg-primary-gradient text-white w-10 h-10 rounded-full shadow-lg hover:scale-110 transition z-10 rtl:right-auto rtl:left-6">
                    ↑
                </button>
            )}
        </>
    );
}

export default Scroll;
