import React, {Component} from "react"
import RoomOptions from "../../components/HomeComponents/RoomOptions/RoomOptions"
import axios from "axios"

class Home extends Component{

    state = {
        roomId: null
    }

    newRoomHandler = () => {
        axios.get("http://localhost:5000/new_room")
        .then(data => {
            window.location.href = `/rooms/${data.data}`
        }).catch(e => console.log(e))
    }

    render(){

     return(
        <div>
            <h1>Welcome to, CodeWithMe</h1>
            <h4>Create a new room or join an existing one</h4>
            <RoomOptions newRoomClicked = {this.newRoomHandler}></RoomOptions>
        </div>
     );   
       
    }
}

export default Home