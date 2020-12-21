import React , {useEffect , useState} from 'react'
import { ValidSession } from '../libs/Session';
import Title from '../components/Title';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom';
import TableResponsive from '../components/Table';
import SpinnerLoad from '../components/SpinnerLoad';
import { GetItemJson } from '../libs/Storage';
import { GetPatient } from '../services/Patient';

import { Container, Typography, Button, Grid, Modal, Backdrop, Fade } from '@material-ui/core' ;
import { rutFormater } from '../libs/Commons';


const rows = [
    { id: 1, name: 'Leanne Graham', date: '12/11/2020', history: 'se realizo una tapadura' },
    { id: 2, name: 'Ervin Howell', date: '10/10/2020', history: 'se realizo una tapadura' },
    { id: 3, name: 'Samantha', date: '11/09/2019', history: 'extraccion' },
    { id: 4, name: 'Patricia Lebsack', date: '11/02/2019', history: 'extraccion' },
    { id: 5, name: 'Chelsey Dietrich', date: '11/01/2019', history: 'extraccion' },
    { id: 6, name: 'Leopoldo_Corkery', date: '01/01/2019', history: 'extraccion' },
    
];

const columns = [
    { field: 'id', headerName: 'ID', width: 100,},
    { field: 'name', headerName: 'Nombre Odontologo', width: 250,},
    { field: 'date', headerName: 'Fecha Atencion', width: 200 },
    { field: 'history', headerName: 'Historial', width: 250 },
];


const useStyles = makeStyles((theme) => ({
    root: {
    },
    input: {
        display: 'none',
    },
    table: {
        minWidth: 650,
    },
    marging: {
        marginTop: 20,
        marginBottom: 20
    },
    paddingCenter : {
        padding : '0px 15px 0px 15px ', 

    },
    documentos:{
        background: '#6400B3',
        '&:hover': {
            background: "#560299",
         },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
        paper: {
        width: '400' ,
        backgroundColor: theme.palette.background.paper,
        //border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));



export const MedicalRecord = () => {

    const { rutPatient } = useParams() ;
    const [ user , setUser ] = useState( false) ;
    const [ patient , setPatient ] = useState( false) ;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const fetch = async ( props ) => {
        const us = await GetItemJson('user') ;
        const patientFounded = await GetPatient( rutPatient ) ;
        console.log( 'patientFounded' , patientFounded.data ) ;
        setPatient( patientFounded.data ) ;
        setUser(us) ;
    } 


    useEffect( () => {
        fetch()
    },[])
    const classes = useStyles();
    return (patient !== false && user !== false ) ? (
        <>

            <Title title="Ficha Medica" />

            <Container fixed>

                <Grid container spacing={1} style={{ marginTop: '50px' }} alignItems="center" >
                    <Grid
                        item
                        xs = { 12 }
                        sm = { 12 }
                        md = { 2 }
                        lg = { 2 }
                        xl = { 2 }
                    >
                        Rut : { rutFormater( patient.rut ) }

                    </Grid>

                    <Grid
                        item
                        xs = { 12 }
                        sm = { 12 }
                        md = { 4 }
                        lg = { 4 }
                        xl = { 4 }
                    >
                        Nombre : {  patient.nombres  + ' ' + patient.apellido_paterno + ' ' + patient.apellido_materno }

                    </Grid>

                    <Grid
                        item
                        xs = { 12 }
                        sm = { 12 }
                        md = { 3 }
                        lg = { 3 }
                        xl = { 3 }
                    >
                        Previsión  : {  patient.name_prevision }

                    </Grid>

                    
                    <Grid
                        item
                        xs = { 12 }
                        sm = { 12 }
                        md = { 3 }
                        lg = { 3 }
                        xl = { 3 }
                    >


                        <Button variant="outlined" onClick={handleOpen} color="primary">
                            Ver Detalles
                        </Button>

                    </Grid>

                </Grid>
                

                <Grid container spacing={1} style={{ marginTop: '50px' }} alignItems="center" >

                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={3}
                        lg={2}
                        xl={3}
                    >
                        <Link  style={{textDecoration: 'none'}} to={`/back/gestion_documentos/${patient.rut}`}>
                            <Button
                                fullWidth
                                className={classes.margin,classes.documentos}
                                variant="contained"
                                color="primary">Documentos</Button>
                        </Link>

                    </Grid>

                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={2}
                        lg={2}
                        xl={2}>

                        <Link style={{textDecoration: 'none'}} to={`/back/odontograma/?rut=123456789`}>
                            <Button fullWidth  className={classes.margin}
                                variant="contained" color="primary">Odontograma</Button>
                        </Link>

                    </Grid>


                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={2}
                        lg={2}
                        xl={2}>
                        <Link style={{textDecoration: 'none'}} to={`/back/gestion_dicom/?rut=123456789`}>
                            <Button fullWidth className={classes.margin} style={{background:'#9F9F9F',color:'white'}}
                                variant="contained" color="default" >Archivos DICOM</Button>
                        </Link>
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={2}
                        lg={2}
                        xl={2}>

                        <Button fullWidth className={classes.margin} style={{background: '#D0A200',color:'white'}}
                            variant="contained" >Editar Ficha</Button>
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={2}
                        lg={2}
                        xl={2}
                        >

                        <Button fullWidth className={classes.margin}
                            variant="contained" style={{background: '#B30000', color:'white'}} >Eliminar Ficha</Button>
                    </Grid>

                </Grid>

            </Container>


            <Container fixed>

                <Grid container spacing={1} alignItems="flex-end">

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        

                        style={{ marginTop: '50px',marginBottom: '50px' }}
                    >
                        <TableResponsive
                            
                            rows={rows}
                            columns={columns}
                            selected={false}
                            
                        />

                    </Grid>
                </Grid>

            </Container>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title" align="center"> {  patient.nombres  + ' ' + patient.apellido_paterno + ' ' + patient.apellido_materno }  </h2>
                    <p id="">Rut : { rutFormater( patient.rut )} </p>
                    <p id="">Email : {  patient.correo} </p>
                    <p id="">Estatura : { patient.estatura } </p>
                    <p id="">Fecha Nacimiento : { patient.estatura } </p>
                    <p id="">Grupo Sanguineo : { patient.grupo_sanguineo } </p>
                    <p id="">Medicamentos : { patient.grupo_sanguineo } </p>
                    <p id="">Previsión : { patient.name_prevision } </p>
                    <p id="">Observaciones :  </p>
                    <p id=""> { patient.observaciones } </p>

                </div>
                </Fade>
            </Modal>

        </>
    ) : (
        <SpinnerLoad/>
    )
}
