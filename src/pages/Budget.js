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
    Button  
  }  from '@material-ui/core/';

import {
    CellParams,
    GridApi
  } from "@material-ui/data-grid";

import SpinnerLoad from '../components/SpinnerLoad';
import {  GetTratament , GetSpecialty } from '../services/Specialty';
import { ValidSession } from '../libs/Session';

const styles = {
    width : {
        width : '90%'
    }
}

const Budget = props => {

    ValidSession('back') ;

    const [ specialties , setSpecialties ] = useState( false ) ;
    const [ specialty , setSpecialty ] = useState('') ;

    const [ trataments , setTrataments ] = useState([]) ;
    const [ tratament , setTratament ] = useState([]) ;

    const fetch = async () => {
        const specialtyFounded = await GetSpecialty() ;
        console.log('specialtyFounded' , specialtyFounded) ;
        setSpecialties( specialtyFounded ) ;
    }

    const fetchTratament = async spec => {
        setSpecialty(spec);
        const tratamentsFounded = await GetTratament( spec ) ;
        setTrataments( tratamentsFounded ) ;
    }

    const btn = () =>{

        return (
            <button>Hola</button>
        );
    }

    const rows = [
        { 
            id: 1, 
            specialty: 'Periodoncia',   
            tratament: 'Revisión cuadrante',    
            value: '$30.990' , 
            actions :  ''
        },
        { id: 2, specialty: 'Periodoncia',  tratament: 'Control Gingivitis',    value: '$35.990' },
        { id: 3, specialty: 'Periodoncia',  tratament: 'Control Limpieza',    value: '$10.990' },
        { id: 4, specialty: 'General',      tratament: 'Limpieza base',    value: '$24.990' },
        { id: 5, specialty: 'General',      tratament: 'Barniz fluor',    value: '$9.990' },
        { id: 6, specialty: 'Odontopediatría', tratament: 'Extracción temporal',    value: '$15.990' },
        { id: 7, specialty: 'Odontopediatría',   tratament: 'Tapadura temporal',    value: '$12.990' },
        { id: 8, specialty: 'Cirujía',    tratament: 'Extracción simple',    value: '$27.990' },
        { id: 9, specialty: 'Cirujía',      tratament: 'Extracción compleja',    value: '$42.990' },
    ] ; 

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
                const onClick = () => {
                    console.log('click');
                };
          
                return(
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                    >
                    <span className="monserrat500"> Borrar </span>
                  </Button>
                )  ;
              }
        } ,


        
    ];

    useEffect(() => {
        
        fetch() ;
    }, [])

    return ( specialties !== false ) ? (
        <>
            <Title title = { "Valores Presupuesto" } />


            <Container fixed>

                <Grid container spacing={1}  style={{ marginTop : '50px' }} alignItems="flex-end" >

                    <Grid  
                        item 
                        xs = { 12 }
                        sm = { 12 } 
                        md = { 3 } 
                        lg = { 4 } 
                        xl = { 4 } 
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
                            <TextField type="number" id="standard-basic" label="Precio" />
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

                        <Button variant="contained" color="primary">
                            <span className="monserrat400">Agregar </span>
                        </Button>
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
                            rows     = {rows}
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

export default Budget ;