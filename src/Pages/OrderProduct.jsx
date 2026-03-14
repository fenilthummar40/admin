import React, {useEffect, useState} from 'react';
import Header from "../Component/Header.jsx";
import Scroll from "../Component/Scroll.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import axios from "axios";

function OrderList() {

    const [order, setOrder] = useState([]);

    const fetchOrder = async () => {
        try {
            const response = await axios.get("https://backend-uaa2.onrender.com/api/order/list"); 

            if (response.data.success) {
                setOrder(response.data.Orders);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const updateStatus = async (orderId, status) => {
        try {
            const res = await axios.put(`https://backend-uaa2.onrender.com/api/order/update-status/${orderId}`, {
                status: status
            });

            if (res.data.success) {
                fetchOrder();
            }

        } catch (error) {
            console.log(error);
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
                            <div>
                                <input type="text" placeholder='Enter your product name'
                                       className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"/>
                            </div>

                            {order.map((orderItem) =>
                                orderItem.item.map((product) => (
                                    <div key={product._id} className='p-5 border-b dark:border-secondary'>
                                        <div className='grid grid-cols-2 gap-10'>

                                            <div className='flex items-center gap-5'>
                                                <div>
                                                    <img className='w-24 rounded-lg'
                                                         src={`https://backend-uaa2.onrender.com/uploads/${product.image}`} alt=""/>
                                                </div>
                                                <div>
                                                    <h6 className='font-semibold text-sm sm:text-lg dark:text-white'>{product.name}</h6>
                                                    <p className='text-secondary text-sm mt-1 dark:text-light'>Size
                                                        : {product.size}</p>
                                                    <p className='text-secondary text-sm mt-1 dark:text-light'>Quantity
                                                        : {product.qty}</p>
                                                </div>
                                            </div>

                                            <div className='flex items-center justify-between'>
                                                <div>
                                                    <select
                                                        className="border rounded-lg p-2"
                                                        value={orderItem.status}
                                                        onChange={(e) => updateStatus(orderItem._id, e.target.value)}>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Confirm">Confirm</option>
                                                        <option value="Out for Delivery">Out for Delivery</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <p className="dark:text-white">₹ {product.price}</p>
                                                </div>
                                            </div>

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

export default OrderList;
