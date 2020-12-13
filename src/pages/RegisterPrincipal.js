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
import AccountCircle   from '@material-ui/icons/AccountCircle';
import DraftsIcon from '@material-ui/icons/Drafts';
import PersonIcon from '@material-ui/icons/Person';
import SendIcon from '@material-ui/icons/Send';
import { ValidSession } from '../libs/Session';
import { ValidateEmail, ValidateRut } from '../libs/Commons';
import { AddItemJson, ClearStorage } from '../libs/Storage';
import { ValidEmail , ValidRut } from '../services/Login';

const styles = {
    itemInput: {
        marginTop : '20px'
    },
    alertFail : {
        color : '#aa2e25'
    }
} ;

export default function RegisterPrincipal( props ) {  

    ValidSession() ;

    const [ rut, setRut ]      = useState( '' ) ;
    const [ email, setEmail ]  = useState( '' ) ;
    const [ name, setName ]   = useState( '' ) ;


    const [ showTextFailNameEmpty, setShowTextFailNameEmpty ]   = useState( false );
    const [ showTextFailEmailEmpty, setShowTextFailEmailEmpty ] = useState( false );
    const [ showTextFailEmailValid, setShowTextFailEmailValid ] = useState( false );

    const [ showTextFailRutValid, setShowTextFailRutValid ] = useState( false );
    const [ showTextFailRutEmpty, setShowTextFailRutEmpty ] = useState( false );


    const [ showTextFailRutUsed, setShowTextFailRutUsed ] = useState( false );
    const [ showTextFailEmailUsed, setShowTextFailEmailUsed ] = useState( false );

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

    const validateForm = async () => {

        activeStateButton() ;
        setShowTextFailRutUsed( false ) ;


        if( name == '' ){
            setShowTextFailNameEmpty(true) ;
            return false ;
        }  

        setShowTextFailNameEmpty(false) ;

        if( email == '' ){
            setShowTextFailEmailEmpty(true) ;
            return false ;
        }  

        setShowTextFailEmailEmpty(false) ;

        if( rut == '' ){
            setShowTextFailRutEmpty(true) ;
            return false ;
        }  

        setShowTextFailRutEmpty(false) ;

        const isMailValidate =  ValidateEmail( email ) ;
        
        if( !isMailValidate ){
            setShowTextFailEmailValid( true ) ;
            return false ;
        }

        setShowTextFailEmailValid(false) ;

        const isRutValidate =  ValidateRut( rut ) ;
        
        if( !isRutValidate ){
            setShowTextFailRutValid( true ) ;
            return false ;
        }

        await setShowTextFailRutValid( false ) ;
        
        const emailExist = await  ValidEmail( email ) ;

        if( !emailExist ){
            setShowTextFailEmailUsed( true ) ;
            return false ;
        }
        setShowTextFailEmailUsed( false ) ;


        const rutExist = await ValidRut( rut ) ;

        if( !rutExist ){
            setShowTextFailRutUsed( true ) ;
            return false ;
        }
        setShowTextFailRutUsed( false ) ;


        return true ;
    }

    ClearStorage() ;

    const register = async () => {

        const validForm = await validateForm() ;

        if ( !validForm ){
            originalStateButton() ;
            return false ; 
        }
        console.log( 'paso!!' ) ;


        AddItemJson( 'register' , {
            name  ,
            email , 
            rut
        });

        props.history.push('/registroContraseña') ;
    }

    return (
        <>
            <Container fixed>

                <Grid 
                    container 
                >
                    
                   <ImagePrincipal
                        title={'Registro'}
                   />
                    
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" >
                    <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                        <InputLabel htmlFor="input-with-icon-adornment" >Nombres</InputLabel>
                        <Input
                            fullWidth
                            id="input-with-icon-adornment"
                            placeholder = ""
                            startAdornment={
                                <InputAdornment position="start">
                                <AccountCircle />
                                </InputAdornment>
                            }
                            onChange ={ e => setName( e.target.value ) }
                        />
                        { ( showTextFailNameEmpty )   &&  <p style={ styles.alertFail } > Debe ingresar un nombre  </p> }
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                    <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                        <InputLabel htmlFor="input-with-icon-adornment" >Correo Electrónico</InputLabel>
                        <Input
                            fullWidth
                            id="input-with-icon-adornment"
                            onChange ={ e => setEmail( e.target.value ) }
                            placeholder = "nombre@dominio.cl"
                            startAdornment={
                                <InputAdornment position="start">
                                <DraftsIcon/>
                                </InputAdornment>
                            }
                        />
                        { ( showTextFailEmailValid )  &&  <p style={ styles.alertFail } > Debe Tener formato correo  </p> }
                        { ( showTextFailEmailEmpty )  &&  <p style={ styles.alertFail } > Debe ingresar un correo  </p> }
                        
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                    <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                        <InputLabel htmlFor="input-with-icon-adornment" >Rut</InputLabel>
                        <Input
                            fullWidth
                            id="input-with-icon-adornment"
                            onChange ={ e => setRut( e.target.value ) }
                            placeholder = "11222333-4"
                            startAdornment={
                                <InputAdornment position="start">
                                <PersonIcon />
                                </InputAdornment>
                            }
                        />
                        { ( showTextFailRutValid )  &&  <p style={ styles.alertFail } > Debe Tener formato rut  </p> }
                        { ( showTextFailRutEmpty )   &&  <p style={ styles.alertFail } > Debe ingresar un rut  </p> }

                        { ( showTextFailRutUsed )    &&  <p style={ styles.alertFail } > Este rut ya está asociado  </p> }
                        { ( showTextFailEmailUsed )  &&  <p style={ styles.alertFail } > Este email ya está asociado  </p> }




                    </Grid>
                </Grid>

               

                <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                    <Grid  item xs = {1}  md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                        <Button
                            fullWidth
                            variant  = "contained"
                            color    = "primary"
                            endIcon  = {<SendIcon/>}
                            onClick  = { register }
                            disabled = { disabledButtonRegister }
                        >
                            {textButtonRegister}
                        </Button>
                    </Grid>
                </Grid>
            
            </Container>
        </>
    );
}

