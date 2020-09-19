import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
<<<<<<< HEAD
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.REACT_APP_FIREBASE_API_KEY + '').then(
=======
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzsldmsdmvdsvmls54qGM3eqqww11o').then(
>>>>>>> 8a8750f55c230f991065f652533fb707171d4351
      res => {
        console.log(res)
        dispatch(authSuccess(res.data))
      }
    ).catch(err => {
      console.log(err)
      dispatch(authFail(err))
    })
  }
}
