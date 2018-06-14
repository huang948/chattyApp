import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import { ENGINE_METHOD_DIGESTS, SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      size: 0,
    };
    this.addMessage = this.addMessage.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = (event) => {
      var new_data = JSON.parse(event.data);
      switch (new_data.type) {
        case "incomingMessage":
          this.setState((prev) => {
            return {messages: [...prev.messages, new_data]}
          })
          break;
        case "incomingNotification":
          this.setState((prev) => {
            return {messages: [...prev.messages, new_data]}
          })
          break;
        case "number":
          var new_size = Number(new_data.size);
          this.setState({size: new_size});
          break;
        default:
          throw new Error("Unknown event type " + new_data.type);
      }
    };
  }

  addMessage(event) {
    if (event.key === "Enter") {
      var new_message = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: event.target.value
      };
      new_message = JSON.stringify(new_message);
      this.socket.send(new_message);
      event.target.value = "";
    } 
  }

  handleUserChange(event) {
    var prev_user = this.state.currentUser.name;
    var new_user = event.target.value
    if (event.key === "Enter") {
      var new_notification = {
        type: "postNotification",
        content: `${prev_user} has changed their name to ${new_user}.`
      };
      this.setState({currentUser: {name: new_user}});
      new_notification = JSON.stringify(new_notification);
      this.socket.send(new_notification);
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="size">{this.state.size} users online</p>
        </nav>
        <MessageList messages={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser} onKeyPress={this.addMessage} onKeyPressUser={this.handleUserChange} />
      </div>
    );
  }
}
export default App;