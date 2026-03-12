import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { selectFilters, setCategory, setSearch, setSize, resetFilters } from '../features/filters/filtersSlice'
import { selectCategories } from '../features/products/productsSlice'

const Bar = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  flex: 1 1 250px;
`

const Right = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
`

const Input = styled.input`
  flex: 1 1 200px;
  min-width: 0;
  padding: 0.55rem 0.75rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#374151' : '#d1d5db')};
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)'};
  color: inherit;
  font-size: 0.85rem;
`

const Select = styled.select`
  padding: 0.55rem 0.75rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#374151' : '#d1d5db')};
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.95)'};
  color: inherit;
  font-size: 0.8rem;
`

const ResetButton = styled.button`
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#4b5563' : '#d1d5db')};
  background: transparent;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#e5e7eb' : '#111827')};
  font-size: 0.8rem;
  cursor: pointer;
`

export const FiltersBar = () => {
  const dispatch = useDispatch()
  const { search, category, size } = useSelector(selectFilters)
  const categories = useSelector(selectCategories)

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value))
  }

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value))
  }

  const handleSizeChange = (e) => {
    dispatch(setSize(e.target.value))
  }

  const handleReset = () => {
    dispatch(resetFilters())
  }

  return (
    <Bar>
      <Left>
        <Input
          type="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search products by title..."
          aria-label="Search products"
        />
      </Left>
      <Right>
        <Select value={category} onChange={handleCategoryChange} aria-label="Filter by category">
          <option value="all">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        <Select value={size} onChange={handleSizeChange} aria-label="Filter by size">
          <option value="all">All sizes</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          <option value="XL">Extra large</option>
        </Select>
        <ResetButton type="button" onClick={handleReset}>
          Clear
        </ResetButton>
      </Right>
    </Bar>
  )
}

export default FiltersBar

