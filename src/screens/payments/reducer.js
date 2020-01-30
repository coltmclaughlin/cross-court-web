import { createSelector } from 'reselect';
import {
  CREATE_FREE_SESSION_SUCCESS,
  CREATE_FREE_SESSION_FAILURE,
} from 'screens/checkout/actionTypes';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  SET_SELECTED_CARD,
  CLAIM_FREE_SESSION,
  ADD_CARD_INIT,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
} from './actionTypes';

const initialState = {
  error: '',
  pageLoading: false,
  availableCards: [],
  selectedCard: null,
  claimFreeSession: false,
  addCardLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_LOAD_INIT:
      return {
        ...state,
        pageLoading: true,
        error: '',
      };
    case INITIAL_LOAD_SUCCESS:
      return {
        ...state,
        pageLoading: false,
        availableCards: [...action.payload.availableCards],
      };
    case INITIAL_LOAD_FAILURE:
      return { ...state, error: action.error, pageLoading: false };
    case SET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: { ...action.payload.selectedCard },
      };
    case CLAIM_FREE_SESSION:
      return {
        ...state,
        claimFreeSession: true,
      };
    case CREATE_FREE_SESSION_SUCCESS:
    case CREATE_FREE_SESSION_FAILURE:
      return {
        ...state,
        claimFreeSession: false,
      };
    case ADD_CARD_INIT:
      return {
        ...state,
        addCardLoading: true,
      };
    case ADD_CARD_SUCCESS:
    case ADD_CARD_FAILURE:
      return {
        ...state,
        addCardLoading: false,
      };
    default:
      return state;
  }
};

const getPayments = state => state.payments;

export const getPageLoading = createSelector(getPayments, payments => payments.pageLoading);

export const getError = createSelector(getPayments, payments => payments.error);

export const getAvailableCards = createSelector(getPayments, payments => payments.availableCards);

export const getSelectedCard = createSelector(getPayments, payments => payments.selectedCard);
export const getClaimFreeSession = createSelector(
  getPayments,
  payments => payments.claimFreeSession
);

export const getAddCardLoading = createSelector(getPayments, payments => payments.addCardLoading);
