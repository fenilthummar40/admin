import React, {useState, useEffect} from 'react';
import Header from "../Component/Header.jsx";
import Scroll from "../Component/Scroll.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import axios from "axios";

function ContactList() {

    const [contact, setContact] = useState([]);

    const fetchContact = async () => {
        try {
            const response = await axios.get("https://backend-uaa2.onrender.com/api/contact/list"); 

            if (response.data.success) {
                setContact(response.data.Contacts);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchContact();
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
                            {contact.length > 0 ? (
                                contact.map((item) => (
                                    <div key={item._id} className="mb-4 pb-2">
                                        <div className="border rounded-lg overflow-hidden shadow-sm dark:border-secondary overflow-x-auto overflow-y-auto">
                                            <table className="w-full text-sm text-left border-collapse">
                                                <thead>
                                                <tr className="bg-secondary/20 text-gray-700">
                                                    <th className="p-4 font-semibold dark:text-white">First Name</th>
                                                    <th className="p-4 font-semibold dark:text-white">Last Name</th>
                                                    <th className="p-4 font-semibold dark:text-white">Email</th>
                                                    <th className="p-4 font-semibold dark:text-white">Phone</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {contact.length > 0 ? (
                                                    contact.map((item) => (
                                                        <tr key={item._id}
                                                            className="border-t hover:bg-gray-50 transition duration-200 dark:border-secondary">
                                                            <td className="p-4 dark:text-light">{item.first_name}</td>
                                                            <td className="p-4 dark:text-light">{item.last_name}</td>
                                                            <td className="p-4 dark:text-light">{item.email}</td>
                                                            <td className="p-4 dark:text-light">{item.phone}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="text-center p-6 text-gray-500">
                                                            No Contacts Found
                                                        </td>
                                                    </tr>
                                                )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No Contacts Found</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactList;
