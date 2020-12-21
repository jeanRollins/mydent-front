import React from 'react';
import { Route } from 'react-router-dom';

//Pages App
import  Welcome  from './pages/Welcome';
import Home from './pages/Home' ;
import RegisterPrincipal from './pages/RegisterPrincipal' ;
import RegisterLast from './pages/RegisterLast' ;
import MailValidate from './pages/MailValidate' ;
import Budget from './pages/Budget' ;






//Pages AppBack
import RecoveryPass from './pages/RecoveryPass' ;
import Dashboard from './pages/Dashboard' ;
import Emails from './pages/Emails' ;
import  Pacient  from './pages/Pacient';
import { MedicalRecord } from './pages/MedicalRecord';
import { Odontogram } from './pages/odontogram/Odontogram';
import Schedule  from './pages/Schedule';
import  ManagerDocuments  from './pages/ManagerDocuments';
import  PatientAdd  from './pages/PatientAdd';
import { Dicom } from './pages/Dicom';


export default function Routes(props){

    return(
        <>
            {( props.route == 'app' && (
                <>
                    <Route path="/"  exact component = { Welcome } />
                    <Route path="/login"  exact component = { Home } /> 
                    <Route path="/registro"  exact component = { RegisterPrincipal } /> 
                    <Route path="/registroContraseña"  exact component = { RegisterLast } /> 
                    <Route path="/mail_validate/:codMail"    children = { <MailValidate/> } />                    
                    
                </>
            ) )}
            {( props.route == 'back' && (
                <>
                    <Route path="/back/dashboard"     exact component = { Dashboard } />
                    <Route path="/back/recoverypass"  exact component = { RecoveryPass } /> 
                    <Route path="/back/correos"       exact component = { Emails } /> 
                    <Route path="/back/pacientes"     exact component = {Pacient} />
                    <Route path="/back/ficha_medica/:rutPatient"  exact children = {<MedicalRecord/>} />
                    <Route path="/back/odontograma"   exact component = {Odontogram} />
                    <Route path="/back/presupuesto"   exact component = { Budget } /> 
                    <Route path="/back/agenda"        exact component = { Schedule } /> 
                    <Route path="/back/agregar_paciente"        exact component = { PatientAdd } /> 
                    <Route path="/back/gestion_documentos/:rutPatient"  exact children = { <ManagerDocuments/> } /> 
                    <Route path="/back/gestion_dicom"   exact component = {Dicom} />

                </>
            ) )}
            
        </>
    )
}