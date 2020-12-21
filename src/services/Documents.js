import axios from 'axios';
import { RUTE_SERVICE } from '../constants';

export const cloudinary = async (file) => {

    const data = new FormData();
    data.append('file', file.file[0]);
    data.append('upload_preset', 'imageapi');
    const url = 'https://api.cloudinary.com/v1_1/apidigital/upload'
    const response = await axios.post(url, data)
    return response;
}

export const addDocument = async document => {
    const url = RUTE_SERVICE + '/api/managerDocument/AddDocument'  ;
    const response = await axios.post(url, document);
    return response.data;
}


export const getDocumentByUserAndPacient = async ruts => {
    const url = RUTE_SERVICE + '/api/managerDocument/GetDocuments'  ;
    const response = await axios.post(url,ruts);
    return response.data;
}

export const DeleteDocument = async id => {
    const data = { id } ;
    const url = RUTE_SERVICE + '/api/managerDocument/DestroyDocument'  ;
    const response = await axios.post( url , data );
    return response.data;
}
