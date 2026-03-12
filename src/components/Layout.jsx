import { Link, NavLink, Outlet } from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { useUI } from '../context/UIContext.jsx'

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light dark;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: ${({ theme }) =>
      theme.mode === 'dark' ? 'radial-gradient(circle at top, #101827, #020617)' : '#f3f4f6'};
    color: ${({ theme }) => (theme.mode === 'dark' ? '#e5e7eb' : '#111827')};
  }

  * {
    box-sizing: border-box;
  }
`

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)'};
  border-bottom: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#1e293b' : '#e5e7eb')};
`

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const Brand = styled(Link)`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  text-decoration: none;
  color: inherit;
`

const BrandTitle = styled.span`
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.95rem;
`

const BrandBadge = styled.span`
  font-size: 0.7rem;
  padding: 0.15rem 0.4rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#334155' : '#d1d5db')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#9ca3af' : '#6b7280')};
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const NavItem = styled(NavLink)`
  font-size: 0.85rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  text-decoration: none;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#e5e7eb' : '#111827')};
  border: 1px solid transparent;

  &.active {
    border-color: ${({ theme }) => (theme.mode === 'dark' ? '#4b5563' : '#d1d5db')};
    background: ${({ theme }) =>
      theme.mode === 'dark' ? 'rgba(31, 41, 55, 0.9)' : 'rgba(243, 244, 246, 0.9)'};
  }
`

const ThemeToggle = styled.button`
  border-radius: 999px;
  border: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#4b5563' : '#d1d5db')};
  background: ${({ theme }) =>
    theme.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  color: inherit;
  padding: 0.35rem 0.9rem;
  font-size: 0.75rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 1.25rem 2rem;
  width: 100%;
`

const Footer = styled.footer`
  border-top: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#1f2937' : '#e5e7eb')};
  padding: 0.75rem 1.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => (theme.mode === 'dark' ? '#9ca3af' : '#6b7280')};
`

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`

export const Layout = () => {
  const { theme, toggleTheme } = useUI()
  const themeObject = { mode: theme }

  return (
    <ThemeProvider theme={themeObject}>
      <GlobalStyle />
      <Shell>
        <Header>
          <HeaderInner>
            <Brand to="/">
              <BrandTitle>Product Gallery</BrandTitle>
              <BrandBadge>React + Redux</BrandBadge>
            </Brand>
            <Nav>
              <NavItem to="/" end>
                Home
              </NavItem>
              <ThemeToggle type="button" onClick={toggleTheme}>
                <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
              </ThemeToggle>
            </Nav>
          </HeaderInner>
        </Header>
        <Main>
          <Outlet />
        </Main>
        <Footer>
          <FooterInner>
            <span>Demo catalog using dummyjson.com products.</span>
          </FooterInner>
        </Footer>
      </Shell>
    </ThemeProvider>
  )
}

export default Layout

