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
        groups: {
          [uuid()]: {
            name: "Grupo A",
            teams: brazilAGroup
          },
          [uuid()]: {
            name: "Grupo B",
            teams: brazilBGroup
          }
        }
      },
      {
        name: "Champions league (Europa)",
        id: "europe",
        groups: {
          [uuid()]: {
            name: "Grupo 1",
            teams: europeAGroup
          },
          [uuid()]: {
            name: "Grupo 2",
            teams: europeBGroup
          }
        }
      }
    ]
  }

  function handleOnDragEnd(result, idBoard) {
    if (!result.destination) return;
    const { source, destination } = result;
    //pega o index que essa league representa
    const usedLeagueBoardIndex = dashboard.leagues.findIndex(element => element.id === idBoard);
    //pega a liga que foi atualizada
    const leagues = [...dashboard.leagues];


    if (source.droppableId !== destination.droppableId) {
      //pega o sorce e dest grupos
      const sourceColumn = dashboard.leagues[usedLeagueBoardIndex].groups[source.droppableId];
      const destColumn = dashboard.leagues[usedLeagueBoardIndex].groups[destination.droppableId];
      //pega os times desses grupos
      const sourceItems = [...sourceColumn.teams];
      const destItems = [...destColumn.teams];
      //remove do sorce e insere no dest
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      //agora que os grupos foram atualizados devemos atualizar a liga setando os grupos corretos
      //removendo as ligas removendo a antiga e adicionando a atual

      leagues.splice(usedLeagueBoardIndex, 1, {
        name: dashboard.leagues[usedLeagueBoardIndex].name,
        id: dashboard.leagues[usedLeagueBoardIndex].id,
        groups: {
          ...dashboard.leagues[usedLeagueBoardIndex].groups,
          [source.droppableId]: {
            ...sourceColumn,
            teams: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            teams: destItems
          }
        }
      })

      setDashBoard(
        {
          ...dashboard,
          leagues
        }
      )

    } else {
      const column = dashboard.leagues[usedLeagueBoardIndex].groups[source.droppableId];
      const copiedItems = [...column.teams];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      leagues.splice(usedLeagueBoardIndex, 1, {
        name: dashboard.leagues[usedLeagueBoardIndex].name,
        id: dashboard.leagues[usedLeagueBoardIndex].id,
        groups: {
          ...dashboard.leagues[usedLeagueBoardIndex].groups,
          [source.droppableId]: {
            ...column,
            teams: copiedItems
          },
        }
      })

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
                    Object.entries(league.groups).map(([groupID, group], index) => {
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
