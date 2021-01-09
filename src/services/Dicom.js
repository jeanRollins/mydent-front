import  axios          from  'axios';
import { RUTE_SERVICE } from '../constants';

const RUTE_FILE = 'https://files.alohaweb.tk' ;

export const AddFile = async data  =>  {
    const url = RUTE_FILE + '/?action=AddDicom' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const DeleteFile = async data  =>  {
    const url = RUTE_FILE + '/?action=DeleteDicom' ;
    const response = await axios.post( url , data ) ;
    return response.data ;
}

export const AddFileData = async ( rutUser, rutPatient, url, title, description )  =>  {
    const data = { rutUser, rutPatient, url, title, description } ;
    const urlService = RUTE_SERVICE + '/api/dicom/AddFile' ;
    const response = await axios.post( urlService , data ) ;
    return response.data ;
}

export const GetFilesDicomByPatient = async ( rutUser, rutPatient )  =>  {
    const data = { rutUser, rutPatient } ;
    const urlService = RUTE_SERVICE + '/api/dicom/GetFilesDicomByPatient' ;
    const response = await axios.post( urlService , data ) ;
    return response.data ;
}

export const DeleteFileDicom = async id  =>  {
    const data = { id } ;
    const urlService = RUTE_SERVICE + '/api/dicom/DeleteDicom' ;
    const response = await axios.post( urlService , data ) ;
    return response.data ;
}


export const AddFileCloud = async (file) => {

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ckroco9n');
    const url = 'https://api.cloudinary.com/v1_1/difsnkong/upload'
    const response = await axios.post(url, data)
    return response;
}