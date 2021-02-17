import React, { useState, useEffect, useRef } from 'react'
import Title from '../components/Title';
import { redirect, ValidSession } from '../libs/Session';
import {
    Grid,
    TextField,
    Container,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Snackbar
} from '@material-ui/core/';

import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { AddPatient, EditPatient, GetForecastsData, GetPatient, ValidatePatientExistByUser } from '../services/Patient';
import { GetItemJson } from '../libs/Storage';
import SpinnerLoad from '../components/SpinnerLoad';

import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import Draggable from 'react-draggable';
import MuiAlert from '@material-ui/lab/Alert';
import { rutFormater, ValidateEmail, ValidateRut } from '../libs/Commons';
import { withRouter, useParams } from 'react-router-dom';



const styles = {
    inputWidth: {
        width: '90%',
        margin: '15px 0px'
    },
    icons: {
        padding: '3px 7px 3px 6px',
        position: 'absolute'
    }
}
const EditRecords = ({ history }) => {

    const [patient, setPatient] = useState({
        rutUser: "",
        rut: "",
        name: "",
        lasnameMother: "",
        lasnameFather: "",
        prevision: "",
        email: "",
        born: new Date(),
        groupBlood: "",
        medicaments: "",
        height: "",
        observations: ""
    });

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const [user, setUser] = useState(false);
    const [forecats, setForecats] = useState(false);
    const handleOnChange = event => setPatient({ ...patient, [event.target.name]: (event.target.name === "file" ? event.target.files : event.target.value) });

    const [historyPatient, setHistoryPatient] = useState({
        rutUser: "",
        rutPatient: "",
        tooth: "",
        history: ""
    })

    const [openSnackError, setOpenSnackError] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [textMessageFail, setTextMessageFail] = useState('');

    const [patientData, setPatientData] = useState('')

    const { rutPatient } = useParams();

    const closeOpenSnackError = () => setOpenSnackError(false);
    const openToastrSnackError = () => setOpenSnackError(true);

    const [textButton, setTextButton] = useState('EDITAR');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [UpdatePatient, setUpdatePatient] = useState({
        rutUser: "",
        rut: "",
        name: "",
        lasnameMother: "",
        lasnameFather: "",
        prevision: "",
        email: "",
        born: new Date(),
        groupBlood: "",
        medicaments: "",
        height: "",
        observations: ""

    })

    const originalStateButton = () => {
        setButtonDisabled(false);
        setTextButton('EDITAR FICHA')
    }

    const activeStateButton = () => {
        setButtonDisabled(true);
        setTextButton('ACTUALIZANDO FICHA...')
    }

    const openSnackbar = () => {
        setOpenSnack(true);
    };

    const closeSnackbar = () => {
        setOpenSnack(false);
    };

    const fetch = async () => {
        const patientData = await GetPatient(rutPatient);
        setUpdatePatient(patientData.data);
        setPatientData(patientData.data);
        const us = await GetItemJson('user');
        const forecastsData = await GetForecastsData();
        setPatient({ ...patient, rutUser: us.rut });
        setUser(us);
        setForecats(forecastsData);
    }


    const validateForm = async () => {

        if (UpdatePatient.rut == '' || !UpdatePatient.rut) {
            setTextMessageFail('Rut requerido');
            openToastrSnackError();
            return false;
        }

        if (UpdatePatient.nombres == '' || !UpdatePatient.nombres) {
            setTextMessageFail('Nombre requerido');
            openToastrSnackError();
            return false;
        }

        if (UpdatePatient.apellido_materno == '' || !UpdatePatient.apellido_materno) {
            setTextMessageFail('Apellido materno requerido');
            openToastrSnackError();
            return false;
        }

        if (UpdatePatient.apellido_paterno == '' || !UpdatePatient.apellido_paterno) {
            setTextMessageFail('Apellido paterno requerido');
            openToastrSnackError();
            return false;
        }

        if (UpdatePatient.correo == '' || !UpdatePatient.correo) {
            setTextMessageFail('Email  requerido');
            openToastrSnackError();
            return false;
        }

        if (UpdatePatient.prevision == '' || !UpdatePatient.prevision) {
            setTextMessageFail('Previsión  requerido');
            openToastrSnackError();
            return false;
        }

        const isMailValidate = await ValidateEmail(UpdatePatient.correo);

        if (!isMailValidate) {
            setTextMessageFail('Debe agregar un email valido');
            openToastrSnackError();
            return false;
        }

        const isRutExist = await ValidatePatientExistByUser('rut_paciente', UpdatePatient.rut);


        if (!isRutExist) {
            setTextMessageFail('El rut ya está ingresado en nuestro sistema');
            openToastrSnackError();
            return false;
        }

        const isEmailExist = await ValidatePatientExistByUser('email', UpdatePatient.correo);

        if (!isEmailExist) {
            setTextMessageFail('El correo ya está ingresado en nuestro sistema');
            openToastrSnackError();
            return false;
        }



        return true;
    };

    const addPatient = async () => {
        activeStateButton();


        const isValid = await validateForm();



        if (!isValid) {
            originalStateButton();
            return false
        }

        const patient = {
            rutUser: user.rut,
            rut: rutFormater(UpdatePatient.rut),
            name: UpdatePatient.nombres,
            lasnameMother: UpdatePatient.apellido_materno,
            lasnameFather: UpdatePatient.apellido_paterno,
            prevision: UpdatePatient.prevision,
            email: UpdatePatient.correo,
            born: UpdatePatient.fecha_nacimiento,
            groupBlood: UpdatePatient.grupo_sanguineo,
            medicaments: UpdatePatient.medicamentos,
            height: UpdatePatient.estatura,
            observations: UpdatePatient.observaciones
        }


        const responseEdit = await EditPatient(patient);


        if (!responseEdit.action) {
            originalStateButton();
            setTextMessageFail('Hubo un problema al Editar Ficha, intente más tarde');
            openToastrSnackError();
            return false;
        }

        openSnackbar();
        originalStateButton();
        history.replace(`/back/ficha_medica/${patientData.rut}`);
    }

    ValidSession('back');

    useEffect(() => {
        fetch();
    }, [])
    const titlePerson = () => (
        <>
            <div>
                <span className="monserrat500" >
                    Datos Personales
                </span>
                <span style={styles.icons}>
                    <AccountCircleSharpIcon />

                </span>
            </div>
        </>
    )

    const titleMedical = () => (
        <>
            <div>
                <span className="monserrat500">
                    Datos Clínicos
                </span>
                <span style={styles.icons}>
                    <LocalHospitalIcon />

                </span>
            </div>
        </>
    )
    return (patientData !== false) && (forecats !== false) ? (
        <>

            <Title title={"Editar ficha"} />

            <Container fixed>

                <Grid container spacing={1}   >

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                    >

                        <Title type={'secondary'} title={titlePerson()} />

                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" >

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <TextField
                           
                            label="Rut"
                            type="text"
                            autoComplete="current-password"
                            style={styles.inputWidth}
                            defaultValue={rutFormater(patientData.rut)}
                            disabled
                            onChange={e => setUpdatePatient({ ...UpdatePatient, rut: e.target.value })}
                        />
                    </Grid>


                </Grid>

                <Grid container spacing={1} alignItems="flex-end" >

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <TextField
                           
                            label="Nombres"
                            type="text"
                            autoComplete="current-password"
                            defaultValue={patientData.nombres}
                            style={styles.inputWidth}
                            onChange={e => setUpdatePatient({ ...UpdatePatient, nombres: e.target.value })}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <TextField
                            
                            label="Apellido Materno"
                            type="text"
                            autoComplete="current-password"
                            style={styles.inputWidth}
                            defaultValue={patientData.apellido_materno}
                            onChange={e => setUpdatePatient({ ...UpdatePatient, apellido_materno: e.target.value })}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <TextField
                            
                            label="Apellido Paterno"
                            type="text"
                            autoComplete="current-password"
                            style={styles.inputWidth}
                            defaultValue={patientData.apellido_paterno}
                            onChange={e => setUpdatePatient({ ...UpdatePatient, apellido_paterno: e.target.value })}
                        />
                    </Grid>


                </Grid>

                <Grid container spacing={1} alignItems="flex-end" >

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <TextField
                            
                            label="Email"
                            type="email"
                            autoComplete="current-password"
                            style={styles.inputWidth}
                            defaultValue={patientData.correo}
                            onChange={e => setUpdatePatient({ ...UpdatePatient, correo: e.target.value })}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Fecha nacimiento"
                                format="MM/dd/yyyy"
                                value={patientData.fecha_nacimiento}
                                onChange={e => setUpdatePatient({ ...UpdatePatient, fecha_nacimiento: e })}
                                style={styles.inputWidth}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>


                </Grid>
            </Container>



            <Container fixed>
                <Grid container spacing={1}   >

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                    >
                        <Title type={'secondary'} title={titleMedical()} />

                    </Grid>
                </Grid>

                <Grid container spacing={1}   >

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <InputLabel id="demo-simple-select-label1">Previsión</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            defaultValue={patientData.prevision}
                            onChange={e => setUpdatePatient({ ...UpdatePatient, prevision: e.target.value })}
                            style={styles.inputWidth}
                        >
                            {forecats.map(row => (
                                <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>

                            ))}

                        </Select>

                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" >

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <TextField
                            
                            label="Grupo sanguíneo"
                            type="text"
                            autoComplete="current-password"
                            style={styles.inputWidth}
                            defaultValue={patientData.grupo_sanguineo}
                            onChange={e => setUpdatePatient({ ...UpdatePatient, tipo_sanguinio: e.target.value })}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <TextField
                            
                            label="Medicamentos"
                            type="text"
                            autoComplete="current-password"
                            style={styles.inputWidth}
                            defaultValue={patientData.medicamentos}
                            onChange={e => setUpdatePatient({ ...UpdatePatient, medicamentos: e.target.value })}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        <TextField
                            
                            label="Estatura"
                            type="text"
                            autoComplete="current-password"
                            style={styles.inputWidth}
                            defaultValue={patientData.estatura}
                            onChange={e => setUpdatePatient({ ...UpdatePatient, estatura: e.target.value })}
                        />
                    </Grid>


                </Grid>

                <Grid container spacing={1} alignItems="flex-end" >

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                    >

                        <TextField
                            id="standard-multiline-static"
                            label="Observaciones"
                            multiline
                            rows={2}
                            defaultValue={patientData.observaciones}
                            style={styles.inputWidth}
                            onChange={e => setUpdatePatient({ ...UpdatePatient, observaciones: e.target.value })}
                        />


                    </Grid>
                </Grid>
            </Container>

            <Container fixed>
                <Grid container spacing={1}   >

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        xl={3}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            className="btnPrimary"
                            style={styles.inputWidth}
                            onClick={e => addPatient()}
                            disabled={buttonDisabled}
                        >
                            <span className="monserrat500"> {textButton} </span>
                        </Button>

                    </Grid>
                </Grid>
            </Container>

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
        </>
    ) : (
            <SpinnerLoad />
        )
}
export default withRouter(EditRecords);