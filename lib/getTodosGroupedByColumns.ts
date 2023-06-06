/* eslint-disable prettier/prettier */
import { databases } from '../appwrite'
import { Board, Columns, TypedColumns } from '../types'

export const getTodosGroupedByColumns = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
  )

  const todos = data.documents

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: []
      })
    }

    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      title: todo.title,
      $createdAt: todo.$createdAt,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) })
    })

    return acc
  },
    new Map<TypedColumns, Columns>())

  const columnsTypes: TypedColumns[] = ["todo", 'inprogress', "done"]
  for (const columnType of columnsTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: []
      })
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnsTypes.indexOf(a[0]) - columnsTypes.indexOf(b[0])
    )
  )

  const board: Board = {
    columns: sortedColumns
  }

  return board
}
