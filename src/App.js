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

  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem('dragList')) || data;
  });

  const onEnd = ({ destination, source }) => {
    setList(reorderList(list, source.index, destination.index));
    localStorage.setItem('dragList', JSON.stringify(list));
  };

  const reorderList = (arr, sourceIdx, destinationIdx) => {
    const [removed] = arr.splice(sourceIdx, 1);
    arr.splice(destinationIdx, 0, removed);
    return arr;
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
                    <div
                      style={{
                        padding: '20px',
                        margin: '20px',
                        backgroundColor: 'red',
                      }}
                    >
                      {item.name}
                    </div>
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
