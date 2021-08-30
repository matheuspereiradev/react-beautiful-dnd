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
    {
      id: uuid(),
      name: 'botafogo',
      thumb: '/botafogo.png'
    },
    {
      id: uuid(),
      name: 'coritiba',
      thumb: '/coritiba.png'
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
    },
    {
      id: uuid(),
      name: 'Olimpique Lyon',
      thumb: '/lion.png'
    }

  ]

  const board = {
    name: "Ligas de futebol",
    leagues: [
      {
        name: "Brasileirão serie A",
        id: "brasileirao",
        groups:
          [
            brazilAGroup,
            brazilBGroup
          ]

      },
      {
        name: "Champions league (Europa)",
        id: "europe",
        groups: [
          europeAGroup,
          europeBGroup
        ]
      }
    ]
  }

  function handleOnDragEnd(result, idBoard) {
    if (!result.destination) return;
    const { source, destination } = result;
    //pega o index que essa league representa
    const usedLeagueBoardIndex = dashboard.leagues.findIndex(element => element.id === idBoard);
    //pega a liga que foi atualizada e da um deep clone
    const leagues = JSON.parse(JSON.stringify(dashboard.leagues));

    if (source.droppableId !== destination.droppableId) {
      //pega o sorce e dest grupos
      const sourceColumn = leagues[usedLeagueBoardIndex].groups[source.droppableId];
      const destColumn = leagues[usedLeagueBoardIndex].groups[destination.droppableId];

      //remove do sorce e insere no dest
      const [removed] = sourceColumn.splice(source.index, 1);
      destColumn.splice(destination.index, 0, removed);

      //atualiza as ligas colocando a nova conifguração
      setDashBoard(
        {
          ...dashboard,
          leagues
        }
      )

    } else {
      const column = leagues[usedLeagueBoardIndex].groups[source.droppableId];
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);

      setDashBoard(
        {
          ...dashboard,
          leagues
        }
      )

    }
  }

  const [dashboard, setDashBoard] = useState(board);

  return (
    <div style={{ justifyContent: "center", height: "100%" }}>
      {
        dashboard.leagues.map((league, index) => {
          return (
            <div key={index}>
              <DragDropContext onDragEnd={result => handleOnDragEnd(result, league.id)} id={league.id}>
                <h2>{league.name}</h2>

                <div style={{ justifyContent: "center", display: "flex", height: "100%" }}>
                  {
                    league.groups.map((group, index) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: 10,
                            border: '1px black solid'
                          }}
                          key={index}
                        >
                          <Droppable droppableId={String(index)} key={String(index)}>
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
                                <h3>{`Grupo ${index + 1}`}</h3>
                                <div className="team">
                                  {group.map(({ id, name, thumb }, index) => {
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
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      )
                    })
                  }
                </div>
              </DragDropContext>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
