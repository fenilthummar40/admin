import React, {useEffect, useState} from 'react';
import Header from "../Component/Header.jsx";
import Scroll from "../Component/Scroll.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import axios from "axios";

function FeedbackList() {

    const [feedback, setFeedback] = useState([]);

    const fetchFeedback = async () => {
        try {
            const response = await axios.get("https://backend-uaa2.onrender.com/api/feedback/list"); 

            if (response.data.success) {
                setFeedback(response.data.Feedbacks);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFeedback();
    }, []);


    return (
        <>
            <Scroll/>
            <Header/>

            <section className='mt-5 sm:mt-10'>
                <div className='max-w-7xl mx-auto px-5'>
                    <div className='flex gap-5'>

                        <div className='w-1/4 hidden md:block'>
                            <Sidebar/>
                        </div>

                        <div className='border w-full p-5 dark:border-secondary'>
                            <div>
                                <input type="text" placeholder='Enter your product name'
                                       className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"/>
                            </div>

                            <div>
                                {feedback.map((item) => (
                                    <div key={item._id}
                                         className="p-6 border-b dark:border-secondary">
                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">First Name</label>
                                            <h6 className="text-sm sm:text-base text-secondary dark:text-light">{item.first_name}</h6>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">Last Name</label>
                                            <h6 className="text-sm sm:text-base text-secondary dark:text-light">{item.last_name}</h6>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">Email</label>
                                            <h6 className="text-sm sm:text-base text-secondary dark:text-light">{item.email}</h6>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">Feedback</label>
                                            <p className="text-sm line-clamp-5 sm:text-base text-secondary dark:text-light">{item.feedback}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FeedbackList;
