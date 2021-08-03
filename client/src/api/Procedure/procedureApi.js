import axiosClient from "../axiosClient";
class DocumentApi {

    getAll = (params) => {
        return axiosClient.get('/procedures', { params });
    };

    create = (params) => {
        return axiosClient.post('/procedures', params);
    };

    delete = (params) => {
        return axiosClient.delete('/procedures/' + params.id);
    };

    edit = (params) => {
        return axiosClient.put('/procedures/' + params._id, params);
    };

    download = (params) => {
        return axiosClient.get('/download/' + params._id);
    };
}

const procedureApi = new DocumentApi();
export default procedureApi;
