import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { AutoComplete } from "primereact/autocomplete";
import { InputSwitch } from "primereact/inputswitch";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import Menubar from "./Common/menubar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "./Redux/Reducer/fetchUserSlice";
import { UpdateData } from "./Redux/Reducer/UpdatedataSlice";
import string_to_slug from "./Common/strintGenerator";

const EditProfile = () => {
    const userInfo = useSelector((state) => state?.userprofile?.userInfo);
    const dropdownValues = ["Dashboard", "Dashboard 1", "Dashboard 2", "Dashboard 3"];
    const [dropdownValue, setDropdownValue] = useState(firstpage);
    const [userId, setUserId] = useState();
    const [firstpage, setFirstpage] = useState();
    const data = localStorage.getItem("userToken");
    const dispatch = useDispatch();
    const history = useHistory();

    const [switchValue, setSwitchValue] = useState({
        "Dashboard": false,
        "Dashboard 1": false,
        "Dashboard 2": false,
        "Dashboard 3": false,
    });

    const [editData, setEditdata] = useState();
    const [accesible, setAccesible] = useState([]);
    const newuser = userInfo?.data?.user;
   
    dropdownValues.map((item)=>{
        if(string_to_slug(item)== firstpage){
            setFirstpage(item);
            setAccesible([item]);
            setDropdownValue(item);
            setSwitchValue({ ...switchValue, [item]: !switchValue[item] });
        }
    })
    
    const drpdwn = (e, ele) => {
        const id = e.target.name;
        setSwitchValue({ ...switchValue, [id]: !switchValue[id] });
        if (e.target.name) {
            setAccesible((prev) => (switchValue[id] ? prev.filter((cur) => cur !== id) : [...prev, e.target.name]));
        }
    };

    const newarr= [];
    newuser?.pagelist?.map((item)=>{
        newarr.push(item.name);
    })
 
  const newList=[];
   useEffect(() => {
    newarr.forEach((item) => {
        setSwitchValue({ ...switchValue, [item]: (switchValue[item] = true) });
        newList.push(item);
    });
    setAccesible(newList);
   }, []);

   console.log(switchValue , newList,accesible,"current" , newarr)

    useEffect(() => {
        dispatch(fetchUserData(data));
    }, [data]);

    useEffect(() => {
        setEditdata(newuser);
        setUserId(newuser?._id);
        setFirstpage(newuser?.firstpage);
        
    }, [userInfo ]);

    const firstpageSelection =(e)=>{
       
        setDropdownValue(e.target.value)
        if (e.target.value) {
            console.log(e.target.value);
            const id = e.target.value;
            setSwitchValue({ [id]: (switchValue[id] = true) });
            setFirstpage();
            setDropdownValue(e.value);
            setAccesible([e.value]);
        } else {
            setDropdownValue("Dashboard 1");
        }
    }
  
    const inputChange = (e) => {
        setEditdata({ ...editData, [e.target.name]: e.target.value });
    };
  

    const OnSubmit = (e) => {
        e.preventDefault();
        const data = {
            Username: editData.Username,
            Phone: editData.Phone,
            Email: editData.Email,
            Firstname: editData.Firstname,
            About: editData.About,
            Lastname: editData.Lastname,
            firstpage: dropdownValue,
            pagelist: accesible.map((ele) => {
                return { name: ele, url: string_to_slug(ele) };
            }),
        };

        if (dispatch(UpdateData({ data, userId }))) {
            history.push("/myprofile");
        }
    };

    return (
        <>
            <Menubar
                dashboard={
                    <>
                        <h1 style={{ textAlign: "center" }}>Edit Profile</h1>
                        <div className="grid">
                            <Form method="post" onSubmit={OnSubmit}>
                                <div className="card">
                                    <h5>Username </h5>
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText placeholder="Username" name="Username" value={editData?.Username} onChange={inputChange} />
                                    </div>
                                    <div className="grid formgrid">
                                        <div className="col-12 mb-2 lg:col-6  mt-5">
                                            <h5>Firstname </h5>
                                            <div className="p-inputgroup">
                                                <span className="p-inputgroup-addon">
                                                    <i className="pi pi-id-card"></i>
                                                </span>
                                                <InputText placeholder="Firstname" name="Firstname" value={editData?.Firstname} onChange={inputChange} />
                                            </div>
                                        </div>
                                        <div className="col-12 mb-2 lg:col-6  mt-5">
                                            <h5>Lastname </h5>
                                            <div className="p-inputgroup">
                                                <span className="p-inputgroup-addon">
                                                    <i className="pi pi-id-card"></i>
                                                </span>
                                                <InputText placeholder="Lastname" name="Lastname" value={editData?.Lastname} onChange={inputChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <h5>Email </h5>
                                    <div className="p-inputgroup ">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-envelope"></i>
                                        </span>
                                        <InputText placeholder="Email" name="Email" value={editData?.Email} onChange={inputChange} />
                                    </div>

                                    <h5>Phone </h5>
                                    <div className="p-inputgroup ">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-phone"></i>
                                        </span>
                                        <InputText type="tel" placeholder="Phone" name="Phone" value={editData?.Phone} onChange={inputChange} />
                                    </div>
                                    <h5>About</h5>
                                    <div className="p-inputgroup ">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-info"></i>
                                        </span>
                                        <InputTextarea type="text" placeholder="About" name="About" value={editData?.About} onChange={inputChange} />
                                    </div>

                                    <div className="grid formgrid">
                                        <div className="col-12 mb-2 lg:col-6 lg:mb-0 mt-5">
                                            <h5>First Page</h5>
                                            <Dropdown value={firstpage? firstpage : dropdownValue} options={dropdownValues} placeholder="Select Firstpage" onChange={firstpageSelection}/>
                                        </div>
                                        <div className="col-12 mb-2 lg:col-6 lg:mb-0 mt-5">
                                            {dropdownValues.map((ele, index) => {
                                                return (
                                                    <>
                                                        <h5>{ele}</h5>
                                                        <InputSwitch checked={switchValue[ele]} value={ele} name={ele} onChange={(e) => drpdwn(e, ele)} />
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <Button type="submit" label="Edit User" className="mr-2 mb-2 mt-5"></Button>
                                </div>
                            </Form>
                        </div>
                    </>
                }
            ></Menubar>
        </>
    );
};

export default EditProfile;
