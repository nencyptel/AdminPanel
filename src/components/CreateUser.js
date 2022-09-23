import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

const CreateUser = () => {
    const [switchValue, setSwitchValue] = useState({
        Dashboard : false,
        Dashboard1 :false,
        Dashboard2 :false,
        Dashboard3 :false,
    });
    const [dropdownValue, setDropdownValue] = useState(null);

    const drpdwn = (e,index)=> {

        console.log(e.target.name)
        const id = e.target.name
        setSwitchValue({...switchValue,[id]:!switchValue[id]})
    }

    const dropdown = (e)=>{
        console.log(e.target.value.name);

        if(e.target.value.name){
            const id = e.target.value.name
            setSwitchValue({[id]:switchValue[id]=true})

        }
        
    }
    const dropdownValues = [
        { name: 'Dashboard', code: 'NY' },
        { name: 'Dashboard 1', code: 'RM' },
        { name: 'Dashboard 2', code: 'LDN' },
        { name: 'Dashboard 3', code: 'IST' }

    ] 


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
                  
                    <h5>First Page</h5>
                    <>
                    {/* <MultiSelect value={multiselectValue} onChange={HandleAcces} options={multiselectValues} optionLabel="name" placeholder="Select Countries" filter itemTemplate={itemTemplate} selectedItemTemplate={selectedItemTemplate} /> */}
                    <Dropdown value={dropdownValue} onChange={dropdown} options={dropdownValues} optionLabel="name" placeholder="Select"  />
                        <Button label="Create User" className="mr-2 mb-2 mt-5"></Button>
                    </>
                </div>
            </div>
            <div className="col-12 md:col-6">
                <div className="card">

                    {dropdownValues.map((ele, index) => {
                        return (
                            <>
                                <h5>{ele.name}</h5>
                                <InputSwitch checked={switchValue[ele.name]} value={ele.name} name={ele.name} onChange={(e) => drpdwn(e,index)} />
                            </>
                        );
                    })}

                    {/* <h5>Dashboard</h5>
                    <InputSwitch checked={switchValue} onChange={(e) => setSwitchValue(e.value)} />

                    <h5>Dashboard 1</h5>
                    <InputSwitch checked={switchValue} onChange={(e) => setSwitchValue(e.value)} />

                    <h5>Dashboard 2</h5>
                    <InputSwitch checked={switchValue} onChange={(e) => setSwitchValue(e.value)} />

                    <h5>Dashboard 3</h5>
                    <InputSwitch checked={switchValue} onChange={(e) => setSwitchValue(e.value)} /> */}

                </div>
            </div>
        </div>
    );
};

export default CreateUser;
