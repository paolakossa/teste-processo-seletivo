import { call, put } from 'redux-saga/effects';
import { CustomException } from '../../utils/customException';
import { loginError, loginSuccess } from './authSlice';
import { authApi } from '../../services/auth';

export function* authSaga({ payload }) {
  try {
    const response = yield call(authApi, payload);
    const data = {
      token: response.token,
      email: payload.email,
      userData: {},
    };
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginError(new CustomException(error).data()));
  }
}
