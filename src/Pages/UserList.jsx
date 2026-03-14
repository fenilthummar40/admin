import React, {useState, useEffect} from 'react';
import Header from "../Component/Header.jsx";
import Scroll from "../Component/Scroll.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import axios from "axios";

function UserList() {

    const [user, setUser] = useState([]);

    const fetchUser = async () => {
        try {
            const response = await axios.get("https://backend-uaa2.onrender.com/api/user/list");

            if (response.data.success) {
                setUser(response.data.Users);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
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
                            {user.length === 0 ? (
                                <p className="text-center text-gray-500">No Subscription Data Found</p>
                            ) : (
                                user.map((item) => (
                                    <div key={item._id} className="p-6 border-b dark:border-secondary">

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">User Name</label>
                                            <h6 className="text-base text-secondary dark:text-light">{item.name}</h6>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <label className="font-semibold dark:text-white">Email</label>
                                            <h6 className="text-base text-secondary dark:text-light">{item.email}</h6>
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

export default UserList;
