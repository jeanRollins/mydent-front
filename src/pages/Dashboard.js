import React, {useState , useEffect} from 'react';
import Title from '../components/Title';
import { GetItemJson } from '../libs/Storage';

import  Grid  from '@material-ui/core/Grid';
import TableResponsive, { GetRowCurrent } from '../components/Table';
import { DayCurrent } from '../libs/Commons';
import { ValidSession } from '../libs/Session';
import SpinnerLoad from '../components/SpinnerLoad';
import { GetTimesDayCurrentAssigned } from '../libs/Times';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';

import { 
    Box,
    Container, 
    IconButton ,
    DialogTitle ,
    DialogContent ,
    DialogContentText ,
    DialogActions  ,
    Dialog ,
    Button ,
    Snackbar
    } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { ChangeStatusTime } from '../services/Times';
import MuiAlert from '@material-ui/lab/Alert';

const styles = { 

    paddingCenter : {
        padding : '0px 15px 0px 15px ' 
    } 
};

function Dashboard (props) {  

    const [ user, setUser ] = useState( false ) ;
    const [ date , setDate ] = useState( new Date ) ;
    const [ times , setTimes ]  =  useState( false ) ;
    const [ columnsTable , setColumnsTable ]  =  useState( false ) ;
    const [ rowsTable    , setRowsTable ]  =  useState( false ) ;
    const [ open, setOpen ] = useState(false);
    const [ idStatus, setIdStatus ] = useState(false);


    const [ openSnack, setOpenSnack] = useState(false);
    const [ textMessageFail, setTextMessageFail ] = useState('') ;

    const [openSnackError, setOpenSnackError] = useState(false);

    const closeOpenSnackError  = () => setOpenSnackError( false ) ;
    const openToastrSnackError = () => setOpenSnackError( true ) ;

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    
    const openSnackbar = () => {
        setOpenSnack(true);
    };
    
    const closeSnackbar = () => {
        setOpenSnack(false);
    };

    const changeStatus = async () => {
        setRowsTable( false ) ;
        const responseUpdate = await ChangeStatusTime( idStatus ) ;
        if( !responseUpdate.action ){
            openToastrSnackError() ;
            setTextMessageFail('Hubo un problema al cambiar el estado, intente más tarde') ;
            return false 
        }
        fetch() ;
        handleClose() ;
        openSnackbar() ;
    }

    const GoToPatientFile  = params => {
        const thisRow = GetRowCurrent(params) ;
        props.history.push('/back/ficha_medica/' + thisRow.rutPatient )
    }
    const columns = [
        { field: 'id',      headerName: 'N°'      , width: 80 } ,
        { field: 'time',       headerName: 'Hora'    , width: 80 } ,
        { field: 'dateFormat', headerName: 'Fecha'    , width: 120 },
        { field: 'fullName',   headerName: 'Nombre'  , width: 280 } ,
        { field: 'rutPatient',  headerName: 'Rut'  , width: 130 } ,
        { field: 'stateName',  headerName: 'Estado'  , width: 120 } ,
        { 
            field: 'rutPatient',  
            headerName: 'Ficha' , 
            width: 90 , 
            disableClickEventBubbling: true,
            renderCell: (params) => {
                
                return(
                    <>
                        <IconButton 
                            onClick = { e => GoToPatientFile( params ) } 
                            aria-label="delete" 
                        >
                            <DescriptionOutlinedIcon fontSize="large" />
                        </IconButton>
                    </>
                  
                )  ;
            }
        } ,
        { 
            field: 'idTimesDetail',  
            headerName: 'Cambio estado' , 
            width: 150 , 
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return(
                    <>
                        { GetButton( params ) } 
                    </>
                )  ;
            }
        } 
    ];

    const fetch = async () => {
        const us    = await GetItemJson('user') ;
        let timesFounded = await GetTimesDayCurrentAssigned( us.rut , date ) ;
        setRowsTable( timesFounded ) ;
        setUser( us ) ;
    }    ;

    const ChangeStatusAlert  = params => {
        const thisRow = GetRowCurrent(params) ;
        setIdStatus( thisRow.idTimesDetail ) ;
        handleClickOpen() ;
    }

    const GetButton =  params => {
        const thisRow = GetRowCurrent(params) ;

        const disabledButton = ( thisRow.stateName === 'Atendido' )
        return (
            <Box display="flex" justifyContent="center" >
                <IconButton 
                    onClick  = { e => ChangeStatusAlert( params ) } 
                    disabled = { disabledButton }
                    
                    aria-label="delete" 
                >
                    <AssignmentIndOutlinedIcon fontSize="large" />
                </IconButton>
            </Box>
        )
    }

    useEffect( () => {
        fetch() ;
        ValidSession('back') ;
    },[])
    
    return ( user !== false ) && ( rowsTable !== false ) ? (
        <>
            <Snackbar open={ openSnack } autoHideDuration={6000} onClose={ e => closeSnackbar() }>
                <Alert onClose={ closeSnackbar} severity="success">
                    Se cambio estado con éxito!
                </Alert>
            </Snackbar>

            <Snackbar open={openSnackError} autoHideDuration={6000} onClose={ e =>  closeOpenSnackError() }>
                <Alert onClose={closeOpenSnackError} severity="error">
                <span className="monserrat400">  { textMessageFail } </span>
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                onClose={ handleClose }
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    ¿Desea cambiar de estado a atendido?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Se cambiará la atención a atendido.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={ e => changeStatus() } color="primary">
                        Si
                    </Button>
                </DialogActions>
            </Dialog>
            <Title title={ 'Dr. ' + user.nombres  } />

            <Container >
                <Grid container spacing={3}>
                    <Grid 
                        item 
                        xs = {12} 
                        sm = { 12 } 
                        md = { 12 } 
                        lg = { 12 } 
                        xl = { 12 } 
                        style={styles.paddingCenter} 
                    >
                        <Title 
                            title = { 'Agenda ' + DayCurrent() } 
                            type  = { 'secondary' }    
                        />
                        <TableResponsive 
                            rows     = {rowsTable}
                            columns  = {columns} 
                            selected = { false }
                        />
                    </Grid>
                </Grid>
            </Container>
            
        </>

  ) : (
      <SpinnerLoad/>
  );
}



export default withRouter( Dashboard )   ;