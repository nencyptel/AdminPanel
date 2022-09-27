import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import HttpService from "../utils/http.service";

function PrivateRoute({ component: Component, ...rest }) {
    const [item, setItem] = useState(true);
    const token = localStorage.getItem("token");

    const userInfo  = useSelector((state) => state.user.userInfo);

    const userid = userInfo?.data?.token?._userId;
    console.log(userid);
    const userToken=localStorage.getItem("userToken");
    const isAuthenticated = () => {   
        try {
            if (userToken) {
                const config = {
                    headers: {
                      Authorization: `Bearer ${userToken}`,
                    },
                  }
               axios.get(`${HttpService.verifyuser}${userid}`,config)
         
              .then((res)=>{
                if(res){
                    if(res.data.status === 300){
                       console.log("expired");
                       setItem(false);
                    }else if(res.data.status === 400){
                        console.log("login")
                    }
                    else if(res.data.status === 200){
                        setItem(true);
                    }
                  
                }
                 
              })  
              .catch((err)=>{
                 console.log(err)
              }) 
                return true;
            }
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
    if(userToken){
        // isAuthenticated();   
        setItem(true)   
    }else{
        setItem(false)
    }
    console.log(userToken);
  },[userToken]);

  console.log(item)
    return (
        <Route
            {...rest}
            render={(props) =>
               item ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;
