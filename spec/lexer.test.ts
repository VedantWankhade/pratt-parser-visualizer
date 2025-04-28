import { test } from 'vitest'
import Lexer from '../src/parser/lexer'
import { TokenType } from '../src/parser/tokens'

test('run lexer', () => {
    const l = new Lexer(`+ -  */ `)
    let t = l.nextToken()
    while (t.type !== TokenType.EOF) {
        console.log(t)
        t = l.nextToken()
    }
})