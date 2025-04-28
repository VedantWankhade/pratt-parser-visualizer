import Lexer from "./lexer";
import { Token } from "./tokens";

class Parser {
    private lexer: Lexer
    private currToken: Token | null
    private peekToken: Token | null

    constructor(lexer: Lexer) {
        this.lexer = lexer
        this.currToken = null
        this.peekToken = null
    }
}