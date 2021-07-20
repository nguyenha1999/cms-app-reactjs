export const types = {
    GET_LIST_PROCEDURE: 'GET_LIST_PROCEDURE',
    GET_LIST_PROCEDURE_SUCCESS: 'GET_LIST_PROCEDURE_SUCCESS',
    GET_LIST_PROCEDURE_ERROR: 'GET_LIST_PROCEDURE_ERROR',
    CREATE_PROCEDURE: 'CREATE_PROCEDURE',
    CREATE_PROCEDURE_SUCCESS: 'CREATE_PROCEDURE_SUCCESS',
    CREATE_PROCEDURE_ERROR: 'CREATE_PROCEDURE_ERROR',
    DELETE_PROCEDURE: 'DELETE_PROCEDURE',
    DELETE_PROCEDURE_SUCCESS: 'DELETE_PROCEDURE_SUCCESS',
    EDIT_PROCEDURE: "EDIT_PROCEDURE",
    EDIT_PROCEDURE_SUCCESS: "EDIT_PROCEDURE_SUCCESS",
    DOWNLOAD_PROCEDURE: "DOWNLOAD_PROCEDURE",
    EDIT_DOCUMENT_PROCEDURE: "EDIT_DOCUMENT_PROCEDURE",
    EDIT_DOCUMENT_PROCEDURE_SUCCESS: "EDIT_DOCUMENT_PROCEDURE_SUCCESS"
}


// GET
export const getListProcedure = (payload) => ({
    type: types.GET_LIST_PROCEDURE,
    payload,
})

export const getListProcedureSuccess = (data) => ({
    type: types.GET_LIST_PROCEDURE_SUCCESS,
    data
})

export const getListProcedureError = (data) => ({
    type: types.GET_LIST_PROCEDURE_ERROR,
    data
})

// CREATE

export const createProcedure = (payload) => ({
    type: types.CREATE_PROCEDURE,
    payload
})

export const createProcedureSuccess = (data) => ({
    type: types.CREATE_PROCEDURE_SUCCESS,
    data
})

export const createProcedureError = (data) => ({
    type: types.CREATE_PROCEDURE_ERROR,
    data
})

// delete

export const deleteProcedure = (id, payload, onSuccess) => ({
    type: types.DELETE_PROCEDURE,
    id,
    payload,
    onSuccess
})

export const deleteProcedureSuccess = (data) => ({
    type: types.DELETE_PROCEDURE_SUCCESS,
    data
})

// edit

export const editProcedure = (payload) => ({
    type: types.EDIT_PROCEDURE,
    payload
})

export const editProcedureSuccess = (data) => ({
    type: types.EDIT_PROCEDURE_SUCCESS,
    data
})

// download 

export const downloadProcedure = (payload) => ({
    type: types.DOWNLOAD_PROCEDURE,
    payload
})

export const editDocumentToProcedure = (payload) => ({
    type: types.EDIT_DOCUMENT_PROCEDURE,
    payload
})

export const editDocumentToProcedureSuccess = (data) => ({
    type: types.EDIT_DOCUMENT_PROCEDURE_SUCCESS,
    data
})
