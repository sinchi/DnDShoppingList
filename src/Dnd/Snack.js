import React, { PropTypes, Component } from 'react';

import { DragSource } from 'react-dnd';

import constants from './constants.js';

// snack Drag'nDrop spec
//
//  -Required: beginDrag
//  -Optional: endDrag
//  -Optional: canDrag
//  -Optional: isDragging
const snackSpec = {
  beginDrag(props){
    return {
      name: props.name
    };
  },

  endDrag(props, monitor){
    const dragItem = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if(dropResult){
      console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
    }
  }
};

// Snack DragSource collect collecting function.
// - connect: An instance of DragSourceConnector.
//            You use it to assign the drag source role to a DOM node.

// - monitor: an instance of DragSourceMonitor
//            You use it to connect state from the React DnD to your component's propperties.
//            Availlable functions to get state include canDrag(), isDragging(), getItemType()
//            getItem(), didDrop() etc.
let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Snack extends Component {

  render(){
    const { name, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const style = {
      opacity: opacity
    };

    return (
      connectDragSource(
        <div className='snack' style={ style }>
          {name}
        </div>
      )
    );
  }
}
Snack.propTypes = {
  name: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource(constants.SNACK, snackSpec, collect)(Snack);
