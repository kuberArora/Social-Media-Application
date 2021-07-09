import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuth = useSelector((state) => state.firebase.auth.id);
    return (
        <Route {...rest} render={(props) => {
            if (isAuth) {
                return <Component {...props}/>
            }
            else {
                return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
        }} />
    );
};

export default ProtectedRoute;