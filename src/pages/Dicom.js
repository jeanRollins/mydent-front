import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../components/Title';
import { Container, Typography, Button, TextareaAutosize, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(5, "DICOM0", "imagen de radiografia diente 2"),
    createData(4, "DICOM", "imagen de diente numero 5"),
    createData(3, "DICOM2", "informe de tratamiento dental"),
    createData(2, "DICOM2", "imagen"),
    createData(1, "DICOM4", "odontograma de dientes con problema"),
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    table: {
        minWidth: 650,
    },
}));

export const Dicom = () => {

    const classes = useStyles();
    return (


        <>

            <Title title="Gestion de archivos DICOM" />

            <Container>

                <Grid container >

                    <Grid item xs={6}>

                        <Button variant="contained" color="primary">Subir Archivo</Button>
                    </Grid>

                   


                </Grid>

                <br/>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Nombre Archivo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {rows.map((row) => (

                                <TableRow key={row.name}>

                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>

                                    <TableCell align="right"><Link>{row.calories}</Link></TableCell>

                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </>
    )
}
