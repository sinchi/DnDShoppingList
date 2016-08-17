import React, { Component } from 'react';

import { DragSource } from 'react-dnd';

const eleveSpec = {
  beginDrag(props){
    return { name: props.name }
  },

  endDrag(props, monitor){
    const dragItem = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if(dropResult){
      console.log(`${dragItem.name} is draged in ${dropResult.name}`);
    }
  }

}

let collect = (props, monitor) => {
  return {
    connectDragSource: monitor.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Eleve extends Component {

  render(){
    const { name, connectDragSource, isDragging } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const style = {
      opacity: opacity
    }
    return (connectDragSource(
      <div className="snack" style={ style }>
        { name }
      </div>
    ))
  }
}

export default DragSource("snack", eleveSpec, collect)(Eleve);
