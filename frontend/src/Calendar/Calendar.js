import React from 'react';
import data from '../calendar.json';
import CalendarDayButton from './CalendarDayButton/CalendarDayButton';
import CalendarSlotButton from './CalendarSlotButton/CalendarSlotButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendar} from '@fortawesome/free-regular-svg-icons/faCalendar'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import './Calendar.css';

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dates: Object.keys(data),
            startDisplayDateIndex: 0,
            endDisplayDateIndex: 7,
            currentDate: null,
            currentSlots: [],
            currentSlot: null,
        };
    }

    render() {
        return (
            <div className="calendar">
                <div className="calendar-toolbar">
                    <span>CALENDAR <FontAwesomeIcon icon={faCalendar}/></span>
                    <span className="clear-selection" onClick={() => this.setState({
                        currentDate: null,
                        currentSlots: [],
                        currentSlot: null,
                    })}>Clear my selection(s)</span>
                </div>
                <div className="calendar-day-buttons">
                    <div className="previous-next-button">
                        <FontAwesomeIcon icon={faArrowLeft}
                                         onClick={() => this.setState({
                                             startDisplayDateIndex: this.state.startDisplayDateIndex > 0 ? this.state.startDisplayDateIndex - 1 : this.state.startDisplayDateIndex,
                                             endDisplayDateIndex: this.state.startDisplayDateIndex > 0 ? this.state.endDisplayDateIndex - 1 : this.state.endDisplayDateIndex
                                         })}/>
                    </div>
                    {this.createDayButtons()}
                    <div className="previous-next-button">
                        <FontAwesomeIcon icon={faArrowRight}
                                         onClick={() => this.setState({
                                             startDisplayDateIndex: this.state.endDisplayDateIndex < this.state.dates.length ? this.state.startDisplayDateIndex + 1 : this.state.startDisplayDateIndex,
                                             endDisplayDateIndex: this.state.endDisplayDateIndex < this.state.dates.length ? this.state.endDisplayDateIndex + 1 : this.state.dates.length
                                         })}/>
                    </div>
                </div>
                <div className="calendar-toolbar">
                    <span>AVAILABLE TIME SLOTS</span>
                </div>
                <div className="calendar-slot-buttons">
                    {this.createSlotButtons()}
                </div>
            </div>
        );
    }

    createDayButtons() {
        const buttons = [];
        for (const date of this.state.dates.slice(this.state.startDisplayDateIndex, this.state.endDisplayDateIndex)) {
            buttons.push(<CalendarDayButton key={date} date={date} selected={this.state.currentDate === date}
                                            onClick={() => {
                                                this.setState({
                                                    currentDate: date,
                                                    currentSlots: data[date],
                                                    currentSlot: null
                                                })
                                            }}></CalendarDayButton>)
        }
        return buttons;
    }

    createSlotButtons() {
        const buttons = [];
        for (const slot of this.state.currentSlots) {
            buttons.push(<CalendarSlotButton key={slot.slotId} time={slot.slotStartTime}
                                             selected={this.state.currentSlot?.slotId === slot.slotId} onClick={() => {
                this.setState({currentSlot: slot})
            }}></CalendarSlotButton>)
        }
        return buttons;
    }
}