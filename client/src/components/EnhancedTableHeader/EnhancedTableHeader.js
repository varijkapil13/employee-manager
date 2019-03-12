import React from 'react';
import * as PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const {order, orderBy, rows} = this.props;
    const firstRow = rows ? rows.slice(0, 1)[0] : {};
    return (
      <TableHead>
        <TableRow>
          {Object.keys(firstRow).map(
            key => (
              <TableCell
                key={key}
                align={key.numeric ? 'right' : 'left'}
                padding={key.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === key ? order : false}>
                <Tooltip title="Sort" placement={key.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
                  <TableSortLabel active={orderBy === key} direction={order} onClick={this.createSortHandler(key)}>
                    {firstRow[key]}
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
  rows: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

export default EnhancedTableHead;
