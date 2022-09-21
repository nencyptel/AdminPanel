import React from 'react'

const ChangePassword = () => {
  return (
    <div className="App">
            <div className="container">
                <div className="row">
                    <form method="post">
                        <div className="frm">
                            
                            <div className="mb-3" style={{fontSize:"15px"}}>
                                <label className="mb-4">Password :</label>
                                <input name="password"  type="text" className="form-control" placeholder="Enter Password" />
                            </div>

                            <div className="mb-3" style={{fontSize:"15px"}}>
                                <label className="mb-4">Confirm Password :</label>
                                <input name="confirmpassword"  type="text" className="form-control" placeholder="Enter Confirm Password" />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn-login">
                                    Submit
                                </button>
                            </div>
                            {/* <div className="pswrd">
                                <p className="forgot-password text-left " style={{fontSize:"15px"}}>
                                    Have'nt an account ? <a href="#/register">Sign up</a>
                                </p>
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ChangePassword