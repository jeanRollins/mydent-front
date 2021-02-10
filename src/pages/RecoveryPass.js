import React, { useState, useEffect} from 'react';

import {
  Card,
  CardContent,
  Grid,
  Container,
  Button,
  Input,
  Typography,
  InputLabel,
  InputAdornment
} from '@material-ui/core/';
import {RecoveryPassword} from '../services/Login' 
import { ValidateRut } from '../libs/Commons';
import ImagePrincipal from '../components/ImagePrincipal';
import   AccountCircle from '@material-ui/icons/AccountCircle';

const styles = { 
  itemMarginTop : {
      marginTop : '15px'
  },

};

const styleTextFail = {
  color : 'red' 
}


function RecoveryPass() {

  const [ rut, setRut ] = useState('') ;
  const [ rutFail, setRutFail ] = useState( false ) ;
  const [ recoveryTrue, setRecoveryTrue ] = useState( false ) ;

  const [ statusButtonSignIn , setStatusButtonSignIn ]  =  useState( false ) ;
  const [ textButtonSignIn , setTextButtonSignIn ]  =  useState( 'Recuperar' ) ;
  const [ textFail , setTextFail ]  =  useState( '' ) ;

  const recovery  =  async  e  =>  {
    e.preventDefault() ;

    if( rut == '' ){
      setRutFail( true ) ;
      setTextFail('Debe agregar un rut') ;
     return false ;
    }
    setRutFail( false ) ;

    const validRut = await ValidateRut( rut ) ;
    
    if( !validRut ){
      setRutFail( true ) ;
      setTextFail('El rut no es valido') ;
      return false ;
    }

    setRutFail( false ) ;

    const responseRecovery = await RecoveryPassword( rut ) ;
    if( !responseRecovery.response ){
      setRutFail( true ) ;
      setTextFail('No se pudo recuperar cuenta') ;
      return false ;
    }
    setRecoveryTrue( true ) ;
  } 

  useEffect(() => {
  }, [])

  const changeStatusButton = () => {
    console.log('statusButtonSignIn' , statusButtonSignIn)
    if(  !statusButtonSignIn ){
          setStatusButtonSignIn( true );
          setTextButtonSignIn('Recuperando...') ;
    }
    else{
      setStatusButtonSignIn( false );
      setTextButtonSignIn('Recuperar') ;
    } 
}


  return (
    <>  
        <Container fixed>
              <Grid container  >

              <ImagePrincipal
                  title={'Recuperar contraseña'}
              />
                  
              <Grid item xs = {12}  md = {12} lg = {12} >

                <form action="" >
                  <Grid container  spacing={2} style={styles.itemMarginTop}>
                    <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                        <InputLabel htmlFor="input-with-icon-adornment">Ingrese Rut</InputLabel>
                        <Input
                            fullWidth
                            placeholder="ej: 18191387-8"
                            id="input-with-icon-adornment"
                            onChange={ e => setRut( e.target.value ) } 
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                      { ( rutFail) &&  <Typography variant="subtitle1" style={ styleTextFail }> { textFail} </Typography>   }
                    </Grid>
                  </Grid>

                  <Grid container  spacing={2}>

                    <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                      {(recoveryTrue) ? (
                        <>
                          <h3 align="center" style={{color: 'green'}}> Se ha enviado un correo para la recuperación de su cuenta</h3>
                        </>
                      ) : (
                        <>
                          <Button 
                            fullWidth 
                            variant="contained" 
                            color="primary"
                            style = {{ marginTop : '10px' }}
                            onClick = { e =>  recovery(e) }
                            disabled = { statusButtonSignIn }
                          > 
                              { textButtonSignIn } 
                          </Button>
                        </>
                      )}
                      
                    </Grid>

                  </Grid>
                </form>
                  

              </Grid>

          </Grid>
        </Container>

    </>
  );
}

export default RecoveryPass;