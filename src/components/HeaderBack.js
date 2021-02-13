import React, { useState, useEffect } from 'react';
import MenuResponsive from './MenuResponsive/index';
import { Grid, Container, Box, FormControl, Select, MenuItem, FormHelperText, makeStyles } from '@material-ui/core/';
import { GetItemJson } from '../libs/Storage';
import MediaQuery from '../libs/MediaQuery';
import { withRouter, Link } from 'react-router-dom'
import { ClearStorage } from '../libs/Storage';
import { DayCurrent } from '../libs/Commons';
import { Fragment } from 'react';


const styles = {

  header: {
    backgroundColor: '#0047b3',
    width: '100%',
    height: '100%',
  },
  subheader: {
    backgroundColor: '#4d4d4d',
    height: '100px',
  },
  logo: {
    sm: {
      width: '68%',
      height: '100%'
    },
    lg: {
      width: '47%',
      height: '100%'
    }

  },
  link: {
    color: '#FFFFFF',
    textDecoration: 'none',
    margin: '10px 15px 10px 15px ',
    height: '100%',
    "&:hover": {
      color: '#0047b3'
    }
  },

};


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    color: '#FFFFFF',
    textDecoration: 'none',
    margin: '10px 15px 10px 15px ',
    height: '100%',
    fontWeight: 'bold',
    fontFamily: 'monserrat700'
  },
}));

function HeaderBack(props) {

  const classes = useStyles();

  const [user, setUser] = useState(false);

  const [showMenu, setShowMenu] = useState(true);



  const [menuSession, setMenuSession] = useState('');

  const handleChange = (event) => {
    setMenuSession(event.target.value);
  };


  const fetch = async () => {
    const data = await GetItemJson('user');
    setUser(data);
  }

  useEffect(() => {
    fetch();
  }, [])

  const menu = [
    {
      name: 'Inicio',
      url: '/back/dashboard' ,
      type : 'link' 
    },
    {
      name: 'Valores',
      url: '/back/presupuesto' ,
      type : 'link' 
    },
    {
      name: 'Pacientes',
      url: '/back/pacientes' ,
      type : 'link' 
    },
    {
      name: 'Agenda',
      url: '/back/agenda' ,
      type : 'link' 
    },
    {
      name: 'Campañas',
      url: '/back/correos' ,
      type : 'link' 
    } ,
    {
      name: user.nombres,
      url: '/back/dashboard' ,
      type : 'select'
    }
  ];




  const closeSession = async (e) => {
    e.preventDefault();
    await setShowMenu(false);
    await ClearStorage();
    window.location.href = "/";
  }

  const logo = '../../assets/logo_mydent.png';
  const Mobile = MediaQuery('mobile');
  const Tablet = MediaQuery('tablet');
  const Desktop = MediaQuery('desktop');

  return (
    <>
      {user &&
        <div style={styles.header}  className="noPrint" >

          <Container maxWidth="xl" >
            <Grid container >

              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={3}
                xl={3}
              >

                <Mobile>
                  <Link
                    to={'/back/dashboard'}
                    style={styles.link}
                  >
                    <img style={styles.logo.sm} src={logo} />

                  </Link>
                </Mobile>
                <Desktop>
                  <Link
                    to={'/back/dashboard'}
                    style={styles.link}
                  >
                    <img style={styles.logo.lg} src={logo} />

                  </Link>
                </Desktop>
              </Grid>
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}

              >

                {(user != null) && (
                  <>
                    <div style={{ height: '100%' }}>
                      <Mobile>
                        <MenuResponsive menu={menu} name = {user.nombres} />
                      </Mobile>

                      <Tablet>
                        <MenuResponsive menu={menu}  name = {user.nombres}/>
                      </Tablet>

                      <Desktop>
                        <Box style={{ marginTop: '55px' }} className="menuSystem">
                          {menu.map((row, index) => (
                            <Fragment key={index}>
                              { ( row.type === 'link' ) && (
                                <Link
                                  to={row.url}
                                  style={styles.link}
                                  className="monserrat700"
                                >
                                  { row.name}
                                </Link>
                              ) } 

                            { ( row.type === 'select' ) && (
                               <Select
                                  className={classes.selectEmpty}
                                  value={menuSession}
                                  onChange={handleChange}
                                  displayEmpty
                                  
                                >
                                  <MenuItem value="" disabled >
                                    <span className="monserrat700"> { user.nombres}</span> 
                                  </MenuItem>
                                  <MenuItem   onClick={async e => await closeSession(e)} value={10}>Cerrar sesión</MenuItem>
                                </Select>
                            ) } 
                            </Fragment>
                          ))}
                        </Box>

                      </Desktop>

                    </div>
                  </>
                )}




              </Grid>

            </Grid>

          </Container>
        </div>

      }

    </>

  );
}
export default withRouter(HeaderBack);