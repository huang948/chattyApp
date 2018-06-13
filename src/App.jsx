import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import { ENGINE_METHOD_DIGESTS } from 'constants';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = (event) => {
      var new_message = JSON.parse(event.data);
      this.setState((prev) => {
        return {messages: [...prev.messages, new_message]}
      })
    };
  }

  addMessage(event) {
    event.preventDefault();
    if (event.key === "Enter") {
      var new_message = {
        username: this.state.currentUser.name,
        content: event.target.value
      };
      new_message = JSON.stringify(new_message);
      this.socket.send(new_message);
      event.target.value = "";
      // this.setState((previouState) => {
      //   return {
      //     messages: [...previouState.messages, new_message]
      //   }
      // });
    } else {
      event.target.value += event.key;
    }
  }

  handleUserChange(event) {
    event.preventDefault();
    this.setState({
      currentUser: {name: event.target.value}
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser} onKeyPress={this.addMessage} onChange={this.handleUserChange} />
      </div>
    );
  }
}
export default App;