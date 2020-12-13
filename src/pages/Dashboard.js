import React, {useState , useEffect} from 'react';
import Title from '../components/Title';
import { GetItemJson } from '../libs/Storage';

import  Grid  from '@material-ui/core/Grid';
import TableResponsive from '../components/Table';
import { DayCurrent } from '../libs/Commons';
import { ValidSession } from '../libs/Session';
import SpinnerLoad from '../components/SpinnerLoad';


const styles = { 

    paddingCenter : {

        padding : '0px 15px 0px 15px ', 

    } 
};

function Dashboard () {  

    const [user, setUser] = useState( false ) ;

    ValidSession('back') ;
    
    const rows = [
        { id: 1, name: 'Jon Snow',   time: '09:00',    status: 'Atendido' },
        { id: 2, name: 'Lannister',  time: '09:30',    status: 'Atendido' },
        { id: 3, name: 'Lannister',  time: '10:00',    status: 'Atendido' },
        { id: 4, name: 'Stark',      time: '10:30',    status: 'Atendido' },
        { id: 5, name: 'Targaryen',  time: '11:00',    status: 'Atendido' },
        { id: 6, name: 'Melisandre', time: '11:30',    status: 'Atendido' },
        { id: 7, name: 'Clifford',   time: '12:00',    status: 'Atendido' },
        { id: 8, name: 'Frances',    time: '12:30',    status: 'Atendido' },
        { id: 9, name: 'Roxie',      time: '13:00',    status: 'Atendido' },
    ] ; 

    const columns = [
        { field: 'id',      headerName: 'N°'     , width: 60 },
        { field: 'time',    headerName: 'Hora'   , width: 100 },
        { field: 'name',    headerName: 'Nombre' , width: 150  },
        { field: 'status',  headerName: 'Estado' , width: 100 }
    ];

    const fetch = async () => {
        const data = await GetItemJson('user') ;
        console.log('====================================');
        console.log('data' , data);
        console.log('====================================');
        setUser( data ) ;
    }

    useEffect( () => {
        fetch() ;
    },[])
    
    return ( user !== false ) ? (
        <>
            <Title title={ 'Dr. ' + user.nombres  } />

            <Grid container spacing={3}>
                <Grid 
                    item 
                    md = { 2 } 
                    lg = { 3 } 
                    xl = { 3 } 
                    >
                   
                </Grid>
                <Grid 
                    item 
                    xs = {11} 
                    sm = { 11 } 
                    md = { 5 } 
                    lg = { 5 } 
                    xl = { 5 } 
                    style={styles.paddingCenter} 
                >
                     <Title 
                        title = { 'Agenda ' + DayCurrent() } 
                        type  = { 'secondary' }    
                    />
                    <TableResponsive 
                        rows     = {rows}
                        columns  = {columns} 
                        selected = { false }
                    />
                </Grid>
            </Grid>
        </>
        
    
  ) : (
      <SpinnerLoad/>
  );
}



export default Dashboard  ;