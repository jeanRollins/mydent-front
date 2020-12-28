import React  from 'react';
import {Grid , Container } from '@material-ui/core/';
import { withRouter, Link } from 'react-router-dom';

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
  logo : {
    sm :{
      width: '68%' ,
      height: '100%'
    },
    lg : {
      width: '47%'   ,
      height: '100%'
    }
     
  },
  link : {
    color : '#0047b3', 
    textDecoration : 'none' ,
    margin : '0px 15px 0px 15px ' ,
    height : '100%',
    "&:hover" :{
      color :  '#0047b3'
    } 
  },
  linkContainer :{
    margin : '15px 0px 0px 0px ' ,

  }
  
} ;

function Header (props) {  
  
    return (
      <>

        <div  >

          <Container maxWidth="xl" >
            <Grid container >

              <Grid 
                item 
                xs = { 6 }
                sm = { 6 }
                md = { 6 }
                lg = { 6 }
                xl = { 6 }
              >

              </Grid>
              <Grid 
                item 
                xs = { 6 }
                sm = { 6 }
                md = { 6 }
                lg = { 6 }
                xl = { 6 }

              >
                <div style={ styles.linkContainer }>
                  <Link   
                    to        = { "/registro" }
                    style     = { styles.link }
                    className = "monserrat700"
                  >
                    Registro
                  </Link>
                  /
                  <Link   
                    to        = { "/login" }
                    style     = { styles.link }
                    className = "monserrat700"
                  >
                    Login
                  </Link>
                </div>
              
              </Grid>

            </Grid>

          </Container>         
        </div>

      </>
      
    );
}
export default  withRouter( Header )  ;