type TypedColumns = 'todo' | 'inprogress' | 'done'

export interface Image {
  bucketId: string
  fileId: string
}

// eslint-disable-next-line no-undef
export interface Todo {
  $id: string
  $createdAt: string
  title: string
  status: TypedColumns
  image?: Image
}

export interface Columns {
  id: TypedColumns
  todos: Todo[]
}

export interface Board {
  columns: Map<TypedColumns, Columns>
}
