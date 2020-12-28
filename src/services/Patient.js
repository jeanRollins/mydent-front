import  axios          from  'axios';
import {RUTE_SERVICE}  from  '../constants';


export const GetForecastsData = async ( ) => {
    const url = RUTE_SERVICE + '/api/patient/GetForecastsData'  ;
    const response = await axios( url , document ) ;
    return response.data ;
}

export const ValidatePatientExistByUser = async ( field , value ) => {
    const data = {  field ,value } ;    
    const url = RUTE_SERVICE + '/api/patient/ValidatePatientExistByUserData'  ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const AddPatient = async patient => {    
    const url = RUTE_SERVICE + '/api/patient/AddPatient'  ;
    const response = await axios.post( url , patient ) ;
    return response.data ;
}

export const GetPatient = async rut => {   
    const data = { value : rut } ; 
    const url = RUTE_SERVICE + '/api/patient/GetPatient'  ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const SearchPatient = async ( rutUser, value,  field = '') => {   
    const data = { rutUser, value,  field } ; 
    const url = RUTE_SERVICE + '/api/patient/SearchPatients'  ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const EditPatient = async patientUpdate => {
    const url = RUTE_SERVICE + '/api/patient/UpdatePatientFile';
    const response = await axios.post(url, patientUpdate);
    return response.data;
}


export const AddHistory = async history => {
    const url = RUTE_SERVICE + '/api/history/AddHistoryPatient';
    const response = await axios.post(url, history);
    return response.data;
}

export const getHistoryPatient = async ruts => {
    const url = RUTE_SERVICE + '/api/history/GetPatientHistory';
    const response = await axios.post(url, ruts);
    return response.data
}

export const uploadStatePatient = async (rutUser , rutPatient) => {
    const data = { rutUser , rutPatient } ;
    console.log('service',data);
    const url = RUTE_SERVICE + '/api/patient/UpdateStatePatient';
    const response = await axios.post(url, data );
    return response.data
}


export const searhPatient = async search => {
    const url = RUTE_SERVICE + '/api/patient/SearchPatients';
    const response = await axios.post(url, search);
    return response.data
}


