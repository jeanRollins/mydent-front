import React,
{
    useEffect,
    useState
} from 'react'
import { ValidSession } from '../libs/Session';
import Title from '../components/Title';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams, withRouter } from 'react-router-dom';
import TableResponsive from '../components/Table';
import SpinnerLoad from '../components/SpinnerLoad';
import { GetItemJson } from '../libs/Storage';
import {
    AddHistory,
    getHistoryPatient,
    GetPatient,
    uploadStatePatient
} from '../services/Patient';

import {
    Container,
    Button,
    Grid,
    Dialog,
    DialogContentText,
    DialogActions,
    DialogTitle,
    TextField,
    DialogContent,
    Snackbar,
    Typography
} from '@material-ui/core';
import {
    rutFormater,
    DateFormat
} from '../libs/Commons';
import { IconButton } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MuiAlert from '@material-ui/lab/Alert';
import DescriptionIcon from '@material-ui/icons/Description';



const columns = [
    { field: 'id', headerName: 'N°', width: 50, },
    { field: 'rut_paciente', headerName: 'Rut Paciente', width: 150 },
    { field: 'diente', headerName: 'Diente Tratado', width: 150 },
    { field: 'fecha_ingreso', headerName: 'Fecha', width: 250 },
    { field: 'historial', headerName: 'Historial', width: 400 },
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
    paddingCenter: {
        padding: '0px 15px 0px 15px ',

    },
    documentos: {
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
        width: '400',
        backgroundColor: theme.palette.background.paper,
        //border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    colorButton: {
        color: "#239B88",
    }
}));



