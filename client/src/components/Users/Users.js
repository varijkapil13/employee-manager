import React from 'react';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableBody from '@material-ui/core/TableBody';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import {withStyles} from '@material-ui/core';
import {userTableStyles} from '../../helpers/styles/styles';
import * as PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import TableHead from '@material-ui/core/TableHead';

class Users extends React.Component {
  state = {
    rows: [
      {name: 'A', loggedHours: 305, leaves: 0, leavesLeft: 30, overtime: 3.7},
      {name: 'B', loggedHours: 452, leaves: 0, leavesLeft: 30, overtime: 25.0},
      {name: 'C', loggedHours: 262, leaves: 0, leavesLeft: 30, overtime: 16.0},
      {name: 'D', loggedHours: 159, leaves: 0, leavesLeft: 30, overtime: 6.0},
      {name: 'E', loggedHours: 356, leaves: 0, leavesLeft: 30, overtime: 16.0},
      {name: 'F', loggedHours: 408, leaves: 0, leavesLeft: 30, overtime: 3.2},
      {name: 'G', loggedHours: 237, leaves: 0, leavesLeft: 30, overtime: 9.0},
      {name: 'H', loggedHours: 375, leaves: 0, leavesLeft: 30, overtime: 0.0},
      {name: 'I', loggedHours: 518, leaves: 0, leavesLeft: 30, overtime: 26.0},
      {name: 'J', loggedHours: 392, leaves: 0, leavesLeft: 30, overtime: 0.2}
    ],
    page: 0,
    rowsPerPage: 10,
    order: 'asc',
    orderBy: 'name'
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
    const {classes} = this.props;
    const {rows, rowsPerPage, page, order, orderBy} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    return (
      <Table className={classes.table}>
        <EnhancedTableHead numSelected={0} onRequestSort={this.handleRequestSort} order={order} orderBy={orderBy} />
        <TableBody>
          {stableSort(rows, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell numeric>{row.loggedHours}</TableCell>
                <TableCell numeric>{row.overtime}</TableCell>
                <TableCell numeric>{row.leaves}</TableCell>
                <TableCell numeric>{row.leavesLeft}</TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{height: 48 * emptyRows}}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={5}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                native: true
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const rows = [
      {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
      {id: 'loggedHours', numeric: true, disablePadding: false, label: 'Logged Hours'},
      {id: 'overtime', numeric: true, disablePadding: false, label: 'Overtime'},
      {id: 'leaves', numeric: true, disablePadding: false, label: 'Leaves'},
      {id: 'leavesLeft', numeric: true, disablePadding: false, label: 'Leaves Remaining'}
    ];
    const {order, orderBy} = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}>
                <Tooltip title="Sort" placement={row.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
                  <TableSortLabel active={orderBy === row.id} direction={order} onClick={this.createSortHandler(row.id)}>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

export default withStyles(userTableStyles)(Users);

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
