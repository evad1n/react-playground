import React from 'react';

function Incrementer(props) {
    function increment() {
        props.onValueChange(props.step);
    }

    return (
        <button onClick={increment}>Increment by {props.step}</button>
    )
}

export default function Counter() {
    const [value, setValue] = React.useState(0);

    return (
        <div>
            <h1>Watch me count!</h1>
            <h3>My value is {value}</h3>
            <Incrementer step={-5} onValueChange={(val) => setValue(value + val)} />
            <Incrementer step={5} onValueChange={(val) => setValue(value + val)} />
            {value === 25 && <h3>This will only show if my value is 25!</h3>}
            {value === -25 && <h3>This will only show if my value is -25!</h3>}
        </div>
    )
}