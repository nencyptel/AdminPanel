import React, { useState} from "react";
import "../components/style/login.css";
import { Toast } from "primereact/toast";
import { toast } from "react-toastify";
import axios from 'axios';

const Register = () => {

    const [user, setUser] = useState({
        Email: "",
        Password: "",
        Username: "",
        Phone: "",
        About: "",
        Firstname: "",
        Lastname: "",
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        const data = {
            Email: user.Email,
            Password: user.Password,
            Username: user.Username,
            Phone: user.Phone,
            About: user.About,
            Firstname: user.Firstname,
            Lastname: user.Lastname,
        };

        const response=await axios.post("http://localhost:4000/create/user", data);
        console.log(response);


       
        // if (dispatch(LoginData(data))) {
        //     setUser({
        //         Email: "",
        //         Password: "",
        //     });

        // }
    };

    return (
        <div className="App">
            <Toast ref={toast} />
            <div className="container">
                <div className="row">
                    <form method="post" onSubmit={handlesubmit}>
                        <div className="frm">
                            <h3 className="hh3">Sign Up</h3>
                            {/* { login +"nency"} */}
                            <div className="mb-3">
                                <label className="mb-4">UserName </label>
                                <input name="Username" value={user.Username} onChange={handleChange} type="text" className="form-control" placeholder="Enter username" />
                            </div>
                            <div className="mb-3">
                                <label className="mb-4">Email address</label>
                                <input name="Email" value={user.Email} onChange={handleChange} type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="mb-3">
                                <label className="mb-4">Password</label>
                                <input name="Password" value={user.Password} onChange={handleChange} type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            <div className="mb-3">
                                <label className="mb-4">Firstname </label>
                                <input name="Firstname" value={user.Firstname} onChange={handleChange} type="text" className="form-control" placeholder="Enter firstname" />
                            </div>

                            <div className="mb-3">
                                <label className="mb-4">Lastname </label>
                                <input name="Lastname" value={user.Lastname} onChange={handleChange} type="text" className="form-control" placeholder="Enter lastname" />
                            </div>

                            <div className="mb-3">
                                <label className="mb-4">About </label>
                                <textarea name="About" value={user.About} onChange={handleChange} type="text" className="form-control" style={{ resize: "none" }} />
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
                                    Already have an account? <a href="#/login">Login</a>
                                </p>

                               

                                {/* <p className="forgot-password ">
                                    Forgot <a href="#/forgetpassword">password?</a>
                                </p> */}

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
