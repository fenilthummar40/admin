import React, {useState, useEffect} from 'react';
import Header from "../Component/Header.jsx";
import Scroll from "../Component/Scroll.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import {IconBrandProducthunt, IconComet, IconDropletDown, IconTransfer, IconUser} from "@tabler/icons-react";
import Chart from "../Component/Chart.jsx";
import axios from "axios";

function AddProduct() {

    const [totalAmount, setTotalAmount] = useState(0);

    const getTotalAmount = async () => {
        try {

            const res = await axios.get("https://backend-uaa2.onrender.com/api/order/total-amount");

            if (res.data.success) {
                setTotalAmount(res.data.totalAmount);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTotalAmount();
    }, []);

    const [totalProduct, setTotalProduct] = useState(0);

    const getTotalProduct = async () => {
        try {

            const res = await axios.get("https://backend-uaa2.onrender.com/api/product/total-product");
            if (res.data.success) {
                setTotalProduct(res.data.totalProduct);
            }

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getTotalProduct();
    }, []);

    const [totalOrder, setTotalOrder] = useState(0);

    const getTotalOrder = async () => {
        try {

            const res = await axios.get("https://backend-uaa2.onrender.com/order/total-order");
            if (res.data.success) {
                setTotalOrder(res.data.totalOrder);
            }

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getTotalOrder();
    }, []);


    const [totalUser, setTotalUser] = useState(0);

    const getTotalUser = async () => {
        try {
            const res = await axios.get("https://backend-uaa2.onrender.com/api/user/total-users");

            if (res.data.success) {
                setTotalUser(res.data.totalUser);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTotalUser();
    }, []);


    const totalAmounts = totalAmount;
    const lastYearAmount = 5000;

    const percentChange = (
        ((totalAmounts - lastYearAmount) / lastYearAmount) * 100
    ).toFixed(2);


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
                            <div className="flex items-center justify-between">
                                <h6 className="text-2xl font-semibold dark:text-white">Dashboard Overview</h6>

                                <div className="relative w-48">
                                    <select
                                        className="w-full appearance-none rounded-lg border bg-white px-3 py-2 pr-8 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-600">
                                        <option value="Default">Default</option>
                                        <option value="Last 1 Year">Last 1 Year</option>
                                        <option value="Last 6 Month">Last 6 Month</option>
                                        <option value="Last Week">Last Week</option>
                                    </select>

                                    <div
                                        className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                                        <IconDropletDown/>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

                                <div
                                    className="bg-white dark:bg-gray-800 border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer dark:border-secondary">
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-secondary font-semibold dark:text-light">Total
                                                Users</p>
                                            <div className="bg-primary/20 text-primary p-3 rounded-lg">
                                                <IconUser size={22}/>
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-bold mt-1 dark:text-white">{totalUser}</h2>
                                        <span className="text-xs text-gray-400 dark:text-light">vs Default</span>
                                    </div>
                                </div>

                                <div
                                    className="bg-white dark:bg-gray-800 border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer dark:border-secondary">
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-secondary font-semibold dark:text-light">Total
                                                Products</p>
                                            <div className="bg-success/20 text-success p-3 rounded-lg">
                                                <IconBrandProducthunt size={22}/>
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-bold mt-1 dark:text-white">{totalProduct}</h2>
                                        <span className="text-xs text-gray-400 dark:text-light">vs 1 Year</span>
                                    </div>
                                </div>

                                <div
                                    className="bg-white dark:bg-gray-800 border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer dark:border-secondary">
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-secondary font-semibold dark:text-light">Complete
                                                Orders</p>
                                            <div className="bg-info/20 text-info p-3 rounded-lg">
                                                <IconComet size={22}/>
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-bold mt-1 dark:text-white">{totalOrder}</h2>
                                        <span className="text-xs text-gray-400 dark:text-light">vs 1 Year</span>
                                    </div>
                                </div>

                                <div
                                    className="bg-white dark:bg-gray-800 border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer dark:border-secondary">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-secondary font-semibold dark:text-light">Total
                                                Revenue</p>
                                            <div className="bg-dark/20 text-dark p-3 rounded-lg dark:bg-light">
                                                <IconTransfer className="w-5"/>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl font-bold mt-1 dark:text-white">₹ {totalAmount}
                                            <span
                                                className={`ml-2 text-sm font-medium ${percentChange >= 0 ? "text-success" : "text-red-600"}`}>{percentChange}%</span>
                                        </h2>

                                        <span className="text-xs text-gray-400 dark:text-light">vs 1 Year</span>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-5">
                                <div className="border w-full dark:border-secondary">
                                    <div className="p-5">
                                        <p className="text-sm font-bold dark:text-light">This year sales report</p>
                                        <h1 className="text-xl font-semibold dark:text-white">₹ {totalAmount}<span
                                            className={`text-sm font-medium ml-2 ${percentChange >= 0 ? "text-green-700" : "text-red-700"}`}>{percentChange}%</span>
                                        </h1>
                                    </div>

                                    <div>
                                        <Chart/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AddProduct;
