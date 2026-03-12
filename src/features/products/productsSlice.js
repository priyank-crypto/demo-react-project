import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit'

const PRODUCTS_API = 'https://dummyjson.com/products?limit=100'
const PRODUCT_BY_ID_API = (id) => `https://dummyjson.com/products/${id}`

const sizes = ['S', 'M', 'L', 'XL']

const addDerivedFields = (product) => {
  const size = sizes[product.id % sizes.length]
  return {
    ...product,
    size,
    shortDescription:
      product.description.length > 120
        ? `${product.description.slice(0, 117)}...`
        : product.description,
  }
}

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(PRODUCTS_API)
      if (!res.ok) {
        throw new Error(`Failed to load products (${res.status})`)
      }
      const data = await res.json()
      return data.products.map(addDerivedFields)
    } catch (error) {
      return rejectWithValue(error.message || 'Unknown error while loading products')
    }
  },
)

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { getState, rejectWithValue }) => {
    const existing = getState().products.items.find((p) => String(p.id) === String(id))
    if (existing) return existing

    try {
      const res = await fetch(PRODUCT_BY_ID_API(id))
      if (!res.ok) {
        throw new Error(`Failed to load product (${res.status})`)
      }
      const data = await res.json()
      return addDerivedFields(data)
    } catch (error) {
      return rejectWithValue(error.message || 'Unknown error while loading product')
    }
  },
)

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to load products'
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = state.status === 'idle' ? 'loading' : state.status
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const product = action.payload
        const idx = state.items.findIndex((p) => p.id === product.id)
        if (idx === -1) {
          state.items.push(product)
        } else {
          state.items[idx] = product
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.payload || 'Failed to load product'
      })
  },
})

export const selectProductsState = (state) => state.products
export const selectAllProducts = (state) => state.products.items

export const selectCategories = createSelector(selectAllProducts, (products) => {
  const set = new Set(products.map((p) => p.category).filter(Boolean))
  return Array.from(set).sort()
})

export default productsSlice.reducer

