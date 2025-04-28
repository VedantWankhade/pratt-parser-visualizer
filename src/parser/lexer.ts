import { Token, TokenType } from "./tokens"
import { log } from '../utils/utils'

class Lexer {
    private source: string
    private currPosition: number
    private nextPosition: number
    private ch: string | null

    constructor(source: string) {
        this.source = source
        this.currPosition = 0
        this.nextPosition = 0
        this.ch = null
    }

    nextToken(): Token {
        this.readChar()
        this.skipWhitespaces()
        let token: Token
        log.info("Current character:", this.ch)

        switch (this.ch) {
            case '+':
                token = new Token(TokenType.PLUS, "+")
                break
            case '-':
                token = new Token(TokenType.MINUS, "-")
                break
            case '*':
                token = new Token(TokenType.ASTERISK, "*")
                break
            case '/':
                token = new Token(TokenType.SLASH, "/")
                break
            default:
                token = new Token(TokenType.EOF, "EOF")
        }
        return token
    }

    private readChar(): void {
        if (this.nextPosition >= this.source.length) {
            this.ch = null
        } else {
            this.ch = this.source[this.nextPosition]
            this.currPosition = this.nextPosition
            this.nextPosition++
        }
    }

    private skipWhitespaces(): void {
        while (this.ch == ' ' || this.ch == '\t' || this.ch == '\r' || this.ch == '\n') {
            this.readChar()
        }
    }
}


export default Lexer