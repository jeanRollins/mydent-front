import  axios          from  'axios';
import {RUTE_SERVICE}  from  '../constants';

export const GetSpecialty = async ( ) => {
    const url = RUTE_SERVICE + '/specialty/GetSpecialty' ;
    const response = await axios( url ) ;
    return response.data ;
}

export const GetTratament = async specialty => {
    const url = RUTE_SERVICE + `/specialty/GetSpecialty?specialty=${ specialty }` ;
    const response = await axios.get( url ) ;
    return response.data ;
}