export const types = {
    GET_REPORT_OVERVIEW: 'GET_REPORT_OVERVIEW',
    GET_REPORT_OVERVIEW_SUCCESS: 'GET_REPORT_OVERVIEW_SUCCESS',
    GET_REPORT_OVERVIEW_ERROR: 'GET_REPORT_OVERVIEW_ERROR',
}


export const getReportOverview = (payload) => ({
    type: types.GET_REPORT_OVERVIEW,
    payload
})

export const getReportOverviewError = (payload) => ({
    type: types.GET_REPORT_OVERVIEW_SUCCESS,
    payload
})

export const getReportOverviewSuccess = (payload) => ({
    type: types.GET_REPORT_OVERVIEW_ERROR,
    payload
})