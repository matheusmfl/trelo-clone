'use client'
import { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { useBoardStore } from '../../store/BoardStore'
import { Column } from './Column'

export function Board() {
  const getBoard = useBoardStore((state) => state.getBoard)

  const board = useBoardStore((state) => state.board)

  useEffect(() => {
    getBoard()
  }, [getBoard])

  function handleOnDragEnd(result: DropResult) { }

  return (
    <DragDropContext onDragEnd={(e) => handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => {
              return (
                <Column key={id} id={id} todos={column.todos} index={index} />
              )
            })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
