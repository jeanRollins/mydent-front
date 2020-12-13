import React , { useState , useEffect } from 'react' ;
import Title from '../components/Title';
import  {
    Grid        , 
    Container   ,
    Button   
  }  from '@material-ui/core/';
import { ScheduleComponent , Inject , Day , Week, Month, Agenda } from '@syncfusion/ej2-react-schedule';
import { ValidSession } from '../libs/Session';

const Schedule = props => {

    ValidSession('back') ;
    return(
        <>
         
            <Title title={ 'Agenda' } />
            
            <Container fixed>
                <Grid container spacing={3}>

                    <Grid 
                        item 
                        xs = { 12 } 
                        sm = { 12 } 
                        md = { 12 } 
                        lg = { 12 } 
                        xl = { 12 } 
                    >
                        <ScheduleComponent currentView="Day">
                            <Inject services={ [Day , Week, Month, Agenda] }/>
                        </ScheduleComponent>
                    </Grid>
                </Grid>
            
            </Container>
         
        </>
    )
}

export default Schedule ;