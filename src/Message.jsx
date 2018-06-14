import React, {Component} from 'react';



class Message extends React.Component {
    constructor(props) {
        super(props) 
    }
    
    isNotification() {
        if (this.props.message.type === "incomingNotification") {
            return true;
        }
    }

    isImage() {
        if (this.props.message.content.endsWith('.jpg') || this.props.message.content.endsWith('.png') || this.props.message.content.endsWith('.gif')) {
            return true;
        }
    }

    render() {
        if (this.isNotification()) {
            return (
                <div className="message system" style={{color: this.props.message.color}}>
                    {this.props.message.content}
                </div>
            )
        } else if (this.isImage()) {
            return (
                <div className="message">
                    <span className="message-username" style={{color: this.props.message.color}}>{this.props.message.username}</span>
                    <img className="media" src={this.props.message.content} />
                </div>
            )
        } else {
            return (
                <div className="message">
                    <span className="message-username" style={{color: this.props.message.color}}>{this.props.message.username}</span>
                    <span className="message-content">{this.props.message.content}</span>
                </div>
            )
        }
    }
}

export default Message;