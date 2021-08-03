import axiosClient from "../axiosClient";
class DocumentApi {

    getAll = (params) => {
        return axiosClient.get('/documents', { params });
    };

    create = (params) => {
        return axiosClient.post('/documents', params);
    };

    delete = (params) => {
        return axiosClient.delete('/documents/' + params.id);
    };

    edit = (params) => {
        return axiosClient.put('/documents/' + params._id, params);
    };

    download = (params) => {
        return axiosClient.get('/download/' + params._id);
    };
}

const documentApi = new DocumentApi();
export default documentApi;
