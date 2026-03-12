import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 0.9rem;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)'};
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#1f2937' : '#e5e7eb')};
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25);
    border-color: ${({ theme }) => (theme.mode === 'dark' ? '#4b5563' : '#cbd5f5')};
  }
`

const ImageWrap = styled.div`
  border-radius: 0.8rem;
  overflow: hidden;
  background: radial-gradient(circle at top, #1f2937, #020617);
  aspect-ratio: 4 / 3;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
`

const Category = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#9ca3af' : '#6b7280')};
  margin-bottom: 0.2rem;
`

const Title = styled.h2`
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 0.35rem;
`

const Description = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#9ca3af' : '#4b5563')};
  margin: 0 0 0.65rem;
  flex: 1;
`

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
`

const Price = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
`

const Size = styled.span`
  font-size: 0.75rem;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  border: 1px dashed ${({ theme }) => (theme.mode === 'dark' ? '#4b5563' : '#d1d5db')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#e5e7eb' : '#111827')};
`

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
`

export const ProductCard = ({ product }) => {
  const img = product.thumbnail || product.images?.[0]

  return (
    <Card>
      <ImageWrap>
        {img ? <Image src={img} alt={product.title} loading="lazy" /> : null}
      </ImageWrap>
      <Category>{product.category}</Category>
      <Title>{product.title}</Title>
      <Description>{product.shortDescription}</Description>
      <MetaRow>
        <Price>${product.price}</Price>
        <Size>{product.size}</Size>
      </MetaRow>
      <CardLink to={`/product/${product.id}`}>View details</CardLink>
    </Card>
  )
}

export default ProductCard