const MedicalRecord = (props) => {

    const { rutPatient } = useParams();
    const [user, setUser] = useState(false);
    const [patient, setPatient] = useState(false);
    const [open, setOpen] = useState(false);
    const [openHistory, setOpenHistory] = useState(false)

    const [textMessageFail, setTextMessageFail] = useState('');

    const [openSnack, setOpenSnack] = useState(false);

    const closeOpenSnackError = () => setOpenSnackError(false);
    const openToastrSnackError = () => setOpenSnackError(true);
    const [openSnackError, setOpenSnackError] = useState(false);

    const [openDelete, setOpenDelete] = useState(false)

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const [historyPatient, setHistoryPatient] = useState({
        rutUser: "",
        rutPatient: "",
        tooth: "",
        history: ""
    })

    const [historyData, setHistoryData] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClickOpenHistory = () => {
        setOpenHistory(true);
    }

    const handleClickCloseHistory = () => {
        setOpenHistory(false);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleClickSubmit = async () => {

        if (historyPatient.tooth === '' || !historyPatient.tooth) {
            setTextMessageFail('Debe colocar la pieza tratada');
            openToastrSnackError();
            return false
        }

        if (historyPatient.history === '' || !historyPatient.history) {
            setTextMessageFail('Debe colocar un historial');
            openToastrSnackError();
            return false
        }


        const historyPatientUpload = {

            rutUser: user.rut,
            rutPatient: patient.rut,
            tooth: historyPatient.tooth,
            history: historyPatient.history

        }



        const response = await AddHistory(historyPatientUpload);

        if (response.action) {
            openSnackbar()
            handleClickCloseHistory()
            fetch()
        }
    }

    const handleOnChangeHistory = e => setHistoryPatient({ ...historyPatient, [e.target.name]: e.target.value })

    const openSnackbar = () => {
        setOpenSnack(true);
    };

    const closeSnackbar = () => {
        setOpenSnack(false);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }


    const fetch = async () => {

        const us = await GetItemJson('user');
        const patientFounded = await GetPatient(rutPatient);
      
        setPatient(patientFounded.data);
        setUser(us);

        const ruts = {
            rutUser: us.rut,
            rutPatient: patientFounded.data.rut
        }

        const historyPatientData = await getHistoryPatient(ruts)
        setHistoryPatient(historyPatientData.data)
        const historyFilter = await prepareTableHistory(historyPatientData.data) ;

        setHistoryData(historyFilter) ;
    }


    const prepareTableHistory = historyPatientData => {

        console.log('historyPatientData' , historyPatientData) ;
  
        const historyTable = historyPatientData.map( (row, index) =>  {
            return {
                id: index + 1,
                rut_paciente: rutFormater(row.rut_paciente),
                diente: row.diente,
                historial: row.historial,
               fecha_ingreso: DateFormat(row.fecha)
            }
        });

        return historyTable;


    }

    const deleteMedicalRecordPatient = async e => {

        const response = await uploadStatePatient( user.rut, patient.rut );

        console.log(response);

        if( !response.action ){
            setTextMessageFail('Hubo un problema al eliminar al paciente, intente más tarde.');
            openToastrSnackError();
            return false ;
        }
        
        props.history.push( '/back/pacientes' ) ;   
        
    }



    useEffect(() => {
        fetch() ;
        ValidSession('back') ;
    }, [])
    const classes = useStyles();
    return (patient !== false && historyData !== false) ? (
        <>

            <Title title="Ficha Medica" />

            <Container fixed>

                <Grid container spacing={1} style={{ marginTop: '50px' }} alignItems="center" >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        xl={2}
                    >
                        Rut : {rutFormater(patient.rut)}

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        Nombre : {patient.nombres + ' ' + patient.apellido_paterno + ' ' + patient.apellido_materno}

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        xl={2}
                    >
                        Previsión  : {patient.name_prevision}

                    </Grid>


                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={1}
                        lg={1}
                        xl={1}
                    >


                        <IconButton onClick={handleClickOpenHistory} >
                            <PostAddIcon fontSize="large" />
                        </IconButton>


                    </Grid>


                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={1}
                        lg={1}
                        xl={1}
                    >

                        <IconButton onClick={handleOpen}>
                            <DescriptionIcon fontSize="large" />
                        </IconButton>


                    </Grid>

                </Grid>


                <Grid container spacing={1} style={{ marginTop: '50px' }} alignItems="center" >

                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={2}
                        lg={2}
                        xl={2}
                    >
                        <Link style={{ textDecoration: 'none' }} to={`/back/gestion_documentos/${patient.rut}`}>
                            <Button
                                fullWidth
                                className={classes.margin, classes.documentos}
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

                        <Link style={{ textDecoration: 'none' }} to={ `/back/presupuestos/` + rutPatient }>
                            <Button fullWidth className={classes.margin}
                                variant="contained" color="primary">Presupuestos</Button>
                        </Link>

                    </Grid>


                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={2}
                        lg={2}
                        xl={2}>
                        <Link style={{ textDecoration: 'none' }} to={`/back/gestion_dicom/?rut=123456789`}>
                            <Button fullWidth className={classes.margin} style={{ background: '#9F9F9F', color: 'white' }}
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

                        <Link style={{ textDecoration: 'none' }} to={`/back/editar_ficha/${patient.rut}`} >

                            <Button fullWidth className={classes.margin} style={{ background: '#D0A200', color: 'white' }}
                                variant="contained" >Editar Ficha</Button>
                        </Link>
                    </Grid>

                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={2}
                        lg={2}
                        xl={2}
                    >

                        <Button fullWidth onClick={handleClickOpenDelete} className={classes.margin}
                            variant="contained" style={{ background: '#B30000', color: 'white' }} >Eliminar Ficha</Button>
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


                        style={{ marginTop: '50px', marginBottom: '50px' }}
                    >
                        <TableResponsive

                            rows={historyData}
                            columns={columns}
                            selected={false}

                        />

                    </Grid>
                </Grid>

            </Container>


            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {patient.nombres + ' ' + patient.apellido_paterno + ' ' + patient.apellido_materno}
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Rut : {rutFormater(patient.rut)}
                    </Typography>
                    <Typography>
                        Email : {patient.correo}
                    </Typography>
                    <Typography>
                        Estatura : {patient.estatura}
                    </Typography>
                    <Typography>
                        Fecha Nacimiento :  {DateFormat(patient.fecha_nacimiento)}
                    </Typography>
                    <Typography>
                        Grupo Sanguineo : {patient.grupo_sanguineo}
                    </Typography>
                    <Typography>
                        Medicamentos : {patient.medicamentos}
                    </Typography>
                    <Typography>
                        Previsión : {patient.name_prevision}
                    </Typography>
                    <Typography>
                        Observaciones : {patient.observaciones}
                    </Typography>
                </DialogContent>
            </Dialog>






            <Dialog disableEscapeKeyDown disableBackdropClick open={openHistory} onClose={handleClickCloseHistory} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Historial Ficha medica</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Debe escribir un historial de atencion colocando lo realizado en la revision dental.
          </DialogContentText>
                    <TextField
                        defaultValue={rutFormater(user.rut)}
                        autoFocus
                        margin="dense"
                        id="rutUser"
                        label="Rut Odontologo"
                        type="text"
                        fullWidth
                        name="rutUser"
                        disabled
                        onChange={handleOnChangeHistory}
                    />
                    <TextField
                        defaultValue={rutFormater(patient.rut)}
                        autoFocus
                        margin="dense"
                        id="rutPatient"
                        label="Rut Paciente"
                        type="text"
                        fullWidth
                        disabled
                        name="rutPatient"
                        onChange={handleOnChangeHistory}


                    />

                    <TextField

                        autoFocus
                        margin="dense"
                        id="numberDent"
                        label="N° Diente"
                        type="number"
                        fullWidth
                        InputProps={{ inputProps: { min: 1, max: 32 } }}
                        name="tooth"
                        onChange={handleOnChangeHistory}

                    />

                    <TextField
                        margin="dense"
                        id="history"
                        label="Historial"
                        type="text"
                        multiline
                        rows={4}
                        fullWidth
                        name="history"
                        onChange={handleOnChangeHistory}

                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseHistory} color="secondary">
                        Cancelar
          </Button>
                    <Button onClick={handleClickSubmit} color="primary">
                        Agregar
          </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={e => closeSnackbar()}>
                <Alert onClose={closeSnackbar} severity="success">
                    Se agrego paciente con éxito!
                </Alert>
            </Snackbar>

            <Snackbar open={openSnackError} autoHideDuration={6000} onClose={e => closeOpenSnackError()}>
                <Alert onClose={closeOpenSnackError} severity="error">
                    <span className="monserrat400">  {textMessageFail} </span>
                </Alert>
            </Snackbar>


            <Dialog
                disableEscapeKeyDown
                disableBackdropClick
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle
                    id="alert-dialog-title">{"Eliminacion de ficha medica"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Esta seguro que desea Eliminar esta ficha medica?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={deleteMedicalRecordPatient} color="primary" autoFocus>
                        Eliminar Ficha
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    ) : (
        <SpinnerLoad />
    )
}

export default withRouter( MedicalRecord ) ;   