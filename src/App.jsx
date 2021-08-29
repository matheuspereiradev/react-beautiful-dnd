import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { v4 as uuid } from 'uuid'

function App() {

  const brazilAGroup = [
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
  ]

  const brazilBGroup = [
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

  const europeAGroup = [
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
    }

  ]

  const europeBGroup = [
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



  const columns = {
    [uuid()]: {
      name: "Grupo A",
      teams: brazilAGroup
    },
    [uuid()]: {
      name: "Grupo B",
      teams: brazilBGroup
    }
  }


  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columnsGroups[source.droppableId];
      const destColumn = columnsGroups[destination.droppableId];
      const sourceItems = [...sourceColumn.teams];
      const destItems = [...destColumn.teams];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumnsGroups({
        ...columnsGroups,
        [source.droppableId]: {
          ...sourceColumn,
          teams: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          teams: destItems
        }
      });
    } else {
      const column = columnsGroups[source.droppableId];
      const copiedItems = [...column.teams];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumnsGroups({
        ...columnsGroups,
        [source.droppableId]: {
          ...column,
          teams: copiedItems
        }
      });
    }
  }

  const [columnsGroups, setColumnsGroups] = useState(columns);
  console.log(columnsGroups)
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {
          Object.entries(columnsGroups).map(([groupID, group], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: 10,
                  border: '1px black solid'
                }}
                key={groupID}
              >
                <Droppable droppableId={groupID} key={groupID}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "#EBECF0",
                        padding: 4,
                        width: 250,
                        minHeight: 500
                      }}
                    >
                      {/* {provided.placeholder} */}
                      <h3>{group.name}</h3>
                      <div className="team">
                        {console.log(group)}
                        {group.teams.map(({ id, name, thumb }, index) => {
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
                                    padding: 8,
                                    margin: "0 0 8px 0",
                                    minHeight: "50px",
                                    backgroundColor: snapshot.isDragging
                                      ? "#cfcbd3"
                                      : "#FFFFFF",
                                    color: "#09335A",
                                    border: "1px #09335A solid",
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
              </div>
            )
          })
        }

      </DragDropContext>
    </div >
  );
}

export default App;
