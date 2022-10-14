import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { AutoComplete } from "primereact/autocomplete";
import { InputSwitch } from "primereact/inputswitch";
import { Chips } from "primereact/chips";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const EditProfile = () => {
    const dropdownValues = ["Dashboard", "Dashboard 1", "Dashboard 2", "Dashboard 3"];
    const [dropdownValue, setDropdownValue] = useState();

    return (
        <>
            <h1  style={{textAlign :'center'}}>My Profile</h1>
            <div className="grid">
                <div className="card">
                 
                    <h5>Username </h5>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Username" name="Username" />
                    </div>
                    <div className="grid formgrid">
                        <div className="col-12 mb-2 lg:col-6  mt-5">
                        <h5>Firstname </h5>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-id-card"></i>
                            </span>
                            <InputText placeholder="Firstname" name="Firstname" />
                        </div>
                        </div>
                        <div className="col-12 mb-2 lg:col-6  mt-5">
                        <h5>Lastname </h5>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-id-card"></i>
                        </span>
                        <InputText placeholder="Lastname" name="Lastname" />
                    </div>
                        </div>
                    </div>

                    <h5>Email </h5>
                    <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-envelope"></i>
                        </span>
                        <InputText placeholder="Email" name="Email" />
                    </div>

                    <h5>Password </h5>
                    <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <InputText type="password" placeholder="Password" name="Password" />
                    </div>

                    <h5>Phone </h5>
                    <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-phone"></i>
                        </span>
                        <InputText type="tel" placeholder="Phone" name="Phone" />
                    </div>

                    <div className="grid formgrid">
                        <div className="col-12 mb-2 lg:col-6 lg:mb-0 mt-5">
                            <h5>First Page</h5>
                            <Dropdown value={dropdownValue} options={dropdownValues} placeholder="Select Firstpage" />
                        </div>
                        <div className="col-12 mb-2 lg:col-6 lg:mb-0 mt-5">
                            {dropdownValues.map((ele, index) => {
                                return (
                                    <>
                                        <h5>{ele}</h5>
                                        <InputSwitch value={ele} name={ele} />
                                    </>
                                );
                            })}
                        </div>
                    </div>

                    <Button type="submit" label="Create User" className="mr-2 mb-2 mt-5"></Button>
                </div>
            </div>
        </>
    );
};

export default EditProfile;
