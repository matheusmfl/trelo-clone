import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Todo, TypedColumns } from '../../types'

type Props = {
  id: TypedColumns
  todos: Todo[]
  index: number
}

const idToColumnText: {
  [key in TypedColumns]: string
} = {
  todo: 'Tarefas',
  inprogress: 'Em progresso',
  done: 'Finalizado',
}

export function Column({ id, todos, index }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Droppable droppableId={index.toString()} type="card">
              {(provided, snapshort) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`p-2 rounded-2xl shadow-sm 
                  ${snapshort.isDraggingOver ? 'bg-green-200' : 'bg-white/50'}`}
                >
                  <h2 className="flex justify-between font-bold text-xl p-2">
                    {idToColumnText[id]}

                    <span className="text-gray-500 bg-gray-200 rounded-full  px-2 py-1 text-sm font-normal">
                      {' '}
                      {todos.length}
                    </span>
                  </h2>

                  <div className="space-y-2">
                    {todos.map((todo, index) => {
                      return (
                        <Dragrabble
                          key={todo.$id}
                          draggableId={todo.$id}
                          index={index}
                        ></Dragrabble>
                      )
                    })}
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        )
      }}
    </Draggable>
  )
}
