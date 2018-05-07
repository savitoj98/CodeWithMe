import  React ,{Component} from "react"
import CodeArea from "../CodeArea/CodeArea"
class Room extends Component{

    state = {
        roomId: this.props.match.params.id
    }


    render(){
        return(
         <div>   
            <h1>This is your unique room</h1>
            <CodeArea roomId= {this.state.roomId}></CodeArea>
         </div>   
        );
    }
}

export default Room