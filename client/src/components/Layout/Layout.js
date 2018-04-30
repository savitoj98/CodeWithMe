import React from "react" 
import Aux from "../../hoc/aux"
import Home from "../../containers/Home/Home"
import Room from "../../containers/Room/Room"
import {Route, Switch} from "react-router-dom"
const layout = (props) => {

    return (
        <Aux>
            <div>Toolbar, sidedrawer, backdrop</div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/rooms/:id" component={Room} />
            </Switch>    
        </Aux>
    );
} 


export default layout