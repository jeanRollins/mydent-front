import React from 'react';
import  {
    Grid        ,
    Container   
  }  from '@material-ui/core/';
import MediaQuery from '../libs/MediaQuery';
import ImagePrincipal from '../components/ImagePrincipal';


const styles = {

    text :{
        lineHeight : '1.6' ,
        padding : '0px 22px 0px 22px ',
        marginTop : '30px' ,
        textAlign : 'center'
    }
} ;

export default function Welcome(  ) {  

    const Mobile  =  MediaQuery('mobile') ;
    const Tablet  =  MediaQuery('tablet') ;
    const Desktop =  MediaQuery('desktop') ;

    return (
        <>
            <Container fixed>

                <Grid 
                    container 
                >
                    <ImagePrincipal
                        title={'Bienvenido'}
                    />
                   

                    <Grid 
                        item 
                        xl = { 12 }
                    >
                        <p 
                            style = { styles.text }
                            className="monserrat400"
                        >
                            Odontología de gestión y automatización de la práctica odontológica: 
                            tareas de consultorio, procesos de tratamiento de pacientes. 
                            Todas las tareas dentales y las capacidades de software en cualquier web.
                        </p>    
                    </Grid>

                    
                </Grid>
            
            </Container>
        </>
    );
}

