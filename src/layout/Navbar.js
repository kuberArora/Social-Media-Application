import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


import SignInLinks from "./SignedInLinks";
import SignOutLinks from "./SignedOutLinks";


const Navbar = (props) => {
    const { auth, profile } = props;

    const links = auth.uid ? <SignInLinks profile={profile} auth={auth} /> : <SignOutLinks />;
    return (
        <nav className="nav-wrapper blue darken-3">
        <div className="container">
            <Link to='/profile' className="brand-logo">Twix</Link>
            {links}
        </div>
    </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);