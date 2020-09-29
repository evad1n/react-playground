import React from 'react';

export default function Clock() {
    const [date, setDate] = React.useState(new Date());

    React.useEffect(() => {
        const timerID = setInterval(() => {
            setDate(new Date());
        }, 1000)

        return function () {
            clearInterval(timerID);
        }
    })

    return (
        <div className="clock-container">
            <h1>Hello world!</h1>
            <h2>It is {date.toLocaleTimeString()}</h2>
        </div>
    )
}