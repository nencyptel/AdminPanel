import React, { useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Toast } from "primereact/toast";
import { useHistory } from "react-router";
import HttpService from "./utils/http.service";

const ConfirmPassword = () => {
    const history=useHistory();
    const params = useParams();
    const toast = useRef(null);
    const [errormsg, setErrormsg] = useState({
        status: "",
        msg: "",
    });

    const [pswrd, setPswrd] = useState({
        Password: "",
        confirmpassword: "",
    });

    const paswrd = (e) => {
        setPswrd({ ...pswrd, [e.target.name]: e.target.value });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        const data = {
            Password: pswrd.Password,
        };

        var password1 = pswrd.Password;
        var password2 = pswrd.confirmpassword;

        if (password1 === password2) {
            await axios
                .post(`${HttpService.confirmPassword}/${params._id}/${params.token}`, data)
                .then((res) => {
                    if (res) {
                        toast.current.show({ severity: "success", detail: `${res.data.msg}`, life: 3000 });
                        setPswrd({
                            Password: "",
                            confirmpassword: "",
                        });
                        setErrormsg({ status: false, msg: "" });
                        history.push('/login')
                    }
                })
                .catch((error) => {
                    toast.current.show({ severity: "error", detail: `${error.response.data.Errmsg}`, life: 3000 });
                    setPswrd({
                        Password: "",
                        confirmpassword: "",
                    });
                    setErrormsg({ status: false, msg: "" });
                });
        } else {
            setErrormsg({ status: true, msg: "Password does not matching !" });
        }
    };


    return (
        <div className="App">
            <Toast ref={toast} />

            <div className="container">
                <div className="row">
                    <form method="post" onSubmit={handlesubmit}>
                        <div className="frm">
                            <div className="mb-3" style={{ fontSize: "15px" }}>
                                {errormsg.status ? <p className="errormsg"> {errormsg.msg}</p> : null}
                                <label className="mb-4">Password :</label>
                                <input name="Password" type="text" value={pswrd.Password} onChange={paswrd} className="form-control" placeholder="Enter Password" />
                            </div>

                            <div className="mb-3" style={{ fontSize: "15px" }}>
                                <label className="mb-4">Confirm Password :</label>
                                <input name="confirmpassword" type="text" value={pswrd.confirmpassword} onChange={paswrd} className="form-control" placeholder="Enter Confirm Password" />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn-login" onSubmit={handlesubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPassword;
