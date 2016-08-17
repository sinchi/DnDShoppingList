import React, { Component } from 'react';

import {DropTarget} from 'react-dnd';


const salleSpec= {
  drop(){
    return { name: 'Ecole'  }
  }
}

let collect = (connect, monitor){
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}

class Salle extends Component {

  constructor(){
    super(...arguments);
  }



  render(){
    const { connectDropTarget, isOver, canDrop } = this.props;
    let isActive = canDrop && isOver;
    return connectDropTarget(
      <div>
        {isActive ? "active" : "not active"}
      </div>
    )
  }
}

export default DropTarget("snack", salleSpec, collect)(Salle);
