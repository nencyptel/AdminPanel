import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";

const CreateUser = () => {
    const [switchValue, setSwitchValue] = useState([
        { name: "Dashboard", code: "AU" , Dashboard:true},
        { name: "Dashboard1", code: "BR" , Dashboard:true},
        { name: "Dashboard2", code: "CN" , Dashboard:true},
        { name: "Dashboard3", code: "EG", Dashboard:true },
    ]);
    const [multiselectValue, setMultiselectValue] = useState([
        { name: "Dashboard", code: "AU" , Dashboard:true},
        { name: "Dashboard1", code: "BR" , Dashboard:true},
        { name: "Dashboard2", code: "CN" , Dashboard:true},
        { name: "Dashboard3", code: "EG", Dashboard:true },
    ]);

    const selectedItemTemplate = (option) => {
        if (option) {         
            return (
                <div className="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2">
                    <span>{option.name}</span>
                </div>
            );
        }

        return "Select Countries";
    };

    const itemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <span>{option.name}</span>
            </div>
        );
    };

    //const [dropdownValue, setDropdownValue] = useState("");
    const drpdwn = (e, index) => {
        console.log( "helo")
    };

    useEffect(() => {
        console.log(multiselectValue);
        const updatedata=  multiselectValue.map((item, idx) => {
            const index = item.name;
             //return index;

            if(index){
                
                setSwitchValue((switchValue) => ({ ...switchValue, [index]: switchValue[index]=true }));
            }
            else if(switchValue.name != index){
         
                setSwitchValue((switchValue) => ({ ...switchValue, [index]: switchValue[index]=false }));
            }
       
        });
          console.log(switchValue.Dashboard +"update")
     
          //setSwitchValue((switchValue) => ({ ...switchValue, [updatedata]: switchValue[updatedata]=true }))
    }, [multiselectValue ]);

    const HandleAcces = (e) => {
        const arr = e.target.value;

        setMultiselectValue(e.target.value);

        // const id = e.target.value;
        // // console.log(e.target.value.name);
        // setSwitchValue((switchValue) => ({
        //     ...switchValue,
        //     [id]: !switchValue[id]
        // }));
    };

    const multiselectValues = [
        { name: "Dashboard", code: "AU" , Dashboard:true},
        { name: "Dashboard1", code: "BR" , Dashboard:true},
        { name: "Dashboard2", code: "CN" , Dashboard:true},
        { name: "Dashboard3", code: "EG", Dashboard:true },
    ];
    const dropdownValue = [{ name: "Dashboard" }, { name: "Dashboard1" }, { name: "Dashboard2" }, { name: "Dashboard3" }];
    const Values = [{ name: "Dashboard" }, { name: "Dashboard1" }, { name: "Dashboard2" }, { name: "Dashboard3" }];

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
                                <InputSwitch key={index} checked={switchValue[ele.name]} value={ele.name} name={ele.name} onChange={(e) => console.log(e.target.checked)} />
                            </>
                        );
                    })}

                    {/* <h5>Dashboard 1</h5>
                    <InputSwitch checked={switchValue1} value="Dashboard1" name="Dashboard1" onChange={(e) => setSwitchValue1(e.name)} />

                    <h5>Dashboard 2</h5>
                    <InputSwitch checked={switchValue3} name="Dashboard2" onChange={(e) => setSwitchValue3(e.name)} />

                    <h5>Dashboard 3</h5>
                    <InputSwitch checked={switchValue2} name="Dashboard3" onChange={(e) => setSwitchValue2(e.name)} /> */}
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
