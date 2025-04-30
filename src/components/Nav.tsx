import { Github, Sun } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

function Nav() {
   return  <nav className="flex justify-between mb-4">
        <div>
            <a href="">Pratt Parser</a>
        </div>
        <div>
        <ul className="flex justify-center gap-4">
        <li><ModeToggle /></li>
        <li>

        <Button variant="outline" size="icon">
            <a target="_blank" href="https://github.com/vedantwankhade/pratt-parser-visualizer">
          <Github />
          </a>
        </Button>

        </li>
        </ul>
        </div>
        </nav>
}

export default Nav