import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";

const CreateUser = () => {
    const [switchValue, setSwitchValue] = useState([]);
    const [multiselectValue, setMultiselectValue] = useState([]);

    const selectedItemTemplate = (option) => {
        if (option) {
            return (
                <div className="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2">
                    <span>{option.name}</span>
                </div>
            );
        }
        return "Select";
    };

    const itemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <span>{option.name}</span>
            </div>
        );
    };

    const drpdwn = (e, index) => {};
    
    useEffect(() => {
        console.log(multiselectValue);
        const updatedData = multiselectValue.map((item, idx) => {
            const index = item.name;
            if(index){
            }
            return item.name
          });

          
          setSwitchValue(updatedData);
         
       
    }, [multiselectValue]);
    console.log(switchValue +"update")
    const HandleAcces = (e) => {
        setMultiselectValue(e.target.value);
    };

    const multiselectValues = [
        { name: "Dashboard", code: "AU" },
        { name: "Dashboard1", code: "BR" },
        { name: "Dashboard2", code: "CN" },
        { name: "Dashboard3", code: "EG" },
    ];
    const dropdownValue = [{ name: "Dashboard" }, { name: "Dashboard1" }, { name: "Dashboard2" }, { name: "Dashboard3" }];
    

    return (
        <div className="grid p-fluid">
            <div className="col-12 md:col-6">
                <div className="card">
                    <h5>Username </h5>
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Username" />
                    </div>

                    <h5>Email </h5>
                    <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-envelope"></i>
                        </span>
                        <InputText placeholder="Email" />
                    </div>

                    <h5>Password </h5>
                    <div className="p-inputgroup ">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                        <InputText placeholder="Password" />
                    </div>
                  
                    <h5>Access to User</h5>
                    <>
                    <MultiSelect value={multiselectValue} onChange={HandleAcces} options={multiselectValues} optionLabel="name" placeholder="Select Countries" filter itemTemplate={itemTemplate} selectedItemTemplate={selectedItemTemplate} />
                        <Button label="Create User" className="mr-2 mb-2 mt-5"></Button>
                    </>
                </div>
            </div>
            <div className="col-12 md:col-6">
                <div className="card">

                    {dropdownValue.map((ele, index) => {
                        return (
                            <>
                                <h5>{ele.name}</h5>
                                <InputSwitch checked={switchValue.includes(ele.name)} value={ele.name} name={ele.name} onChange={(e) => drpdwn(e, index)} />
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
