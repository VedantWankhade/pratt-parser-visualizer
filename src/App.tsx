import './App.css'
import AST from './components/AST'
import Nav from './components/Nav'
import Parser from './components/Parser'
import { ThemeProvider } from './components/theme-provider'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import { useState } from 'react'
import Lexer from './parser/lexer'
import { Parser as ParserCore } from './parser/parser'
import Frames from './components/Frames'

function App() {
  const [exp, setExp] = useState('')

  const parser = new ParserCore(new Lexer(exp))
    let parsed 
    let render
    let frames
    let astFrames
    let expr
    try {
        expr = parser.parseNext()
        parsed = expr.toString()
        frames = parser.frames
        astFrames = parser.astFrames
        render = <Frames frames={frames}/>
    } catch(e: any) {
        parsed = e.message || String(e)
    }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex flex-col h-dvh p-6'>
        <header className='sticky top-0'>
          <Nav />
        </header>
        <main>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel><Parser render={render} frames={frames} parsed={parsed} exp={exp} setExp={setExp} /></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel><AST astFrames={astFrames!} /></ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
      </ThemeProvider>
  ) 
}

export default App
