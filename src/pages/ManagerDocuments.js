import { addDocument, cloudinary, DeleteDocument, getDocumentByUserAndPacient } from '../services/Documents';
import React, { useEffect, useState, useRef } from 'react';
import Title from '../components/Title';
import { Container, FormControl, TextField, Select, InputLabel, Button, TextareaAutosize, IconButton ,Grid, MenuItem, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TableResponsive from '../components/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import { GetExtensionFile } from '../libs/Documents';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import { ValidSession } from '../libs/Session';
import { GetItemJson } from '../libs/Storage';
import { getUserAndPacient } from '../services/Users';

import MuiAlert from '@material-ui/lab/Alert';

import {
    CellParams,
    GridApi
  } from "@material-ui/data-grid";
import { Link, withRouter, useParams } from 'react-router-dom';
import SpinnerLoad from '../components/SpinnerLoad';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .headColor': {
            backgroundColor: '#BFBFBF',
        },

    },
    input: {
        display: 'none',
    },
    table: {
        minWidth: 650,
    },
}));

const styles = {
    width: {
        width: '80%'
    }
}

const ManagerDocuments = (props) => {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const { rutPatient } = useParams() ;

    const [error, setError] = useState(false);
    const [errorType, setErrorType] = useState(false);

    const [documents, setDocuments] = useState( false ) ;
    const [user, setUser] = useState(false);
    const [file, setFile] = useState({
        name: '',
        type: '',
        description: '',
        file: ''
    })

    const refName = useRef('');
    const refDescription = useRef('');
    const refType = useRef('');
    const refFile = useRef('');


    const closeOpenSnackError  = () => setOpenSnackError( false ) ;
    const openToastrSnackError = () => setOpenSnackError( true ) ;

    const [openSnackError, setOpenSnackError] = useState(false);
    const [ openSnack, setOpenSnack] = useState(false);
    const [ textMessageFail, setTextMessageFail ] = useState('') ;

    const [ textButton , setTextButton ] = useState( 'AGREGAR' ) ;
    const [ buttonDisabled , setButtonDisabled ] = useState( false ) ;

    const classes = useStyles();

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


    const columns = [
        { field: 'id',      headerName: 'N°'     , width: 100  } ,
        { field: 'nombre',  headerName: 'Nombre' , width: 250  } ,
        { field: 'tipo',    headerName: 'Tipo'   , width: 100  } ,
        { 
            field: 'url',     
            headerName: 'Link' , 
            width: 200 ,
            disableClickEventBubbling: true ,
            renderCell: ( params: CellParams ) => {
                const onClick  = () => {
                    const api: GridApi = params.api;
                    const fields = api
                      .getAllColumns()
                      .map((c) => c.field)
                      .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};
            
                    fields.forEach((f) => {
                      thisRow[f] = params.getValue(f);
                    });
    
                    window.open( thisRow.url ) ;
                }
    
                return(
                    <>
                        <Link href="#" onClick = { e => onClick() }>
                            Ir a documento
                        </Link>
                    </>
                  
                )  ;
            }
        } ,
        { field: 'creado',  headerName: 'Creado'   , width: 200  } ,
        { 
            field : 'actions',  
            headerName: 'Acciones' , 
            width: 200 , 
            disableClickEventBubbling: true ,
            renderCell: params => {
    
                const onClick  = async () => {
                    const api: GridApi = params.api;
                    const fields = api
                      .getAllColumns()
                      .map((c) => c.field)
                      .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};
            
                    fields.forEach((f) => {
                      thisRow[f] = params.getValue(f);
                    });
    
                    const responseDelete = await DeleteDocument( thisRow.id ) ;
    
                    fetch() ;
                }
    
                return(
                    <>
                        <IconButton aria-label="delete" onClick   = { e => onClick() } >
                            <DeleteIcon fontSize="large" />
                        </IconButton>
                    </>
                  
                )  ;
              }
        }  
    ];


    const prepareTableDocument = (documento) => {
        let i = 0;
        const documentTable = documento.map(row => {
            i++
            return {
                id: row.id,
                nombre : row.nombre,
                tipo: row.tipo,
                url : row.url,
                creado: row.created
            }
        });
        return documentTable ;
    }

    const fetch = async () => {
        const us = await GetItemJson('user');
        setUser(us);
        const userAndPatient = await getUserAndPacient(us.rut);

        const ruts = { rutUser: us.rut, rutPacient: rutPatient }
        const documentsData = await getDocumentByUserAndPacient(ruts);
        setDocuments( documentsData ) ;

        const documentsDataFilter = await prepareTableDocument( documentsData ) ;
        setDocuments( documentsDataFilter ) ;
    }



    useEffect(() => {
        ValidSession('back');
        fetch() ;
    }, [])




    const validate = async () => {

        if( file.type == '' || !file.type ) {
            setTextMessageFail('Tipo de archivo requerido') ;
            openToastrSnackError() ;
            return false ; 
        }

        if( file.name == '' || !file.name ) {
            setTextMessageFail('Nombre requerido') ;
            openToastrSnackError() ;
            return false ; 
        }

        if( file.file == '' || !file.file ) {
            setTextMessageFail('Archivo  requerido') ;
            openToastrSnackError() ;
            return false ; 
        }

        if( file.description == '' || !file.description ) {
            setTextMessageFail('Descripción requerido') ;
            openToastrSnackError() ;
            return false ; 
        }

        const validExtensionFile = await GetExtensionFile(file, file.type);
        console.log('validExtensionFile****', validExtensionFile)

        if (!validExtensionFile) {
            setTextMessageFail('El tipo de archivo no coincide con el archivo adjuntado') ;
            openToastrSnackError() ;
            return false;
        }

        return true
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        activeStateButton() ;
        const responseValidate = await validate();

        if (!responseValidate) {
            originalStateButton() ;
            return false;

        }

        const userAndPacient = await getUserAndPacient(user.rut)
        const rutPacient = rutPatient ;
        const rutUser = user.rut;

        const urlFile = await cloudinary(file);
        
        if( urlFile.data.secure_url === undefined ){
            console.log('upload cloudbinary false') ;
            originalStateButton() ;
            setTextMessageFail( 'Hubo un problema al insertar, intente más tarde' ) ;
            openToastrSnackError() ;
            return false ;
        }

        const documentUpload = {
            name: file.name,
            description: file.description,
            type: file.type,
            url: urlFile.data.secure_url,
            rutUser: rutUser,
            rutPacient: rutPacient
        }


       const respondeUpload = await addDocument(documentUpload);

       fetch() ;
       resetForm() ;
       originalStateButton() ;
       openSnackbar() ;
    }

    const resetForm = () => {
        setFile( { ...file ,  name : '' , description : '' , type : '', file : ''  } ) ;
    }

    const handleOnChange = event => {

        setFile({ ...file, [event.target.name]: (event.target.name === "file" ? event.target.files : event.target.value) });

    }

    return ( documents !== false ) ? (
        <>

            <Title title={"Gestión de documentos"} />

            <Container >

                <form onSubmit={handleSubmit} encType="multipart/form-data">

                    <Grid container  style={{ marginTop: '50px' }} alignItems="flex-end">

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={3}
                            lg={3}
                            xl={3}
                        >
                            <FormControl style={styles.width}>
                                <TextField 
                                    ref={refName} 
                                    type="text" 
                                    name="name" 
                                    onChange={handleOnChange} 
                                    id="standard-basic" 
                                    label="Nombre Archivo" 
                                    value = { file.name }
                                />
                            </FormControl>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={2}
                            lg={2}
                            xl={2}
                        >



                            <FormControl style={styles.width}>
                                <InputLabel id="demo-simple-select-label">Tipo de Archivo</InputLabel>
                                <Select
                                    name="type"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={file.type}
                                    onChange={handleOnChange}
                                >

                                    <MenuItem value="image">Imagen</MenuItem>
                                    <MenuItem value="document">Documento</MenuItem>


                                </Select>
                            </FormControl  >

                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={3}
                            lg={3}
                            xl={3}
                        >

                            <FormControl style={styles.width}>
                                <TextareaAutosize 
                                    ref={refDescription} 
                                    onChange={handleOnChange} 
                                    name="description" 
                                    aria-label="minimum height" 
                                    rowsMin={2} 
                                    placeholder="Descripcion de archivo" 
                                    value = { file.description }
                                />
                            </FormControl>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={2}
                            lg={2}
                            xl={2}
                        >

                            <FormControl>
                                <input
                                    accept="image/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    name="file"
                                    onChange={handleOnChange}
                                    ref={refFile}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" className="btnSecondary"color="primary" component="span">
                                        Adjunte Archivo
                                    </Button>
                                </label>

                            </FormControl>

                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={2}
                            lg={2}
                            xl={2}
                        >

                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="secondary"
                                className="btnPrimary"
                                disabled={ buttonDisabled }    
                            >
                                <span className="monserrat500"> {textButton} </span>
                            </Button>
                        </Grid>





                    </Grid>
                </form>



                {error === true ? <p style={{ color: 'red', fontWeight: 'bold' }} >* Todos los campos son requeridos</p> : false}
                {errorType === true ? <p style={{ color: 'red', fontWeight: 'bold' }} >* El tipo de archivo no coincide con el archivo Adjuntado</p> : false}
            </Container>



            <Container >

                <Grid container spacing={1} alignItems="flex-end">

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}

                        style={{ marginTop: '50px', marginBottom: '50px' }}
                        className={classes.root}
                    >

                        <TableResponsive

                            rows={documents}
                            columns={columns}
                            selected={false}
                        />

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


export default  withRouter( ManagerDocuments ) ;