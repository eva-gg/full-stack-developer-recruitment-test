import React from 'react';
import './CalendarSlotButton.css';

export default class CalendarSlotButton extends React.Component {
    render() {
        return (
            <div className={`calendar-slot-button ${this.props.selected ? 'selected': ''}`} onClick={this.props.onClick}>
                <p className="time">{this.props.time}</p>
            </div>
        );
    }

}