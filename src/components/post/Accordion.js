import React, { useState } from "react";

import CommentPost from "./CommentPost";
import DisplayComment from "./DisplayComment";
import LikePost from "./LikePost";

const Accordion = ({ uniqueKey }) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className="accordion" style={{ marginLeft: "50px" }}>
            <div className="accordion-item">
                <div className="accordion-title" >
                    <div className="ui grid">
                        <div className="two wide column"><a onClick={() => setIsActive(!isActive)}><i class="comment icon"></i></a></div>
                        <div className="two wide column"><a><LikePost uniqueKey={uniqueKey} /></a></div>
                    </div>
                </div>
                {isActive && <div className="accordion-content">
                    <DisplayComment uniqueKey={uniqueKey} />
                    <CommentPost uniqueKey={uniqueKey} status={setIsActive} />
                </div>}
            </div>
        </div>
    )
}

export default Accordion;