import {API_BASE_URL} from '../config';

export const ADD_RESPONSE_REQUEST = 'ADD_RESPONSE_REQUEST';
export const addResponseRequest = () => ({
    type: ADD_RESPONSE_REQUEST
});

export const ADD_RESPONSE_SUCCESS = 'ADD_RESPONSE_SUCCESS';
export const addResponseSuccess = (id, response) => ({
    type: ADD_RESPONSE_SUCCESS,
    id,
    response
});

export const ADD_RESPONSE_ERROR = 'ADD_RESPONSE_ERROR';
export const addResponseError = () => ({
    type: ADD_RESPONSE_ERROR
})

export const UPDATE_NEW_RESPONSE = 'UPDATE_NEW_RESPONSE';
export const updateNewResponse = (userResponse) => ({
    type: UPDATE_NEW_RESPONSE,
    response: userResponse,
    loading: false,
    view: 'feedback',
    error: null
})

export const UPDATE_VIEW = 'UPDATE_VIEW';
export const updateView = () => ({
    type: UPDATE_VIEW,
    view: ''
})

export const addResponse = (response) => (dispatch, getState) => {
    dispatch(updateNewResponse(response));
    dispatch(addResponseRequest());
    const authToken = getState().auth.authToken;
    const uid = getState().auth.currentUser.id;
    const question = getState().question.currWord.question;
    //double check endpoint when backend is complete
    return fetch(`${API_BASE_URL}/users/responses`, {
        headers: { 'Authorization': `Bearer ${authToken}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
        method: `POST`,
        body: JSON.stringify({
            response,
            uid,
            question
        })
    })
    .then(res => {
        if(!res.ok) {
            throw new Error(res.statusTest)
        }
        return res.json();
    })
    .then(data => {
        //dispatch(addResponseSuccess(data.response))
    })
    .catch(err=> {
        dispatch(addResponseError(err))
        })
}