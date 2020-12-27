import React , {useState , useEffect }from 'react'
import Title from '../components/Title';
import { ValidSession } from '../libs/Session';
import {
    Grid,
    TextField ,
    Container ,
    Select    ,
    MenuItem ,
    InputLabel,
    Button ,
    Snackbar
} from '@material-ui/core/';

import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { AddPatient, GetForecastsData, ValidatePatientExistByUser } from '../services/Patient';
import { GetItemJson } from '../libs/Storage';
import SpinnerLoad from '../components/SpinnerLoad';

import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import Draggable from 'react-draggable';
import MuiAlert from '@material-ui/lab/Alert';
import { ValidateEmail, ValidateRut } from '../libs/Commons';

const styles = {
    inputWidth : {
        width: '90%',
        margin : '15px 0px'
    },
    icons : {
        padding: '3px 7px 3px 6px' ,
        position: 'absolute'
    }
}
const PatientAdd = (props) => {

    const [patient, setPatient] = useState({
        rutUser : "" ,
        rut     : "" ,	
        name    : "", 
        lasnameMother : "",
        lasnameFather : "",
        prevision : "" ,
        email : "",
        born : new Date(),
        groupBlood : "" ,
        medicaments : "" ,
        height : "" ,
        observations : "" 
    }) ;

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const [user, setUser] = useState(false) ; 
    const [forecats, setForecats] = useState(false) ; 
    const handleOnChange = event =>  setPatient({ ...patient, [event.target.name]: (event.target.name === "file" ? event.target.files : event.target.value) });
    
    const [openSnackError, setOpenSnackError] = useState(false);
    const [ openSnack, setOpenSnack] = useState(false);
    const [ textMessageFail, setTextMessageFail ] = useState('') ;

    const closeOpenSnackError  = () => setOpenSnackError( false ) ;
    const openToastrSnackError = () => setOpenSnackError( true ) ;

    const [ textButton , setTextButton ] = useState( 'AGREGAR' ) ;
    const [ buttonDisabled , setButtonDisabled ] = useState( false ) ;

    const originalStateButton = ( ) => {
        setButtonDisabled(false) ;
        setTextButton('AGREGAR')
    }

    const activeStateButton = ( ) => {
        setButtonDisabled(true) ;
        setTextButton('AGREGANDO...')
    }

    const openSnackbar = () => {
        setOpenSnack(true);
    };
    
    const closeSnackbar = () => {
        setOpenSnack(false);
    };

    const fetch = async () => {
        const us = await GetItemJson('user') ;
        const forecastsData = await GetForecastsData() ;
        setPatient({...patient , rutUser : us.rut} ) ;
        setUser(us) ;
        setForecats(forecastsData) ;
    } ;


    const validateForm = async () => {

        if( patient.rut == '' || !patient.rut ) {
            setTextMessageFail('Rut requerido') ;
            openToastrSnackError() ;
            return false ; 
        }

        if( patient.name == '' || !patient.name ){
            setTextMessageFail('Nombre requerido') ;
            openToastrSnackError() ;
            return false ; 
        }

        if( patient.lasnameMother == '' || !patient.lasnameMother ){
            setTextMessageFail('Apellido materno requerido') ;
            openToastrSnackError() ;
            return false ; 
        }

        if( patient.lasnameFather == '' || !patient.lasnameFather ){
            setTextMessageFail('Apellido paterno requerido') ;
            openToastrSnackError() ;
            return false ; 
        }

        if( patient.email == '' || !patient.email ){
            setTextMessageFail('Email paterno requerido') ;
            openToastrSnackError() ;
            return false ; 
        }

        if( patient.prevision == '' || !patient.prevision ){
            setTextMessageFail('Previsión paterno requerido') ;
            openToastrSnackError() ;
            return false ; 
        }

        const isMailValidate = await ValidateEmail( patient.email ) ;

        if( !isMailValidate ){
            setTextMessageFail('Debe agregar un email valido') ;
            openToastrSnackError() ;
            return false ;
        }

        const isRutValidate =  await ValidateRut( patient.rut ) ;

        if( !isRutValidate ){
            setTextMessageFail('Debe agregar un rut valido') ;
            openToastrSnackError() ;
            return false ;
        }

        const isRutExist =  await ValidatePatientExistByUser( 'rut_paciente' , patient.rut ) ;


        if( !isRutExist ){
            setTextMessageFail('El rut ya está ingresado en nuestro sistema') ;
            openToastrSnackError() ;
            return false ;
        }

        const isEmailExist =  await ValidatePatientExistByUser( 'email' , patient.email ) ;

        if( !isEmailExist ){
            setTextMessageFail('El correo ya está ingresado en nuestro sistema') ;
            openToastrSnackError() ;
            return false ;
        }

        

        return true ; 
    };

    const resetForm = () => {
        setPatient({...patient , rut : '' } ) ;
        setPatient({...patient , name : '' } ) ;
        setPatient({...patient , lasnameFather : '' } ) ;
        setPatient({...patient , lasnameMother : '' } ) ;
        setPatient({...patient , email : '' } ) ;
        setPatient({...patient , prevision : '' } ) ;
        setPatient({...patient , born : new Date() } ) ;
        setPatient({...patient , prevision : '' } ) ;
        setPatient({...patient , groupBlood : '' } ) ;
        setPatient({...patient , medicaments : '' } ) ;
        setPatient({...patient , height : '' } ) ;
        setPatient({...patient , observations : '' } ) ;
    }

    const addPatient = async () => {
        activeStateButton() ;

        const isValid = await validateForm() ;
        
        if( !isValid ) {
            originalStateButton() ;
            return false 
        }

        console.log('isValid' , isValid)
        console.log('patient' , patient)

        
        const responseAdd = await AddPatient( patient ) ;

        if( !responseAdd.action ){
            originalStateButton() ;
            setTextMessageFail('Hubo un problema al guardar paciente, intente más tarde') ;
            openToastrSnackError() ;
            return false ;
        }

        openSnackbar() ;
        resetForm() ;
        originalStateButton() ;
    }

    
    useEffect( () => {
        fetch() ;
        ValidSession('back') ;

    },[])
    const titlePerson = () => (
        <>  
            <div>
                <span className="monserrat500" >  
                    Datos Personales
                </span>
                <span style={ styles.icons }>
                    <AccountCircleSharpIcon/>

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
                <span style={ styles.icons }>
                    <LocalHospitalIcon/>

                </span>
            </div>
        </>
    )
    return (user !== false) && ( forecats !== false) ? (
        <>
    
            <Title title = { "Agregar paciente" } />

            <Container fixed>

                <Grid container spacing={1}   >

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 12 } 
                        lg = { 12 } 
                        xl = { 12 } 
                    >
                        
                        <Title type={'secondary' } title = {  titlePerson()  } /> 
                    
                    </Grid>
                </Grid>

                <Grid container spacing={1}  alignItems="flex-end" >

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >
                        <TextField
                            id=""
                            label="Rut"
                            type="text"
                            autoComplete="current-password"
                            style= { styles.inputWidth }
                            defaultValue = { patient.rut } 
                            value = { patient.rut } 
                            onChange={ e =>  setPatient({...patient , rut : e.target.value } ) }
                        />                 
                    </Grid>

                
                </Grid>

                <Grid container spacing={1}  alignItems="flex-end" >

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >        
                        <TextField
                            id=""
                            label="Nombres"
                            type="text"
                            autoComplete="current-password"
                            style= { styles.inputWidth } 
                            defaultValue = { patient.name } 
                            value = { patient.name } 
                            onChange={ e => setPatient({...patient , name : e.target.value } )}
                        />                 
                    </Grid>

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >        
                        <TextField
                            id=""
                            label="Apellido Materno"
                            type="text"
                            autoComplete="current-password"
                            style= { styles.inputWidth }
                            defaultValue = { patient.lasnameMother } 
                            value = { patient.lasnameMother } 
                            onChange = { e =>  setPatient({...patient , lasnameMother : e.target.value } ) } 
                        />                 
                    </Grid>

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >        
                        <TextField
                            id=""
                            label="Apellido Paterno"
                            type="text"
                            autoComplete="current-password"
                            style= { styles.inputWidth } 
                            defaultValue = { patient.lasnameFather } 
                            value = { patient.lasnameFather } 
                            onChange={ e =>  setPatient({...patient , lasnameFather : e.target.value } ) }
                        />                 
                    </Grid>


                </Grid>

                <Grid container spacing={1}  alignItems="flex-end" >

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >        
                        <TextField
                            id=""
                            label="Email"
                            type="email"
                            autoComplete="current-password"
                            style= { styles.inputWidth } 
                            defaultValue = { patient.email } 
                            value = { patient.email } 
                            onChange={e =>  setPatient({...patient , email : e.target.value } )}
                        />                 
                    </Grid>

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >       
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                           
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Fecha nacimiento"
                                format="MM/dd/yyyy"
                                value = { patient.born } 
                                onChange={ e =>  setPatient({...patient , born : e } ) }
                                style= { styles.inputWidth } 
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
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 12 } 
                        lg = { 12 } 
                        xl = { 12 } 
                    >
                        <Title type={'secondary' } title = { titleMedical() } />

                    </Grid>
                </Grid>

                <Grid container spacing={1}   >

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >
                        <InputLabel id="demo-simple-select-label1">Previsión</InputLabel>
                        <Select
                            labelId="demo-simple-select-label1"
                            id="demo-simple-select"
                            value={patient.prevision}
                            onChange={ e =>  setPatient({...patient , prevision : e.target.value } )  }
                            style= { styles.inputWidth } 
                        >
                            { forecats.map( row =>  (
                                <MenuItem key ={row.id} value={row.id}>{row.name}</MenuItem>

                            ) ) }
                            
                        </Select>

                    </Grid>
                </Grid>

                <Grid container spacing={1}  alignItems="flex-end" >

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >        
                        <TextField
                            id=""
                            label="Grupo sanguíneo"
                            type="text"
                            autoComplete="current-password"
                            style= { styles.inputWidth } 
                            defaultValue = { patient.groupBlood } 
                            value = { patient.groupBlood } 
                            onChange={ e =>  setPatient({...patient , groupBlood : e.target.value } ) }
                        />                 
                    </Grid>

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >        
                        <TextField
                            id=""
                            label="Medicamentos"
                            type="text"
                            autoComplete="current-password"
                            style= { styles.inputWidth }
                            defaultValue = { patient.medicaments } 
                            value = { patient.medicaments } 
                            onChange={  e =>  setPatient({...patient , medicaments : e.target.value } ) } 
                        />                 
                    </Grid>

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >        
                        <TextField
                            id=""
                            label="Estatura"
                            type="text"
                            autoComplete="current-password"
                            style= { styles.inputWidth } 
                            defaultValue = { patient.height } 
                            value = { patient.height } 
                            medicaments
                            onChange={e =>  setPatient({...patient , height : e.target.value } )}
                        />                 
                    </Grid>


                </Grid>

                <Grid container spacing={1}  alignItems="flex-end" >

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 4 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >        

                        <TextField
                            id="standard-multiline-static"
                            label="Observaciones"
                            multiline
                            rows={4}
                            defaultValue={ patient.observations }
                            value={ patient.observations }
                            style= { styles.inputWidth } 
                            //value = { patient.observations } 
                            onChange={ e =>  setPatient({...patient , observations : e.target.value } ) }
                        />
                        
                                     
                    </Grid>
                </Grid>
            </Container>
        
            <Container fixed>
                <Grid container spacing={1}   >

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 3 } 
                        lg = { 3 } 
                        xl = { 3 } 
                    >
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            style= { styles.inputWidth } 
                            onClick={ e => addPatient() }
                            disabled={ buttonDisabled }
                        >
                            <span className="monserrat500"> {textButton} </span>
                        </Button>
                        
                    </Grid>
                </Grid>
            </Container>
            
            <Snackbar open={ openSnack } autoHideDuration={6000} onClose={ e => closeSnackbar() }>
                <Alert onClose={ closeSnackbar} severity="success">
                    Se agrego paciente con éxito!
                </Alert>
            </Snackbar>

            <Snackbar open={openSnackError} autoHideDuration={6000} onClose={ e =>  closeOpenSnackError() }>
                <Alert onClose={closeOpenSnackError} severity="error">
                <span className="monserrat400">  { textMessageFail } </span>
                </Alert>
            </Snackbar>
        </>
    ) : (
        <SpinnerLoad/>
    )
}

export default PatientAdd ;