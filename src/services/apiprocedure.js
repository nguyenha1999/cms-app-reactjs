import axiosMockApi from "./api";

class ProcedureApi {

    getAll = () => {
        return axiosMockApi.get('/Group');
    };

    create = (params) => {
        return axiosMockApi.post('/Group', params);
    };

    delete = (id, data) => {
        return axiosMockApi.put(`/Group/${id}`, data);
    };

    edit = (id, data) => {
        return axiosMockApi.put(`/Group/${id}`, data);
    };
}

const procedureApi = new ProcedureApi();
export default procedureApi;