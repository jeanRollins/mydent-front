import React, { useEffect , useState} from 'react'
import Title from '../components/Title';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableResponsive from '../components/Table';

import {
    Grid,
    Button,
    Input,
    InputAdornment,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    Container,
    TablePagination,
    Paper,

} from '@material-ui/core/';
import SpinnerLoad from '../components/SpinnerLoad';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { Link , withRouter} from 'react-router-dom'
import { ValidSession } from '../libs/Session';
import { GetItemJson } from '../libs/Storage';
import { getUserAndPacient } from '../services/Users';
import {
    CellParams,
    GridApi
  } from "@material-ui/data-grid";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    margin: {
        margin: theme.spacing(1),
    },
    link : {
        textDecoration: 'none' ,
        color  : 'blue'
    }
}));

const Pacient = props => {

    const fetch = async () => {
        const us = await GetItemJson('user') ;
        const patientsFounded = await  getUserAndPacient( us.rut ) ;

        setUser( us ) ; 
        setPatient( patientsFounded.data.patients ) ;
    }

    const [user, setUser] = useState( false );
    const [patiens, setPatient] = useState(false);

    const classes = useStyles();
 
    const columns = [
        { field: 'rut',                 headerName: 'Rut'     , width: 150  } ,
        { field: 'nombres',             headerName: 'Nombre' , width: 250  } ,
        { field: 'apellido_paterno',    headerName: 'Apellido Paterno'   , width: 200  } ,
        { field: 'name_prevision',      headerName: 'Previsión'   , width: 200  } ,
        { 
            field: 'rut',     
            headerName: 'Ver Ficha' , 
            width: 200 ,
            disableClickEventBubbling: true ,
            renderCell: ( params: CellParams ) => {
                const onClick  = () => {
                    const api: GridApi = params.api;
                    const fields = api
                      .getAllColumns()
                      .map((c) => c.field)
                      .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {} ;
                    fields.forEach((f) => {
                      thisRow[f] = params.getValue(f);
                    });
    
                    props.history.push('/back/ficha_medica/' + thisRow.rut )
                }
    
                return(
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon = {<AssignmentOutlinedIcon />}
                            onClick   = { e => onClick() } 
                        >
                            <span className="monserrat500"> Ver ficha </span>
                        </Button>    
                        
                    </>
                  
                )  ;
            }
        } 
    ];
    

    useEffect( () => {
        fetch() ;
        ValidSession('back') ;
    },[])
    return  ( patiens !== false && user !== false) ? (
        <>
            <Title title="Pacientes" />

            <Container fixed>
                <Grid container spacing={2}>
                    <Grid 
                        item
                        xs = { 12 }
                        sm = { 12 }    
                        md = { 7 }    
                        lg = { 7 }    
                        xl = { 7 }    
                    >
                         <Link to = {'/back/agregar_paciente'} className={ classes.link} >
                            Agregar Paciente    
                        </Link>
                        
                    </Grid>

                    <Grid 
                        item
                        xs = { 12 }
                        sm = { 12 }    
                        md = { 5 }    
                        lg = { 5 }    
                        xl = { 5 }    
                    >
                       <Input
                            fullWidth
                            placeholder="Ej: Luis Tapia"
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    
                </Grid>

              
            </Container>


            <Container fixed>
                

                <Grid container spacing={2}>
                    <Grid 
                        item
                        xs = { 12 }
                        sm = { 12 }    
                        md = { 12 }    
                        lg = { 12 }    
                        xl = { 12 }    
                    >
                        <TableResponsive 
                            rows     = { patiens }
                            columns  = { columns   }
                            selected = { false  }
                        />
                        
                    </Grid>

                   
                    
                </Grid>
              
            </Container>
        </>
    ) : (
        <SpinnerLoad/>
    )
}

export default withRouter( Pacient ) ;
