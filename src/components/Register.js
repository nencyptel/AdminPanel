import React, { useState , useEffect  , useRef} from "react";
import "../components/style/login.css";
import { Toast } from "primereact/toast";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Dropdown } from "primereact/dropdown";
import HttpService from "./utils/http.service";
import { CreateUserData } from "./Redux/Reducer/createUserSlice";
import { useSelector , useDispatch } from "react-redux";

const Register = () => {

    
    const dispatch = useDispatch();
    const dropdownValues = ["Admin", "User"];
    const [dropdownValue, setDropdownValue] = useState();
    const userInfo = useSelector((state) => state?.newuser?.userInfo);
    const Error = useSelector((state) => state?.newuser?.error);
    const toast = useRef(null);
    const history= useHistory();


    const [user, setUser] = useState({
        Email: "",
        Password: "",
        Username: "",
        Phone: "",
        About: "",
        Firstname: "",
        Lastname: "",
        usertype:""
    });

    const dropdown=(e)=>{
        if (e.target.value) {
            console.log(e.target.value);
            setDropdownValue(e.value);
          
        }
    }

    const handleChange = (e) => {
        console.log(e.target.name)
     
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
            usertype:dropdownValue
        };
  
        if(dispatch(CreateUserData(data))){
            setUser({Email :"",Password :"", Username :"", Phone :"", Firstname :"", Lastname :"",About :""})
        }
        // const response=await axios.post(`${HttpService.Register}`, data);
        // console.log(response);
    };
   useEffect(() => {
    if(userInfo){
        console.log(userInfo)
        toast.current.show({ severity: "success", summary: "Successful", detail: "Register succesfull", life: 3000 });
        history.push('/login')
    }
    else if (Error){
        console.log(Error);
        toast.current.show({ severity: "error", summary: "Register Unsuccessful", detail: `${Error.payload.msg}`, life: 3000 });
    }
   }, [userInfo , Error])
   

    return (
        <div className="App">
            <Toast ref={toast} />
            <div className="container">
                <div className="row">
                    <form method="post" onSubmit={handlesubmit}>
                        <div className="frm">
                            <h3 className="hh3">Sign Up</h3>
                        
                            <div className="mb-3">
                                <label className="mb-4">Username </label>
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
                            <div className="UserType mb-3" style={{display:'flex' , flexDirection:'column'}}>
                                <label className="mb-4">Who are you ?</label>
                                <Dropdown value={dropdownValue} onChange={dropdown} options={dropdownValues} placeholder="Select Usertype" />
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
                                    Already have an account? <a href="/login">Login</a>
                                </p>
                               
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
