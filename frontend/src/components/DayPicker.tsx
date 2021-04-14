import React from 'react';
import DayButton from './DayButton';

interface Props {
    currentDate: number;
    dates: string[];
    onSelect: (currentDate: number) => void;
}

export default function DayPicker(props: Props) {
    return (
        <div className="row no-gutters">
            {props.dates.map((date, key) => {
                return (
                    <div key={key} className="col pr-1">
                        <DayButton active={key === props.currentDate} date={date} onSelect={() => props.onSelect(key)} className="w-100" />
                    </div>
                )
            })}
        </div>
    );
}
