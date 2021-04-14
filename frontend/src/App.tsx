import React from 'react';
import { SlotModel } from './models';
import calendar from './calendar.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import DayPicker from './components/DayPicker';
import { keys, take, drop, xor } from 'lodash'
import Title from './components/Title';
import Button from './components/Button';

interface Props {
}

interface State {
    startDate: number;
    currentDate: number;
    calendar: {
        [key: string]: SlotModel[]
    }
    selectedSlots: number[],
    showAllTimeSlots: boolean,
}

export class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            startDate: 0,
            currentDate: 0,
            calendar: {},
            selectedSlots: [],
            showAllTimeSlots: false,
        }
    }

    componentDidMount() {
        this.setState({
            calendar,
        });
    }

    get dates() {
        let dates = keys(this.state.calendar);
        dates = drop(dates, this.state.startDate)
        return take(dates, 7);
    }

    get allSlots() {
        const currentDate = this.dates[this.state.currentDate];
        let slots = this.state.calendar[currentDate] || [];

        return slots;
    }

    get slots() {
        let slots = this.allSlots;

        if (!this.state.showAllTimeSlots) {
            slots = slots.slice(0, 12);
        }

        return slots;
    }

    isSlotSelected(index: number) {
        return this.state.selectedSlots.indexOf(index) !== -1;
    }

    selectSlot(index: number) {
        if (this.isSlotSelected(index)) {
            this.setState({
                selectedSlots: xor(this.state.selectedSlots, [index]),
            })
        } else {
            this.setState({
                selectedSlots: [...this.state.selectedSlots, index],
            })
        }
    }

    render() {
        return (
            <div className="App p-3">
                <div className="row mb-3">
                    <div className="offset-1 col-5 d-flex align-items-center">
                        <Title>Calendar</Title>
                        <FontAwesomeIcon icon={faCalendarAlt} size="2x" className="ml-3" />
                    </div>
                    <div className="col-5 text-right">
                        <button className="btn btn-link text-dark" onClick={()=> this.setState({selectedSlots: []})}>Clear my selection(s)</button>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-1 d-flex justify-content-center align-items-center">
                        <button className="btn btn-link" disabled={this.state.startDate === 0}
                            onClick={() => this.setState({ startDate: 0 })}><FontAwesomeIcon icon={faArrowLeft} size="2x" /></button>
                    </div>
                    <div className="col-10">
                        <DayPicker currentDate={this.state.currentDate} dates={this.dates} onSelect={(currentDate) => this.setState({
                            currentDate,
                            selectedSlots: [],
                            showAllTimeSlots: false,
                        })} />
                    </div>
                    <div className="col-1 d-flex justify-content-center align-items-center">
                        <button className="btn btn-link" disabled={this.state.startDate === 1}
                            onClick={() => this.setState({ startDate: 1 })}><FontAwesomeIcon icon={faArrowRight} size="2x" /></button>
                    </div>
                </div>
                <div>
                </div>
                <div className="row mb-3">
                    <div className="col-10 offset-1">
                        <Title>Available Time Slots</Title>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-10 offset-1">
                        <div className="row row-cols-6 no-gutters">
                            {this.slots.map((slot, key) => <div key={key} className="col p-1">
                                <Button active={this.isSlotSelected(key)} className="w-100 py-5" onClick={() => this.selectSlot(key)}>
                                    <div className="h3 m-0">{slot.startTime}</div>
                                </Button>
                            </div>)}
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-10 offset-1 text-right">
                        {(!this.state.showAllTimeSlots && this.allSlots.length > 12) ? <button className="btn btn-link text-dark" onClick={() => this.setState({ showAllTimeSlots: true })}>Show all time slots</button> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
