import React, { useEffect, useState, useRef } from 'react'
import Title from '../components/Title';
import SpinnerLoad from '../components/SpinnerLoad';
import './odontogram/dent.css' ;

import { Link, useParams, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { GetItemJson } from '../libs/Storage';
import { format, rutFormater } from '../libs/Commons';
import { ValidSession } from '../libs/Session';
import { GetItemBudget, } from '../libs/Budget';
import { UpdateStateItem } from '../services/Budget';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import { 
    Container, 
    Avatar, 
    IconButton, 
    Select, 
    MenuItem, 
    Button, 
    DialogTitle ,
    DialogContent ,
    DialogContentText ,
    DialogActions  ,
    Dialog ,
    Grid ,
    Box
} from '@material-ui/core'

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



const BudgetShow = () => {

    const { idBudget } = useParams();
    const classes = useStyles();
    const [ user, setUser ] = useState( false );
    const [ patient, setPatient ] = useState(false);
    const [ itemsBudget, setItemsBudget] = useState( false );
    const [ open, setOpen ] = useState(false);
    const [ idItem, setIdItem ] = useState('');
    const [ totalValue, setTotalValue ] = useState(false);


    const toothsRefs= useRef([{}]);

    const quadrant = [ 'up', 'center', 'bootom', 'left' , 'right'];

    const tooths = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = id => {
        handleClickOpen() ;
        setIdItem( id ) ;
    };


    const fetch = async () => {
        const us = GetItemJson('user') ;
        const data = await GetItemBudget( idBudget , us.rut ) ;
        setPatient( data.patient ) ;
        setItemsBudget( data.items ) ;
        setUser( us ) ;
        fetchTooths( data.dataTrataments ) ;
        let val = 0 ;
        data.items.forEach( row => val = val + row.value ) ;
        setTotalValue( format( val ) ) ;
    }



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

    const changeStateItemBudget = async () => {

        const responseUpd = await UpdateStateItem(idItem) ;
        if( responseUpd.action ) {
            setItemsBudget(false) ;
            fetch() ;
            handleClose() ;
        }
    };

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
                            xs = { 3 }
                            sm = { 3 }
                            md = { 3 }
                            lg = { 3 }
                            xl = { 3 }
                        >
                            <div className={classes.listItem}>
                                { row.nameSpeciality }
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
                               Cara : { row.faceTooth }
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
                                { '$' + format( row.value ) }
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
                            { ( row.stateTratament === 1 ) ? (
                                <IconButton  edge="end" aria-label="delete" onClick={ e => handleChange( row.idItem ) } style={{ margin: '0px 0px 0px 0px' }}>
                                    <NoteAddOutlinedIcon />
                                </IconButton>
                            ) : (
                                <div className={classes.listItem}>
                                    Realizado : { row.dateCompleted }
                                </div>
                            )}
                            
                        </Grid>
                    </Grid>            
                ))}
            </>
        )
    }

    const fetchTooths = dataTrataments => {
        
        dataTrataments.forEach( ( value, key ) => {
            if( key === 0 ) return ;
            
        
            if( value.typeSpecialty === 'sector' ){
                printToothSector( toothsRefs.current[key][value.faceTooth] , value.class ) ;
                return ;
            }
            if( value.typeSpecialty === 'piece' ){
                printTooth( value.tooth, value.class  ) ;
                return
            }
        })

    }
    useEffect(() => {
        fetch();
        ValidSession('back') ;
    }, []);


    const Tooths = () => {

        return (
            <>
                { tooths.map( tooth => (
                    <div  
                        key       = { tooth } 
                        className = "diente noPrint"  
                    >
                        <p align="center" >
                            {tooth}
                        </p>
                        <div
                            ref={ r => toothsRefs.current[tooth] = { up : r } } 
                            className={`cuadro`}
                        >
                        </div>
    
                        <div
                            ref={ r => toothsRefs.current[ tooth ] = {...toothsRefs.current[ tooth ], left : r }  } 
                            className={`cuadro izquierdo `} 
                        >
                        </div>
                        <div
                            ref={ r => toothsRefs.current[ tooth ] = {...toothsRefs.current[ tooth ], bootom : r }  } 
                            className={`cuadro debajo `} 
                        >
                        </div>
                        <div
                            ref = { r => toothsRefs.current[ tooth ] = {...toothsRefs.current[ tooth ], right : r }  } 
                            className = {`cuadro derecho `}
                        >
                        </div>
                        <div
                            ref = { r => toothsRefs.current[ tooth ] = {...toothsRefs.current[ tooth ], center : r }  } 
                            className = {`centro `}>
                        </div>
    
    
                    </div>
                ) ) }
              
            </>
        )
    }

    return  ( user  !== false )   &&
            ( patient !== false )  &&
            ( itemsBudget  !== false )  
            ? (
            <>
                <Dialog
                    open={open}
                    onClose={ handleClose }
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        ¿Desea cambiar de estado a realizado?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Se cambiará item a atendido.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={ e => changeStateItemBudget() } color="primary">
                            Si
                        </Button>
                    </DialogActions>
                </Dialog>
                <Title title="Presupuestos" />

            
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
                            Nombre : { patient.name }

                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={3}
                            lg={3}
                            xl={3}
                        >
                            Previsión  : { patient.namePrevision }

                        </Grid>


                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={3}
                            lg={3}
                            xl={3}
                        >
                            Dr  : { user.nombres }

                        </Grid>
                        




                    </Grid>


                </Container>

                <Container className={classes.margin} >

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
                <Container fixed >
                    
                    {RenderItems()}
                </Container>
                 <Container className={classes.margin} >

                    <Grid container>
                        <Grid
                            item
                            xs={6 }
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                        >
                            <Box justifyContent="center">
                                <h1 align="center">Total : ${totalValue} </h1> 

                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={6 }
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                        >
                            <Box justifyContent="center"> 
                                <div className  = " noPrint" >
                                    <Button 
                                        align      = "center"  
                                        className  = "btnPrimary noPrint" 
                                        variant    = "contained" 
                                        onClick    = { e => window.print() } 
                                        color      = "primary"
                                        style      = {{ marginTop: '23px' }}
                                    >
                                        Imprimir
                                    </Button>
                                </div>
                                
                            </Box>
                        </Grid>

                    </Grid>
                </Container>
                
            </>
    ) : (
        <SpinnerLoad/>
    )
}


export default  BudgetShow ;