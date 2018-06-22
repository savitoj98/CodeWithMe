import React, {Component} from "react"
import {Controlled as CodeMirror} from 'react-codemirror2'
import ModeSelector from "../../components/CodeAreaComponents/ModeSelector"
import CodeOutput from "./CodeOutput"
import CodeInput from "../../components/CodeAreaComponents/CodeInput"
import FileUpload from "../../components/CodeAreaComponents/FileUpload"
import FileDownload from "../../components/CodeAreaComponents/FileDownload"
import ThemeSelector from "../../components/CodeAreaComponents/ThemeSelector";
// import Aux from "../../hoc/aux"
import socketIOClient from "socket.io-client"
import "codemirror/lib/codemirror.css"
//Themes
import "codemirror/theme/ambiance.css"
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/twilight.css'
import 'codemirror/theme/gruvbox-dark.css'
import 'codemirror/theme/elegant.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/ttcn.css'
import 'codemirror/theme/xq-light.css'
import 'codemirror/theme/xq-dark.css'
//Languages
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/clike/clike"
import "codemirror/mode/python/python"
import "codemirror/mode/ruby/ruby"

import classes from "./CodeArea.css"

class CodeArea extends Component{
    //INITIAL STATE
    state = {
        code: "#include <stdio.h>\nint main(void){\n\tprintf(\"Hello World\");\n}",
        mode: 'text/x-csrc',
        language: "C",
        theme: 'ambiance',
        roomId: this.props.roomId,
        editing:false,
        stdin: null,
        // expected_output: null

    }

    socketEndpoint='http://localhost:5000'

    socket = socketIOClient(this.socketEndpoint) //CONNECTS SOCKET 

    beforeCodeUpdateHandler = (editor,data,value) => {  //BEFORE CHANGE HANDLER FOR CODEMIRROR
        this.setState({code: value})
    }

    keyPressHandler = () => {  //SETS EDITING TO TRUE. IMPORTANT! SOLVES THE TYPE GLITCH
        this.setState({
            editing: true
        })
    }

    codeUpdateHandler = (editor,data,newCode) => { //ONCHANGE HANDLER FOR CODEMIRROR. 
        console.log(this.state.editing)
        if(this.state.editing){ //SOLVES TYPE GLITCH
            //console.log("socket emitted")
            //emit socket for code update
            this.socket.emit("code_updated", {code: this.state.code, roomId: this.state.roomId}) 
        }
    }

    modeSelectHandler = (lang,mode,defaultCode) => {  //HANDLER FOR MODE SELECT DROPDOWN
        this.setState({
            mode: mode,
            language: lang,
            code: defaultCode
            //.length > this.state.code.length ? defaultCode : this.state.code
        })
    }

    inputHandler = (input) => {
        console.log('input',input);
        if(input){
            this.setState({
                stdin: input
            });
        }
        else {
            this.setState({
                stdin: null
            });
        }
    }

    themeSelectorHandler = (themeSelected) => {
        this.setState({
            theme: themeSelected
        });
    }

    fileUploadHandler = (event) => {
        let file = event.target.files[0];
        console.log(file);
        
        if (file) {
          let data = new FileReader();
          data.onload = (e)=>{
              this.setState({
                  code: e.target.result,
                  editing:true
              })
          }
          data.readAsText(file)
         // data.append('file', file);
          // axios.post('/files', data)..
          
        }
    }

    fileDownloadHandler = () => {
        
    }

    //LIFECYCLE METHODS AND THEIR HELPER FUNCTIONS ARE DEFINED BELOW

    componentWillMount(){
        this.socket.emit("create_room", this.state.roomId)
        //console.log(this.state.code)
    }

    componentDidMount(){  // HOOK FOR LIFECYCLE. LISTENS FOR INCOMING SOCKETS
            this.socket.on("process code", (response) => {
                this.updateCodeFromSockets(response.data.code)
                //console.log("socket received")  
            })
        
    }
    updateCodeFromSockets = (payload) => {  
        //SETS NEW STATE. CHANGES EDITING TO FALSE. IMPORTANT! 
        //SOLVES TYPE GLITCH
             
            this.setState({
                code: payload,
                editing: false
            })
        
    }

    render(){ //RENDER METHOD
        var options = { //OPTIONS FOR CODEMIRROR
            lineNumbers: true,
            mode: this.state.mode,
            theme: this.state.theme
        }
        // console.log(this.state.code)
        return (
        <div>
        <ModeSelector change = {this.modeSelectHandler}></ModeSelector>
        <ThemeSelector change = {this.themeSelectorHandler}></ThemeSelector>
        <FileUpload uploadFile = {this.fileUploadHandler}/>  
        <FileDownload downloadFile = {this.fileDownloadHandler} />

        <div className={classes.CodeArea}>
            <CodeMirror 
                value = {this.state.code} 
                options = {options} 
                onChange = {this.codeUpdateHandler} 
                onBeforeChange = {this.beforeCodeUpdateHandler} 
                onKeyPress={this.keyPressHandler} 
                onKeyDown={this.keyPressHandler} 
                className = {classes.CodeEditor} />
        </div>
        
        <CodeInput change = {this.inputHandler} ></CodeInput>

        <CodeOutput 
            language={this.state.language} 
            code = {this.state.code} 
            stdin = {this.state.stdin} ></CodeOutput>
        </div>    
   
    );
    }
}

export default CodeArea