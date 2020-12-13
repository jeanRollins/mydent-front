import React , {useState} from 'react' ;
import  {
    Grid        , 
    Container   ,
    Button   ,
    InputLabel  ,
    Input       ,
    InputAdornment
  }  from '@material-ui/core/';
import ImagePrincipal from '../components/ImagePrincipal';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SendIcon from '@material-ui/icons/Send';
import { ValidSession } from '../libs/Session';
import { GetItemJson } from '../libs/Storage';
import { AddUser } from '../services/Users';

const styles = {
    itemInput: {
        marginTop : '20px'
    },
    alertFail : {
        color : '#aa2e25'
    }
} ;

export default function RegisterLast(  ) {  

    ValidSession() ;

    const [ password1 , setPassword1 ] = useState('') ;
    const [ password2 , setPassword2 ] = useState('') ;

    const [ title , setTitle ] = useState( 'Ingrese Contraseña' ) ;


    const [ textEmptyPassword1 , setTextEmptyPassword1 ] = useState( false ) ;
    const [ textEmptyPassword2 , setTextEmptyPassword2 ] = useState( false ) ;
    const [ textLengthPassword1 , setTextLengthPassword1 ] = useState( false ) ;
    const [ textIncorrectPassword , setTextIncorrectPassword ] = useState( false ) ;
    const [ textNotValidUserCreate , setTextNotValidUserCreate ] = useState( false ) ;

    const [ addUserValid , setAddUserValid ] = useState( true ) ;



    const [ disabledButtonRegister, setDisabledButtonRegister ] = useState( false );
    const [ textButtonRegister, setTextButtonRegister ] = useState( 'REGISTRAR' );


    const originalStateButton = ( ) => {
        setDisabledButtonRegister(false) ;
        setTextButtonRegister('REGISTRAR')
    }

    const activeStateButton = ( ) => {
        setDisabledButtonRegister(true) ;
        setTextButtonRegister('VALIDANDO...')
    }

    const validateForm = () => {

        setTextLengthPassword1(false) ;
        setTextIncorrectPassword( false ) ;
        setTextNotValidUserCreate(false) ;

 
        if( password1 == '' ){
            setTextEmptyPassword1(true) ;
            return false ;
        }  
        setTextEmptyPassword1(false) ;


        if( password2 == '' ){
            setTextEmptyPassword2(true) ;
            return false ;
        }  
        setTextEmptyPassword2(false) ;

        if( password1.length < 7 ){
            setTextLengthPassword1(true) ;
            return false ;
        } 

        setTextLengthPassword1(false) ;


        if( password1 != password2 ){
            setTextIncorrectPassword(true) ;
            return false ;
        } 
        setTextIncorrectPassword( false ) ;

        return true ;
    }

    const register =  async () => {
        activeStateButton() ;
        const validForm = await validateForm() ;

        if( !validForm ) {
            originalStateButton() ;
            return false ;
        }
        
        const registerData     =  await GetItemJson('register') ;
        
        registerData.password  =  password1 ;

        const responseAdd = await AddUser( registerData ) ;

        if(!responseAdd.valid){
            setTextNotValidUserCreate( true ) ;
            return false ;
        }

        setAddUserValid(false) ;
        setTitle('Registro valido!') ;
        originalStateButton() ;

    } 


    return (
        <>
            <Container fixed>

                <Grid 
                    container 
                >
                    
                   <ImagePrincipal
                        title={title}
                   />

                </Grid>

                { (addUserValid) ? (
                    <>
                        <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                    <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                        <InputLabel htmlFor="input-with-icon-adornment" >Contraseña</InputLabel>
                        <Input
                            fullWidth
                            type={'password'}
                            id="input-with-icon-adornment"
                            onChange = {  e  => setPassword1( e.target.value ) }
                            startAdornment={
                                <InputAdornment position="start">
                                <VpnKeyIcon />
                                </InputAdornment>
                            }
                        />
                        <small> Debe ser mayor a 6 caracteres </small>

                        { ( textEmptyPassword1 )  &&  <p style={ styles.alertFail } > Debe ingresar una contraseña  </p> }
                        { ( textLengthPassword1 )   &&  <p style={ styles.alertFail } > Debe ingresar contraseña mayor a 6 caracteres  </p> }
                    </Grid>
                </Grid>

                        <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                            <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                            <Grid  item xs = {10} md = {4} lg = {4} >

                                <InputLabel htmlFor="input-with-icon-adornment" >Repita Contraseña</InputLabel>
                                <Input
                                    fullWidth
                                    type={'password'}
                                    id="input-with-icon-adornment"
                                    onChange = { e => setPassword2( e.target.value ) }
                                    startAdornment={
                                        <InputAdornment position="start">
                                        <VpnKeyIcon />
                                        </InputAdornment>
                                    }
                                />
                                { ( textEmptyPassword2 )  &&  <p style={ styles.alertFail } > Debe ingresar una contraseña  </p> }
                                { ( textIncorrectPassword )   &&  <p style={ styles.alertFail } > Deben coincidir las contraseñas  </p> }
                                { ( textNotValidUserCreate )   &&  <p style={ styles.alertFail } > No se puedo crear usuario, intente más tarde.   </p> }

                                

                            </Grid>
                        </Grid>

                    

                        <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                            <Grid  item xs = {1}  md = {4} lg = {4} > </Grid>
                            <Grid  item xs = {10} md = {4} lg = {4} >

                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    endIcon={<SendIcon/>}
                                    onClick = { register }
                                    disabled = { disabledButtonRegister }
                                >
                                    { textButtonRegister } 
                                </Button>
                            </Grid>
                        </Grid>
            
                    </>
                ) : (
                    <Grid 
                        container 
                    >
           
                        <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                            <Grid  item xs = {1}  md = {4} lg = {4} > </Grid>
                            <Grid  item xs = {10} md = {4} lg = {4} >
                                <h2 className="monserrat400" style={{ color : '#4d9900', textAlign: 'center' }}  > Se ha mandado un email de verificación a su correo  </h2>

                            </Grid>
                        </Grid>
                    </Grid>
                )}
              
            </Container>
        </>
    );
}

