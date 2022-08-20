import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { margin } from '@mui/system'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Ref, useRef } from 'react'
import { get_time, is_time, Row, store, time_diff } from './store'

setInterval(
    action(() => {
        store.current_time = get_time(new Date())
    }),
    1000
)
export const App = observer(() => {
    return (
        <>
            <Table size='small' style={{ margin: '0px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>On</TableCell>
                        <TableCell>Up</TableCell>
                        <TableCell>Dwn</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>Air</TableCell>
                        <TableCell>Flt</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {store.rows.map((row, i) => (
                        <Leg key={i} row={row} i={i} />
                    ))}
                </TableBody>
            </Table>
            <Center>
                <Button
                    variant='outlined'
                    style={{ margin: '20px' }}
                    onClick={action(() => {
                        store.rows.push({ on: '', up: '', down: '', off: '' })
                    })}
                >
                    Add Leg
                </Button>
                <Button
                    style={{ margin: '20px', color: 'gray' }}
                    onClick={() => {
                        navigator.clipboard.writeText(store.current_time)
                    }}
                >
                    UTC Now:
                    <span style={{ color: 'black', marginLeft: '5px' }}>{store.current_time}</span>
                </Button>
            </Center>
        </>
    )
})

const Leg = observer(({ row, i }: { row: Row; i: number }) => {
    const air = time_diff(row.up, row.down)
    const flt = time_diff(row.on, row.off)
    const ref1: Ref<any> = useRef()
    const ref2: Ref<any> = useRef()
    const ref3: Ref<any> = useRef()
    const ref4: Ref<any> = useRef()

    return (
        <TableRow>
            <TableCell style={{ padding: '4px' }}>
                <TextField
                    inputRef={ref1}
                    type='tel'
                    size='small'
                    inputProps={{
                        style: {
                            padding: 5,
                            width: '40px'
                        }
                    }}
                    error={row.on.length > 0 && !is_time(row.on)}
                    value={row.on}
                    onChange={action(e => {
                        row.on = e.target.value
                        if (e.target.value.length === 4) {
                            ref2.current.focus()
                        }
                    })}
                />
            </TableCell>
            <TableCell style={{ padding: '4px' }}>
                <TextField
                    inputRef={ref2}
                    type='tel'
                    size='small'
                    inputProps={{
                        style: {
                            padding: 5,
                            width: '40px'
                        }
                    }}
                    error={row.up.length > 0 && !is_time(row.up)}
                    value={row.up}
                    onChange={action(e => {
                        row.up = e.target.value
                        if (e.target.value.length === 4) {
                            ref3.current.focus()
                        }
                    })}
                />
            </TableCell>
            <TableCell style={{ padding: '4px' }}>
                <TextField
                    inputRef={ref3}
                    type='tel'
                    size='small'
                    inputProps={{
                        style: {
                            padding: 5,
                            width: '40px'
                        }
                    }}
                    error={row.down.length > 0 && !is_time(row.down)}
                    value={row.down}
                    onChange={action(e => {
                        row.down = e.target.value
                        if (e.target.value.length === 4) {
                            ref4.current.focus()
                        }
                    })}
                />
            </TableCell>
            <TableCell style={{ padding: '4px' }}>
                <TextField
                    inputRef={ref4}
                    type='tel'
                    size='small'
                    inputProps={{
                        style: {
                            padding: 5,
                            width: '40px'
                        }
                    }}
                    error={row.off.length > 0 && !is_time(row.off)}
                    value={row.off}
                    onChange={action(e => {
                        row.off = e.target.value
                        if (e.target.value.length === 4) {
                            ref4.current.blur()
                        }
                    })}
                />
            </TableCell>

            <TableCell>{isNaN(air) ? '-' : air}</TableCell>
            <TableCell>{isNaN(flt) ? '-' : flt}</TableCell>
            <TableCell style={{ margin: '0px', padding: '0px' }}>
                <span
                    style={{
                        color: 'red',
                        width: '5px',
                        padding: '0px'
                    }}
                    onClick={action(() => {
                        store.rows.splice(i, 1)
                    })}
                >
                    X
                </span>
            </TableCell>
        </TableRow>
    )
})

const Center = ({ children, style }: any) => {
    return (
        //@ts-ignore
        <center style={style}>{children}</center>
    )
}
