import { API_BASE_URL } from '../config';

export const FETCH_QUESTION_REQUEST = "FETCH_QUESTION_REQUEST";
export const fetchQuestionRequest = () => {
  return {
    type: FETCH_QUESTION_REQUEST,
    loading: true
  }
}

export const FETCH_QUESTION_SUCCESS = "FETCH_QUESTION_SUCCESS";
export const fetchQuestionSuccess = (currWord) => {
  return {
    type: FETCH_QUESTION_SUCCESS,
    loading: false,
    currWord: currWord.word,
    answer: currWord.answer
  }
}

export const FETCH_QUESTION_ERROR = "FETCH_QUESTION_ERROR";
export const fetchQuestionError = (err) => {
  return {
    type: FETCH_QUESTION_ERROR,
    loading: false,
    error: err
  }
}

export const fetchQuestions = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchQuestionRequest());
  fetch(`${API_BASE_URL}/questions`, {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then( res => {
    if(!res.ok) {
      console.log('There was an issue with the request');
    }
    return res.json();
  })
  .then( currWord => {
    dispatch(fetchQuestionSuccess(currWord));
  })
  .catch(err => {
    dispatch(fetchQuestionError(err))
  })
}
