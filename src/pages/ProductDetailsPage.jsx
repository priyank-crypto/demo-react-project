import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { fetchProductById, selectAllProducts, selectProductsState } from '../features/products/productsSlice'
import { SkeletonCard } from '../components/SkeletonCard.jsx'

const Layout = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 2rem;

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const ImageWrap = styled.div`
  border-radius: 1.25rem;
  overflow: hidden;
  background: radial-gradient(circle at top, #1f2937, #020617);
  min-height: 260px;
  max-height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const Category = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#9ca3af' : '#6b7280')};
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.6rem;
  letter-spacing: -0.02em;
`

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`

const Secondary = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#9ca3af' : '#6b7280')};
`

const Description = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-top: 0.5rem;
`

const BackLink = styled(Link)`
  font-size: 0.8rem;
  text-decoration: none;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#a5b4fc' : '#4f46e5')};
  margin-bottom: 1rem;
`

const ErrorBox = styled.div`
  padding: 1rem 1.2rem;
  border-radius: 0.9rem;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#b91c1c' : '#fecaca')};
  background: ${({ theme }) => (theme.mode === 'dark' ? '#450a0a' : '#fef2f2')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#fecaca' : '#b91c1c')};
  font-size: 0.9rem;
`

export const ProductDetailsPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const { status, error } = useSelector(selectProductsState)

  const product = products.find((p) => String(p.id) === String(id))

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id, product])

  const isLoading = status === 'loading' && !product

  if (isLoading) {
    return (
      <div>
        <BackLink to="/">&larr; Back to products</BackLink>
        <Layout>
          <SkeletonCard />
          <SkeletonCard />
        </Layout>
      </div>
    )
  }

  if (!product && error) {
    return (
      <div>
        <BackLink to="/">&larr; Back to products</BackLink>
        <ErrorBox>Unable to load this product. Please go back and try again.</ErrorBox>
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <BackLink to="/">&larr; Back to products</BackLink>
        <Secondary>Product not found.</Secondary>
      </div>
    )
  }

  const img = product.images?.[0] || product.thumbnail

  return (
    <div>
      <BackLink to="/">&larr; Back to products</BackLink>
      <Layout>
        <ImageWrap>
          {img ? <Image src={img} alt={product.title} /> : null}
        </ImageWrap>
        <Content>
          <Category>{product.category}</Category>
          <Title>{product.title}</Title>
          <PriceRow>
            <Price>${product.price}</Price>
            <Secondary>Approx. size {product.size}</Secondary>
          </PriceRow>
          <Description>{product.description}</Description>
        </Content>
      </Layout>
    </div>
  )
}

export default ProductDetailsPage

