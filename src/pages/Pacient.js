import React from 'react'
import Title from '../components/Title';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {
    Grid,
    Button,
    Input,
    InputAdornment,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    Container,
    TablePagination,
    Paper,

} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const columns = [
    { id: 'name', label: 'RUT', minWidth: 170 },
    { id: 'code', label: 'Nombre Paciente', minWidth: 100 },
    {
        id: 'population',
        label: 'Fecha Atencion',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    }
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('12345678-2', 'Leanne Graham', '06/12/2020'),
    createData('12345678-1', 'Ervin Howell', '10/10/2020'),
    createData('12345378-k', 'Samantha', '11/09/2019'),
    createData('12345678-8', 'Patricia Lebsack', '11/02/2019'),
    createData('12345178-8', 'Chelsey Dietrich', '11/01/2019'),
    createData('12345778-5', 'demarco.info', '01/01/2019'),
    createData('12345578-3', 'Leopoldo_Corkery', '12/12/2019'),
];



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    margin: {
        margin: theme.spacing(1),
    },

}));

export const Pacient = () => {


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const classes = useStyles();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Title title="Pacientes" />


            <Container>


                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing={0}
                >
                    <Input

                        placeholder="Ej: Luis Tapia"
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </Grid>

                <Grid
                    className={classes.margin}
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing={0}
                >

                    <Button

                        variant="contained"
                        color="primary"
                    >
                        Buscar
                </Button>

                </Grid>

            </Container>


            <Container>


                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (

                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>

                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (

                                                    <TableCell key={column.id} align={column.align}>
                                                        <Link>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </Link>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </>
    )
}
