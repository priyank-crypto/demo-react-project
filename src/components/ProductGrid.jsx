import styled from 'styled-components'
import { ProductCard } from './ProductCard.jsx'
import { SkeletonCard } from './SkeletonCard.jsx'

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1.25rem;
`

const EmptyState = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#9ca3af' : '#6b7280')};
  font-size: 0.9rem;
`

export const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <Grid aria-label="Loading products">
        {Array.from({ length: 12 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </Grid>
    )
  }

  if (error) {
    return <EmptyState>Something went wrong while loading products.</EmptyState>
  }

  if (!products.length) {
    return <EmptyState>No products match your search and filters.</EmptyState>
  }

  return (
    <Grid aria-label="Product list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </Grid>
  )
}

export default ProductGrid

