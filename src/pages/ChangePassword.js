import React, { useState, useEffect } from 'react';
import { useParams, withRouter } from "react-router-dom";

import {
  Grid,
  Container,
  Button,
  Input,
  Typography,
  InputLabel,
  InputAdornment ,
  Box
} from '@material-ui/core/';
import ImagePrincipal from '../components/ImagePrincipal';
import { ValidTokenEmail,ChangePass} from '../services/Login' 
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const styles = { 
  itemMarginTop : {
      marginTop : '15px'
  },

};

const styleTextFail = {
  color : 'red' 
}


function ChangePassword( props ) {
    const { mailToken } = useParams() ;

    const [ isValid, setIsValid ] = useState( false ) ;
    const [ passChange, setPassChange ] = useState( false ) ;

    const [ password1, setPassword1] = useState('') ; 
    const [ password2, setPassword2] = useState('') ; 
    const [ textFail, setTextFail ]  = useState('') ; 
    
    
    const [ textFailPass  , setTextFailPass  ]  =  useState( false ) ;


    const [ statusButtonSignIn , setStatusButtonSignIn ]  =  useState( false ) ;
    const [ textButtonSignIn , setTextButtonSignIn ]  =  useState( 'Actualizar' ) ;

    const fetch  =  async ()  =>  {

        if( mailToken == '' || mailToken == undefined ){
            setIsValid( false ) ;
            return false ;
        }

        const valid = await ValidTokenEmail( mailToken ) ;
        setIsValid( (valid.response) ) ;
    } 

    const changeStatusButton = () => {
        if(  !statusButtonSignIn ){
            setStatusButtonSignIn( false );
            setTextButtonSignIn('Actualizar') ;
        }
        else{
            setStatusButtonSignIn( true );
            setTextButtonSignIn('Actualizando...') ;
        } 
    }

    const goToLogin = () => {
        props.history.push('/login') ;
    }

    const send  =  async ()  =>  {
        changeStatusButton() ;

        if( password1 == '' && password2 == ''  ) {
            setTextFailPass( true ) ;
            setTextFail("Contraseñas requeridas") ;
            changeStatusButton() ;

            return false ;
        }
        setTextFailPass( false ) ;

        if( password1 != password2 ) {
            setTextFailPass( true ) ;
            setTextFail("Las contraseñas deben coincidir") ;
            changeStatusButton() ;
            return false ;
        }

        setTextFailPass( false ) ;

        const responseChangePassword = await ChangePass( mailToken , password1, password2 ) ;
        console.log('responseChangePassword' , responseChangePassword) ;

        if( !responseChangePassword.response ){
            setTextFailPass( true ) ;
            setTextFail("Hubo un problema al cambiar contraseña, intente más tarde") ;
            changeStatusButton() ;
            return false ;
        }

        setPassChange( true ) ;

    } 

    useEffect( () => {
        fetch() ;   
    }, [] ) ;


  return (
    <>  
        <Container fixed>
                <Grid container  >

                <ImagePrincipal
                    title={'Recuperar contraseña'}
                />
                { (!isValid) ? (
                    <Grid item xs = {12}  md = {12} lg = {12} >
                        <h1 align="center"> Token No Válido </h1> 
                    </Grid>
                ): (
                    <> 
                        {(passChange) ? (
                            <>
                             <Grid item xs = {12}  md = {12} lg = {12} >
                
                                <h1 align="center" style={{ color : 'green'}}> Contraseña se ha cambiado con éxito  </h1> 
                        
                                <div  align="center">
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        style = {{ marginTop : '10px' }}
                                        onClick = { e =>  goToLogin() }
                                    
                                    > 
                                        Ir a login 
                                    </Button>    
                                </div>
                                
                            </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs = {12}  md = {12} lg = {12} >

                                    <form action="" >
                                        
                                        <Grid container style={styles.itemMarginTop} spacing={2}>

                                            <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                                            <Grid  item xs = {10} md = {4} lg = {4} >

                                                <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                                                    <Input
                                                        fullWidth
                                                        id="input-with-icon-adornment"
                                                        type="password"
                                                        onChange={ e => setPassword1( e.target.value ) } 
                                                        startAdornment={
                                                            <InputAdornment position="start">
                                                                <VpnKeyIcon />
                                                            </InputAdornment>
                                                        }
                                                />

                                            </Grid>
                                        </Grid>

                                        <Grid container style={styles.itemMarginTop} spacing={2}>

                                            <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                                            <Grid  item xs = {10} md = {4} lg = {4} >

                                                <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                                                <Input
                                                    fullWidth
                                                    id       = "input-with-icon-adornment"
                                                    type     = "password"
                                                    onChange = { e => setPassword2( e.target.value ) } 
                                                    startAdornment = {
                                                        <InputAdornment position="start">
                                                            <VpnKeyIcon />
                                                        </InputAdornment>
                                                    }
                                                />

                                                { (textFailPass) &&    <Typography variant="subtitle1" style={ styleTextFail }>  {textFail} </Typography>   }   

                                                
                                            </Grid>
                                        </Grid>


                                        <Grid container  spacing={2}>

                                            <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                                            <Grid  item xs = {10} md = {4} lg = {4} >

                                            
                                                <Button 
                                                    fullWidth 
                                                    variant="contained" 
                                                    color="primary"
                                                    style = {{ marginTop : '10px' }}
                                                    onClick = { e =>  send(e) }
                                                    disabled = { statusButtonSignIn }
                                                > 
                                                    { textButtonSignIn } 
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </>
                        )}
                      
                    </>
                )}  
             
            </Grid>
        </Container>

    </>
  );
}

export default withRouter( ChangePassword );