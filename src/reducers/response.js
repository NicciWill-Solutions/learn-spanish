import {
    ADD_RESPONSE_REQUEST,
    ADD_RESPONSE_ERROR,
    UPDATE_NEW_RESPONSE,
    INCREMENT_SCORE,
    INCREMENT_TOTAL,
    UPDATE_VIEW
} from '../actions/response';

import { RESET_STATE } from '../actions/auth';

const initialState = {
    response: '',
    loading: false,
    error: null,
    view: '',
    numCorrect: 0,
    totalQuest: 0
}

export default function responseReducer(state = initialState, action){
    if(action.type === ADD_RESPONSE_REQUEST) {
        return Object.assign({}, state, {
            loading: action.loading,
            error: action.error
        })
    }
    else if(action.type === UPDATE_NEW_RESPONSE) {
        return Object.assign({}, state, {
        response: action.response,
        loading: action.loading,
        error: action.error,
        view: action.view
        })
    }
    else if(action.type === ADD_RESPONSE_ERROR) {
        return Object.assign({}, state, {
            error: action.error,
            loading: false
        })
    }
    else if(action.type === INCREMENT_SCORE) {
        return Object.assign({}, state, {
            numCorrect: action.numCorrect,
            totalQuest: action.totalQuest
        })
    }
    else if(action.type === INCREMENT_TOTAL) {
        return Object.assign({}, state, {
            totalQuest: action.totalQuest
        })
    }
    else if(action.type === UPDATE_VIEW) {
        return Object.assign({}, state, {
            view: action.view
        })
    }
    else if(action.type === RESET_STATE) {
        return Object.assign({}, state, {
            response: action.response,
            view: action.view,
            numCorrect: action.score,
            totalQuest: action.total
        })
    }
    return state;
}