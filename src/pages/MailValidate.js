import React , { useState , useEffect } from 'react' ;
import { useParams } from "react-router-dom";
import { CheckMail } from '../services/Login';
import SendIcon from '@material-ui/icons/Send';
import { withRouter } from 'react-router-dom';

import  {
    Grid        , 
    Container   ,
    Button   
  }  from '@material-ui/core/';
import ImagePrincipal from '../components/ImagePrincipal';

const MailValidate = props => {

    const { codMail } = useParams() ;
    const [mailValidate , setMailValidate] =  useState( false ) ;

    const fetchApi = async () => {
        console.log( 'codMail' , codMail ) ;

        const response = await CheckMail( codMail ) ;

        console.log( 'response**' , response ) ;
        setMailValidate( response.action ) ;
    }

    useEffect( () => {
        fetchApi()
    }, [])

    return(
        <>
            { (mailValidate) ? (
                <>
                     <Container fixed>

                        <Grid 
                            container 
                        >
                            
                            <ImagePrincipal
                                    title={'Email validado!'}
                            />
                        </Grid>
                        <Grid
                            item
                        >
                            <p style={{textAlign: 'center'}}> Ya puedes acceder a Mydent </p>

                        </Grid>

                        </Container>

                        <Container fixed>

                        <Grid container spacing={1} alignItems="flex-end" >
                            <Grid  item xs = {1}  md = {4} lg = {4} > </Grid>
                            <Grid  item xs = {10} md = {4} lg = {4} >

                                <Button
                                    fullWidth
                                    variant  = "contained"
                                    color    = "primary"
                                    endIcon  = {<SendIcon/>}
                                    onClick  = { e => props.history.push('/login') }
                                >
                                    Ir a Login
                                </Button>
                            </Grid>
                        </Grid>

                    </Container>
                </>
            ) : (
                <>
                      <Container fixed>

                        <Grid 
                            container 
                        >
                            
                            <ImagePrincipal
                                    title={'Mail no valido'}
                            />
                        </Grid>
                        <Grid
                            item
                        >
                            <p style={{textAlign: 'center'}}> No se pudo validar email </p>

                        </Grid>

                        </Container>

                        <Container fixed>

                            <Grid container spacing={1} alignItems="flex-end" >
                                <Grid  item xs = {1}  md = {4} lg = {4} > </Grid>
                                <Grid  item xs = {10} md = {4} lg = {4} >

                                    <Button
                                        fullWidth
                                        variant  = "contained"
                                        color    = "primary"
                                        endIcon  = {<SendIcon/>}
                                        onClick  = { e => props.history.push('/') }
                                    >
                                        Ir a inicio
                                    </Button>
                                </Grid>
                            </Grid>

                        </Container>
                </>
            )}
            
        </> 
    )
}

export default withRouter( MailValidate ) ;
