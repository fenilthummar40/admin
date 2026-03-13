import React, {useEffect, useState} from 'react';
import Header from "../Component/Header.jsx";
import Scroll from "../Component/Scroll.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import axios from "axios";
import {IconFileExport, IconFilter, IconPlus} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

function ProductList() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/product/list");

            if (response.data.success) {
                setProducts(response.data.products);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/product/delete/${id}`);

            if (response.data.success) {
                toast.success("Product Deleted");
                fetchProducts();
            }

        } catch (error) {
            toast.error("Delete Failed");
        }
    };

    const updateProduct = async (id, formData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/product/update/${id}`, formData);

            if (response.data.success) {
                toast.success("Product Updated Successfully");
            }

        } catch (error) {
            toast.error("Update Failed");
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
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                <div>
                                    <input type="text" placeholder='Search...'
                                           className='rounded-lg py-2 h-10 ps-2 w-full bg-transparent border border-primary focus:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary dark:text-white'/>
                                </div>
                                <div className='flex items-center justify-end gap-4 flex-wrap'>
                                    <button
                                        className='border px-5 py-2 rounded-full font-medium sm:text-lg text-sm flex items-center gap-3 dark:border-secondary dark:text-white'>
                                        <IconFilter className='w-5'/> Filter
                                    </button>
                                    <button
                                        className='border px-5 py-2 rounded-full font-medium sm:text-lg text-sm flex items-center gap-3 dark:border-secondary dark:text-white'>
                                        <IconFileExport className='w-5'/> Export
                                    </button>
                                    <Link to='/AddProduct'
                                          className='border px-5 py-2 rounded-full font-medium sm:text-lg text-sm bg-primary-gradient text-white flex items-center gap-3 dark:border-secondary'><IconPlus
                                        className='w-5'/> Add Product
                                    </Link>
                                </div>
                            </div>

                            <div
                                className="mt-5 rounded-lg border dark:border-secondary overflow-x-auto overflow-y-auto max-h-screen">

                                <table className="min-w-full text-sm text-left">
                                    <thead className="bg-light text-dark uppercase text-xs">
                                    <tr>
                                        <th className="px-5 py-3">Product</th>
                                        <th className="px-5 py-3">Category</th>
                                        <th className="px-5 py-3">Size</th>
                                        <th className="px-5 py-3">Stock</th>
                                        <th className="px-5 py-3">Price</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3">Action</th>
                                    </tr>
                                    </thead>

                                    <tbody className="divide-y">
                                    {products.map((item) => (
                                        <tr key={item._id}
                                            className="hover:bg-secondary/10 transition dark:border-secondary">

                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <img src={`http://localhost:5000/images/${item.image}`}
                                                         alt={item.name} className="w-16 rounded-md object-cover"/>
                                                    <div>
                                                        <p className="font-medium line-clamp-2 sm:text-sm dark:text-white">{item.name}</p>
                                                        <p className="text-secondary text-xs line-clamp-1 dark:text-light">{item.subcategory}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="p-5 text-center dark:text-white">{item.category}</td>

                                            <td className="px-5 text-center">
                                                {item.size?.map((s, index) => (
                                                    <span key={index}
                                                          className="bg-gray-100 px-2 py-1 rounded text-xs mr-1">{s}</span>
                                                ))}
                                            </td>

                                            <td className="p-5 font-medium text-center dark:text-white">{item.stock}</td>
                                            <td className="p-5 font-medium text-center dark:text-white">₹ {item.price}</td>
                                            <td className="p-5 font-medium text-center dark:text-white">{item.status}</td>

                                            <td className="p-5 text-center">
                                                <button onClick={() => deleteProduct(item._id)}
                                                        className="text-red-500 font-medium">Delete
                                                </button>

                                                <Link className="text-secondary font-medium dark:text-light"
                                                      to={`/AddProduct/${item._id}`}>Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductList;
