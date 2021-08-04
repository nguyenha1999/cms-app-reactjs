import axiosClient from "../axiosClient";
import sha256 from 'sha256';

class UserApi {

    login = (params) => {
        return axiosClient.post('/users/signin', { ...params, password: sha256(params.password) });
    };

    register = (params) => {
        return axiosClient.post('/users/signup', { ...params });
    };

    updateProfile = (params) => {
        return axiosClient.put('/users', { password: sha256(params.password) });
    };
    getAll = (params) => {
        return axiosClient.get('/members', { params });
    };

    filter = (params) => {
        return axiosClient.get('/members/search', { params });
    };

    add = (params) => {
        return axiosClient.post('/members', { ...params });
    };

    update = (params) => {
        return axiosClient.put(`/members/${params._id}`, { params, password: sha256(params.password) });
    };

    delete = (params) => {
        return axiosClient.delete(`/members/${params.id}`);
    };
}

const userApi = new UserApi();

export default userApi;
