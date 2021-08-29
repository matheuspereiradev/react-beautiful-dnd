import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { v4 as uuid } from 'uuid'

function App() {

  const brasileirao = [
    {
      id: uuid(),
      name: 'america mg',
      thumb: '/america.png'
    },
    {
      id: uuid(),
      name: 'ceará',
      thumb: '/ceara.png'
    },
    {
      id: uuid(),
      name: 'flamengo',
      thumb: '/flamengo.png'
    },
    {
      id: uuid(),
      name: 'fortaleza',
      thumb: '/fortaleza.png'
    },
    {
      id: uuid(),
      name: 'palmeiras',
      thumb: '/palmeiras.png'
    },
    {
      id: uuid(),
      name: 'santos',
      thumb: '/santos.png'
    },

  ]



  const europe = [
    {
      id: uuid(),
      name: 'arsenal',
      thumb: '/arsenal.png'
    },
    {
      id: uuid(),
      name: 'barcelona',
      thumb: '/barcelona.png'
    },
    {
      id: uuid(),
      name: 'chelsea',
      thumb: '/chelsea.png'
    },
    {
      id: uuid(),
      name: 'juventus',
      thumb: '/juve.png'
    },
    {
      id: uuid(),
      name: 'milan',
      thumb: '/milan.png'
    },
    {
      id: uuid(),
      name: 'psg',
      thumb: '/psg.png'
    },
    {
      id: uuid(),
      name: 'real madrid',
      thumb: '/realmadrid.png'
    }

  ]



  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(brazilianTeam);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBrazilianTeam(items);
  }

  const [brazilianTeam, setBrazilianTeam] = useState(brasileirao);

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters" key="characters">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver
                  ? "lightblue"
                  : "lightgrey",
                padding: 4,
                width: 250,
                minHeight: 500
              }}
            >
              <h3>Brasileirão</h3>
              <div className="characters">
                {brazilianTeam.map(({ id, name, thumb }, index) => {
                  return (
                    <Draggable
                      key={id}
                      draggableId={id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: "none",
                            padding: 16,
                            margin: "0 0 8px 0",
                            minHeight: "50px",
                            backgroundColor: snapshot.isDragging
                              ? "#263B4A"
                              : "#456C86",
                            color: "white",
                            ...provided.draggableProps.style
                          }}
                        >
                          <img src={thumb} alt={name} style={{ width: 20 }} />
                          {name}
                        </div>
                      )
                      }
                    </Draggable>
                  );
                })}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div >
  );
}

export default App;
