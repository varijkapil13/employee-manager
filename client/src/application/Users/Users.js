import React from 'react';
import PaginationTable from '../../components/PaginationTable/PaginationTable';

class Users extends React.Component {
  state = {
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
    orderBy: 'label'
  };
  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = event => {
    this.setState({page: 0, rowsPerPage: event.target.value});
  };
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({order, orderBy});
  };

  render() {
    const {rows, rowsPerPage, page, order, orderBy} = this.state;
    return (
      <PaginationTable
        rows={rows}
        handleChangePage={this.handleChangePage}
        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        handleRequestSort={this.handleRequestSort}
        order={order}
        orderBy={orderBy}
        page={page}
      />
    );
  }
}

export default Users;
