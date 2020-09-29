import React from 'react';
import '../styles/Board.css'



function Square() {
    const [color, setColor] = React.useState("white");

    function colorChange() {
        if(color === "white") setColor("red");
        else setColor("white");
    }

    return (
        <div className={"square " + color} onClick={() => colorChange()}></div>
    );
}

export default function Board() {
    const [rows, setRows] = React.useState(4);
    const [columns, setColumns] = React.useState(4);

    var row = [];
    for (var i = 0; i < rows; i++) {
        row.push(<Square key={i} />);
    }

    var board = [];
    for (i = 0; i < columns; i++) {
        board.push(
            <div className="row" key={i}>
                {row}
            </div>
        );
    }

    return (
        <div className="container">
            <div id="inputs">
                <span>Rows:</span><input id="rowInput" onChange={(e) => setRows(e.target.value)} defaultValue={rows} type="number" />
                <span>Columns:</span><input id="colInput" onChange={(e) => setColumns(e.target.value)} defaultValue={columns} type="number" />
            </div>
            <div id="board">
                {board}
            </div>
        </div>
    );
}