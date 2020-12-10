import React from 'react';
import { Route } from 'react-router-dom';

//Pages App
import  Welcome  from './pages/Welcome';
import Home from './pages/Home' ;
import Registro from './pages/Registro' ;


//Pages AppBack
import RecoveryPass from './pages/RecoveryPass' ;
import Dashboard from './pages/Dashboard' ;
import Emails from './pages/Emails' ;
import { Pacient } from './pages/Pacient';
import { MedicalRecord } from './pages/MedicalRecord';
import { Odontogram } from './pages/odontogram/Odontogram';



export default function Routes(props){

    return(
        <>
            {( props.route == 'app' && (
                <>
                    <Route path="/"  exact component = { Welcome } /> 
    
                    <Route path="/login"  exact component = { Home } /> 
                    <Route path="/registro"  exact component = { Registro } /> 
                    
                    
                </>
            ) )}
            {( props.route == 'back' && (
                <>
                    <Route path="/back/dashboard"     exact component = { Dashboard } />
                    <Route path="/back/recoverypass"  exact component = { RecoveryPass } /> 
                    <Route path="/back/correos"       exact component = { Emails } /> 
                    <Route path="/back/pacientes"     exact component = {Pacient} />
                    <Route path="/back/ficha_medica"  exact component = {MedicalRecord} />
                    <Route path="/back/odontograma"   exact component = {Odontogram} />
                </>
            ) )}
            
        </>
    )
}