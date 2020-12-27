import React, { useState , useEffect } from 'react' ;
import Title from '../components/Title';
import TableResponsive from '../components/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import  {
    Grid        , 
    Container   ,
    InputLabel     ,
    FormControl ,
    Select ,
    MenuItem ,
    TextField ,
    Button  ,
    Dialog  ,
    Paper ,
    DialogTitle ,
    DialogContent ,
    DialogContentText ,
    DialogActions  ,
    Snackbar
  }  from '@material-ui/core/';

import {
    CellParams,
    GridApi
  } from "@material-ui/data-grid";

import Draggable from 'react-draggable';
import MuiAlert from '@material-ui/lab/Alert';
import SpinnerLoad from '../components/SpinnerLoad';
import {  GetTratament , GetSpecialty } from '../services/Specialty';
import { ValidSession } from '../libs/Session';
import { GetItemJson } from '../libs/Storage';
import { GetItemsBudget , DeleteItemBudget , AddItem } from '../services/Budget';

import { format } from '../libs/Commons';


const styles = {
    width : {
        width : '90%'
    },
    colorFail : {
        color : 'red'
    } 
}

function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
}

const Budget = props => {


    const [ user , setUser ] = useState( false ) ;

    const [ specialties , setSpecialties ] = useState( false ) ;
    const [ specialty , setSpecialty ] = useState('') ;

    const [ trataments , setTrataments ] = useState([]) ;
    
    const [ tratament , setTratament ] = useState('') ;
    const [ value , setValue ] = useState('') ;


    const [ textTreatmentEmpty , setTextTreatmentEmpty ] = useState( false ) ;
    const [ textValueEmpty , setTextValueEmpty ] = useState( false ) ;
    const [ textFailAction , setTextFailAction ] = useState( false ) ;

    const [ buttonText , setTextButton ] = useState( 'AGREGAR' ) ;
    const [ buttonDisabled , setButtonDisabled ] = useState( false ) ;

    const [ items , setItems ] = useState( [] ) ;

    const [ rowsForTable , setRowsForTable ] = useState( [] ) ;

    const [ open, setOpen] = useState(false);
    const [ itemForDelete, setItemForDelete] = useState(0);

    const [ tratamentsAll, setTratamentsAll] = useState([]); 

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const deleteItem = async () => {
         
        const resposeDelete = await DeleteItemBudget( { id : itemForDelete } ) ;
        console.log('resposeDelete' , resposeDelete  )
        if( resposeDelete.action ) {
            fetch() ;
            fetchSpecialty()
            fetchItems() ;
            handleClose() ;
        }
        else{
            handleClose() ;

            console.log('problema al borrar')
        }     
    };

    const emptyStates = () => {
        setSpecialty('') ;
        setValue('') ;
        setTratament('') ;
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const fetch = async () => {
        const us = await GetItemJson('user') ;
        setUser( us ) ;
    }

    const fetchSpecialty = async () => {
        const specialtyFounded = await GetSpecialty() ;
        setSpecialties( specialtyFounded ) ;
    }

    const fetchItems = async () => {
        const us    = await GetItemJson('user') ;
        const items = await GetItemsBudget( { rut : us.rut} ) ;
        const tratamentTable = await prepareTratament(  items ) ;

        await setRowsForTable(  tratamentTable) ;
        await setItems( items ) ;
    }

    const fetchTratament = async spec => {
        setSpecialty(spec);
        const tratamentsFounded = await GetTratament( spec ) ;
        setTrataments( tratamentsFounded ) ;
    }

    const prepareTratament =  dataTrataments => {
        setTratamentsAll( dataTrataments ) ;
        let i = 0 ; 
        const tratamentTable = dataTrataments.map( row => {
            i++ ;
            return { 
                id : row.id_presupuesto ,
                specialty : row.name ,
                tratament : row.nombre ,
                value : '$' + format( row.valor) ,
                idPresupuesto : row.id_presupuesto 
            }
        }) ;
        return tratamentTable ;
    }
    
    const [ openSnack, setOpenSnack] = useState(false);
    const [ textMessageFail, setTextMessageFail ] = useState('') ;

    const openSnackbar = () => {
        setOpenSnack(true);
    };
    
    const closeSnackbar = () => {
        setOpenSnack(false);
    };


    const originalStateButton = ( ) => {
        setButtonDisabled(false) ;
        setTextButton('AGREGAR')
    }

    const activeStateButton = ( ) => {
        setButtonDisabled(true) ;
        setTextButton('AGREGANDO...')
    }

    const [openSnackError, setOpenSnackError] = useState(false);

    const closeOpenSnackError  = () => setOpenSnackError( false ) ;
    const openToastrSnackError = () => setOpenSnackError( true ) ;


    const validate = () => {
        
        if( tratament == '' || !tratament ){
            setTextMessageFail('Debe seleccionar un tratamiento') ;
            openToastrSnackError() ;
            return false ; 
        }
        setTextTreatmentEmpty( false ) ;


        if( value == '' || !value ){
            setTextMessageFail('Debe agregar un precio') ;
            openToastrSnackError() ;
            return false ; 
        }
        setTextValueEmpty( false ) ;

        let itemValid = true ;

        tratamentsAll.forEach( row => {
            if( row.id_tratamiento === tratament ){
                itemValid = false ;
            }
        })

        if( !itemValid ) {
            setTextMessageFail('Item ya está asociado') ;
            openToastrSnackError() ;
            return false 
        }

        return true ;
    }

    const addItem = async () => {
        activeStateButton() ;

        const isValidate = await validate() ;
        
        if( !isValidate ){
            originalStateButton() ;
            return false ;
        }

        const data = {
            rut : user.rut ,
            treatment : tratament ,
            value  
         } ; 

        const response = await AddItem( data ) ;
        console.log( 'response', response )

        if( !response.action ){
            setTextMessageFail('Hubo un problema al agregar presupuesto, intente más tarde') ;
            openToastrSnackError() ;
            
            return false 
        }

        openSnackbar() ;
        await fetch() ;
        await fetchItems() ;

        emptyStates() ;
        originalStateButton();
    }


    const columns = [
        { field: 'id',      headerName: 'N°'     , width: 100 },
        { field: 'specialty',    headerName: 'Especialidad'   , width: 250 },
        { field: 'tratament',    headerName: 'Tratamiento' , width: 250  },
        { field: 'value',  headerName: 'Valor' , width: 200 },
        { 
            field: 'actions',  
            headerName: 'Acciones' , 
            width: 200 , 
            disableClickEventBubbling: true,
            renderCell: (params: CellParams) => {

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

                    console.log('thisRow**',thisRow) ;

                    setItemForDelete(thisRow.id) ;
                    handleClickOpen() ;
                }

                return(
                    <>
                       
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon = {<DeleteIcon />}
                            onClick   = { e => onClick() } 
                        >
                            <span className="monserrat500"> Borrar </span>
                        </Button>
                    </>
                  
                )  ;
              }
        } ,


        
    ];

    useEffect(() => {
        fetch() ;
        fetchSpecialty()
        fetchItems() ;
        ValidSession('back') ;
    }, [])

    return ( specialties !== false ) ? (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                //PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                  
                    ¿Desea eliminar item?

                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Se eliminará un item de los presupuestos asociados a tu cuenta, el cual no se podrá recuperar.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={deleteItem} color="primary">
                        Si
                    </Button>
                </DialogActions>
            </Dialog>

            <Title title = { "Valores Presupuesto" } />


            <Container fixed>

                <Grid container spacing={1}  style={{ marginTop : '50px' }} alignItems="flex-end" >

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 3 } 
                        lg = { 3 } 
                        xl = { 3 } 
                    >

                        <FormControl  style={styles.width}>
                            <InputLabel id="demo-simple-select-label">Seleccione Especialidad</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {specialty}
                                onChange={  e =>  fetchTratament( e.target.value )}
                            >
                                { specialties.map( (row , index) => ( 
                                    <MenuItem 
                                        value = { row.id }
                                        key   = { index  }
                                    >{ row.name }</MenuItem>

                                ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 3 } 
                        lg = { 4 } 
                        xl = { 4 } 
                    >


                        <FormControl  style={styles.width} >
                            <InputLabel id="demo-simple-select-label">Seleccione Tratamiento </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {tratament}
                                onChange={  e =>  setTratament( e.target.value )}
                            >
                                { trataments.map( (row , index) => ( 
                                    <MenuItem 
                                        value = { row.id }
                                        key   = { index  }
                                    >{ row.nombre }</MenuItem>

                                ))}
                            </Select>
                        </FormControl>

                       
                    </Grid>


                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 3 } 
                        lg = { 2 } 
                        xl = { 2 } 
                    >

                        <FormControl style={styles.width}>
                            <TextField type="number" id="standard-basic" value={value} label="Precio" onChange={ e => setValue( e.target.value ) } />
                        </FormControl>
                    </Grid>

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 3 } 
                        lg = { 3 } 
                        xl = { 3 } 
                    >
                        <Button variant="contained" disabled={buttonDisabled} color="primary" onClick={ e => addItem() }>
                            <span className="monserrat400">Agregar </span>
                        </Button>
                        { (textTreatmentEmpty) && <p style={ styles.colorFail }> Tratamiento requerido</p>  }
                        { (textValueEmpty) && <p style={ styles.colorFail }> Precio requerido</p>  }
                        { (textFailAction) && <p style={ styles.colorFail }> No se puedo guardar, prueba más tarde </p>  }
                    </Grid>
                </Grid>

            </Container>

            <Container fixed>

                <Grid container spacing={1} alignItems="flex-end" >

                    <Grid  
                        item 
                        xs = {12}
                        sm = {12}
                        md = {12}
                        lg = {12}
                        xl = {12}

                        style={{ marginTop : '50px' }}
                    >
                        <TableResponsive 
                            rows     = {rowsForTable}
                            columns  = {columns} 
                            selected = { false }
                        />

                    </Grid>
                </Grid>
            </Container>
            <Snackbar open={ openSnack } autoHideDuration={6000} onClose={ e => closeSnackbar() }>
                <Alert onClose={ closeSnackbar} severity="success">
                    Se agrego item con éxito!
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

    );
} 

export default Budget ;