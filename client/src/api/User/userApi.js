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
}

const userApi = new UserApi();

export default userApi;
