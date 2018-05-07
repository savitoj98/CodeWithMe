import React, {Component} from "react"
import {Controlled as CodeMirror} from 'react-codemirror2'
import ModeSelector from "../../components/CodeAreaComponents/ModeSelector"
// import Aux from "../../hoc/aux"
import socketIOClient from "socket.io-client"

import "codemirror/lib/codemirror.css"
import "codemirror/theme/ambiance.css"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/clike/clike"
import "codemirror/mode/python/python"

class CodeArea extends Component{

    state = {
        code: "// Code here",
        mode: 'text/x-csrc',
        theme: 'ambiance',
        socketEndpoint: 'http://localhost:5000',
        userId: null,
        editing:false
    }

    socket = socketIOClient('http://localhost:5000')

    beforeCodeUpdateHandler = (editor,data,value) => {
        this.setState({code: value})
    }

    keyPressHandler = () => {
        this.setState({
            editing: true
        })
    }



    codeUpdateHandler = (editor,data,newCode) => {
        // this.setState({
        //     code: newCode,
        // }, () => {
            // console.log(editor)
            // console.log(data)
            if(this.state.editing){
                console.log('socket emitted')
                this.socket.emit("code_updated", {code: this.state.code, userId: this.state.userId})
            }
            
        // })
    }

    modeSelectHandler = (newMode) => {
        this.setState({
            mode: newMode
        })
    }

    // socketHandler = () => {
    //     const socket = socketIOClient(this.state.socketEndpoint)

    //     socket.emit('code updated', {code: this.state.code})
    // }

    componentDidMount(){
        this.socket.on('userId', (response) => {
            this.setState({
                userId: response
            })

            console.log(this.state.userId)
        })

        this.socket.on("process code", (response) => {
            // console.log(response.data)
            // console.log(this.state.userId)
                this.updateCodeFromSockets(response.data.code)
                console.log("socket received")
            
        })
    }
    updateCodeFromSockets = (payload) => {
        this.setState({
            code: payload,
            editing: false
        })
        
    }

    render(){
        var options = {
            lineNumbers: true,
            mode: this.state.mode,
            theme: this.state.theme
        }

        console.log(this.state.editing)

        // const socket = socketIOClient(this.state.socketEndpoint)

        return (
        <div>
            <CodeMirror value = {this.state.code} options = {options} onChange = {this.codeUpdateHandler} onBeforeChange = {this.beforeCodeUpdateHandler} onKeyPress={this.keyPressHandler} onKeyDown={this.keyPressHandler}/>
            <ModeSelector change = {this.modeSelectHandler}></ModeSelector>
        </div>    
   
    );
    }
}

export default CodeArea