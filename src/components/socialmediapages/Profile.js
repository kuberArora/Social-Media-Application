import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";


import DisplayUserPost from "../post/DisplayUserPost";


class Profile extends React.Component {
    render() {
        const { auth } = this.props;
        if (!auth.uid) {
            return (
                <Redirect to='/' />
            )
        }

        return (
            <div style={{marginTop:"-120px"}}>
                <DisplayUserPost/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Profile);