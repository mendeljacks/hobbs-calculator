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
            <Table size='small' style={{ margin: '0px' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>On</TableCell>
                        <TableCell>Up</TableCell>
                        <TableCell>Dwn</TableCell>
                        <TableCell>Off</TableCell>
                        <TableCell>Air</TableCell>
                        <TableCell>Flt</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {store.rows.map((row, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell style={{ padding: '4px' }}>
                                    <TextField
                                        size='small'
                                        inputProps={{
                                            style: {
                                                padding: 5
                                            }
                                        }}
                                        type='tel'
                                        error={!is_time(row.on)}
                                        value={row.on}
                                        onChange={action(e => (row.on = e.target.value))}
                                    />
                                </TableCell>
                                <TableCell style={{ padding: '4px' }}>
                                    <TextField
                                        size='small'
                                        type='tel'
                                        inputProps={{
                                            style: {
                                                padding: 5
                                            }
                                        }}
                                        error={!is_time(row.up)}
                                        value={row.up}
                                        onChange={action(e => (row.up = e.target.value))}
                                    />
                                </TableCell>
                                <TableCell style={{ padding: '4px' }}>
                                    <TextField
                                        size='small'
                                        type='tel'
                                        inputProps={{
                                            style: {
                                                padding: 5
                                            }
                                        }}
                                        error={!is_time(row.down)}
                                        value={row.down}
                                        onChange={action(e => (row.down = e.target.value))}
                                    />
                                </TableCell>
                                <TableCell style={{ padding: '4px' }}>
                                    <TextField
                                        size='small'
                                        type='tel'
                                        inputProps={{
                                            style: {
                                                padding: 5
                                            }
                                        }}
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
                    variant='outlined'
                    style={{ margin: '20px', color: 'gray' }}
                    onClick={() => {
                        navigator.clipboard.writeText(store.current_time)
                    }}
                >
                    Copy UTC:
                    <span style={{ color: 'black', marginLeft: '5px' }}>{store.current_time}</span>
                </Button>
            </Center>
        </>
    )
})

const Center = ({ children, style }: any) => {
    return (
        //@ts-ignore
        <center style={style}>{children}</center>
    )
}
