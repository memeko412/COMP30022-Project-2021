import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...restOfProps})=>{
  return(
    
    <Route
      {...restOfProps}
      render = {(props) =>  {
        if (window.localStorage.userId ) return <Component {...props}/> 
        if(!window.localStorage.userId ) return <Redirect to = "/login"/>
      }} 
    />
  )
}

export default ProtectedRoute;