import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 0.9rem;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)'};
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#1f2937' : '#e5e7eb')};
  overflow: hidden;
`

const SkeletonBlock = styled.div`
  position: relative;
  border-radius: 0.6rem;
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(30, 41, 59, 0.9)' : 'rgba(243, 244, 246, 0.9)'};
  overflow: hidden;
  margin-bottom: ${({ mb }) => mb || '0.5rem'};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      transparent 0%,
      rgba(255, 255, 255, 0.25) 50%,
      transparent 100%
    );
    transform: translateX(-100%);
    animation: ${shimmer} 1.2s infinite;
  }
`

export const SkeletonCard = () => {
  return (
    <Card>
      <SkeletonBlock style={{ aspectRatio: '4 / 3' }} mb="0.8rem" />
      <SkeletonBlock style={{ height: 8, width: '40%' }} />
      <SkeletonBlock style={{ height: 12, width: '85%' }} />
      <SkeletonBlock style={{ height: 12, width: '65%' }} />
      <SkeletonBlock style={{ height: 10, width: '50%' }} />
      <SkeletonBlock style={{ height: 30, width: '80%', marginTop: '0.3rem' }} />
    </Card>
  )
}

export default SkeletonCard

