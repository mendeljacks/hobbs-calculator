import { observable } from 'mobx'

export type Row = {
    on: string
    up: string
    down: string
    off: string
}
const padded = (n: string) => (n.length === 1 ? '0' + n : n)
export const get_time = (Date: { getUTCHours: Function; getUTCMinutes: Function }) =>
    `${padded(String(Date.getUTCHours()))}${padded(String(Date.getUTCMinutes()))}`

export const store = observable({
    current_time: get_time(new Date()),
    rows: [{ down: '', off: '', on: '', up: '' }] as Row[]
})

const m_to_dec = (m: number) => {
    if (0 <= m && m <= 2) return 0
    if (3 <= m && m <= 8) return 0.1
    if (9 <= m && m <= 14) return 0.2
    if (15 <= m && m <= 20) return 0.3
    if (21 <= m && m <= 26) return 0.4
    if (27 <= m && m <= 32) return 0.5
    if (33 <= m && m <= 38) return 0.6
    if (39 <= m && m <= 44) return 0.7
    if (45 <= m && m <= 50) return 0.8
    if (51 <= m && m <= 56) return 0.9
    if (57 <= m && m <= 60) return 1
    return NaN
}

export const is_time = (time: string) => {
    if (time.length !== 4) return false
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    if (!digits.slice(0, 3).includes(time[0])) return false
    if (!digits.includes(time[1])) return false
    if (!digits.includes(time[2])) return false
    if (!digits.includes(time[3])) return false

    const h = Number(time.slice(0, 2))
    if (h < 0 || h > 23) return false
    const m = Number(time.slice(2, 4))
    if (m < 0 || m > 59) return false

    return true
}

export const time_diff = (start: string, end: string): number => {
    if (!(is_time(start) && is_time(end))) return NaN

    const h = Number(end.slice(0, 2)) - Number(start.slice(0, 2))
    const m = Number(end.slice(2, 4)) - Number(start.slice(2, 4))

    const minutes = h * 60 + m
    const hours = Math.floor(minutes / 60)
    const minutes_left = minutes % 60

    return hours + m_to_dec(minutes_left)
}
