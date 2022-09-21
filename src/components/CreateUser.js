import React , {useState}from 'react';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const CreateUser = () => {

    const [switchValue, setSwitchValue] = useState(false);
    const [switchValue1, setSwitchValue1] = useState(false);
    const [switchValue2, setSwitchValue2] = useState(false);
    const [switchValue3, setSwitchValue3] = useState(false);
    //const [dropdownValue, setDropdownValue] = useState("");

    const drpdwn = (e) =>{   
        console.log(e.target.value)
        if(e.target.value){
            setSwitchValue(true);
        }
    } 

    const dropdownValue= [ 'Dashboard','Dashboard1','Dashboard2','Dashboard3' ]
    const Values = [{name : 'Dashboard'},{name :'Dashboard1'},{name :'Dashboard2'},{name:'Dashboard3'}];
  
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
                            <Dropdown onChange={(e) => drpdwn(e)} options={Values} optionLabel="name" placeholder="Select" />
                            <Button label="Create User" className="mr-2 mb-2 mt-5"></Button>
                        </>
                
                </div>
            </div>
            <div className="col-12 md:col-6">
                <div className="card">
                  {dropdownValue.map((ele,index)=>{
                    return(
                    <>
                        <h5>{ele}</h5>
                        <InputSwitch checked={switchValue} value={ele} name="Dashboard"  onChange={(e) => setSwitchValue(e.value)} />
                    </>
                    )})}

                    {/* <h5>Dashboard 1</h5>
                    <InputSwitch checked={switchValue1} value="Dashboard1" name="Dashboard1" onChange={(e) => setSwitchValue1(e.value)} />

                    <h5>Dashboard 2</h5>
                    <InputSwitch checked={switchValue2} name="Dashboard2" onChange={(e) => setSwitchValue2(e.value)} />

                    <h5>Dashboard 3</h5>
                    <InputSwitch checked={switchValue3} name="Dashboard3" onChange={(e) => setSwitchValue3(e.value)} />    */}
                    
                </div>
            </div>
        </div >
    );
}

export default CreateUser;
