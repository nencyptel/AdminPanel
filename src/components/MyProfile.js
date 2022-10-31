import React, { useState, useEffect } from "react";
import { InputSwitch } from "primereact/inputswitch";
import "../../src/components/style/myprofile.css";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { fetchUserData } from "./Redux/Reducer/fetchUserSlice";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import string_to_slug from "./Common/strintGenerator";
import Menubar from "./Common/menubar";
import { Link } from "react-router-dom";

const MyProfile = () => {
    const userInfo = useSelector((state) => state?.userprofile?.userInfo);
    const dispatch = useDispatch();
    const dropdownValues = ["Dashboard", "Dashboard 1", "Dashboard 2", "Dashboard 3"];

    const newpagelist = userInfo?.data?.user?.pagelist;
    let first = "";
    const data = localStorage.getItem("userToken");
    const newarr = [];
    
    newpagelist?.map((item) => {
        newarr.push(item.name);
        return item.name;
    });
    dropdownValues?.map((item) => {
        if (string_to_slug(item) === userInfo?.data?.user?.firstpage) {
            first = item;
        }
    });
    useEffect(() => {
        dispatch(fetchUserData(data));
    }, [data]);
    return (
        <>
            <Menubar
                dashboard={
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
                                            <p class="text-secondary mb-1">{first}</p>
                                        </div>
                                        <div className="col-12 mb-2 lg:col-6 lg:mb-0 mt-5">
                                            {dropdownValues.map((ele, index) => {
                                                return (
                                                    <>
                                                        <h5>{ele}</h5>
                                                        <InputSwitch checked={newarr.includes(ele)} value={ele} name={ele} />
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
                                    <Link to="/editprofile">
                                        <Button type="submit" label="Edit User" className="mr-2 mb-2 mt-5"></Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                }
            ></Menubar>
        </>
    );
};

export default MyProfile;
