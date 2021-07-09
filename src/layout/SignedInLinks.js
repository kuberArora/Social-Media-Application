import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { signOut } from "../store/actions/authActions";

const SignInLinks = (props) => {
    return (
        <ul className="right">
            <li><Link to='/myprofile' ><img class="ui avatar image" src={props.auth.photoURL} />Profile</Link></li>
            <li><a onClick={props.signOut}>Log Out</a></li>

        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignInLinks);