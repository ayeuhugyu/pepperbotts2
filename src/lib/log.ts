import chalk from "chalk"
import * as util from "util"

enum Level {
    Debug,
    Info,
    Warn,
    Error
}

function levelPrefix(level: Level): string {
    switch (level) {
        case Level.Debug:
            return chalk.gray("DBG")
        case Level.Info:
            return chalk.white("INF")
        case Level.Warn:
            return chalk.yellow("WRN")
        case Level.Error:
            return chalk.red("ERR")
    }
}

function format(thing: unknown): string {
    if (typeof thing === "string") {
        return thing
    } else if (thing instanceof Error) {
        return thing.stack || thing.toString()
    } else {
        return util.inspect(thing, { colors: true })
    }
}

function log(level: Level, ...message: unknown[]) {
    const formatted = message
        .map((m) => format(m))
        .reduce(
            (l, r) =>
                l.includes("\n") || r.includes("\n")
                    ? l + "\n" + " r"
                    : l + " " + r,
            ""
        )
        .trim()
    const prefix = levelPrefix(level) + " "
    process.stdout.write(
        `${prefix}${formatted.split("\n").join("\n" + prefix)}\n`
    )
}

export function debug(...message: unknown[]) {
    log(Level.Debug, ...message)
}

export function info(...message: unknown[]) {
    log(Level.Info, ...message)
}

export function warn(...message: unknown[]) {
    log(Level.Warn, ...message)
}

export function error(...message: unknown[]) {
    log(Level.Error, ...message)
}
