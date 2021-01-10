import React, {useState, useEffect, useRef } from 'react'

import Title from '../components/Title';
import { useParams } from 'react-router-dom';
import { GetItemJson } from '../libs/Storage';
import { ValidSession } from '../libs/Session';
import { GetPatient } from '../services/Patient';
import { rutFormater } from '../libs/Commons';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import SpinnerLoad from '../components/SpinnerLoad';
import MuiAlert from '@material-ui/lab/Alert';
import DvrIcon from '@material-ui/icons/Dvr';

import TableResponsive from '../components/Table';

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
        Snackbar ,
        IconButton
} from '@material-ui/core'
import { AddFile, AddFileData, DeleteFile, DeleteFileDicom, GetFilesDicomByPatient } from '../services/Dicom';
import { GetRowCurrent } from '../components/Table';
import { RUTE_SERVICE_DICOM } from '../constants';

export const Dicom = () => {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const [ user, setUser] = useState(false);
    const [ patient, setPatient] = useState(false);
    const [ dialog, setDialog] = useState(false);
    const [ description, setDescription] = useState('');
    const [ files, setFiles] = useState( false );
    const [ id, setId ] = useState( '' );
    const [ url, setUrl ] = useState( '' );

    const [ buttonText , setTextButton ] = useState( 'AGREGAR' ) ;
    const [ buttonDisabled , setButtonDisabled ] = useState( false ) ;

    const [ textMessageFail, setTextMessageFail] = useState('');
    const [ openSnack, setOpenSnack] = useState(false);

    const [ openSnackError, setOpenSnackError] = useState(false);
    const [ title, setTitle ] = useState( '' ) ;
    const [ open, setOpen] = useState(false);

    const { rutPatient } = useParams();   
    let formDicom = useRef(null);
    let file = useRef(null);

    const closeOpenSnackError = () => setOpenSnackError(false);
    const openToastrSnackError = () => setOpenSnackError(true);
    
    const fetch = async () => {
        const us = await GetItemJson('user');
        const patientFounded = await GetPatient( rutPatient );
        const filesDicom = await GetFilesDicomByPatient( us.rut , rutPatient );
        console.log( 'filesDicom***' , filesDicom)
        setFiles( filesDicom ) ;
        setUser(us);
        setPatient(patientFounded.data);
    }

    const validateForm = () => {

        if( description == '' ){
            setTextMessageFail('Debe agregar una descripción');
            openToastrSnackError();
            return false ;
        }

        if( title == '' ){
            setTextMessageFail('Debe agregar una título');
            openToastrSnackError();
            return false ;
        }

        if( file.current.files[0] == undefined ){
            setTextMessageFail('Debe agregar un archivo dicom');
            openToastrSnackError();
            return false ;
        }

        return true ;
    }
    const addDicomFile = async () => {
        activeStateButton() ;
        //console.log( 'file' , file.current.files[0])

        const isValid = validateForm() ;

        if( !isValid ){
            originalStateButton() ;
            return false ;
        }
      
        const f = formDicom.current ;
        const form = new FormData( f ) ; 
        const responseAddFile = await AddFile( form ) ;
        console.log('responseAddFile**' , responseAddFile ) ;

        if( !responseAddFile.action ){
            setTextMessageFail('Hubo un problemas al subir la imagen, intente más tarde');
            openToastrSnackError();
            originalStateButton() ;

            return false ;
        }

        const descriptionFilter = description.replace( "'" , " " ) ;
        const responseAddData = await AddFileData(  user.rut, rutPatient, responseAddFile.url, title , descriptionFilter ) ;

        if( !responseAddData.action ){
            setTextMessageFail('Hubo un problemas al subir datos, intente más tarde');
            openToastrSnackError();
            originalStateButton() ;
            return false ;
        }

        setPatient( false ) ;
        fetch() ;
        openSnackbar() ;
        handleClickCloseAddDocument() ;
        originalStateButton() ;
    }

    const originalStateButton = ( ) => {
        setButtonDisabled(false) ;
        setTextButton('AGREGAR')
    }

    const activeStateButton = ( ) => {
        setButtonDisabled(true) ;
        setTextButton('AGREGANDO...')
    }

    const openSnackbar  = () => setOpenSnack(true) ;
    const closeSnackbar = () => setOpenSnack(false) ;

    useEffect( () => {
        fetch() ;
        ValidSession('back') ;
    },[])

    const handleClickOpenAddDocument = ()  =>  setDialog( true );
    const handleClickCloseAddDocument = () =>  setDialog( false );

    const handleClickOpen = () =>  setOpen(true)
    const handleClose = () =>  setOpen(false)

    const deleteItem = params => {
        console.log( 'params' , params)
        setId( params.row.id );
        setUrl( params.row.url ) ;
        handleClickOpen() ;
    }

    const deleteFile = async () => {

        try {
            const responseDelete = await DeleteFileDicom( id ) ;
            if( !responseDelete.action ){
                setTextMessageFail('Hubo un problema al eliminar, intente más tarde');
                openToastrSnackError();
                setPatient( false ) ;
                fetch() ;
                return false ;
            }    

            const formFile = new FormData() ;
            formFile.append('rute' , url ) ;

            const respDelete = await DeleteFile( formFile ) ;

            setDescription('') ;
            setTitle('') ;
            setPatient( false ) ;
            fetch() ;
            handleClose() ;

        } catch (error) {
            setTextMessageFail('Hubo un problema, intente más tarde');
            openToastrSnackError();
            setPatient( false ) ;
            fetch() ;
        }

        
    }

    const gotoDicomFile = params => {
        const rute = RUTE_SERVICE_DICOM + '/?token=' + params.row.token ;
        window.location.href = rute ;

        
    }

    const columns = [
        { field: 'id',      headerName: 'N°'     , width: 100 },
        { field: 'titulo',    headerName: 'Título'   , width: 250 },
        { field: 'created',    headerName: 'Creado' , width: 200  },
        { field: 'url',  headerName: 'URL' , width: 300 },
        { 
            field: 'actions',  
            headerName: 'Dicom' , 
            width: 100 , 
            disableClickEventBubbling: true,
            renderCell: params => {
                return(
                    <>
                        <IconButton aria-label="delete" onClick={ e => gotoDicomFile( params ) } >
                            <DvrIcon fontSize="large" />
                        </IconButton>
                    </>
                )  ;
            }
        },
        { 
            field: '',  
            headerName: 'Acciones' , 
            width: 100 , 
            disableClickEventBubbling: true,
            renderCell: params => {
                return(
                    <>
                        <IconButton aria-label="delete" onClick={ e => deleteItem(params) }>
                            <DeleteIcon fontSize="large" />
                        </IconButton>
                    </>
                  
                )  ;
            }
        }  
    ]


    return  ( patient !== false )  &&
            ( files   !== false )  &&
            ( user    !== false )  ? (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                //PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    ¿Desea eliminar archivo?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Se eliminará el archivo de la cuenta, el cual no se podrá recuperar.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={ e => deleteFile()} color="primary">
                        Si
                    </Button>
                </DialogActions>
            </Dialog>

            <Title title="Gestion de archivos DICOM" />

            <Container>
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


                        <IconButton onClick={e => handleClickOpenAddDocument()} >
                            <PostAddIcon fontSize="large" />
                        </IconButton>


                    </Grid>


                </Grid>

                <Grid container spacing={1} style={{ marginTop: '50px' }} alignItems="center" >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                    >
                      
                      <TableResponsive

                        rows={files.data}
                        columns={columns}
                        selected={false}
                    />

                    </Grid>
                </Grid>
            </Container>

            <Dialog disableEscapeKeyDown disableBackdropClick open={dialog} onClose={handleClickCloseAddDocument} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar archivo DICOM</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Solo se deben agregar archivos DICOM para su posterior visualización
                    </DialogContentText>
            
                    <form ref={ formDicom } method="post" encType="multipart/form-data">
                        
                    <br/>

                        <TextField
                            label  = "Título"
                            type   = "text"
                            fullWidth
                            name = "title"
                            value = { title }
                            onChange = { e => setTitle( e.target.value )}
                        />  
                        <br/>

                        <TextField
                            margin = "dense"
                            id     = "history"
                            label  = "Descripción"
                            type   = "text"
                            multiline
                            rows = { 4 }
                            fullWidth
                            name = "description"
                            onChange = { e => setDescription( e.target.value )}
                        />    
                        <br/>
                        <br/>
                        <br/>

                        <input
                            accept="*"
                            id="contained-button-file"
                            multiple
                            hidden
                            type  = "file"
                            ref   = { file }
                            name  = "dicomfile"
                        />
                        <label htmlFor="contained-button-file">
                            <Button 
                                variant="outlined"
                                color="primary" 
                                component="span"
                                fullWidth 
                            >
                                CARGAR ARCHIVO
                            </Button>
                        </label>
                    </form>    


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickCloseAddDocument} color="secondary">
                        Cancelar
                    </Button>
                    <Button 
                        onClick  = { e => addDicomFile() } 
                        disabled = { buttonDisabled } 
                        color    = "primary"
                    >
                        { buttonText }
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={e => closeSnackbar()}>
                <Alert onClose={closeSnackbar} severity="success">
                    Se agrego documento con éxito!
                </Alert>
            </Snackbar>

            <Snackbar open={openSnackError} autoHideDuration={6000} onClose={e => closeOpenSnackError()}>
                <Alert onClose={closeOpenSnackError} severity="error">
                    <span className="monserrat400">  {textMessageFail} </span>
                </Alert>
            </Snackbar>
        </>
    ) : (
        <SpinnerLoad/>
    )
}