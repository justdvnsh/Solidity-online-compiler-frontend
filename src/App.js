import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import axios from 'axios';

class App extends Component {
  state = {
    code: "//code"
  }

  updateCode = (newCode) => {
    this.setState({ code: newCode })
  }

  execute = (code) => {
    axios.post('http://localhost:4000/', {
      code
    }).then((res) => {
      this.setState({ code: res })
    }).catch(e => this.setState( { code: e } ))
  }


  render() {
    let options = {
      lineNumbers: true
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React based Solidity Online Compiler</h1>
        </header>
        <br /> <br/>
        <div className='container' style={{"width": '800px', "backgroundColor": "#777"}}>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
        <button onClick={() => this.execute(this.state.code)} style={{ "height": '100px', 'width': '100px' }}>Execute</button>
        </div>
      </div>
    );
  }
}

export default App;
