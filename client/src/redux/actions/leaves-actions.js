import {leavesActions} from '../action-types';

export const fetchLeaves = user => ({
  type: leavesActions.FETCH_HOLIDAYS,
  payload: user
});

export const addLeaves = value => ({
  type: leavesActions.ADD_HOLIDAYS,
  payload: value
});
export const deleteLeaves = value => ({
  type: leavesActions.DELETE_HOLIDAYS,
  payload: value
});

export const toggleCalendar = value => {
  return {
    type: leavesActions.TOGGLE_CALENDAR,
    payload: !value
  };
};

export const changeLeavesState = props => ({
  type: leavesActions.UPDATE_STATE,
  payload: props
});
