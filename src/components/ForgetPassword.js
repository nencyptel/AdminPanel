import React from 'react'

const ForgetPassword = () => {
  return (
    <div className="App">

            <div className="container">
                <div className="row">
                    <form method="post">
                        <div className="frm">
                            {/* <h3 className="hh3">Recover Password</h3> */}
                            <p style={{fontSize:"20px",color:"grey"}}>Please enter your email address. You will receive a new password via email.</p>
                            <div className="mb-3" style={{fontSize:"15px"}}>
                                <label className="mb-4">Email address :</label>
                                <input name="Email"  type="email" className="form-control" placeholder="Enter email" />
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