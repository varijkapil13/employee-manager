import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import {userTableStyles} from '../../helpers/styles/styles';
import {withStyles} from '@material-ui/core';
import * as PropTypes from 'prop-types';
import EnhancedTableHead from '../EnhancedTableHeader/EnhancedTableHeader';

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

const PaginationTable = props => {
  const {classes, rows, rowsPerPage, page, order, orderBy} = props;
  const filteredRows = rows.filter((_, index) => index !== 0);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <Table className={classes.table}>
      <EnhancedTableHead numSelected={0} onRequestSort={props.handleRequestSort} order={order} orderBy={orderBy} rows={rows} />
      <TableBody>
        {stableSort(filteredRows, getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(row => (
            <TableRow key={row.id}>
              {Object.values(row).map(value => (
                <TableCell component="th" scope="row">
                  {value}
                </TableCell>
              ))}
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
            onChangePage={() => props.handleChangePage}
            onChangeRowsPerPage={() => props.handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

PaginationTable.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  order: PropTypes.any,
  orderBy: PropTypes.any,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleRequestSort: PropTypes.func.isRequired
};

export default withStyles(userTableStyles)(PaginationTable);
