import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }

  handleChange(event) {
    event.preventDefault();
    if (event.key === "Enter") {
      const new_message = {
        username: this.state.currentUser.name,
        content: event.target.value
      };
      this.setState((previouState) => {
        return {
          messages: [...previouState.messages, new_message]
        }
      });
      event.target.value = "";
    } else {
      event.target.value += event.key;
    }
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
          <ChatBar currentUser={this.state.currentUser} onKeyPress={this.handleChange}/>
      </div>
    );
  }
}
export default App;