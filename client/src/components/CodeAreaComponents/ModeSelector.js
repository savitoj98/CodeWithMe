import React from "react" 


const modeSelector = (props) => {

    return(
        <select name="modes" onChange = {(e) => props.change(e.target.value)}>
            <option value="text/x-csrc" defaultValue>C</option>
            <option value="text/x-c++src">C++</option>
            <option value="text/x-java">Java</option>
            <option value="text/javascript" >Javascript</option>
            <option value="text/x-python">Python</option>
        </select>
    );

} 


export default modeSelector