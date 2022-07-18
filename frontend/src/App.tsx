import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import { is_time, Row, store, time_diff } from './store'

export const App = observer(() => {
    return (
        <>
            <Table style={{ margin: '20px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>On</TableCell>
                        <TableCell>Takeoff</TableCell>
                        <TableCell>Landing</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>Hobbs Depart</TableCell>
                        <TableCell>Hobbs Arrive</TableCell>
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
                                        error={!is_time(row.takeoff)}
                                        value={row.takeoff}
                                        onChange={action(e => (row.takeoff = e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        error={!is_time(row.landing)}
                                        value={row.landing}
                                        onChange={action(e => (row.landing = e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        error={!is_time(row.off)}
                                        value={row.off}
                                        onChange={action(e => (row.off = e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        error={!is_time(row.off)}
                                        value={row.hobbs_depart}
                                        onChange={action(e => (row.hobbs_depart = e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.hobbs_arrive}
                                        onChange={action(e => (row.hobbs_arrive = e.target.value))}
                                    />
                                </TableCell>

                                <TableCell>{time_diff(row.takeoff, row.landing)}</TableCell>
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
                    const current_time = `${new Date().getUTCHours()}${new Date().getUTCMinutes()}`
                    navigator.clipboard.writeText(current_time)
                }}
            >
                Copy Time
            </Button>
            <Button
                variant='outlined'
                style={{ margin: '20px' }}
                onClick={action(() => {
                    store.rows.push({} as Row)
                })}
            >
                Add Leg
            </Button>
            <Button
                variant='outlined'
                style={{ margin: '20px', color: 'green' }}
                onClick={action(() => {})}
            >
                Save
            </Button>
        </>
    )
})
