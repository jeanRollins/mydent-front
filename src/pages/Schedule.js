import React , { useState , useEffect } from 'react' ;
import Title from '../components/Title';
import  {
    Grid        , 
    Container   ,
    Button,   
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    DialogActions ,
    Link,
    TextField ,
    RadioGroup ,
    FormControlLabel ,
    Radio ,
    Snackbar
}  from '@material-ui/core/';


import { ValidSession } from '../libs/Session';
import SpinnerLoad from '../components/SpinnerLoad';
import { GetItemJson } from '../libs/Storage';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { GetHours, GetNextsDaysNames, GetTimesData } from '../libs/Times';
import { useTheme } from '@material-ui/core/styles';
import { SearchPatient } from '../services/Patient';
import { rutFormater } from '../libs/Commons';
import MuiAlert from '@material-ui/lab/Alert';
import { AddTimeDate } from '../services/Times';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    stateTimeAsigned : {
        color: '#c14343',
    },
    stateTimeAvailable : {
        color: 'green',
    }
}));

const Schedule = props => {
    const theme = useTheme() ;
    const [ user  , setUser  ]  =  useState( false ) ;
    const [ times , setTimes ]  =  useState( false ) ;
    const [ days  , setDays  ]  =  useState( false ) ;
    const [ open, setOpen ] = useState(false);
    const [ patients , setPatients ] = useState([]);
    const [ patientsSelected , setPatientsSelected ] = useState([]);
    const [ idTime , setIdTime ] = useState('');
    
    const [date , setDate] = useState( new Date ) ;

    const [ openSnack, setOpenSnack] = useState(false);
    const [ openSnackError , setOpenSnackError] = useState(false) ;
    const [ textMessageFail, setTextMessageFail ] = useState('')  ;
    
    const [ openDialogTimeDetail, setOpenDialogTimeDetail ] = useState( false )  ;

    const [ detailTime, setDetailTime ] = useState( false )  ;

    const openToastrSnackError = () => setOpenSnackError( true )  ;
    const closeOpenSnackError  = () => setOpenSnackError( false ) ;

    const classes = useStyles();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const fetch = async () => {
        const us = await GetItemJson('user') ;
        setUser( us ) ; 
    }

    const fetchTimes = async ( dateObject ) => {
        setTimes(false) ;
        const us = await GetItemJson('user') ;

        const times = await GetHours( us.rut , dateObject ) ;
        console.log('times*' , times ) ;

        const nameNextsDays = await GetNextsDaysNames( dateObject ) ;
        setDays( nameNextsDays ) ;
        setTimes( times ) ;
    }

    const AddTime = idTime => {
        console.log( 'idTime' , idTime ) ;
        setIdTime( idTime ) ;
        handleClickOpen();
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleCloseDialogDetailTime = () => {
        setOpenDialogTimeDetail(false);
        setDetailTime( false ) ;
    };

    const handleClickOpenDialogDetailTime = detail => {
        
        console.log('detail' , detail) ;
        setDetailTime( detail ) ;
        setOpenDialogTimeDetail(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const changeTimes = e => {
        setDate(e)
        fetchTimes(e) ;
    }

    const handleRadioChange = e => setPatientsSelected( e.target.value ) ;

    const openSnackbar = () => {
        setOpenSnack(true);
    };
    
    const closeSnackbar = () => {
        setOpenSnack(false);
    };

    const search = async value => {
        if( value == '' ){
            setPatients([]) ;
        }
        else{
            const patientsFounded = await SearchPatient( user.rut , value ) ;
            console.log( 'patientsFounded' , patientsFounded ) ;
            setPatients(patientsFounded.data) ;
        }
        setPatientsSelected('') ;
    }


    const createTime = async () => {
        console.log( 'idTime' , idTime ) ;

        if( patientsSelected == '' || patientsSelected == undefined ){
            setTextMessageFail('Debe seleccionar un paciente') ;
            openToastrSnackError() ;
            return false ; 
        }
        const dayTime      =  idTime.day ;
        const dateFormat   =  dayTime.getFullYear() + '-' + ( ( dayTime.getMonth() + 1 ) + "" ) + '-' + dayTime.getDate() ;  
        const _rutPatient  =  patientsSelected ;

        const responseAdd  =  await AddTimeDate( idTime.id , _rutPatient, user.rut, dateFormat, idTime.time ) ;

        console.log( 'responseAdd' , responseAdd ) ;
        if( !responseAdd.action ) {
            setTextMessageFail('Hubo un problema al agendar hora, intente más tarde') ;
            openToastrSnackError() ;
            return false ;
        }

        fetchTimes(  date ) ;
        openSnackbar() ;
        handleClose()
    }

    useEffect(() => {
        ValidSession('back') ;
        fetch();
        fetchTimes(  date ) ;
    },[]) ;

    return (user !== false) && (times !== false) ? (
        <>
            <Title title={ 'Agenda' } />
            
            <Container fixed>
                <Grid container spacing={3}>

                    <Grid 
                        item 
                        xs = { 12 } 
                        sm = { 12 } 
                        md = { 12 } 
                        lg = { 12 } 
                        xl = { 12 } 
                    >
                        <Box display="flex" justifyContent="center" >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Agenda por días"
                                    format="dd/MM/yyyy"
                                    value = { date } 
                                    onChange={ e => changeTimes( e ) }
                                    style= { {} } 
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider> 
                        </Box>
                    </Grid>
                </Grid>
                

                <Grid container spacing={3} style={{marginTop: '50px'}}>
                    <Grid 
                        item 
                        xs = { 12 } 
                        sm = { 12 } 
                        md = { 12 } 
                        lg = { 12 } 
                        xl = { 12 } 
                    >
                        <TableContainer >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell >
                                            <Box display="flex" justifyContent="center" > N° </Box>          
                                        </TableCell>
                                        { days.map( ( day , index ) => (
                                            <TableCell key={index}>
                                                <Box display="flex" justifyContent="center" > {day.name} </Box>
                                                <Box display="flex" justifyContent="center" > {day.date} </Box>
                                            </TableCell>
                                        )) }
                                        
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    { times.map( ( time , index ) => (
                                        <TableRow key={index}>
                                            <TableCell> 
                                                <Box display="flex" justifyContent="center" > 
                                                    {time.day1.numberIndex}
                                                </Box>
                                            </TableCell>
                                            <TableCell> 
                                                <Box display="flex" justifyContent="center" > 
                                                    <span className={ time.day1.assigned ? classes.stateTimeAsigned : classes.stateTimeAvailable } > { time.day1.timeData.estado_nombre } </span>    
                                                </Box>
                                                <Box display="flex" justifyContent="center" > 
                                                    <Link onClick={ e => AddTime( time.day1 ) }> { time.day1.time } </Link>  
                                                </Box>
                                                { (time.day1.assigned) && (
                                                    <>
                                                        <Box display="flex" justifyContent="center" > 
                                                            <Link onClick={ e => handleClickOpenDialogDetailTime(time.day1) }> { rutFormater( time.day1.timeData.rut_paciente ) } </Link>  
                                                        </Box>
                                                        <Box display="flex" justifyContent="center" > 
                                                            <Link onClick={ e => handleClickOpenDialogDetailTime(time.day1) }> { time.day1.timeData.nombres } </Link>  
                                                        </Box>
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell> 
                                                <Box display="flex" justifyContent="center" > 
                                                    <span className={ time.day2.assigned ? classes.stateTimeAsigned : classes.stateTimeAvailable } > { time.day2.timeData.estado_nombre } </span>    
                                                </Box>
                                                <Box display="flex" justifyContent="center" > 
                                                    <Link onClick={ e => AddTime( time.day2 ) }> { time.day2.time } </Link>  
                                                </Box> 
                                                { (time.day2.assigned) && (
                                                    <>
                                                        <Box display="flex" justifyContent="center" > 
                                                            <Link onClick={ e => handleClickOpenDialogDetailTime(time.day2) }> { rutFormater( time.day2.timeData.rut_paciente ) } </Link>  
                                                        </Box>
                                                        <Box display="flex" justifyContent="center" > 
                                                            <Link onClick={ e => handleClickOpenDialogDetailTime(time.day2) }> { time.day2.timeData.nombres } </Link>  
                                                        </Box>
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" justifyContent="center" > 
                                                    <span className={ time.day3.assigned ? classes.stateTimeAsigned : classes.stateTimeAvailable } > { time.day3.timeData.estado_nombre } </span>    
                                                </Box> 
                                                <Box display="flex" justifyContent="center" > 
                                                    <Link onClick={ e => AddTime( time.day3 ) }> { time.day3.time } </Link>  
                                                 </Box> 
                                                 { (time.day3.assigned) && (
                                                    <>
                                                        <Box display="flex" justifyContent="center" > 
                                                            <Link onClick={ e => handleClickOpenDialogDetailTime(time.day3) }> { rutFormater( time.day3.timeData.rut_paciente ) } </Link>  
                                                        </Box>
                                                        <Box display="flex" justifyContent="center" > 
                                                            <Link onClick={ e => handleClickOpenDialogDetailTime(time.day3) }> {  time.day3.timeData.nombres } </Link>  
                                                        </Box>
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell> 
                                            <Box display="flex" justifyContent="center" > 
                                                    <span className={ time.day4.assigned ? classes.stateTimeAsigned : classes.stateTimeAvailable } > { time.day4.timeData.estado_nombre } </span>    
                                                </Box>
                                                <Box display="flex" justifyContent="center" > 
                                                    <Link onClick={ e => AddTime( time.day4 ) }> { time.day4.time } </Link>  
                                                </Box>  
                                                { (time.day4.assigned) && (
                                                    <>
                                                        <Box display="flex" justifyContent="center" > 
                                                            <Link onClick={ e => handleClickOpenDialogDetailTime(time.day4) }> { rutFormater( time.day4.timeData.rut_paciente ) } </Link>  
                                                        </Box>
                                                        <Box display="flex" justifyContent="center" > 
                                                            <Link onClick={ e => handleClickOpenDialogDetailTime(time.day4) }> {  time.day4.timeData.nombres } </Link>  
                                                        </Box>
                                                    </>
                                                )}
                                            </TableCell>
                                            <TableCell> 
                                            <Box display="flex" justifyContent="center" > 
                                                    <span className={ time.day5.assigned ? classes.stateTimeAsigned : classes.stateTimeAvailable } > { time.day5.timeData.estado_nombre } </span>    
                                                </Box>
                                                <Box display="flex" justifyContent="center" > 
                                                    <Link onClick={ e => AddTime( time.day5 ) }> { time.day5.time } </Link>  
                                                </Box> 
                                                { (time.day5.assigned) && (
                                                    <>
                                                        <Box display="flex" justifyContent="center" > 
                                                            <Link onClick={ e => handleClickOpenDialogDetailTime(time.day5) }> { rutFormater( time.day5.timeData.rut_paciente ) } </Link>  
                                                        </Box>
                                                        <Box display="flex" justifyContent="center" > 
                                                            <Link onClick={ e => handleClickOpenDialogDetailTime(time.day5) }> {  time.day5.timeData.nombres } </Link>  
                                                        </Box>
                                                    </>
                                                )}
                                            </TableCell>

                                        </TableRow>
                                    )) }
                                    
                                </TableBody>
                        
                            </Table>
                        </TableContainer>

                    </Grid>
                    
                </Grid>
            </Container>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="">Horas pacientes  ({ idTime.time + ' ' +  idTime.dateFormat }) </DialogTitle>
                
                <DialogContent>
                    <DialogContentText >
                        * Ingrese rut para buscar pacientes
                    </DialogContentText>
                    <DialogContentText>
                        * Formato ejemplo 11222333-8
                    </DialogContentText>
                
                    <TextField style={{ width: '300px'}} id="standard-basic" label="Ingrese Rut" onChange={ e => search( e.target.value )} fullWidth />
                    <RadioGroup aria-label="quiz" name="quiz" value={patientsSelected} onChange={handleRadioChange}>
                        { patients.map( ( row, index ) => (
                            <FormControlLabel 
                                key={index} 
                                value={row.rut} 
                                control={<Radio />} 
                                label={ row.nombres + ' ' + row.apellido_paterno + ' (' + rutFormater( row.rut) + ')'} 
                            />
                        )) }
                        
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cerrar
                    </Button>
                    <Button onClick={ e => createTime() } color="primary">
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openDialogTimeDetail}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="">Detalle Hora </DialogTitle>
                
                { ( detailTime !== false ) ? (
                    <DialogContent>                
                        
                        <Box display="flex" justifyContent="" > 
                            Nombre : {   detailTime.timeData.fullNombre  }  
                        </Box>
                        <br/>
                        <Box display="flex" justifyContent="" > 
                            Rut : { rutFormater( detailTime.timeData.rut_paciente ) }  
                        </Box>
                        <br/>

                        <Box display="flex" justifyContent="" > 
                            Estado : { detailTime.timeData.estado_nombre }  
                        </Box>
                        <br/>

                        <Box display="flex" justifyContent="" > 
                            Hora : {  detailTime.nameDay + ' ' + detailTime.dateFormat + ' ' + detailTime.time }  
                        </Box>
                        <br/>

                        <Box display="flex" justifyContent="" > 
                            Observaciones : {  ( detailTime.timeData.observacion == '') ? 'No hay observaciones' : detailTime.observacion }  
                        </Box>
                        
                    </DialogContent>
                ) : (
                    <SpinnerLoad/>
                ) }
                
                <DialogActions>
                    <Button onClick={handleCloseDialogDetailTime} color="secondary">
                        Cerrar
                    </Button>
                
                </DialogActions>
            </Dialog>
            <Snackbar open={ openSnack } autoHideDuration={6000} onClose={ e => closeSnackbar() }>
                <Alert onClose={ closeSnackbar} severity="success">
                    Se ha agendado cita!
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

export default Schedule ;