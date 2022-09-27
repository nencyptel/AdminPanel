import React, { useState ,useRef } from 'react'
import axios from 'axios';
import { Toast } from "primereact/toast";
import HttpService from './utils/http.service';

function  ForgetPassword() {
    const toast = useRef(null);
  const [email, setEmail]=useState({
    Email:""
  });
  const handlechange =(e)=>{
    setEmail({...email,[e.target.name]:e.target.value});

  }

  const handlesubmit= async(e)=>{
    e.preventDefault();
    const data={
        Email:email.Email
    }

      await axios.post(`${HttpService.forgetpassword}` , data)
    .then((response)=>{
        toast.current.show({ severity: "success", detail: `${response.data.msg}`, life: 3000 });
        setEmail({Email:""})
    })
    .catch((error)=>{
        toast.current.show({ severity: "error", detail: `${error.response.data.Errmsg}`, life: 3000 });
        console.log("error.response.data.Errmsg");
        setEmail({Email:""})
    })
    
  }


  return (
    <div className="App">
         <Toast ref={toast} />
            <div className="container">
                <div className="row">
                    <form method="post" onSubmit={handlesubmit}>
                        <div className="frm">
                            {/* <h3 className="hh3">Recover Password</h3> */}
                            <p style={{fontSize:"20px",color:"grey"}}>Please enter your email address. You will receive a new password via email.</p>
                            <div className="mb-3" style={{fontSize:"15px"}}>
                                <label className="mb-4">Email address :</label>
                                <input name="Email" value={email.Email} onChange={handlechange} type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn-login">
                                    Submit
                                </button>
                            </div>
                            <div className="pswrd">
                                <p className="forgot-password text-left " style={{fontSize:"15px"}}>
                                    Have'nt an account ? <a href="#/register">Sign up</a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ForgetPassword