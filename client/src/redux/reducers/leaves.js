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
    default:
      return state;
  }
}
