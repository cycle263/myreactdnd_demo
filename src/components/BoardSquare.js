import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import { moveKnight, canMoveKnight } from './Game';

const squareTarget = {
    drop(props, monitor) {
        moveKnight(props.x, props.y);
    },
    canDrop(props, monitor) {
        return canMoveKnight(props.x, props.y);
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
}

class BoardSquare extends Component {
    render() {
        const { connectDropTarget, isOver, canDrop, children } = this.props;

        return connectDropTarget(
            <div className="square">
                {children}
                {isOver && !canDrop && <div className="drop-shadow bkyellow"></div>}
                {!isOver && canDrop && <div className="drop-shadow bkgreen"></div>}
                {isOver && canDrop && <div className="drop-shadow bkblue"></div>}
            </div>
        );
    }
}

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare)