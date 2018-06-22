import React from 'react';
import Aux from '../../hoc/aux';

const codeInput = (props) => {
    return (
        <Aux>
            <p>Input (optional):</p>
            <textarea rows="5" cols="50" onChange={(e) => {console.log(e);props.change(e.target.value)}} ></textarea>
            <br /><br />
        </Aux> 
    );
};

export default codeInput;