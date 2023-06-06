import { create } from 'zustand'
import { Board, Columns, TypedColumns } from '../types'
import { getTodosGroupedByColumns } from '../lib/getTodosGroupedByColumns'

interface BoardState {
  board: Board
  getBoard: () => void
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumns, Columns>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumns()
    set({ board })
  },
}))
