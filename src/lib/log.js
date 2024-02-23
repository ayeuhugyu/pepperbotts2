import chalk from "chalk"
import * as util from "util"

const Level = {
    Debug: "Debug",
    Info: "Info",
    Warn: "Warn",
    Err: "Err"
}

function levelPrefix(level) {
    switch (level) {
        case Level.Debug:
            return chalk.gray("DBG")
        case Level.Info:
            return chalk.white("INF")
        case Level.Warn:
            return chalk.yellow("WRN")
        case Level.Err:
            return chalk.red("ERR")
    }
}

function format(thing) {
    if (typeof thing === "string") {
        return thing
    } else if (thing instanceof Error) {
        return thing.stack || thing.toString()
    } else {
        return util.inspect(thing, { colors: true })
    }
}

function log(level, ...message) {
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

export function debug(...message) {
    log(Level.Debug, ...message)
}

export function info(...message) {
    log(Level.Info, ...message)
}

export function warn(...message) {
    log(Level.Warn, ...message)
}

export function error(...message) {
    log(Level.Err, ...message)
}
