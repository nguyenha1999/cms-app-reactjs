import axiosClient from "../axiosClient";

class ReportApi {

    overview = (params) => {
        return axiosClient.get('/users/overall', {params});
    };

    top5DocumentDownload = (params) => {
        return axiosClient.get('/trackingDownloads', {params});
    };

}

const reportApi = new ReportApi();

export default reportApi