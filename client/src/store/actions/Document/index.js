export const types = {
    GET_LIST_DOCUMENT: 'GET_LIST_DOCUMENT',
    GET_LIST_DOCUMENT_SUCCESS: 'GET_LIST_DOCUMENT_SUCCESS',
    GET_LIST_DOCUMENT_ERROR: 'GET_LIST_DOCUMENT_ERROR',
    CREATE_DOCUMENT: 'CREATE_DOCUMENT',
    CREATE_DOCUMENT_SUCCESS: 'CREATE_DOCUMENT_SUCCESS',
    CREATE_DOCUMENT_ERROR: 'CREATE_DOCUMENT_ERROR',
    DELETE_DOCUMENT: 'DELETE_DOCUMENT',
    DELETE_DOCUMENT_SUCCESS: 'DELETE_DOCUMENT_SUCCESS',
    EDIT_DOCUMENT: "EDIT_DOCUMENT",
    EDIT_DOCUMENT_SUCCESS: "EDIT_DOCUMENT_SUCCESS",
    DOWNLOAD_DOCUMENT: "DOWNLOAD_DOCUMENT"
}

// get

export const getListDocument = (payload) => ({
    type: types.GET_LIST_DOCUMENT,
    payload
})

export const getListDocumentSuccess = (data) => ({
    type: types.GET_LIST_DOCUMENT_SUCCESS,
    data
})

export const getListDocumentError = (data) => ({
    type: types.GET_LIST_DOCUMENT_ERROR,
    data
})

// create

export const createDocument = (payload) => ({
    type: types.CREATE_DOCUMENT,
    payload
})

export const createDocumentSuccess = (data) => ({
    type: types.CREATE_DOCUMENT_SUCCESS,
    data
})

export const createDocumentError = (data) => ({
    type: types.CREATE_DOCUMENT_ERROR,
    data
})

// delete

export const deleteDocument = (payload) => ({
    type: types.DELETE_DOCUMENT,
    payload
})

export const deleteDocumentSuccess = (data) => ({
    type: types.DELETE_DOCUMENT_SUCCESS,
    data
})

// edit

export const editDocument = (payload) => ({
    type: types.EDIT_DOCUMENT,
    payload
})

export const editDocumentSuccess = (data) => ({
    type: types.EDIT_DOCUMENT_SUCCESS,
    data
})

// download 

export const downloadDocument = (payload) => ({
    type: types.DOWNLOAD_DOCUMENT,
    payload
})
