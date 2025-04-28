import { expect, test } from 'vitest'
import Lexer from '../src/parser/lexer'
import { Token, TokenType } from '../src/parser/tokens'

test('Test lexer', () => {
    const tests: {source: string, expectedTokens: Token[]}[] = [
        {
            source: ``,
            expectedTokens: [
                new Token(TokenType.EOF, 'EOF')
            ]
        },
        {
            source: `+`,
            expectedTokens: [
                new Token(TokenType.PLUS, '+'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `+-`,
            expectedTokens: [
                new Token(TokenType.PLUS, '+'),
                new Token(TokenType.MINUS, '-'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `+-%*/`,
            expectedTokens: [
                new Token(TokenType.PLUS, '+'),
                new Token(TokenType.MINUS, '-'),
                new Token(TokenType.MOD, '%'),
                new Token(TokenType.ASTERISK, '*'),
                new Token(TokenType.SLASH, '/'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `+ -% * /\n`,
            expectedTokens: [
                new Token(TokenType.PLUS, '+'),
                new Token(TokenType.MINUS, '-'),
                new Token(TokenType.MOD, '%'),
                new Token(TokenType.ASTERISK, '*'),
                new Token(TokenType.SLASH, '/'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `+ (-%) * /\n`,
            expectedTokens: [
                new Token(TokenType.PLUS, '+'),
                new Token(TokenType.LPAREN, '('),
                new Token(TokenType.MINUS, '-'),
                new Token(TokenType.MOD, '%'),
                new Token(TokenType.RPAREN, ')'),
                new Token(TokenType.ASTERISK, '*'),
                new Token(TokenType.SLASH, '/'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `a`,
            expectedTokens: [
                new Token(TokenType.IDENT, 'a'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `ab`,
            expectedTokens: [
                new Token(TokenType.IDENT, 'ab'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `abc`,
            expectedTokens: [
                new Token(TokenType.IDENT, 'abc'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `ab2c`,
            expectedTokens: [
                new Token(TokenType.IDENT, 'ab2c'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `1`,
            expectedTokens: [
                new Token(TokenType.INT, '1'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `12`,
            expectedTokens: [
                new Token(TokenType.INT, '12'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `5321`,
            expectedTokens: [
                new Token(TokenType.INT, '5321'),
                new Token(TokenType.EOF, "EOF")
            ]
        },
        {
            source: `53ab`,
            expectedTokens: [
                new Token(TokenType.INT, '53'),
                new Token(TokenType.IDENT, 'ab'), // not sure what to do about it
                new Token(TokenType.EOF, "EOF")
            ]
        }
    ]

   for (const test of tests) {
        const l = new Lexer(test.source)
        for (const expToken of test.expectedTokens) {
            expect(l.nextToken()).toStrictEqual(expToken)
        }
   }
})