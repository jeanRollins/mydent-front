import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Container, Typography, Button, Grid } from '@material-ui/core'
import Title from '../components/Title';
import {Link} from 'react-router-dom' ;
import { ValidSession } from '../libs/Session';

const columns = [
    { id: 'name', label: 'Nombre Odontologo', minWidth: 170 },
    { id: 'code', label: 'Fecha Atencion', minWidth: 100 },
    {
        id: 'population',
        label: 'Historial',
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
    createData('Leanne Graham', '12/11/2020', 'se realizo una tapadura'),
    createData('Ervin Howell', '10/10/2020', 'se realizo una tapadura'),
    createData('Samantha', '11/09/2019', 'se realizo una tapadura'),
    createData('Patricia Lebsack', '11/02/2019', 'se realizo una tapadura'),
    createData('Chelsey Dietrich', '11/01/2019', 'se realizo una tapadura'),
    createData('demarco.info', '01/01/2019', 'extraccion'),
    createData('Leopoldo_Corkery', '12/12/2019', 'implante'),
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    marging: {
        marginTop: 20,
        marginBottom: 20
    }
});

export const MedicalRecord = () => {

    ValidSession('back') ;

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Title title="Ficha Medica" />

            <Typography
                variant="h5"
                align="center"
            >Paciente: Luis Tapia</Typography>




            <Container className={classes.marging}>

                <Grid container >

                    <Grid item xs={3}>
                        <Button
                            className={classes.margin}
                            variant="contained"
                            color="primary">Gestionar Documentos</Button>
                    </Grid>

                    <Grid item xs={3}>
                        <Button className={classes.margin}
                            variant="contained" color="secondary">Ver Odontograma</Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Button className={classes.margin}
                            variant="contained" color="warning">Archivos DICOM</Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Button className={classes.margin}
                            variant="contained" color="warning">Editar Ficha</Button>
                    </Grid>

                    <Grid item xs={2}>
                        <Button className={classes.margin}
                            variant="contained" color="secondary">Eliminar Ficha</Button>
                    </Grid>


                </Grid>

                <br />

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
    );
}