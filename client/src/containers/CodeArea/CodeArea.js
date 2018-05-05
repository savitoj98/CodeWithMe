import React, {Component} from "react"
import CodeMirror from 'react-codemirror'
import ModeSelector from "../../components/CodeAreaComponents/ModeSelector"
import Aux from "../../hoc/aux"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/ambiance.css"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/clike/clike"
import "codemirror/mode/python/python"

class CodeArea extends Component{

    state = {
        code: "// Code here",
        mode: 'text/x-csrc',
        theme: 'ambiance'
    }

    codeUpdateHandler = (newCode) => {
        this.setState({
            code: newCode,
        })
    }

    modeSelectHandler = (newMode) => {
        this.setState({
            mode: newMode
        })
    }

    render(){
        var options = {
            lineNumbers: true,
            mode: this.state.mode,
            theme: this.state.theme
        }
        console.log(this.state.mode)
        return (
        <Aux>
            <CodeMirror value = {this.state.code} options = {options} onChange ={this.codeUpdateHandler} />
            <ModeSelector change = {this.modeSelectHandler}></ModeSelector>
        </Aux>    
            
            
    );
    }
}

export default CodeArea