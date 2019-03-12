import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import {connect} from 'react-redux';
import '../../../helpers/styles/react-big-calendar.css';

const localize = BigCalendar.momentLocalizer(moment);
const Holidays = props => {
  const handleEventClick = event => {
    console.log(event);
  };

  return (
    <BigCalendar
      popup
      localizer={localize}
      events={props.holidays}
      startAccessor="start"
      endAccessor="end"
      defaultView={'month'}
      views={['month', 'work_week']}
      onSelectEvent={handleEventClick}
    />
  );
};

const mapStateToProps = state => {
  return {
    holidays: state.holidays.holidays
  };
};

export default connect(mapStateToProps)(Holidays);
