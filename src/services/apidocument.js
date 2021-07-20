import axiosMockApi from "./api";

class DocumentApi {

    getAll = () => {
        return axiosMockApi.get('/Doc' );
    };

    create = (params) => {
        return axiosMockApi.post('/Doc', params);
    };

    delete = (id , data) => {
        return axiosMockApi.put(`/Doc/${id}` , data);
    };

    edit = (id,data) => {
        return  axiosMockApi.put(`/Doc/${id}` , data);
    };
}

const documentApi = new DocumentApi();
export default documentApi;