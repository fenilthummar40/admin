import React, {useState, useEffect} from 'react';
import Header from "../Component/Header.jsx";
import Scroll from "../Component/Scroll.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import {IconPlus} from "@tabler/icons-react";
import {toast} from "react-toastify";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function AddSubscription() {

    const {id} = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [premium, setPremium] = useState("");
    const [build, setBuild] = useState("");
    const [processing, setProcessing] = useState("");

    useEffect(() => {
        if (isEdit) {
            fetchSingleSubscription();
        }
    }, [id]);

    const fetchSingleSubscription = async () => {
        try {
            const response = await axios.get(
                `https://backend-uaa2.onrender.com/api/subscription/list`
            );

            const data = response.data.subscriptions.find(
                (item) => item._id === id
            );

            if (data) {
                setStatus(data.status);
                setPrice(data.price);
                setDiscount(data.discount);
                setPremium(data.premium);
                setBuild(data.build);
                setProcessing(data.processing);
            }

        } catch (error) {
            toast.error("Error fetching subscription");
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (isEdit) {
                response = await axios.put(
                    `https://backend-uaa2.onrender.com/api/subscription/update/${id}`,
                    {status, price, discount, premium, build, processing}
                );

                toast.success("Subscription Updated Successfully!");

                setStatus("");
                setPrice("");
                setDiscount("");
                setPremium("")
                setBuild("");
                setProcessing("");

            } else {
                response = await axios.post(
                    "https://backend-uaa2.onrender.com/api/subscription/add",
                    {status, price, discount, premium, build, processing}
                );

                toast.success("Subscription Added Successfully!");
            }

            navigate("/AddSubscription");

        } catch (error) {
            console.log(error.response?.data);
            toast.error("Something went wrong");
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
                            <form action="" onSubmit={onSubmitHandler}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col">
                                        <label className="dark:text-white">Status</label>
                                        <select
                                            className='mt-2 p-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white'
                                            value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value=""></option>
                                            <option value="Basic">Basic</option>
                                            <option value="Standard">Standard</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                    </div>

                                    <div className=" flex flex-col">
                                        <label className="dark:text-white">Price</label>
                                        <input type="number" placeholder="Price"
                                               className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"
                                               value={price} onChange={(e) => setPrice(e.target.value)}/>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-col">
                                    <label className="dark:text-white">Discount</label>
                                    <input type="text" placeholder="Discount"
                                           className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"
                                           value={discount} onChange={(e) => setDiscount(e.target.value)}/>
                                </div>

                                <div className="mt-5 flex flex-col">
                                    <label className="dark:text-white">Premium</label>
                                    <input type="text" placeholder="Premium"
                                           className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"
                                           value={premium} onChange={(e) => setPremium(e.target.value)}/>
                                </div>

                                <div className="mt-5 flex flex-col">
                                    <label className="dark:text-white">Build</label>
                                    <input type="text" placeholder="Build"
                                           className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"
                                           value={build} onChange={(e) => setBuild(e.target.value)}/>
                                </div>

                                <div className="mt-5 flex flex-col">
                                    <label className="dark:text-white">Processing</label>
                                    <input type="text" placeholder="Processing"
                                           className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"
                                           value={processing} onChange={(e) => setProcessing(e.target.value)}/>
                                </div>

                                <div className="mt-5 flex items-center justify-between">
                                    <button type='submit'
                                            className='px-5 py-2 bg-primary-gradient rounded-full text-white'>{isEdit ? "Update Subscription" : "Add Subscription"}
                                    </button>
                                    <IconPlus className="cursor-pointer dark:text-light"/>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AddSubscription;
