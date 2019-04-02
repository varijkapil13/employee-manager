import React from 'react';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import {changeLeavesState} from '../../redux/actions/leaves-actions';
import PaginationTable from '../../components/PaginationTable/PaginationTable';
import BigCalendar from 'react-big-calendar';
import {localize} from '../../helpers/Constants/Constants';

const Leaves = props => {
  const {showCalendar, leaves, rows, rowsPerPage, page, order, orderBy} = props;

  const handleChangePage = (event, page) => {
    props.changeLeavesState({page});
  };

  const handleChangeRowsPerPage = event => {
    props.changeLeavesState({page: 0, rowsPerPage: event.target.value});
  };
  const handleRequestSort = (event, property) => {
    const localOrderBy = property;
    let localOrder = 'desc';

    if (orderBy === property && order === 'desc') {
      localOrder = 'asc';
    }

    props.changeLeavesState({order: localOrder, orderBy: localOrderBy});
  };

  const handleEventClick = event => {
    console.log(event);
  };

  return (
    <>
      <Button onClick={() => props.changeLeavesState({showCalendar: !showCalendar})}>{showCalendar ? 'View as Table' : 'View in Calendar'}</Button>
      {showCalendar || (
        <PaginationTable
          rows={rows}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
          handleRequestSort={handleRequestSort}
          order={order}
          orderBy={orderBy}
          page={page}
        />
      )}
      {showCalendar && (
        <BigCalendar
          popup
          localizer={localize}
          events={leaves}
          startAccessor="start"
          endAccessor="end"
          defaultView={'month'}
          views={['month', 'work_week']}
          onSelectEvent={handleEventClick}
        />
      )}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    leaves: state.leaves.leaves,
    showCalendar: state.leaves.showCalendar,
    rows: state.leaves.rows,
    rowsPerPage: state.leaves.rowsPerPage,
    page: state.leaves.page,
    order: state.leaves.order,
    orderBy: state.leaves.orderBy
  };
};

const mapDispatchToProps = {changeLeavesState};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaves);
