const log = {
    info(...msg: unknown[]): void {
        console.log("[INFO]", msg[0], msg[1])
    },
    warn(...msg: unknown[]): void {
        console.log("[WARN]", ...msg)
    }
}

export { log }