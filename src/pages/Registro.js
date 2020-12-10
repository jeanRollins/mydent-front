import React from 'react';
import  {
    Grid        , 
    Container   ,
    Button   ,
    Icon ,
    InputLabel  ,
    Input       ,
    InputAdornment
  }  from '@material-ui/core/';
import MediaQuery from '../libs/MediaQuery';
import ImagePrincipal from '../components/ImagePrincipal';
import AccountCircle   from '@material-ui/icons/AccountCircle';
import DraftsIcon from '@material-ui/icons/Drafts';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SendIcon from '@material-ui/icons/Send';
const styles = {
    itemInput: {
        marginTop : '20px'
    }
} ;

export default function Registro(  ) {  

    const Mobile  =  MediaQuery('mobile') ;
    const Tablet  =  MediaQuery('tablet') ;
    const Desktop =  MediaQuery('desktop') ;

    const principalImage = "../../assets/62e5d8b0b4a22528a161d71b2dcaab6e - copia (copia).png";

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

                        <InputLabel htmlFor="input-with-icon-adornment" >Nombre</InputLabel>
                        <Input
                            fullWidth
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                    <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                        <InputLabel htmlFor="input-with-icon-adornment" >Correo Electrónico</InputLabel>
                        <Input
                            fullWidth
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                <DraftsIcon/>
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                    <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                        <InputLabel htmlFor="input-with-icon-adornment" >Rut</InputLabel>
                        <Input
                            fullWidth
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                <PersonIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                    <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                        <InputLabel htmlFor="input-with-icon-adornment" >Password</InputLabel>
                        <Input
                            fullWidth
                            type={'password'}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                <VpnKeyIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" style={ styles.itemInput }>
                    <Grid  item xs = {1} md = {4} lg = {4} > </Grid>
                    <Grid  item xs = {10} md = {4} lg = {4} >

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon/>}
                        >
                            Registrar
                        </Button>
                    </Grid>
                </Grid>
            
            </Container>
        </>
    );
}

