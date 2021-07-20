import axios from 'axios'; 

const MOCK_API= 'https://60bd906bace4d50017aab33c.mockapi.io/librari'

const axiosMockApi = axios.create({
    baseURL:MOCK_API,
    headers: {
        'content-type': 'application/json',
    },
   
});


export default axiosMockApi;