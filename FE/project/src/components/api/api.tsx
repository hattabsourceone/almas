import axios from 'axios'

export const BASE_URL = /* 'http://192.168.1.12:8069' */ 'http://195.26.240.215:10017';
export const LOCAL_BASE_URL = 'http://127.0.0.1:8069'

export const axiosPrivate = axios.create({
  baseURL: BASE_URL + '/api/v1/',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})
