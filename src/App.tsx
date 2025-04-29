import './App.css'
import AST from './components/AST'
import Nav from './components/Nav'
import Parser from './components/Parser'

function App() {
  return (
    <>
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
    </>
  ) 
}

export default App
