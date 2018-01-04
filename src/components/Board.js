import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import BoardSquare from './BoardSquare';
import Knight from './Knight';
import { SQUARENUM } from './Constants';
import { moveKnight, canMoveKnight } from './Game';

class Board extends Component {
    handleSquareClick(x, y) {
        if (canMoveKnight(x, y)) {
            moveKnight(x, y);
        }
    }

    renderSquare(i) {
        const x = i % SQUARENUM;
        const y = Math.floor(i / SQUARENUM);
        const w = 100 / SQUARENUM;
        const black = (x + y) % 2 === 1;
        const backgroundColor = black ? 'white' : 'black';
        const color = black ? 'black' : 'white';
        const { knightPosition } = this.props;
        const [knightX, knightY] = knightPosition;
        const piece = (x === knightX && y === knightY) ? <Knight /> : null;

        return (
            <div key={i} className="square-item" style={{ width: `${w}%`, height: `${w}%`, backgroundColor, color, }}>
                <BoardSquare x={x} y={y}>
                    {piece}
                </BoardSquare>
            </div>
        );
    }

    render() {
        const squares = [];
        for (let i = 0; i < Math.pow(SQUARENUM, 2); i++) {
            squares.push(this.renderSquare(i));
        }
        return (
            <div className="board-container">
                {squares}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board)
