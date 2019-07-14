import BigCalendar from 'react-big-calendar';
import moment from 'moment';

export const apiUrls = {
  login: '/user/login/',
  user: '/user/'
};

export const localize = BigCalendar.momentLocalizer(moment);
