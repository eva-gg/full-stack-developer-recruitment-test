import React from 'react';
import { getMomentFromDate } from '../utils';
import Button from './Button';

interface Props {
    active: boolean;
    date: string;
    onSelect: (date: string) => void;
    className?: string;
}

export default function DayButton(props: Props) {
    const date = getMomentFromDate(props.date);

    return (
        <Button className={props.className || ''}
            active={props.active}
            onClick={() => props.onSelect(props.date)}>
            <div className="lead">{date.format('ddd')}</div>
            <div className="display-4">{date.format('DD')}</div>
            <div className="h4">{date.format('MMMM')}</div>
            <div>{date.format('yyyy')}</div>
        </Button>
    );
}
