import { createSlice } from '@reduxjs/toolkit'

const PERSIST_KEY = 'productFilters'

const loadInitialState = () => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(PERSIST_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const baseState = {
  search: '',
  category: 'all',
  size: 'all',
  visibleCount: 20,
}

const persisted = loadInitialState()

const initialState = persisted ? { ...baseState, ...persisted } : baseState

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload
    },
    setCategory(state, action) {
      state.category = action.payload
    },
    setSize(state, action) {
      state.size = action.payload
    },
    resetFilters(state) {
      state.search = ''
      state.category = 'all'
      state.size = 'all'
      state.visibleCount = baseState.visibleCount
    },
    increaseVisibleCount(state, action) {
      const amount = action.payload || 20
      state.visibleCount += amount
    },
    setVisibleCount(state, action) {
      state.visibleCount = action.payload
    },
  },
})

export const { setSearch, setCategory, setSize, resetFilters, increaseVisibleCount, setVisibleCount } =
  filtersSlice.actions

export const selectFilters = (state) => state.filters

export const persistFiltersMiddleware = (store) => (next) => (action) => {
  const result = next(action)
  const actionsToPersist = new Set([
    setSearch.type,
    setCategory.type,
    setSize.type,
    resetFilters.type,
    increaseVisibleCount.type,
    setVisibleCount.type,
  ])

  if (typeof window !== 'undefined' && actionsToPersist.has(action.type)) {
    const { filters } = store.getState()
    try {
      window.localStorage.setItem(
        PERSIST_KEY,
        JSON.stringify({
          search: filters.search,
          category: filters.category,
          size: filters.size,
        }),
      )
    } catch {
      // ignore persistence errors
    }
  }

  return result
}

export default filtersSlice.reducer

