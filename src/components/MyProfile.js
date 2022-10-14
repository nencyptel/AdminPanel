import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { AutoComplete } from "primereact/autocomplete";
import { InputSwitch } from "primereact/inputswitch";
import "../../src/components/style/myprofile.css";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { fetchUserData } from "./Redux/Reducer/fetchUserSlice";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import string_to_slug from "./Common/strintGenerator";

const MyProfile = () => {
    const dropdownValues = ["Dashboard", "Dashboard 1", "Dashboard 2", "Dashboard 3"];
   
    const [firstpage, setFirstpage] = useState();

    dropdownValues.map((item) => {
        if (string_to_slug(item) === firstpage) {
            setFirstpage(item)
   
        }
    });
    const userInfo = useSelector((state) => state?.userprofile?.userInfo);
   
    const dispatch = useDispatch();

    const data = localStorage.getItem("userToken");
    console.log(userInfo?.data);
    const first =userInfo?.data?.user?.firstpage;

    useEffect(() => {
        dispatch(fetchUserData(data));
        setFirstpage(first);
    }, [data, userInfo]);

  

    return (
        <>
            <h1 style={{ textAlign: "center" }}>My Profile</h1>
            <div className="grid">
                <div className="col-12 md:col-6">
                    <div className="card">
                        <div class="d-flex flex-column align-items-center text-center">
                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width="110" />
                            <div class="mt-3">
                                <h4>{userInfo?.data?.user?.Username}</h4>
                                <p class="text-secondary mb-1">{userInfo?.data?.user?.About}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="grid formgrid">
                            <div className="col-12 mb-2 lg:col-6 lg:mb-0 mt-5">
                                <h5 style={{ marginTop: "none" }}>First Page</h5>
                                <Dropdown value={firstpage} options={dropdownValues} placeholder="Select Firstpage" />
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
                    </div>
                </div>
                <div className="col-12 md:col-6">
                    <div className="card">
                        <div className="userinfo">
                            <div class="col-sm-3">
                                <h5 className="title-user">Username </h5>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <span className="text-secondary ml-5">{userInfo?.data?.user?.Username}</span>
                            </div>
                        </div>
                        <hr />
                        <div className="userinfo">
                            <h5 className="title-user">Firstname </h5>
                            <span className="text-secondary ml-5">{userInfo?.data?.user?.Firstname}</span>
                        </div>
                        <hr />
                        <div className="userinfo">
                            <h5 className="title-user">Lastname </h5>
                            <span className="text-secondary ml-5">{userInfo?.data?.user?.Lastname}</span>
                        </div>
                        <hr />
                        <div className="userinfo">
                            <h5 className="title-user">Phone </h5>
                            <span className="text-secondary ml-5">{userInfo?.data?.user?.Phone}</span>
                        </div>
                        <hr />

                        <div className="userinfo">
                            <div class="col-sm-3">
                                <h5 className="title-user">Email </h5>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <span className="text-secondary ml-5">{userInfo?.data?.user?.Email}</span>
                            </div>
                        </div>
                        <hr />

                        <Button type="submit" label="Edit User" className="mr-2 mb-2 mt-5"></Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;
