import axiosMockApi from "./api";
import sha256 from 'sha256';

class UserApi {

    getAll = () => {
        return axiosMockApi.get('/User')
    }
    filter = () => {
        return axiosMockApi.get('/User')
    }
    add = () => {
        return axiosMockApi.get('/User')
    }
    update = () => {
        return axiosMockApi.get('/User')
    }
    delete = () => {
        return axiosMockApi.get('/User')
    }
}
const userApi = new UserApi();
export default userApi;