import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts, selectAllProducts, selectProductsState } from '../features/products/productsSlice'
import {
  increaseVisibleCount,
  selectFilters,
  setCategory,
  setSearch,
  setSize,
} from '../features/filters/filtersSlice'
import { ProductGrid } from '../components/ProductGrid.jsx'
import { FiltersBar } from '../components/FiltersBar.jsx'
import styled from 'styled-components'

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`

const Title = styled.h1`
  font-size: 1.4rem;
  letter-spacing: -0.02em;
  margin: 0;
`

const Count = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#9ca3af' : '#6b7280')};
`

const LoadMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.4rem;
`

const LoadMoreButton = styled.button`
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  background: linear-gradient(135deg, #22c55e, #06b6d4);
  color: white;
  box-shadow: 0 16px 30px rgba(16, 185, 129, 0.35);
`

const ErrorBox = styled.div`
  padding: 1rem 1rem;
  border-radius: 0.95rem;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#b91c1c' : '#fecaca')};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#450a0a' : '#fef2f2')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#fecaca' : '#b91c1c')};
  font-size: 0.85rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;
`

const RetryButton = styled.button`
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#f97316' : '#f97316')};
  color: white;
`

export const ProductListPage = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const products = useSelector(selectAllProducts)
  const { status, error } = useSelector(selectProductsState)
  const { search, category, size, visibleCount } = useSelector(selectFilters)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  useEffect(() => {
    const q = searchParams.get('q') || ''
    const cat = searchParams.get('category') || 'all'
    const sz = searchParams.get('size') || 'all'
    if (q) dispatch(setSearch(q))
    if (cat) dispatch(setCategory(cat))
    if (sz) dispatch(setSize(sz))
  }, [dispatch, searchParams])

  useEffect(() => {
    const params = {}
    if (search) params.q = search
    if (category && category !== 'all') params.category = category
    if (size && size !== 'all') params.size = size
    setSearchParams(params, { replace: true })
  }, [search, category, size, setSearchParams])

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products
      .filter((p) => {
        if (term && !p.title.toLowerCase().includes(term)) return false
        if (category !== 'all' && p.category !== category) return false
        if (size !== 'all' && p.size !== size) return false
        return true
      })
      .slice(0, visibleCount)
  }, [products, search, category, size, visibleCount])

  const totalMatching = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter((p) => {
      if (term && !p.title.toLowerCase().includes(term)) return false
      if (category !== 'all' && p.category !== category) return false
      if (size !== 'all' && p.size !== size) return false
      return true
    }).length
  }, [products, search, category, size])

  const handleLoadMore = () => {
    dispatch(increaseVisibleCount(20))
  }

  const handleRetry = () => {
    dispatch(fetchProducts())
  }

  const isLoading = status === 'loading'

  return (
    <div>
      <HeaderRow>
        <Title>Explore products</Title>
        <Count>
          {totalMatching} result{totalMatching === 1 ? '' : 's'}
        </Count>
      </HeaderRow>

      <FiltersBar />

      {error && (
        <ErrorBox role="alert">
          <span>{error}</span>
          <RetryButton type="button" onClick={handleRetry}>
            Retry
          </RetryButton>
        </ErrorBox>
      )}

      <ProductGrid products={filteredProducts} loading={isLoading} error={error && !products.length} />

      {!isLoading && filteredProducts.length < totalMatching && (
        <LoadMoreWrap>
          <LoadMoreButton type="button" onClick={handleLoadMore}>
            Load more
          </LoadMoreButton>
        </LoadMoreWrap>
      )}
    </div>
  )
}

export default ProductListPage

