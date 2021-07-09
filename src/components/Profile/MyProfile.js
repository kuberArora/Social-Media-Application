import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class MyProfile extends React.Component {
    render() {
        const data = this.props;
        const { auth } = this.props;
        const date = new Date(1625133928261).toUTCString();
        if (!auth.uid) {
            return (
                <Redirect to='/' />
            )
        }

        console.log("my prodile ",auth);
        return (
            <div>
                <div className="ui card" style={{ marginLeft: "450px" }}>
                    <div className="image">
                        <img src={data.auth.photoURL} />
                    </div>
                    <div className="content">
                        <a className="header">{data.auth.displayName}</a>
                        <div className="meta">
                            <span className="date">{date}</span>
                        </div>
                        <div className="description">
                            {data.auth.email}
                        </div>
                    </div>
                    <div className="extra content">
                        <a>
                            <i className="user icon"></i>

                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(MyProfile);