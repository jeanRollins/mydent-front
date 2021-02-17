import React, { useEffect, useState } from 'react'
import Title from '../components/Title';
import TableResponsive , {GetRowCurrent} from '../components/Table';

import {
    Grid,
    Button,
    InputAdornment,
    Container,
    TextField,
    IconButton
} from '@material-ui/core/';

import SpinnerLoad from '../components/SpinnerLoad';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom'
import { ValidSession } from '../libs/Session';
import { GetItemJson } from '../libs/Storage';
import { getUserAndPacient } from '../services/Users';

import { searhPatient } from '../services/Patient';
import { rutFormater } from '../libs/Commons';
import DescriptionIcon from '@material-ui/icons/Description';

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
    link: {
        textDecoration: 'none',
        color: 'blue'
    }
}));




const Pacient = props => {

    const fetch = async () => {
        const us = await GetItemJson('user');
        const patientsFounded = await getUserAndPacient(us.rut);
        const data = prepareData( patientsFounded.data.patients ) ;  
        
        setUser(us);
        setPatient(data);
    }

    const [user, setUser] = useState(false);
    const [patiens, setPatient] = useState(false);
    const classes = useStyles();

    const columns = [
        { field: 'id', headerName: 'N°', width: 50 } ,
        { field: 'rutFormat', headerName: 'Rut', width: 150 },
        { field: 'nombres', headerName: 'Nombre', width: 250 },
        { field: 'apellido_paterno', headerName: 'Apellido Paterno', width: 200 },
        { field: 'name_prevision', headerName: 'Previsión', width: 200 },
        {
            field: 'rut',
            headerName: 'Ver Ficha',
            width: 200,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = () => {
                    const thisRow = GetRowCurrent(params) ;
                    props.history.push('/back/ficha_medica/' + thisRow.rut)
                }

                return (
                    <>
                        <IconButton onClick={e => onClick()} >
                            <DescriptionIcon fontSize="large" />
                        </IconButton>
                    </>

                );
            }
        }
    ];
 
    const prepareData = patients => {
        let i = 1 ;
        const data = patients.map( row => {
            return {
                id : i++ ,
                rut : row.rut ,
                rutFormat : rutFormater( row.rut ) ,
                nombres : row.nombres ,
                apellido_paterno : row.apellido_paterno ,
                name_prevision : row.name_prevision 
            }
        } )

        return data ;
    }

    const handleSearch = async value => {
        const rutUser = user.rut;
        const field = '';

        const searhObject = {
            rutUser,
            value,
            field
        }
 
        const patientsFounded = await searhPatient(searhObject);
        const data = prepareData( patientsFounded.data ) ;
        setPatient( data ) ;
    }


    useEffect(() => {


        fetch();
        ValidSession('back');
    }, [])
    return (patiens !== false && user !== false) ? (
        <>
            <Title title="Pacientes" />

            <Container fixed>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={7}
                        lg={7}
                        xl={7}
                    >
                        <Link to={'/back/agregar_paciente'} className={classes.link} >
                            Agregar Paciente
                        </Link>

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        xl={3}
                    >

                        <TextField
                            fullWidth
                            onChange={ e => handleSearch( e.target.value ) }
                            placeholder="Ej: 11222333-4"
                            id="standard-full-width"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </Grid>

                </Grid>


            </Container>


            <Container fixed>


                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                    >
                        <TableResponsive
                            rows={patiens}
                            columns={columns}
                            selected={false}
                        />

                    </Grid>



                </Grid>

            </Container>
        </>
    ) : (
        <SpinnerLoad />
    )
}

export default withRouter(Pacient);
