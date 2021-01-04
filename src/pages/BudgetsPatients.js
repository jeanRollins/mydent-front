import React, { useEffect, useState } from 'react' ;
//Commons
import { ValidSession } from '../libs/Session';
import { GetItemJson } from '../libs/Storage';
import Title from '../components/Title';
import SpinnerLoad from '../components/SpinnerLoad';

import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import {  useParams, withRouter } from 'react-router-dom';
import TableResponsive, { GetRowCurrent } from '../components/Table';
import { GetBudgets } from '../libs/Budget' ;
import {
    Container,
    Grid,
    IconButton,
    Box
} from '@material-ui/core';

import {
    rutFormater
} from '../libs/Commons';
import { GetPatient } from '../services/Patient';

import PostAddIcon from '@material-ui/icons/PostAdd';

const BudgetsPatients = (props) => {

    const { rutPatient } = useParams();
    const [ user, setUser ] = useState(false);
    const [ patient, setPatient ] = useState(false);
    const [ budgets, setBudgets ] = useState(false);

    const columns = [
        { field: 'number', headerName: 'N°', width: 70, },
        { field: 'id', headerName: 'ID', width: 70, },
        { field: 'rutPatientFormat', headerName: 'Rut paciente', width: 150 },
        { field: 'name',    headerName: 'Paciente', width: 300 },
        { field: 'created', headerName: 'Creado', width: 250 },
        { 
            field: 'action',  
            headerName: 'Ver presupuesto' , 
            width: 200 , 
            disableClickEventBubbling: true,
            renderCell: (params) => {
                
                return(
                    <Box display="flex" justifyContent="center" >
                        <IconButton 
                            onClick  = { e => GoToBudget( params ) } 
                        >
                            <DescriptionOutlinedIcon fontSize="large" />
                        </IconButton>
                    </Box>
                )  ;
            }
        } 
    ];

    const GoToBudget  = params => {
        const thisRow = GetRowCurrent(params) ;
        props.history.push('/back/budget/' + thisRow.id ) ;
    }

    const fetch = async () => {
        const us = await GetItemJson('user');
        const dataBudgets = await GetBudgets( us.rut , rutPatient );

        const patientFounded = await GetPatient(rutPatient);
      
        setPatient(patientFounded.data);
        setBudgets( dataBudgets.budgets ) ;
        setUser(us);
    }

    const GoToAddBudget = async rut => {
        console.log( 'rut' , rut )

        props.history.push('/back/odontograma/' + rut ) ;

    }


    useEffect(() => {
        fetch() ;
        ValidSession('back') ;
    }, [])
    

    return (patient !== false && user !== false &&  budgets !== false) ? (
        <>

            <Title title="Presupuestos" />

            
            <Container fixed>

                <Grid container spacing={1} style={{ marginTop: '50px' }} alignItems="center" >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={3}
                        xl={3}
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
                        Nombre : { patient.nombres + ' ' + patient.apellido_paterno + ' ' + patient.apellido_materno }

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        xl={3}
                    >
                        Previsión  : { patient.name_prevision }

                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        xl={2}
                    >
                        <IconButton onClick={ e => GoToAddBudget( patient.rut ) } >
                            <PostAddIcon fontSize="large" />
                        </IconButton>

                    </Grid>

                </Grid>


            </Container>

            <Container fixed>

                <Grid container spacing={1} alignItems="flex-end">

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}


                        style={{ marginTop: '50px', marginBottom: '50px' }}
                    >
                        <TableResponsive

                            rows={budgets}
                            columns={columns}
                            selected={false}

                        />

                    </Grid>
                </Grid>

            </Container>
        </>

    ) : (
        <SpinnerLoad />
    )
}

export default withRouter( BudgetsPatients ) ;   
