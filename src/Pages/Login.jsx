import React, {useState} from "react";
import {assets} from "../assets/image/assets.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const admins = [
        {
            email: "admin@gmail.com",
            password: "123456"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        const admin = admins.find((item) =>
            item.email === email && item.password === password
        );

        if (admin) {
            toast.success("Login Successful");

            setTimeout(() => {
                navigate("/Dashboard");
            }, 1500);

        } else {
            toast.error("Invalid Email or Password");
        }

    };

    return (
        <section className="h-screen flex items-center justify-center px-5 bg-primary-gradient">
            <div className="max-w-7xl mx-auto p-5 border w-full rounded-lg bg-white shadow-lg">
                <div className='grid grid-cols-1 sm:grid-cols-2 mx-5'>
                    <div className='flex justify-center items-center flex-col p-5'>
                        <img className="w-32" src={assets.logo} alt="logo"/>
                        <img src={assets.register_form} alt="image"/>
                    </div>

                    <div className='flex justify-center items-center flex-col p-5'>
                        <form className='w-full' onSubmit={handleSubmit}>
                            <h1 className="text-lg sm:text-2xl font-bold text-center">Admin Login</h1>

                            <div className="mt-5 flex flex-col">
                                <label>Email :</label>
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                       className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"/>
                            </div>

                            <div className="mt-5 flex flex-col">
                                <label>Password :</label>
                                <input type="password" required value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="w-full h-10 mt-2 ps-2 rounded-lg bg-transparent border border-primary focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"/>
                            </div>

                            <button type="submit"
                                className="mt-6 py-2 w-full bg-primary-gradient text-white rounded-lg text-sm sm:text-lg">Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
