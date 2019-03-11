import {holidayActions} from '../action-types';

export const fetchHolidays = user => ({
  type: holidayActions.FETCH_HOLIDAYS,
  payload: user
});

export const addHoliday = value => ({
  type: holidayActions.ADD_HOLIDAY,
  payload: value
});
export const delteHoliday = value => ({
  type: holidayActions.DELETE_HOLIDAY,
  payload: value
});
