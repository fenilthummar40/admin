import React , { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import AddProduct from "./Pages/AddProduct.jsx";
import {ToastContainer} from "react-toastify";
import ErrorPage from "./Pages/Error-Page.jsx";
import Login from "./Pages/Login.jsx";
import Productlist from "./Pages/Productlist.jsx";
import OrderProduct from "./Pages/OrderProduct.jsx";
import ContactList from "./Pages/ContactList.jsx";
import axios from "axios";
import FeedbackList from "./Pages/FeedbackList.jsx";
import AddSubscription from "./Pages/AddSubscription.jsx";
import SubscriptionList from "./Pages/SubscriptionList.jsx";
import SubscriptionPayment from "./Pages/SubscriptionPayment.jsx";
import UserList from "./Pages/UserList.jsx";
import Dashbord from "./Pages/Dashbord.jsx";

function App() {

    useEffect(() => {
        axios.get("https://backend-uaa2.onrender.com/api/test") 
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Dashbord" element={<Dashbord />} />
                    <Route path="/AddProduct" element={<AddProduct />} />
                    <Route path="/AddProduct/:id" element={<AddProduct />} />
                    <Route path="/Productlist" element={<Productlist />} />
                    <Route path="/OrderProduct" element={<OrderProduct />} />
                    <Route path="/ContactList" element={<ContactList />} />
                    <Route path="/FeedbackList" element={<FeedbackList />} />
                    <Route path="/AddSubscription" element={<AddSubscription />} />
                    <Route path="/SubscriptionList" element={<SubscriptionList />} />
                    <Route path="/AddSubscription/:id" element={<AddSubscription />} />
                    <Route path="/SubscriptionPayment" element={<SubscriptionPayment />} />
                    <Route path="/UserList" element={<UserList />} />
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar="false"
                    closeOnClick="true"
                    pauseOnHover="true"
                    draggable="true"
                    progress="true"
                />
            </BrowserRouter>
        </>
    )
}

export default App
