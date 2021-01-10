import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import TableResponsive, { GetRowCurrent } from '../components/Table';
import SpinnerLoad from '../components/SpinnerLoad';
import {
  Grid,
  TextField,
  Container,
  InputLabel,
  Select,
  MenuItem,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  Snackbar,
  IconButton,
} from '@material-ui/core/';
import { BodyEmail } from './BodyEmail';
import DialogActions from '@material-ui/core/DialogActions';
import PostAddIcon from '@material-ui/icons/PostAdd';
import Alert from '@material-ui/lab/Alert';
import { GetItemJson } from '../libs/Storage';
import { addCampaign, getAllCampaign } from '../services/Email';
import { DateFormat, TypeFormatEmail } from '../libs/Commons';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { getUserAndPacient } from '../services/Users';
const styles = {
  inputWidth: {
    width: '90%',
    margin: '15px 0px'
  },

  paddingSearch: {
    pagging: '0px 15px 0px 15px '
  },
  topMargin: {
    marginTop: '40px'
  }
};
function Emails({history}) {


  const columns = [
    { field: 'id', headerName: 'N°', width: 50 },
    { field: 'nombre', headerName: 'Nombre', width: 180 },
    { field: 'tipo', headerName: 'Tipo', width: 150 },
    { field: 'descripcion', headerName: 'Descripción', width: 250 },
    { field: 'fecha_creado', headerName: 'Fecha Creación', width: 150 },
    { field: 'fecha_lanzamiento', headerName: 'Fecha lanzamiento', width: 200 },
    
    
    {
      field: 'action',
      headerName: 'Envío',
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {

        return (
          <>
            {getButtonState(params)}
          </>
        )

      }
    }

  ];


  const getButtonState = params => {

    const thisRow = GetRowCurrent(params) ;

    const disabledButton = ( thisRow.fecha_lanzamiento !== '00-00-0000 00:00' ) ;
   
    return (
      <IconButton
        disabled = { disabledButton }
        aria-label="delete"
        onClick={e => emailPatient(params)}
      >
        <MailOutlineIcon />
      </IconButton>
    )


  }


  const emailPatient = (params) =>{

    history.push(`/back/correos_pacientes/${params.row.idEmail}`)

  }

  const [open, setOpen] = useState(false);
  const [campaign, setCampaign] = useState({
    title: '',
    description: '',
    type: '',
  });
  const [body, setBody] = useState(false);
  const [stateEmail, setStateEmail] = useState(false)
  const [user, SetUser] = useState(false);
  const [campaignData, setCampaignData] = useState(false);
  const [patientEmail, setPatientEmail] = useState(false);

  const [openSnackError, setOpenSnackError] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [textMessageFail, setTextMessageFail] = useState('');

  const closeOpenSnackError = () => setOpenSnackError(false);
  const openToastrSnackError = () => setOpenSnackError(true);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const fetch = async e => {
    const us = await GetItemJson('user');
    SetUser(us);

    const patients = await getUserAndPacient(us.rut);
    setPatientEmail(patients.data.patients)

    const camp = await getAllCampaign(us.rut);
    const campaignDataFilter = await prepareTableCampaign(camp.data);
    setCampaignData(campaignDataFilter);


  }


  const prepareTableCampaign = data => {

    const campaignTable = data.map((row, index) => {

      return {
        id: index + 1,
        nombre: row.nombre,
        descripcion: row.descripcion,
        tipo: TypeFormatEmail(row.tipo),
        fecha_creado: DateFormat(row.fecha_creado),
        fecha_lanzamiento: DateFormat(row.fecha_lanzamiento),
        body: row.body,
        idEmail: row.id,
        state: row.estado
      }

    })
    return campaignTable;

  }


  useEffect(() => {
    fetch()
  }, [])


  const handleEditorChange = (content, editor) => {
    setBody(content)
  }


  const handleResetForm = e => {
    setCampaign({
      title: '',
      description: '',
      type: '',
    })
    setBody('')
    handleClose()
  }

  const handleCancelEmail = e => {
    handleResetForm()
  }

  const openSnackbar = () => {
    setOpenSnack(true);
  };

  const closeSnackbar = () => {
    setOpenSnack(false);
  };


  const handleSaveCampaign = async () => {

    if (!campaign.title || campaign.title === '') {
      setTextMessageFail('Titulo Requerido');
      openToastrSnackError();
      return false
    }

    if (!campaign.description || campaign.description === '') {
      setTextMessageFail('Descripcion requerido');
      openToastrSnackError();
      return false
    }

    if (!body || body === '') {
      setTextMessageFail('Body requerido');
      openToastrSnackError();
      return false
    }

    if (!campaign.type || campaign.type === '') {
      setTextMessageFail('Tipo requerido');
      openToastrSnackError();
      return false
    }

    const campaignUpload = {
      rutUser: user.rut,
      body: body,
      name: campaign.title,
      description: campaign.description,
      type: campaign.type,

    }

    const response = await addCampaign(campaignUpload);

    console.log( 'response' , response);
    if (!response) {
      setTextMessageFail('Ha ocurrido un error intente mas tarde...');
      openToastrSnackError();
      return false ;
    }

    openSnackbar();
    closeSnackbar();
    handleResetForm() ;
    fetch() ;
  }


  return (campaign !== false && campaignData !== false) ? (
    <>

      <Title title="Gestión de Campañas" />

      <Container fixed>

        <Grid  >

          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >

          </Grid>


          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >

            <Button
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
              className = "btnPrimary"
              startIcon={<PostAddIcon />}
            >
              Agregar
      </Button>



          </Grid>


        </Grid>




      </Container>


      <Container fixed>

        <Grid   >

          <Grid
            item
            md={12}
            xl={12}
            style={styles.topMargin}
          >
            <TableResponsive
              rows={campaignData}
              columns={columns}
              selected={false}
            />
          </Grid>
        </Grid>
      </Container>


      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Creación de Campaña"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            En este apartado se debe colocar los datos para la creacion de una campaña colocando titulo,tipo
            y cuerpo de la campaña.
          </DialogContentText>
          <TextField
            value={campaign.title}
            onChange={e => setCampaign({ ...campaign, title: e.target.value })}
            label="Titulo Campaña"
            type="text"
            style={styles.inputWidth}
            name="title"
          />

          <TextField
            value={campaign.description}
            onChange={e => setCampaign({ ...campaign, description: e.target.value })}
            label="Descripcion"
            type="text"
            multiline
            rows={4}
            style={styles.inputWidth}
            name="description"

          />

          <InputLabel id="demo-simple-select-label">Tipo Campaña</InputLabel>
          <Select
            style={styles.inputWidth}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={campaign.type}
            name="type"
            onChange={e => setCampaign({ ...campaign, type: e.target.value, nameType: e.target.index })}
          >
            <MenuItem value={1} >Promoción</MenuItem>
            <MenuItem value={2}>Informativo</MenuItem>
          </Select>

          <BodyEmail handleEditorChange={handleEditorChange} />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEmail} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveCampaign} color="primary" autoFocus>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>


      <Snackbar open={openSnack} autoHideDuration={6000} onClose={e => closeSnackbar()}>
        <Alert onClose={closeSnackbar} severity="success">
          Se agrego paciente con éxito!
                </Alert>
      </Snackbar>

      <Snackbar open={openSnackError} autoHideDuration={6000} onClose={e => closeOpenSnackError()}>
        <Alert onClose={closeOpenSnackError} severity="error">
          <span className="monserrat400">  {textMessageFail} </span>
        </Alert>
      </Snackbar>


    </>


  ) : (<SpinnerLoad />);
}

export default Emails;
