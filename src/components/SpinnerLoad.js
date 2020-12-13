import React from 'react' ;
import  {
    Grid        , 
    Container   ,
    Box         ,
    CircularProgress   
  }  from '@material-ui/core/';

const SpinnerLoad = () => {

    return (
           <Container fixed >

                <Grid 
                    container  
                    spacing={0} 
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ marginTop: '140px' }}    
                >

                    <CircularProgress  />
                    <p> Cargando... </p>
                

                </Grid>

            </Container>
    )
}

export default SpinnerLoad ;