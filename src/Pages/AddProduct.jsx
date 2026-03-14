import React, {useState, useEffect} from 'react';
import Header from "../Component/Header.jsx";
import Scroll from "../Component/Scroll.jsx";
import Sidebar from "../Component/Sidebar.jsx";
import {toast} from 'react-toastify'
import {assets} from "../assets/image/assets.js";
import axios from "axios";
import {useParams} from "react-router-dom";

function AddProduct() {

    const {id} = useParams();
    const isEditMode = Boolean(id);

    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Default");
    const [subcategory, setSubcategory] = useState("Default");
    const [size, setSize] = useState([]);
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [status, setStatus] = useState("Default");
    const [bestseller, setBestseller] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            axios.get(`https://backend-uaa2.onrender.com/api/product/${id}`)
                .then(res => {
                    if (res.data.success) {
                        const product = res.data.product;

                        setExistingImage(product.image);
                        setName(product.name);
                        setDescription(product.description);
                        setCategory(product.category);
                        setSubcategory(product.subcategory);
                        setSize(product.size || []);
                        setPrice(product.price);
                        setStock(product.stock);
                        setStatus(product.status);
                        setBestseller(product.bestseller);
                    }
                })
                .catch(() => toast.error("Failed to load product"));
        }
    }, [id]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            if (image) {
                formData.append("image", image);
            }

            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("subcategory", subcategory);
            formData.append("size", JSON.stringify(size));
            formData.append("price", price);
            formData.append("stock", stock);
            formData.append("status", status);
            formData.append("bestseller", bestseller);

            let response;

            if (isEditMode) {
                response = await axios.put(`https://backend-uaa2.onrender.com/api/product/update/${id}`,
                    {name, description, category, subcategory, size, price, stock, status, bestseller}
                );
            } else {
                response = await axios.post("https://backend-uaa2.onrender.com/api/product/add",
                    {name, description, category, subcategory, size, price, stock, status, bestseller}
                );
            }

            if (response.data.success) {
                toast.success(
                    isEditMode
                        ? "Product Updated Successfully!"
                        : "Product Added Successfully!"
                );

                setImage(null);
                setName("");
                setDescription("");
                setCategory("");
                setSubcategory("");
                setSize([]);
                setStock("");
                setStatus("");
                setBestseller(false);
                setPrice("");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleSizeClick = (item) => {
        if (size.includes(item)) {
            setSize(size.filter((s) => s !== item));
        } else {
            setSize([...size, item]);
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
                            <form onSubmit={onSubmitHandler}>
                                <div>
                                    <label htmlFor="image" className="cursor-pointer">
                                        <img className='w-52' src={
                                            image ? URL.createObjectURL(image) : existingImage ? `https://backend-uaa2.onrender.com/images/${existingImage}` : assets.uplod_area}
                                             alt="upload"/>
                                        <input type="file" id='image' hidden
                                               onChange={(e) => setImage(e.target.files[0])}/>
                                    </label>
                                </div>

                                <div className="mt-5 flex flex-col">
                                    <label className="dark:text-white">Product Name</label>
                                    <input type="text" placeholder="Product Name" value={name}
                                           className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"
                                           onChange={(e) => setName(e.target.value)} required/>
                                </div>

                                <div className="mt-5 flex flex-col">
                                    <label className="dark:text-white">Product Description</label>
                                    <textarea placeholder="Description" value={description}
                                              className="w-full mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"
                                              onChange={(e) => setDescription(e.target.value)} required/>
                                </div>

                                <div className='grid sm:grid-cols-2 grid-cols-1 gap-10 mt-5'>
                                    <div className=" flex flex-col">
                                        <label className="dark:text-white">Category</label>
                                        <select value={category}
                                                className='mt-2 p-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white'
                                                onChange={(e) => setCategory(e.target.value)}>
                                            <option value="Default">Default</option>
                                            <option value="Women">Women</option>
                                            <option value="Men">Men</option>
                                            <option value="Kide">Kide</option>
                                        </select>
                                    </div>

                                    <div className=" flex flex-col">
                                        <label className="dark:text-white">Sub Category</label>
                                        <select value={subcategory}
                                                className='mt-2 p-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white'
                                                onChange={(e) => setSubcategory(e.target.value)}>
                                            <option value="Default">Default</option>
                                            <option value="Topwear">Topwear</option>
                                            <option value="Bottomwear">Bottomwear</option>
                                            <option value="Jacket">Jacket</option>
                                        </select>
                                    </div>

                                </div>

                                <div className='mt-5 grid sm:grid-cols-2 grid-cols-1 gap-10'>

                                    <div className="flex flex-col">
                                        <label className="dark:text-white">Size</label>
                                        <div
                                            className="flex items-center gap-3 mt-2">{["S", "M", "L", "XL", "XXL"].map((item) => (
                                            <span key={item} onClick={() => handleSizeClick(item)}
                                                  className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer border dark:text-white ${size.includes(item)
                                                      ? "bg-primary text-white border-primary"
                                                      : "border-primary"}`}>{item}
                                                </span>))}
                                        </div>
                                    </div>

                                    <div className=" flex flex-col">
                                        <label className="dark:text-white">Price</label>
                                        <input type="number" placeholder="Price" value={price}
                                               className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"
                                               onChange={(e) => setPrice(e.target.value)} required/>
                                    </div>

                                </div>

                                <div className='mt-5 grid sm:grid-cols-2 grid-cols-1 gap-10'>

                                    <div className="flex flex-col">
                                        <label className="dark:text-white">Stock</label>
                                        <input type="number" placeholder="Stock" value={stock}
                                               className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white"
                                               onChange={(e) => setStock(e.target.value)} required/>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="dark:text-white">Status</label>
                                        <select value={status}
                                                className='mt-2 p-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary dark:text-white'
                                                onChange={(e) => setStatus(e.target.value)}>
                                            <option value="Default">Default</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>

                                </div>

                                <div className='mt-5 flex items-center gap-5'>
                                    <label className="dark:text-white">
                                        <input type="checkbox" checked={bestseller}
                                               onChange={() => setBestseller(!bestseller)}/> &nbsp; Best seller
                                    </label>
                                </div>

                                <div className='mt-5 flex items-center justify-end'>
                                    <button type='submit'
                                            className='px-5 py-2 bg-primary-gradient rounded-full text-white'>{id ? "Update Product" : "Add Product"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AddProduct;
