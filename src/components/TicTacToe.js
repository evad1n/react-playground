import React from 'react';
import styles from '../styles/TicTacToe.module.css';

function Square(props) {
    var highlight = props.winner ? styles.winner : "";

    return (
        <button
            className={styles.square + " " + highlight} onClick={() => { props.onClick(props.position) }}>
            {props.value}
        </button>
    );
}

function Board(props) {

    var board = [];
    for (var i = 0; i < props.rows * props.columns; i += props.columns) {
        var row = [];
        for (var j = 0; j < props.columns; j++) {
            var winner;
            if (props.winners) winner = props.winners.includes(i + j);

            row.push(<Square
                winner={winner}
                key={i + j}
                position={i + j}
                value={props.squares[i + j]}
                onClick={props.onClick}
            />)
        }

        board.push(
            <div className={styles.boardRow} key={i}>
                {row}
            </div>
        );
    }

    return (
        <div>
            {board}
        </div>
    );
}

export default function TicTacToe() {
    const [rows, setRows] = React.useState(3);
    const [columns, setColumns] = React.useState(3);
    const [xIsNext, setXIsNext] = React.useState(true);
    const [history, setHistory] = React.useState(
        [
            {
                squares: Array(9).fill(null),
                move: null
            }
        ],
    );
    const [stepNumber, setStepNumber] = React.useState(0);
    const [reverse, setReverse] = React.useState(false);

    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

    function handleClick(i) {
        const hist = history.slice(0, stepNumber + 1);
        const current = hist[hist.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';

        setHistory(hist.concat([{ squares: squares, move: i }]));
        setStepNumber(hist.length);
        setXIsNext(!xIsNext);
    }


    function getPosition(pos) {
        if (pos === null) return "";

        var col = pos % columns;
        var row = (pos - col) / columns;
        var msg = "col: " + col + " row: " + row;

        return " at " + msg;
    }

    const hist = history;
    const current = hist[stepNumber];
    const winners = calculateWinner(current.squares);
    const winner = winners ? current.squares[winners[0]] : winners;

    let moves;
    if (reverse) {
        moves = hist.slice(0).reverse().map((step, move) => {
            const desc = move !== (hist.length - 1) ? "Go to move " + move : "Go to start";
            const pos = getPosition(step.move);
            const selected = move === 0 ? styles.current : "";

            return (
                <li key={move}>
                    <button className={selected} onClick={() => jumpTo(move)}>{desc + pos}</button>
                </li>
            );
        });
    }
    else {
        moves = hist.map((step, move) => {
            const desc = move ? "Go to move " + move : "Go to start";
            const pos = getPosition(step.move);
            const selected = stepNumber === move ? styles.current : "";

            return (
                <li key={move}>
                    <button className={selected} onClick={() => jumpTo(move)}>{desc + pos}</button>
                </li>
            );
        });
    }

    let status;
    if (winner) status = 'Winner: ' + winner;
    else if (stepNumber >= (rows * columns)) status = "It's a draw idiots!";
    else status = 'Next player: ' + (xIsNext ? 'X' : 'O');

    return (
        <div className={styles.game}>
            <div className={styles.gameBoard}>
                <Board
                    rows={rows}
                    columns={columns}
                    squares={history[stepNumber].squares}
                    winners={winners}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className={styles.gameInfo}>
                <div>{status}</div>
                <ol>{moves}</ol>
                <button className={styles.toggle} onClick={() => { setReverse(!reverse) }}>Toggle order</button>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c];
        }
    }
    return null;
}