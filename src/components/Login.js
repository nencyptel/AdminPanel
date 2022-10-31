import React, { useState, useEffect, useRef } from "react";
import "../components/style/login.css";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { LoginData } from "./Redux/Reducer/LoginSlice";
import { useHistory, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { tokenize } from "prismjs";
import { Password } from "primereact/password";

const Login = () => {

    const history = useHistory();
    const Error = useSelector((state) => state?.user?.error);
    const userInfo = useSelector((state) => state?.user?.userInfo);
    const userToken = localStorage.getItem("userToken");

    const dispatch = useDispatch();

    const toast = useRef(null);

    const [user, setUser] = useState({
        Email: "",
        Password: "",
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (user.Email != "" && user.Password !== "") {
            const data = {
                Email: user.Email,
                Password: user.Password,
            };

            if (dispatch(LoginData(data))) {
                setUser({
                    Email: "",
                    Password: "",
                });
            }
        } else {
            toast.current.show({ severity: "error", summary: "", detail: `Please enter Email and Password !`, life: 3000 });
        }
    };

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo);
            const slug = userInfo?.data?.token?.firstpage;
            history.push(`/${slug}`);
            toast.current.show({ severity: "success", summary: "Successful", detail: "Login succesfull", life: 3000 });
        } else if (Error) {
            toast.current.show({ severity: "error", summary: "Login Unsuccessful", detail: `${Error.payload.msg}`, life: 3000 });
        }
    }, [userInfo, userToken, Error]);
   
    return (
        <div className="App">
            <Toast ref={toast} />
            <div className="container">
                <div className="row">
                    <form method="post" onSubmit={handlesubmit}>
                        <div className="frm">
                            <h3 className="hh3">Sign In</h3>

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
                                    Have'nt an account ? <a href="/register">Sign up</a>
                                </p>
                                <p className="forgot-password ">
                                    Forgot <a href="/forgetpassword">password?</a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    // }
};

export default Login;
