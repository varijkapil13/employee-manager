import {holidayActions} from '../action-types';
import moment from 'moment';

const initialState = {
  holidays: [
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
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case holidayActions.FETCH_HOLIDAYS:
      return {
        ...state,
        holidays: action.payload.holidays
      };
    default:
      return state;
  }
}
