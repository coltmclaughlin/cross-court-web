import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_AUTH_INIT,
  RESERVE_SESSION_INIT,
  CANCEL_SESSION_INIT,
  CONFIRM_SESSION_INIT,
  SHOW_CANCEL_MODAL,
} from './actionTypes';

export const initialLoadInit = (sessionId, date) => ({
  type: INITIAL_LOAD_INIT,
  payload: {
    sessionId,
    date,
  },
});

export const initialLoadAuthInit = (sessionId, date) => ({
  type: INITIAL_LOAD_AUTH_INIT,
  payload: {
    sessionId,
    date,
  },
});

export const reserveSessionInit = (sessionId, date) => ({
  type: RESERVE_SESSION_INIT,
  payload: {
    sessionId,
    date,
  },
});

export const cancelSessionInit = sessionId => ({
  type: CANCEL_SESSION_INIT,
  payload: {
    sessionId,
  },
});

export const confirmSessionInit = sessionId => ({
  type: CONFIRM_SESSION_INIT,
  payload: {
    sessionId,
  },
});

export const showCancelModal = () => ({
  type: SHOW_CANCEL_MODAL,
});
