import React, { useEffect, useState, useRef } from 'react'
import Title from '../../components/Title';
import SpinnerLoad from '../../components/SpinnerLoad';
import './dent.css' ;


import DeleteIcon from '@material-ui/icons/Delete';
import { Container, FormControl, InputLabel, Select, MenuItem, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { GetSpecialty, ItemsTratamentByUser } from '../../services/Specialty'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { AddItemJson, GetItemJson, RemoveItem } from '../../libs/Storage';
import { format } from '../../libs/Commons';
import { ValidSession } from '../../libs/Session';
import {  useParams, withRouter } from 'react-router-dom';
import { CreateBudgetByUser } from '../../services/Budget';
import MuiAlert from '@material-ui/lab/Alert';

import {
	Avatar,
    IconButton, 
    Typography ,
    Snackbar
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 130,
        marginBottom: 40
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        marginTop: 20,
        marginBottom: 20
    },
    listItem : {
        marginTop: '13px'
    }
}));

const Odontogram = props => {

    const classes = useStyles();
    const [ user, setUser ] = useState( false );

    const [specialties, setSpecialties] = useState([]);
    const [specialtiesTreatment, setSpecialtiesTreatment] = useState([]);

    const [specialty, setSpecialty] = useState('');
    const [specialitiesTreatmentSelected, setSpecialitiesTreatmentSelected] = useState('')
    
    const [ itemsBudget, setItemsBudget] = useState( [] );
    const [ trataments, setTrataments ] = useState( false );
    const [ tratamentsData, setTratamentsData ] = useState( [] );
    const [ tratamentSelected, setTratamentSelected ] = useState( false );
    const [ total , setTotal ] = useState( 0 );
    const { rutPatient } = useParams();
    const [ buttonText , setTextButton ] = useState( 'GENERAR' ) ;

    const quadrant = [ 'up', 'center', 'bootom', 'left' , 'right'];
    const toothsRefs= useRef([{}]);

    const [openSnackError, setOpenSnackError] = useState(false);
    const [ buttonDisabled , setButtonDisabled ] = useState( false ) ;

    const closeOpenSnackError  = () => setOpenSnackError( false ) ;
    const openToastrSnackError = () => setOpenSnackError( true ) ;
    const [ textMessageFail, setTextMessageFail ] = useState('') ;

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleChange = async value => {
        setSpecialty( value ) ;
        GetDataSpecialtiesTreatment( value ) ;
        setTratamentSelected( false ) ;
    }

    const handleChangeTreatment = value => {

        const tratSelected =  tratamentsData[ value ] ;
        setSpecialitiesTreatmentSelected(value) ;
        setTratamentSelected( tratSelected ) ;
        if( tratSelected.tipo_tratamiento === 'no-mark' ){
            AddItem( tratSelected ) ;
        }     
        
    }

    const originalStateButton = ( ) => {
        setButtonDisabled(false) ;
        setTextButton('GENERAR') ;
    }

    const activeStateButton = ( ) => {
        setButtonDisabled(true) ;
        setTextButton('GENERANDO...')
    }

    const prepareDataTrataments = data => {
        let trat = [] ; 
        data.map( row =>  trat[ row.id_presupuesto ] = row ) ;
        setTratamentsData( trat ) ;
    }
    const fetch = async () => {
        const us = GetItemJson('user') ;
        const specialties = await GetSpecialty();
        setSpecialties( specialties ) ;
        const itemsTratamentsFounded = await ItemsTratamentByUser( us.rut ) ;
        setTrataments( itemsTratamentsFounded.data ) ;
        prepareDataTrataments( itemsTratamentsFounded.data ) ;
        setUser( us ) ;
    }

    const GetDataSpecialtiesTreatment =  tratament => {
        const data = trataments.filter( row => row.id_especialidad === tratament ) ;
        setSpecialtiesTreatment( data ) ;        
    }; 

    const printTooth = ( tooth , classToPrint ) => {
        quadrant.forEach( toothNumber => {
            if( toothsRefs.current[tooth][toothNumber].classList.contains( classToPrint ) ){
                //toothsRefs.current[tooth][toothNumber].classList.remove( classToPrint ) ;
            }
            else {
                toothsRefs.current[tooth][toothNumber].classList.add( classToPrint ) ; 
            }
        });
    } ;

    const printToothSector =  ( sectorTooth , classToPrint ) => {
        
        if( sectorTooth.classList.contains( classToPrint ) ){
            
            //sectorTooth.classList.remove( classToPrint ) ;
        }
        else {
            sectorTooth.classList.add( classToPrint ) ; 
        }
        
    } ;

    useEffect(() => {
        fetch();
        ValidSession('back') ;
        RemoveItem('items') ;
    }, []);

    const calculateTotal = () => {
        let value = 0 ;
        let items =  ( GetItemJson('items') === null ) ? [] : GetItemJson('items') ;
        items.map( item  =>  value  = value + item.valor ) ; 
        setTotal( value ) ;
    }

    const deleteItem = item => {

        const tooth = itemsBudget[item].tooth ; 
        const classToRemove  = itemsBudget[item].class ;
        const position  = itemsBudget[item].position ;

        if( itemsBudget[item].tipo_tratamiento === 'no-mark' ){
            RemoveItemBudget( item ) ;
            return ;
        } 

        if( itemsBudget[item].tipo_tratamiento === 'sector' ) {
            toothsRefs.current[tooth][position].classList.remove( classToRemove ) ;
            RemoveItemBudget( item ) ;
            return ;
        }

        if( itemsBudget[item].tipo_tratamiento === 'piece' ){
            quadrant.forEach( row => toothsRefs.current[tooth][row].classList.remove( classToRemove ) ) ;
            RemoveItemBudget( item ) ;
            return ;
        }
    }

    const changeStateTooth = ( tooth , position ) => {
        
        const toothCurrent = toothsRefs.current[tooth][position] ;

        if( !tratamentSelected){
            return false ;
        }
        
        if( tratamentSelected.tipo_tratamiento === 'sector' ) {
            printToothSector( toothCurrent , tratamentSelected.class ) ;
            AddItem( tratamentSelected , tooth, position ) ;
        }
        if( tratamentSelected.tipo_tratamiento === 'piece' ){
            printTooth( tooth , tratamentSelected.class ) ;
            AddItem( tratamentSelected , tooth ) ;
        }
    } ;

    const AddItem = (tratamSelec , tooth = 0, position = '' ) => {
        AddItemJson('tratamSelec'  , tratamSelec ) ;

        tratamSelec.tooth = tooth ;
        tratamSelec.position = position ;

        const items =  ( GetItemJson('items') === null ) ? [] : GetItemJson('items') ;
        items.push( tratamSelec ) ;
        
        AddItemJson('items'  , items ) ;

        setItemsBudget( items.map( item => item ) ) ;
        calculateTotal() ;
    } ;

    const RemoveItemBudget = index => {
        let items =  ( GetItemJson('items') === null ) ? [] : GetItemJson('items') ;
        items = items.filter( ( item , i ) => i !== index ) ;
        AddItemJson('items'  , items ) ;
        setItemsBudget( items.map( item => item ) ) ;
        calculateTotal() ;
    } ;

    const RenderItems = () => {

        return (
            <>
                {  itemsBudget.map( (row , index) => (
                    <Grid container key = { index } style = {{ margin: '20px 0px' }}>

                        <Grid
                            item
                            xs = { 1 }
                            sm = { 1 }
                            md = { 1 }
                            lg = { 1 }
                            xl = { 1 }
                        >
                            <Avatar>
                                <FormatListBulletedIcon />
                            </Avatar>
                        </Grid>


                        <Grid
                            item
                            xs = { 4 }
                            sm = { 4 }
                            md = { 4 }
                            lg = { 4 }
                            xl = { 4 }
                        >
                            <div className={classes.listItem}>
                                { row.nombre_tratamiento }
                            </div>
                        </Grid>

                        <Grid
                            item
                            xs = { 2 }
                            sm = { 2 }
                            md = { 2 }
                            lg = { 2 }
                            xl = { 2 }
                        >
                            <div className={classes.listItem}>
                               Diente : { row.tooth }
                            </div>
                        </Grid>

                        <Grid
                            item
                            xs = { 2 }
                            sm = { 2 }
                            md = { 2 }
                            lg = { 2 }
                            xl = { 2 }
                        >
                            <div className={classes.listItem}>
                               Cara : { row.position }
                            </div>
                        </Grid>

                        <Grid
                            item
                            xs = { 2 }
                            sm = { 2 }
                            md = { 2 }
                            lg = { 2 }
                            xl = { 2 }
                        >
                            <div className={classes.listItem} >
                                { '$' + format( row.valor ) }
                            </div>
                        </Grid>

                        <Grid
                            item
                            xs = { 1 }
                            sm = { 1 }
                            md = { 1 }
                            lg = { 1 }
                            xl = { 1 }
                        >
                            <IconButton  edge="end" aria-label="delete" onClick={ e => deleteItem(index) } style={{ margin: '0px 0px 0px 0px' }}>
                                <DeleteIcon   />
                            </IconButton>
                        </Grid>
                    </Grid>            
                ))}
            </>
        )
    }

    const Tooths = () => {

        const tooths = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32
        ];

        return (
            <>
                { tooths.map( tooth => (
                    <div  
                        key       = { tooth } 
                        className = "diente"  
                    >
                        <p align="center" >
                            {tooth}
                        </p>
                        <div
                            onClick={ e => changeStateTooth( tooth , 'up') }
                            ref={ r => toothsRefs.current[tooth] = { up : r } } 
                            className={`cuadro`}
                        >
                        </div>
    
                        <div
                            onClick={ e => changeStateTooth( tooth , 'left') }
                            ref={ r => toothsRefs.current[ tooth ] = {...toothsRefs.current[ tooth ], left : r }  } 
                            className={`cuadro izquierdo `} 
                        >
                        </div>
                        <div
                            onClick={ e => changeStateTooth( tooth , 'bootom') }
                            ref={ r => toothsRefs.current[ tooth ] = {...toothsRefs.current[ tooth ], bootom : r }  } 
                            className={`cuadro debajo `} 
                        >
                        </div>
                        <div
                            onClick = { e => changeStateTooth( tooth , 'right') }
                            ref = { r => toothsRefs.current[ tooth ] = {...toothsRefs.current[ tooth ], right : r }  } 
                            className = {`cuadro derecho `}
                        >
                        </div>
                        <div
                            onClick   = { e => changeStateTooth( tooth , 'center') }
                            ref = { r => toothsRefs.current[ tooth ] = {...toothsRefs.current[ tooth ], center : r }  } 
                            className = {`centro `}>
                        </div>
    
    
                    </div>
                ) ) }
              
            </>
        )
    }

    const SubmitBudget = async () => { 
        activeStateButton() ;
        if ( itemsBudget.length < 1 ) {
            setTextMessageFail('Debe agregar un item para generar un presupuesto') ;
            openToastrSnackError() ;
            originalStateButton() ;

            return false ;
        }

        let dataBudget = {} ;
        dataBudget.rutPatient = rutPatient ;
        dataBudget.rutUser = user.rut ;
        const items = itemsBudget.map( row => {
            return {
                tooth       : row.tooth ,
                faceToDent  : row.position ,
                idTratament : row.id_presupuesto
            }
        })
        dataBudget.items = items ;
        console.log('dataBudget' , dataBudget)

        const responseAdd = await CreateBudgetByUser( dataBudget ) ;

        if( !responseAdd.action ){
            setTextMessageFail('Hubo un problema al generar el presupeusto, intente más tarde') ;
            openToastrSnackError() ;
            originalStateButton() ;
            return false ;
        }
        console.log('responseAdd' , responseAdd)


        const idNewBudget = responseAdd.data ;

        props.history.push( '/back/budget/' + idNewBudget ) ;
    };

    return  ( specialties !== false ) && 
            ( trataments  !== false ) && 
            ( user  !== false ) ? (
            <>
                <Title title="Generar presupuesto" />

                <Container className={classes.margin} >

                    <Grid container spacing={3}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={4}
                            xl={4}
                        >
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Especialidades</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={specialty}
                                    onChange={ e => handleChange( e.target.value )}
                                >
                                    {specialties.map(specialty => <MenuItem key={specialty.id} value={specialty.id}>{specialty.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={4}
                            xl={4}
                        >
                            <FormControl className={classes.formControl} fullWidth >
                                <InputLabel id="demo-simple-select-label">Tratamientos</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={specialitiesTreatmentSelected}
                                    onChange={ e => handleChangeTreatment( e.target.value ) }
                                    
                                >
                                    {specialtiesTreatment.map( (row , key) => <MenuItem 
                                                                                key={ key } 
                                                                                value={ row.id_presupuesto }
                                                                            >
                                                                            {row.nombre_tratamiento}
                                                                            </MenuItem>)}
                                </Select>

                            </FormControl>
                        </Grid>
                    </Grid>

                    <br />

                  {Tooths()}

                </Container>

                <Container className={classes.margin} >

                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={2}
                            xl={2}
                        >
                            <Title title="Presupuesto" type="secondary" />
                        
                        </Grid>

                    </Grid>
                </Container>

                <Container  >
                    {RenderItems()}
                </Container>

                <Container className={classes.margin} >

                    <Grid container>
                        <Grid
                            item
                            xs={2}
                            sm={2}
                            md={2}
                            lg={2}
                            xl={2}
                        >
                        </Grid>

                        <Grid
                            item
                            xs={2}
                            sm={2}
                            md={2}
                            lg={2}
                            xl={2}
                        >
                            <Typography variant="h6" gutterBottom>
                                Total : { '$' + format( total ) }
                               
                            </Typography>
                            
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={4}
                        >
                             <Button
                                onClick   = { e => SubmitBudget() }
                                color     = "primary"
                                variant   = "contained"
                                disabled  = { buttonDisabled }
                            >
                                { buttonText } 
                            </Button>
                            
                        </Grid>

                       
                    </Grid>
                </Container>
                
                <Snackbar open={openSnackError} autoHideDuration={6000} onClose={ e =>  closeOpenSnackError() }>
                    <Alert onClose={closeOpenSnackError} severity="error">
                        <span className="monserrat700">  { textMessageFail } </span>
                    </Alert>
                </Snackbar>
            </>
    ) : (
        <SpinnerLoad/>
    )
}


export default withRouter( Odontogram ) ;