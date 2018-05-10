import React from "react" 


const fileUpload = (props) => {

    return(
        <span>
            <input type="file"
            name="myFile"
            onChange={(e)=>props.uploadFile(e)} />
        </span>
    );

} 


export default fileUpload