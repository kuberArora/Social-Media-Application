import React from "react";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <div class="ui secondary vertical pointing menu">
                        <Link to='/profile' class="active item">
                            Home
                        </Link>
                        <Link to='/posts' class="item">
                            Posts
                        </Link>
                        <Link to='/addroom' class="item">
                            Add Friend
                        </Link>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;