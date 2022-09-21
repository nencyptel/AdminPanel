import React,{useState} from 'react'
import axios from 'axios';

const ConfirmPassword = () => {

    const[pswrd,setPswrd] = useState({
        Password : "",
        confirmpassword: "",
    })

    const paswrd=(e)=>{  
        setPswrd({...pswrd,[e.target.name]:e.target.value});   
    }
    
    const handlesubmit =(e)=>{

        const data={
            Password : pswrd.Password,
        }

        var password1=pswrd.Password;
        var password2=pswrd.confirmpassword;
        
        if(password1 == password2){
            console.log("match");
            const res=axios.post("",data);
            console.log(res);
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
                                <button type="submit" className="btn-login">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ConfirmPassword