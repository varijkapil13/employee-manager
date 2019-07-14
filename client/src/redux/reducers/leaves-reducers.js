import {leavesActions} from '../action-types';
import moment from 'moment';

const initialState = {
  leaves: [
    {
      title: 'Name of item',
      start: moment()
        .add(1, 'days')
        .toDate(),
      end: moment()
        .add(3, 'days')
        .toDate()
    },
    {
      title: 'Second Item',
      start: moment().toDate(),
      end: moment()
        .add(3, 'hours')
        .toDate()
    },
    {
      title: 'Additional Item',
      start: moment()
        .add(3, 'hours')
        .toDate(),
      end: moment()
        .add(5, 'hours')
        .toDate()
    }
  ],
  rows: [
    {label: 'Name', loggedHours: 'Logged Hours', leaves: 'Leaves', leavesLeft: 'Leaves Left', overtime: 'Overtime'},
    {label: 'A', loggedHours: 305, leaves: 0, leavesLeft: 30, overtime: 3.7},
    {label: 'B', loggedHours: 452, leaves: 0, leavesLeft: 30, overtime: 25.0},
    {label: 'C', loggedHours: 262, leaves: 0, leavesLeft: 30, overtime: 16.0},
    {label: 'D', loggedHours: 159, leaves: 0, leavesLeft: 30, overtime: 6.0},
    {label: 'E', loggedHours: 356, leaves: 0, leavesLeft: 30, overtime: 16.0},
    {label: 'F', loggedHours: 408, leaves: 0, leavesLeft: 30, overtime: 3.2},
    {label: 'G', loggedHours: 237, leaves: 0, leavesLeft: 30, overtime: 9.0},
    {label: 'H', loggedHours: 375, leaves: 0, leavesLeft: 30, overtime: 0.0},
    {label: 'I', loggedHours: 518, leaves: 0, leavesLeft: 30, overtime: 26.0},
    {label: 'J', loggedHours: 392, leaves: 0, leavesLeft: 30, overtime: 0.2}
  ],
  page: 0,
  rowsPerPage: 10,
  order: 'asc',
  orderBy: 'label',
  showCalendar: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case leavesActions.FETCH_LEAVES:
      return {
        ...state,
        leaves: action.payload.holidays
      };
    case leavesActions.TOGGLE_CALENDAR:
      return {
        ...state,
        showCalendar: action.payload
      };
    case leavesActions.UPDATE_STATE:
      return {...state, ...action.payload};
    default:
      return state;
  }
}
