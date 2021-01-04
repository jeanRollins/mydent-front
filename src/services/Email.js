import axios from 'axios';
import { RUTE_SERVICE } from '../constants';


export const addCampaign = async campaign => {
    const url = RUTE_SERVICE + '/api/campaign/AddCampaign';
    const response = await axios.post(url, campaign);
    return response.data;
}


export const getAllCampaign = async rutUser =>{
    const url = RUTE_SERVICE + '/api/campaign/GetCampaigns';
    const response = await axios.post(url, {rutUser});
    return response.data;
}

export const addItemCampaign = async email =>{
    const url =  RUTE_SERVICE + '/api/campaign/AddItemCampaigns';
    const response = await axios.post(url,email);
    return response.data;
}