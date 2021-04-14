import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren<{
    active: boolean;
    onClick: () => void;
    className?: string;
}> {}

export default function Button(props: Props) {
    return (
        <button className={[
            "btn",
            props.active ? "btn-primary" : "btn-outline-primary text-dark",
            "py-4",
            props.className || '',
        ].join(' ')}
            onClick={props.onClick}>
            {props.children}
        </button>
    );
}
