import axiosClient from "../axiosClient";
class DocumentApi {

    getList = (params) => {
        return axiosClient.get('/activities/' + params.id);
    };

}

const procedureApi = new DocumentApi();
export default procedureApi;
