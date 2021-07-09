import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import firebase from "../../config/fbConfig";

const ImageUploader = (props) => {
    const [imageURL, setImageURL] = useState();
    const { onImageURL } = props;

    const readImages = async (e) => {
        const files = e.target.files[0];
        const autoId = uuid();

        const imageRef = firebase.storage().ref('images').child(autoId);
        await imageRef.put(files);
        imageRef.getDownloadURL().then(url => {
            onImageURL(url);
        });
    };

    return (
        <div className="ui labeled input">
            <div className="ui label">
                Upload Image
            </div>
            <input type="file" placeholder="Image URL" onChange={readImages} />
        </div>
    )

}

export default ImageUploader;