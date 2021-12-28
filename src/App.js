import './App.css';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const data = [
    { name: 'one', id: '1' },
    { name: 'two', id: '2' },
    { name: 'three', id: '3' },
    { name: 'four', id: '4' },
    { name: 'five', id: '5' },
  ];

  const [list, setList] = useState(data);

  const onEnd = (result) => {
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onEnd}>
      <Droppable droppableId="testDragAndDrop">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            {list.map((item, index) => (
              <Draggable draggableId={item.id} key={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>{item.name}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
