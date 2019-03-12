import {holidayActions} from '../action-types';

export const fetchHolidays = user => ({
  type: holidayActions.FETCH_HOLIDAYS,
  payload: user
});

export const addHoliday = value => ({
  type: holidayActions.ADD_HOLIDAYS,
  payload: value
});
export const deleteHoliday = value => ({
  type: holidayActions.DELETE_HOLIDAYS,
  payload: value
});
