import { Github, Sun } from 'lucide-react'
import './App.css'
import AST from './components/AST'
import Nav from './components/Nav'
import Parser from './components/Parser'
import { ThemeProvider } from './components/theme-provider'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='flex flex-col min-h-screen p-6'>
        <header className='sticky top-0'>
          <Nav />
        </header>
        <main>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel><Parser /></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel><AST /></ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>

      </ThemeProvider>
  ) 
}

export default App
