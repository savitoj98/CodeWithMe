import React from "react" 
import Aux from "../../../hoc/aux"
import {Button} from 'react-bootstrap'

const roomOptions = (props) => {

    return (
    <Aux>    
        <div>
            New Room:
            <Button bsStyle="primary" onClick={props.newRoomClicked}>Get Room Id</Button>
            {/* <Link to='/new_room'>new room</Link> */}
        </div>
        <div>
            <form>
                <input type="text"/>
                <a href="/existing">Enter Room</a>
            </form>
        </div>
    </Aux>    
    );

} 


export default roomOptions