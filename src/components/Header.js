import React, { useState , useEffect } from 'react';
import MenuResponsive from './MenuResponsive/index';
import Grid from '@material-ui/core/Grid';
import { GetItemJson } from '../libs/Storage';
            

const styles = {
    
  header : {
    backgroundColor: '#0047b3',
    width: '100%',    
    height: '100%',
  } ,
  buttonPosition : {
    float: 'right',
    padding : '6px 10px 0px 0px  ' 
  } ,
  logo :{
    width: '47%' ,
    height: '90%' 
  }


} ;

function Header (props) {  

  const logo = '../../assets/62e5d8b0b4a22528a161d71b2dcaab6e.jpg' ;



  //console.log('props.user'  , props.user);
  return (
    <>
      <div style = { styles.header } >
          <Grid container >

            <Grid item xs={6}>

              <img style={ styles.logo } src={ logo }/ >
              
            </Grid>
            <Grid item xs={6}>
                <div style = { styles.buttonPosition }>

                  { /* (  props.user != undefined ) && <MenuResponsive /> */ }

                  <MenuResponsive /> 
                </div>
              
            </Grid>
        
        </Grid>

      </div>

    </>
   
  );
}

export default Header ;