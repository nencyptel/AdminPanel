import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Route, useLocation } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
    const [item, setItem] = useState(true);
    const token = localStorage.getItem("token");

    const isAuthenticated = () => {
       
        console.log(token + "gdhdgh");
        
        try {
            if (token) {
               axios.get(`http://localhost:4000/auth/verify/user/${token}`)
         
              .then(()=>{
                 setItem(true);
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
      if(token){
        isAuthenticated();
      }  
      else{
          setItem(false);
      }
  },[token]);
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated() ? (
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
