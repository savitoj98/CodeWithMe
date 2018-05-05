import React, {Component} from "react"
import RoomOptions from "../../components/HomeComponents/RoomOptions/RoomOptions"
import axios from "axios"
import {Redirect} from "react-router-dom"

class Home extends Component{

    state = {
        roomId: null
    }

    newRoomHandler = () => {
        axios.get("http://localhost:5000/new_room")
        .then(data => {
            // window.location.href = `/rooms/${data.data}`
            this.setState({roomId: data.data})
        }).catch(e => console.log(e))
    }

    renderRedirect = () => {
        if(this.state.roomId) {
            return <Redirect push to={"/rooms/"+this.state.roomId}/>   
        }
        return null;
    }

    render(){

     return(
        <div>
            <h1>Welcome to, CodeWithMe</h1>
            <h4>Create a new room or join an existing one</h4>
            <RoomOptions newRoomClicked = {this.newRoomHandler}></RoomOptions>
            {this.renderRedirect()}
        </div>
     );   
       
    }
}

export default Home