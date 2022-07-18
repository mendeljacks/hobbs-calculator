import { observable } from 'mobx'

export type Row = {
    on: string
    takeoff: string
    landing: string
    off: string
    hobbs_arrive: string
    hobbs_depart: string
}

export const store = observable({
    rows: [{}] as Row[]
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
    return 0
}

export const is_time = (time: string) => /^\d{4}$/.test(time)

export const time_diff = (start: string, end: string): number => {
    if (!(is_time(start) && is_time(end))) return 0

    const h = parseInt(end.substring(0, 2)) - parseInt(start.substring(0, 2))
    const m = parseInt(end.substring(3, 5)) - parseInt(start.substring(3, 5))

    return h + m_to_dec(m)
}
