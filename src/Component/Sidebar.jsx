import React from 'react';
import {assets} from "../assets/image/assets.js";
import {NavLink} from "react-router-dom";

function Sidebar() {
    return (
        <>
            <section>
                <div className='border dark:border-secondary'>
                    <div className='p-5 flex items-center justify-center'>
                        <img className="w-32 dark:hidden" src={assets.logo} alt="logo"/>
                        <img className="w-32 dark:block hidden" src={assets.dark_logo} alt="logo"/>
                    </div>

                    <div className='my-5'>
                        <ul className='flex flex-col gap-6 mx-5'>

                            <NavLink to='/Dashbord'
                                     className={({isActive}) => `w-full border dark:border-secondary dark:text-white py-2 rounded-full text-center sm:text-lg text-sm ${isActive ? "bg-primary text-white" : ""}`}>Dashboard
                            </NavLink>

                            <NavLink to='/AddProduct'
                                     className={({isActive}) => `w-full border dark:border-secondary dark:text-white py-2 rounded-full text-center sm:text-lg text-sm ${isActive ? "bg-primary text-white" : ""}`}>Add
                                Item
                            </NavLink>

                            <NavLink to='/Productlist'
                                     className={({isActive}) => `w-full border dark:border-secondary dark:text-white py-2 rounded-full text-center sm:text-lg text-sm ${isActive ? "bg-primary text-white" : ""}`}>List
                                Item
                            </NavLink>

                            <NavLink to='/OrderProduct'
                                     className={({isActive}) => `w-full border dark:border-secondary dark:text-white py-2 rounded-full text-center sm:text-lg text-sm ${isActive ? "bg-primary text-white" : ""}`}>Order
                                Item
                            </NavLink>

                            <NavLink to='/ContactList'
                                     className={({isActive}) => `w-full border dark:border-secondary dark:text-white py-2 rounded-full text-center sm:text-lg text-sm ${isActive ? "bg-primary text-white" : ""}`}>Contact
                                List
                            </NavLink>

                            <NavLink to='/FeedbackList'
                                     className={({isActive}) => `w-full border dark:border-secondary dark:text-white py-2 rounded-full text-center sm:text-lg text-sm ${isActive ? "bg-primary text-white" : ""}`}>Feedback
                                List
                            </NavLink>

                            <NavLink to='/AddSubscription'
                                     className={({isActive}) => `w-full border dark:border-secondary dark:text-white py-2 rounded-full text-center sm:text-lg text-sm ${isActive ? "bg-primary text-white" : ""}`}>Add
                                Subscription
                            </NavLink>

                            <NavLink to='/SubscriptionList'
                                     className={({isActive}) => `w-full border dark:border-secondary dark:text-white py-2 rounded-full text-center sm:text-lg text-sm ${isActive ? "bg-primary text-white" : ""}`}>Subscription
                                List
                            </NavLink>

                            <NavLink to='/SubscriptionPayment'
                                     className={({isActive}) => `w-full border dark:border-secondary dark:text-white py-2 rounded-full text-center sm:text-lg text-sm ${isActive ? "bg-primary text-white" : ""}`}>Subscription
                                Payment
                            </NavLink>

                            <NavLink to='/UserList'
                                     className={({isActive}) => `w-full border dark:border-secondary dark:text-white py-2 rounded-full text-center sm:text-lg text-sm ${isActive ? "bg-primary text-white" : ""}`}>User
                                List
                            </NavLink>

                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Sidebar;
