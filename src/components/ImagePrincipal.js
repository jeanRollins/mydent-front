import React from 'react';
import  { Grid  }  from '@material-ui/core/';
import MediaQuery from '../libs/MediaQuery';
import {  Link } from 'react-router-dom';


const styles = {
    image : {
        width : '100%',
        height: '205px',
        marginTop: '32px'
    },
    imageLarge : {
        width : '60%',
        height : '80%',
        marginTop : '30px'
    },    
    title :{
        width : '100%',
        textAlign : 'center' ,
        marginTop : '20px'
    },
    titleLarge :{
        width : '100%',
        textAlign : 'center' ,
        marginTop : '0px'
    }
} ;

export default function ImagePrincipal(props) {


    const Mobile  =  MediaQuery('mobile') ;
    const Tablet  =  MediaQuery('tablet') ;
    const Desktop =  MediaQuery('desktop') ;

    const principalImage = "../../assets/62e5d8b0b4a22528a161d71b2dcaab6e - copia (copia).png";


    return(
        <>
             <Grid 
                item 
                xs = { 12 }
                sm = { 12 }
                md = { 12 }
                lg = { 12 }
                style={{ textAlign: 'center'}}
            >

                <Link   
                        to        = { "/" }
                        style     = { styles.link }
                        className = "monserrat700"
                    >
                    
                
                    <Mobile>
                        <img 
                            src = { principalImage } 
                            style = { styles.image }    
                        />
                    </Mobile>

                    <Tablet>
                        <img 
                            src = { principalImage } 
                            style = { styles.imageLarge }    
                        />
                    </Tablet>

                    <Desktop>
                        <img 
                            src = { principalImage } 
                            style = { styles.imageLarge }    
                        />
                    </Desktop>
                </Link>
                
            </Grid>

            <Grid 
                item 
                xs = { 12 }
                sm = { 12 }
                md = { 12 }
                lg = { 12 } 
                style={{ textAlign: 'center'}}

                >
                <Mobile>
                    <h1 style={ styles.title } className="monserrat500"  > {props.title} </h1>
                    
                </Mobile>

                <Tablet>
                    <h1 style={ styles.titleLarge } className="monserrat500"  > {props.title} </h1>
                    
                </Tablet>

                <Desktop>
                    <h1 style={ styles.titleLarge } className="monserrat500"  > {props.title} </h1>
                    
                </Desktop>
                
            </Grid>
        </>
    )   
}