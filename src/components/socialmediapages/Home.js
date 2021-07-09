import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { googleProvider, facebookProvider } from "../../config/authMethod";
import { signIn } from "../../store/actions/authActions";
import logo from "../../image/logoNew.png";

class Home extends React.Component {
    render() {
        const { auth } = this.props;
        if (auth.uid) {
            return (
                <Redirect to='/profile' />
            )
        }
        const handleOnClick = (provider) => {
            this.props.signIn(provider);
        }

        return (
            <div className="ui container">
                <img class="ui centered large circular image" src={logo} />
                <div className="ui field" style={{ marginLeft: "430px" }}>
                    <button class="ui facebook button" onClick={() => { handleOnClick(facebookProvider) }}>
                        <i class="facebook icon"></i>
                        Facebook
                    </button>
                    <button class="ui google plus button" onClick={() => { handleOnClick(googleProvider) }}>
                        <i class="google plus icon"></i>
                        Google Plus
                    </button>
                </div>
            </div >

        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (disaptch) => {
    return {
        signIn: (provider) => disaptch(signIn(provider))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


