import React, { useState} from 'react';

import { Card ,
        CardContent ,
        Grid , 
        Button, 
        Input , 
        Typography, 
        InputLabel, 
        InputAdornment 
} from '@material-ui/core/';

import   Title from '../components/Title';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import   AccountCircle from '@material-ui/icons/AccountCircle';
import { SignIn } from '../services/Login';
import { AddItemJson, GetItemJson } from '../libs/Storage';

function Home (props) {  

    let [rut, setRut] = useState('') ;
    let [password, setPassword] = useState('') ; 

    //const [ user   , setUser   ]  =  useState( {} ) ;

    const [ textFailRut   , setTextFailRut   ]  =  useState( false ) ;
    const [ textFailPass  , setTextFailPass  ]  =  useState( false ) ;
    const [ textFailSigIn , setTextFailSigIn ]  =  useState( false ) ;
    const [ statusButtonSignIn , setStatusButtonSignIn ]  =  useState( false ) ;
    const [ textButtonSignIn , setTextButtonSignIn ]  =  useState( 'Acceder' ) ;



    const signIn = async () => {

        setStatusButtonSignIn(true) ;
        setTextButtonSignIn( 'Autenticando...' ) ;
        
        const isValidate = validate() ;

        if( !isValidate ){
            setStatusButtonSignIn(false);
            setTextButtonSignIn( 'Acceder' ) ;
            return false ;
        } 
            

        const user = { rut , password } ;

        const isAuth = await  SignIn( user ) ;

        console.log('isAuth' , isAuth);
        if( !isAuth.auth ){
            setTextFailSigIn(true) ;
            setStatusButtonSignIn(false) ;
            setTextButtonSignIn( 'Acceder' ) ;
            return false ;
        }
        await AddItemJson( 'user' , isAuth.auth.data ) ;
        props.history.push('/dashboard')
        
        
    }

    const validate = () => {

        if( rut == '' ){
            setTextFailRut( true);
            return false ;
        }
        setTextFailRut( false );

        
        if( password == '' ){
            setTextFailPass( true);
            return false ;
        }

        setTextFailPass( false );

        return true
    }

    return (
        <>
            <Grid container  >

                <Grid item xs = {12} md = {12} lg = {12} >
                    <Title title={'Autenticar'}/>
                </Grid>
                    
                <Grid item xs = {11}  md = {5} lg = {5} >

                    <Card style={ { marginTop : '50px '} }>
                        <CardContent>
                            <Grid container  spacing={2}>
                                
                                <Grid item xs = {12} md = {12} lg = {11} >

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

                                </Grid>
                                    { (textFailRut ) &&    <Typography variant="subtitle1" style={ styleTextFail } > Debe agregar su rut  </Typography>   }   

                                <Grid item xs = {12} md = {12} lg = {12} >

                                <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                                    <Input
                                        fullWidth
                                        id="input-with-icon-adornment"
                                        type="password"
                                        onChange={ e => setPassword( e.target.value ) } 
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                    />

                                    { (textFailPass) &&    <Typography variant="subtitle1" style={ styleTextFail }>  Debe agregar una constraseña </Typography>   }   

                                   
                                </Grid>

                                <Grid item xs = {12} md = {12} lg = {12} >
                                    <Typography variant="body2" gutterBottom>
                                        Para recuperar contraseña presione <Link  to = "/recoverypass"  className="navLink  " > aquí  </Link>
                                    </Typography>
                                </Grid>

                                <Grid item xs = {12} md = {12} lg = {12} >

                                { (textFailSigIn) &&  <Typography variant="subtitle1" style={ styleTextFail }>  Usuario o contraseña invalida. </Typography>   }   

                                    <Button 
                                        fullWidth 
                                        variant="contained" 
                                        color="primary"
                                        onClick = { e =>  signIn() }
                                        disabled = { statusButtonSignIn }
                                    > 
                                        { textButtonSignIn } 
                                    </Button>
                                </Grid>

                            </Grid>
                        </CardContent>
                    </Card>
                  
                </Grid>

            </Grid>
        </>
        
    
  );
}

const styleTextFail = {
    color : 'red' 
}



export default withRouter( Home )  ;