import React from 'react';
import './CalendarDayButton.css';
import moment from 'moment';

export default class CalendarDayButton extends React.Component {
    render() {
        return (
            <div className={`calendar-day-button ${this.props.selected ? 'selected': ''}`} onClick={this.props.onClick}>
                <p className="day-of-week font-weight-light">{this.dayOfWeek()}</p>
                <p className="day-of-month">{this.dayOfMonth()}</p>
                <p className="month">{this.month()}</p>
                <p className="year">{this.year()}</p>
            </div>
        );
    }

    dayOfWeek() {
       return moment(this.props.date).format('ddd');
    }
    dayOfMonth() {
        return moment(this.props.date).format('D');
    }
    month() {
        return moment(this.props.date).format('MMMM').toUpperCase();
    }
    year() {
        return moment(this.props.date).format('YYYY');
    }

}