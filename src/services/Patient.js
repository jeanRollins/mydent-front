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



