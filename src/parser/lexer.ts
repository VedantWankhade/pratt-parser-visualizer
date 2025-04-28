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
        log.info("LEXER: Current character:", this.ch)

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
            case '%':
                token = new Token(TokenType.MOD, "%")
                break
            case '(':
                token = new Token(TokenType.LPAREN, "(")
                break
            case ')':
                token = new Token(TokenType.RPAREN, ")")
                break
            default:
                if (this.ch === null)
                    token = new Token(TokenType.EOF, "EOF")
                else if (isLetter(this.ch))
                    token = this.readIdent()
                else token = this.readInt()
                
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

    private peekChar(): string | null {
        if (this.nextPosition >= this.source.length) {
            return null
        } else {
            return this.source[this.nextPosition]
        }
    }

    private skipWhitespaces(): void {
        while (this.ch == ' ' || this.ch == '\t' || this.ch == '\r' || this.ch == '\n') {
            this.readChar()
        }
    }

    private readIdent(): Token {
        const l = this.currPosition
        while (this.nextPosition < this.source.length && (isLetter(this.peekChar()) || isNum(this.peekChar()))) {
            this.readChar()
        }
        const ident = this.source.slice(l, this.nextPosition)
        log.info("LEXER: Identfier read", ident)
        return new Token(TokenType.IDENT, ident)
    }

    private readInt(): Token {
        const l = this.currPosition
        while (this.nextPosition < this.source.length && isNum(this.peekChar())) {
            this.readChar()
        }
        const num = this.source.slice(l, this.nextPosition)
        log.info("LEXER: Number read", num)
        return new Token(TokenType.INT, num)
    }
}

const isLetter = (ch: string | null) => ch !== null ? (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch == '_') ? true : false : false
const isNum = (ch: string | null) => ch !== null ? (ch >= '0' && ch <= '9') ? true : false : false

export default Lexer