import React, { useState, useEffect, useRef } from "react";
import "../components/style/login.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from 'react-redux'
import { LoginData } from "./Redux/Reducer/LoginSlice";

const Login = () => {

    const { loading, error ,userInfo } = useSelector((state) => state.user);

    const dispatch = useDispatch()

    const toast = useRef(null);

    const [user, setUser] = useState({
        Email: "",
        Password: "",
    });

    const handleChange = (e) => {
        console.log("hjhk"+e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        const data = {
            Email: user.Email,
            Password: user.Password,
        };
        dispatch(LoginData(data));

        // const response = await axios.post("http://localhost:4000/get/user/login", data);
        // console.log(response.data);
        // if (response) {
        //     setUser({
        //         Email: "",
        //         Password: "",
        //     });

        

        //     const token= response?.data?.token?.token;
        //     localStorage.setItem('token',token);
        // }
    };

   
    useEffect(() => {
     
        if(userInfo){
               console.log(userInfo);
                if (userInfo?.data?.status === 200) {
                    console.log(userInfo?.data?.msg );
                toast.current.show({ severity: "success", summary: "Successful", detail: "Login succesfull", life: 3000 });
            } else if (userInfo?.data?.status === 401) {
                toast.current.show({ severity: "error", summary: "Login Unsuccessful", detail: "Wrong password", life: 3000 });
            } else if (userInfo?.data?.status === 300) {
                toast.current.show({ severity: "error", summary: "Login Unsuccessful", detail: "The email address is not associated with any account. please check and try again!", life: 3000 });
            } 
        }
    }, []);


    return (
        <div className="App">
            <Toast ref={toast} />
            <div className="container">
                <div className="row">
                    <form method="post" onSubmit={handlesubmit}>
                        <div className="frm">
                            <h3 className="hh3">Sign In</h3>
                            {/* { login +"nency"} */}
                            <div className="mb-3">
                                <label className="mb-4">Email address</label>
                                <input name="Email" value={user.Email} onChange={handleChange} type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <input name="Password" value={user.Password} onChange={handleChange} type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            <div className="mb-3">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn-login">
                                    Submit
                                </button>
                            </div>
                            <div className="pswrd">
                                <p className="forgot-password text-left ">
                                    Have'nt an account ? <a href="#/register">Sign up</a>
                                </p>
                                <p className="forgot-password ">
                                    Forgot <a href="#/forgetpassword">password?</a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
