import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import { get_time, is_time, Row, store, time_diff } from './store'

setInterval(
    action(() => {
        store.current_time = get_time()
    }),
    1000
)
export const App = observer(() => {
    return (
        <>
            <Table size='small' style={{ margin: '20px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>On</TableCell>
                        <TableCell>Up</TableCell>
                        <TableCell>Down</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>Air Time</TableCell>
                        <TableCell>Flight Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {store.rows.map(row => {
                        return (
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        error={!is_time(row.on)}
                                        value={row.on}
                                        onChange={action(e => (row.on = e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        error={!is_time(row.up)}
                                        value={row.up}
                                        onChange={action(e => (row.up = e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        error={!is_time(row.down)}
                                        value={row.down}
                                        onChange={action(e => (row.down = e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        error={!is_time(row.off)}
                                        value={row.off}
                                        onChange={action(e => (row.off = e.target.value))}
                                    />
                                </TableCell>

                                <TableCell>{time_diff(row.up, row.down)}</TableCell>
                                <TableCell>{time_diff(row.on, row.off)}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Button
                variant='outlined'
                style={{ margin: '20px', color: 'gray' }}
                onClick={() => {
                    navigator.clipboard.writeText(store.current_time)
                }}
            >
                Copy Time {store.current_time}
            </Button>
            <Button
                variant='outlined'
                style={{ margin: '20px' }}
                onClick={action(() => {
                    store.rows.push({ on: '', up: '', down: '', off: '' })
                })}
            >
                Add Leg
            </Button>
        </>
    )
})
