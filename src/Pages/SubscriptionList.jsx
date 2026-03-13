import React, {useState, useEffect} from 'react';
import Header from "../Component/Header.jsx";
import Scroll from "../Component/Scroll.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function SubscriptionList() {

    const [subscription, setSubscription] = useState([]);
    const navigate = useNavigate();

    const fetchSubscription = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/subscription/list"
            );

            if (response.data.success) {
                setSubscription(response.data.subscriptions || []);
            } else {
                setSubscription([]);
            }

        } catch (error) {
            console.log(error);
            setSubscription([]);
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    const deleteSubscription = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/subscription/delete/${id}`);

            if (response.data.success) {
                toast.success("Subscription Deleted");
                fetchSubscriptions();
            }

        } catch (error) {
            toast.error("Delete Failed");
        }
    };

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

                            {subscription.length === 0 ? (
                                <p className="text-center text-gray-500">No Subscription Data Found</p>
                            ) : (
                                subscription.map((item) => (
                                    <div key={item._id} className="p-6 border-b dark:border-secondary">

                                        <div className="flex items-center justify-end gap-5">
                                            <button onClick={() => navigate(`/AddSubscription/${item._id}`)}
                                                    className="text-secondary dark:text-light">Edit
                                            </button>
                                            <button onClick={() => deleteSubscription(item._id)}
                                                    className="text-red-700">Delete
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">Base</label>
                                            <h6 className="text-base text-secondary dark:text-light">{item.status}</h6>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">Price</label>
                                            <h6 className="text-base text-secondary dark:text-light">₹ {item.price}</h6>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">Discount</label>
                                            <h6 className="text-base text-secondary dark:text-light">{item.discount}</h6>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">Premium</label>
                                            <p className="text-base text-secondary dark:text-light">{item.premium}</p>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">Build</label>
                                            <p className="text-base text-secondary dark:text-light">{item.build}</p>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">Processing</label>
                                            <p className="text-base text-secondary dark:text-light">{item.processing}</p>
                                        </div>

                                    </div>
                                ))
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SubscriptionList;