import React, { useState, useEffect } from 'react'
import { GetItemJson } from '../libs/Storage';
import { getUserAndPacient } from '../services/Users';
import TableResponsive from '../components/Table';
import {  withRouter, useParams } from 'react-router-dom';
import {
    Grid,
    Container,
    Button,
    Snackbar
} from '@material-ui/core/';
import SpinnerLoad from '../components/SpinnerLoad';
import Title from '../components/Title';
import SendIcon from '@material-ui/icons/Send';
import { addItemCampaign } from '../services/Email'
import Alert from '@material-ui/lab/Alert';

const styles = {
    inputWidth: {
        width: '90%',
        margin: '15px 0px'
    },
}

const EmailsPatients = () => {

    const { idcampana } = useParams('idcampana');

    const columns = [
        { field: 'numero', headerName: 'N°', width: 50 },
        { field: 'id', headerName: 'rut', width: 150 },
        { field: 'nombre', headerName: 'Paciente', width: 200 },
        { field: 'correo', headerName: 'correo', width: 250 },
    ];

    const [patientEmail, setPatientEmail] = useState(false);
    const [user, SetUser] = useState(false);
    const [emailTable, setEmailTable] = useState(false);
    const [emailSelected, setEmailSelected] = useState([])

    const [openSnackError, setOpenSnackError] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [textMessageFail, setTextMessageFail] = useState('');

    const closeOpenSnackError = () => setOpenSnackError(false);
    const openToastrSnackError = () => setOpenSnackError(true);


    const closeSnackbar = () => {
        setOpenSnack(false);
      };
    


    const fetch = async () => {
        const us = await GetItemJson('user');
        SetUser(us);
        const patients = await getUserAndPacient(us.rut);
        const responseEmail = await prepareTableEmail(patients.data.patients);

        setPatientEmail(patients.data.patients)
        setEmailTable(responseEmail);

    }

    useEffect(() => {
        fetch()

    }, [])

    const prepareTableEmail = async data => {


        const emailAll = data.map((row, index) => {
            return {
                numero: index,
                id: row.rut,
                nombre: row.nombres,
                correo: row.correo
            }
        })

        return emailAll;

    }


    const currentlySelected = selected => {


        if (emailSelected !== selected) {
            setEmailSelected(selected)
        }

    }

    const sendEmail = async () => {

       

        if (emailSelected.length === 0) {
            setTextMessageFail('Debe selecionar minimo 1 correo');
            openToastrSnackError();
            return false
        }

        const prepareEmail = {
            idCampaign: idcampana,
            items: emailSelected.rowIds
        }

        const response = await addItemCampaign(prepareEmail);
        console.log(response);

    }



    return (emailTable !== false && user !== false) ? (
        <>

            <Title title="Envio de correos" />
            <Container fixed>

                <Grid>
                    <Grid
                        item
                        md={12}
                        xl={12}
                        style={styles.topMargin}>

                        <TableResponsive
                            rows={emailTable}
                            columns={columns}
                            selected={true}
                            change={currentlySelected}
                        />

                    </Grid>
                </Grid>

                <Grid>
                    <Grid>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={sendEmail}
                            startIcon={<SendIcon />}
                        >
                            Enviar correo
                     </Button>
                    </Grid>
                </Grid>

            </Container>

            <Snackbar open={openSnack} autoHideDuration={6000} onClose={e => closeSnackbar()}>
                <Alert onClose={closeSnackbar} severity="success">
                    Se ha enviado con exito
                </Alert>
            </Snackbar>

            <Snackbar open={openSnackError} autoHideDuration={6000} onClose={e => closeOpenSnackError()}>
                <Alert onClose={closeOpenSnackError} severity="error">
                    <span className="monserrat400">  {textMessageFail} </span>
                </Alert>
            </Snackbar>



        </>
    ) : (<SpinnerLoad />)
}

export default withRouter(EmailsPatients);