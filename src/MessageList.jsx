import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const messages_array = this.props.messages.map((message, id) => {
            return (<Message key={id} message={message} />);
        });
        return (
            <main className="messages">
                {messages_array}
            </main>
        );
    }
}

export default MessageList;