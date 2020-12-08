import React, { useState , useEffect } from 'react';
import MenuResponsive from './MenuResponsive/index';
import {Grid , Container , Box} from '@material-ui/core/';
import { GetItemJson } from '../libs/Storage';
import MediaQuery from '../libs/MediaQuery';
import { withRouter, Link } from 'react-router-dom'



const styles = {
    
  header : {
    backgroundColor: '#0047b3',
    width: '100%',    
    height: '100%',
  } ,
  subheader : {
    backgroundColor: '#4d4d4d',
    height: '100px',
  },
  buttonPosition : {
    float: 'right',
    padding : '6px 10px 0px 0px  ' 
  } ,
  logo : {
    sm :{
      width: '68%' ,
      height: '100%'
    },
    lg : {
      width: '78%'   ,
      height: '100%'
    }
     
  },
  link : {
    color : '#FFFFFF', 
    textDecoration : 'none' ,
    margin : '0px 10px 0px 10px ' ,
    height : '100%',
    "&:hover" :{
      color :  '#0047b3'
    } 
  },
  
} ;

function Header (props) {  

  const menu = [
    {
      name : 'Home' ,
      url : '/dashboard'
    },
    {
      name : 'Presupuestos' ,
      url : '/presupuesto'
    },
    {
      name : 'Ficha Médica' ,
      url : '/ficha_medica'
    },
    {
      name : 'Agenda' ,
      url : '/agenda'
    },
    {
      name : 'Envío Correos' ,
      url : '/correos'
    }
  ] ;

  const logo = '../../assets/logo_mydent.png' ;


  const Mobile  =  MediaQuery('mobile') ;
  const Tablet  =  MediaQuery('tablet') ;
  const Desktop =  MediaQuery('desktop') ;

  //console.log('props.user'  , props.user);
  return (
    <>
      <div style = { styles.header } >

        <Container fixed >
          <Grid container >

            <Grid 
              item 
              xs = { 6 }
              sm = { 6 }
              md = { 6 }
              lg = { 3 }
              xl = { 3 }
            >

              <Mobile>
                <img style={ styles.logo.sm }  src={ logo }/ >
              </Mobile>
              <Desktop>
                <img style={ styles.logo.lg }  src={ logo }/ >
              </Desktop>
            </Grid>
            <Grid 
              item 
              xs = { 6 }
              sm = { 6 }
              md = { 6 }
              lg = { 6 }
              xl = { 6 }

            >
              <div style = { {height: '100%'} }>

                { /* (  props.user != undefined ) && <MenuResponsive /> */ }
                <Mobile>
                  <MenuResponsive menu={menu} /> 
                </Mobile>

                <Tablet>
                  <MenuResponsive menu={menu} /> 
                </Tablet>

                <Desktop>
                  <Box  style = { {marginTop: '55px'} } className="menuSystem">
                    { menu.map( row => (
                      <Link   
                        to        = { row.url }
                        style     = { styles.link }
                        className = "monserrat700"
                        alignSelf = "flex-end"
                      >
                        { row.name }
                      </Link>
                      
                    ))}
                  </Box>
                  
                </Desktop>
                  
              </div>
              
            </Grid>

          </Grid>

        </Container>         
      </div>

    </>
   
  );
}

export default Header ;