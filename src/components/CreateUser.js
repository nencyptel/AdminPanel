import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import HttpService from "./utils/http.service";
import axios from "axios";
import { Toast } from "primereact/toast";
import Dashboard from "./Dashboard";
import { CreateUserData } from "./Redux/Reducer/createUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Menubar from "./Common/menubar";

const CreateUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userInfo = useSelector((state) => state?.newuser?.userInfo);
    const Error = useSelector((state) => state?.newuser?.error);

    const [switchValue, setSwitchValue] = useState({
        Dashboard: false,
        Dashboard1: false,
        Dashboard2: false,
        Dashboard3: false,
    });
    var list = [];

    const toast = useRef(null);
    const usertypevalues = ["Admin", "User"];
    const [dropdownValue, setDropdownValue] = useState();
    const [usertypevalue, setUsertypevalue] = useState();
    const [accesible, setAccesible] = useState([]);

    const drpdwn = (e, index) => {
        const id = e.target.name;
        setSwitchValue({ ...switchValue, [id]: !switchValue[id] });
        if (e.target.name) {
            setAccesible((prev) => (switchValue[id] ? prev.filter((cur) => cur != id) : [...prev, e.target.name]));
        }
    };

    const dropdown = (e) => {
        if (e.target.value) {
            console.log(e.target.value);
            const id = e.target.value;

            setSwitchValue({ [id]: (switchValue[id] = true) });
            setUsertypevalue(e.value);
            setDropdownValue(e.value);
            setAccesible((prevstate) => [e.value]);
        } else {
            console.log("nothing");
            setDropdownValue("Dashboard 1");
        }
    };

    const dropdownValues = ["Dashboard", "Dashboard 1", "Dashboard 2", "Dashboard 3"];

    const [user, setUser] = useState({
        Email: "",
        Password: "",
        Username: "",
        Phone: "",
        About: "",
        Firstname: "",
        Lastname: "",
        firstpage: "",
        pages: [{}],
        usertype: "",
    });

    const handleChange = (e) => {
        console.log(e.target.value);
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
            usertype: usertypevalue,
            firstpage: dropdownValue,
            // pagelist: {name:[accesible],url:[accesible]},
            pagelist: accesible.map((ele) => {
                return { name: ele, url: ele };
            }),
        };

        if (dispatch(CreateUserData(data))) {
            setUser({
                Email: "",
                Password: "",
                Username: "",
                Phone: "",
                About: "",
                Firstname: "",
                Lastname: "",
                firstpage: "",
                usertype: "",
                pages: [{}],
            });
            setSwitchValue({
                Dashboard: false,
                Dashboard1: false,
                Dashboard2: false,
                Dashboard3: false,
            });
        }
    };

    useEffect(() => {
        if (userInfo) {
            toast.current.show({ severity: "success", summary: "Successful", detail: "User created succesfull", life: 3000 });
            //  history.push('/table1')
        } else if (Error) {
            console.log(Error, "hey");
            toast.current.show({ severity: "error", summary: "Register Unsuccessful", detail: `${Error.payload.msg}`, life: 3000 });
        }
    }, [accesible, Error, userInfo]);

    return (
        <>
            <Menubar
                dashboard={
                    <>
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
                                            <InputText placeholder="Username" name="Username" value={user.Username} onChange={handleChange}  required/>
                                        </div>

                                        <h5>Firstname </h5>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-id-card"></i>
                                            </span>
                                            <InputText placeholder="Firstname" name="Firstname" value={user.Firstname} onChange={handleChange} />
                                        </div>
                                        <h5>Lastname </h5>
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-id-card"></i>
                                            </span>
                                            <InputText placeholder="Lastname" name="Lastname" value={user.Lastname} onChange={handleChange} />
                                        </div>

                                        <h5>Email </h5>
                                        <div className="p-inputgroup ">
                                            <span className="p-inputgroup-addon">
                                                <i className="pi pi-envelope"></i>
                                            </span>
                                            <InputText  placeholder="Email" name="Email" value={user.Email} onChange={handleChange} required/>
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
                                            <InputText type="tel" placeholder="Phone" name="Phone" value={user.Phone} onChange={handleChange} />
                                        </div>

                                        <h5>Who are you ?</h5>
                                        <>
                                            <Dropdown value={usertypevalue} onChange={dropdown} options={usertypevalues} placeholder="Select Usertype" />
                                        </>
                                        <h5>First Page</h5>
                                        <>
                                            {/* <MultiSelect value={multiselectValue} onChange={HandleAcces} options={multiselectValues} optionLabel="name" placeholder="Select Countries" filter itemTemplate={itemTemplate} selectedItemTemplate={selectedItemTemplate} /> */}
                                            <Dropdown value={dropdownValue} onChange={dropdown} options={dropdownValues} placeholder="Select" />
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
                                                <InputSwitch checked={switchValue[ele]} value={ele} name={ele} onChange={(e) => drpdwn(e, index)} />
                                            </>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                }
            ></Menubar>
        </>
    );
};

export default CreateUser;
