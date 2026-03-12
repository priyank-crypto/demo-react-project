import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import filtersReducer, { persistFiltersMiddleware } from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(persistFiltersMiddleware),
})

export default store

