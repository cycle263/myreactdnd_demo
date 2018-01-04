import React, { Component } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const knightSource = {
    beginDrag(props) {
        return {};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Knight extends Component {
    render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(<div style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move'
        }}>♘</div>);
    }
}

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);