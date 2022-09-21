import React , {useState} from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router';

const ConfirmPassword = () => {

    const params = useParams();
    console.log(params._id);
    console.log(params.token);
    const[pswrd,setPswrd] = useState({
        Password : "",
        confirmpassword: "",
    })

    const paswrd=(e)=>{  
        setPswrd({...pswrd,[e.target.name]:e.target.value});   
        console.log(e.target.value)
    }
    
    const handlesubmit =(e)=>{

        e.preventDefault();

        console.log("hello");
        const data={
            Password : pswrd.Password,
        }
   

        var password1=pswrd.Password;
        var password2=pswrd.confirmpassword;
        
        if(password1 == password2){
        
            const res=axios.post(`http://localhost:4000/changepassword/${params._id}/${params.token}`,data);
            console.log(res);
            console.log("match");
            
        }else{
            console.log("Unmatch");
        }
    }
       
  return (
    <div className="App">
            <div className="container">
                <div className="row">
                    <form method="post" onSubmit={handlesubmit}>
                        <div className="frm">
                            
                            <div className="mb-3" style={{fontSize:"15px"}}>
                                <label className="mb-4">Password :</label>
                                <input name="Password"  type="text" value={pswrd.Password} onChange={paswrd} className="form-control" placeholder="Enter Password" />
                            </div>

                            <div className="mb-3" style={{fontSize:"15px"}}>
                                <label className="mb-4">Confirm Password :</label>
                                <input name="confirmpassword"  type="text" value={pswrd. confirmpassword} onChange={paswrd} className="form-control" placeholder="Enter Confirm Password" />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn-login" onSubmit={handlesubmit}>
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

export default ConfirmPassword