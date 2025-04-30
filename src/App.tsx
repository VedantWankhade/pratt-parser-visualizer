import './App.css'
import AST from './components/AST'
import Nav from './components/Nav'
import Parser from './components/Parser'
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header>
        <Nav />
      </header>
      <main>
        <Parser />
        <AST />
      </main>
      <footer>
        Made by <a href="">Vedant Wankhade</a>
      </footer>
      </ThemeProvider>
  ) 
}

export default App
