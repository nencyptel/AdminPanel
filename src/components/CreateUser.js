import React, { useState, useEffect , useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import HttpService from "./utils/http.service";
import axios from 'axios';
import { Toast } from "primereact/toast";

const CreateUser = () => {
    const [switchValue, setSwitchValue] = useState({
        Dashboard : false,
        Dashboard1 :false,
        Dashboard2 :false,
        Dashboard3 :false,
    });

    const toast = useRef(null);
    const [dropdownValue, setDropdownValue] = useState(null);

    const drpdwn = (e,index)=> {

        
        const id = e.target.name
        setSwitchValue({...switchValue,[id]:!switchValue[id]})
    }
    console.log(dropdownValue, "dropdown");

    const dropdown = (e)=>{
        console.log(e.target.value); 
        if(e.target.value){
            const id = e.target.value
            setSwitchValue({[id]:switchValue[id]=true})
            setDropdownValue(e.value);
        }    
    }

    const dropdownValues = [ 'Dashboard' ,'Dashboard 1','Dashboard 2', 'Dashboard 3' 
        // { name: 'Dashboard' },
        // { name: 'Dashboard 1' },
        // { name: 'Dashboard 2'},
        // { name: 'Dashboard 3' },
    ]

    const [user, setUser] = useState({
        Email: "",
        Password: "",
        Username: "",
        Phone: "",
        About: "",
        Firstname: "",
        Lastname: "",
        firstpage:""
    });

    const handleChange = (e) => {
        
       console.log(e.target.value)
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
            firstpage:dropdownValue
        };
        const response=await axios.post(`${HttpService.Register}`, data);
        if(response) { 
            setUser({Email :"",Password :"", Username :"", Phone :"", Firstname :"", Lastname :"",About :"",firstpage:""})
            toast.current.show({ severity: "success", summary: "Successful", detail: "User created !", life: 3000 });
        }
        
    };
       
    return (
        <div className="grid p-fluid"> 
            <Toast ref={toast} />  
            <div className="col-12 md:col-6">
            <form method="post" onSubmit={handlesubmit}>
                <div className="card">        
                 <h5>Username </h5>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Username" name="Username" value={user.Username} onChange={handleChange}/>
                    </div>

                    <h5>Firstname </h5>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-id-card"></i>
                        </span>
                        <InputText placeholder="Firstname" name="Firstname" value={user.Firstname} onChange={handleChange}/>
                    </div>
                    <h5>Lastname </h5>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-id-card"></i>
                        </span>
                        <InputText placeholder="Lastname" name="Lastname" value={user.Lastname} onChange={handleChange}/>
                    </div>

                    <h5>Email </h5>
                    <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-envelope"></i>
                        </span>
                        <InputText placeholder="Email" name="Email" value={user.Email} onChange={handleChange}/>
                    </div>

                    <h5>Password </h5>
                    <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <InputText type="password" placeholder="Password" name="Password" value={user.Password} onChange={handleChange} />
                    </div>

                    <h5>Phone </h5>
                    <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-phone"></i>
                        </span>
                        <InputText type="tel" placeholder="Phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                    </div>
                  
                    <h5>First Page</h5>
                    <>
                    {/* <MultiSelect value={multiselectValue} onChange={HandleAcces} options={multiselectValues} optionLabel="name" placeholder="Select Countries" filter itemTemplate={itemTemplate} selectedItemTemplate={selectedItemTemplate} /> */}
                    <Dropdown value={dropdownValue} onChange={dropdown} options={dropdownValues}  placeholder="Select"  />
                    <Button type="submit" label="Create User" className="mr-2 mb-2 mt-5"></Button>
                    </>  
                </div>
                </form>  
            </div>
            
            <div className="col-12 md:col-6">
                <div className="card">

                    {dropdownValues.map((ele, index) => {
                        return (
                            <>
                                <h5>{ele}</h5>
                                <InputSwitch checked={switchValue[ele]} value={ele} name={ele} onChange={(e) => drpdwn(e,index)} />
                            </>
                        );
                    })}

                </div>
            </div>
        </div>
    );
};

export default CreateUser;
