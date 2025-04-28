const log = {
    info(...msg: unknown[]): void {
        if (import.meta.env.DEV)    // vite takes cares of setting DEV to true or false
            console.log("[INFO]", msg[0], msg[1])
    },
    warn(...msg: unknown[]): void {
        if (import.meta.env.DEV)
            console.log("[WARN]", ...msg)
    }
}

export { log }