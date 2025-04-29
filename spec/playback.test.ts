import { test } from "vitest";
import { Parser } from "../src/parser/parser";
import Lexer from "../src/parser/lexer";

test("Test record and playback", () => {
    const parser = new Parser(new Lexer(`a + 2 * b`))
    parser.parseNext()
    console.log(parser.frames);
})