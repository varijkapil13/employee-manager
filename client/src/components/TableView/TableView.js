import React, {useState} from 'react';
import {
  EditingState,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedSummary,
  PagingState,
  SortingState,
  SummaryState
} from '@devexpress/dx-react-grid';
import {
  DragDropProvider,
  Grid,
  PagingPanel,
  Table,
  TableColumnReordering,
  TableEditColumn,
  TableEditRow,
  TableFixedColumns,
  TableHeaderRow,
  TableSummaryRow
} from '@devexpress/dx-react-grid-material-ui';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Button from '@material-ui/core/Button/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const Cell = props => {
  return <Table.Cell {...props} />;
};
const AddButton = ({onExecute}) => (
  <div style={{textAlign: 'center'}}>
    <Button color="primary" onClick={onExecute} title="Create new row">
      New
    </Button>
  </div>
);

const EditButton = ({onExecute}) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({onExecute}) => (
  <IconButton onClick={onExecute} title="Delete row">
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({onExecute}) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({onExecute}) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton
};

const Command = ({id, onExecute}) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

const EditCell = props => {
  return <TableEditRow.Cell {...props} />;
};

const TableView = props => {
  const getRowId = row => row.id;

  const commitChanges = ({added, changed, deleted}) => {
    let {rows} = this.state;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row
        }))
      ];
    }
    if (changed) {
      rows = rows.map(row => (changed[row.id] ? {...row, ...changed[row.id]} : row));
    }
    this.setState({rows, deletingRows: deleted || getStateDeletingRows()});
  };

  const getStateDeletingRows = () => {
    const {deletingRows} = this.state;
    return deletingRows;
  };
  const getStateRows = () => {
    const {rows} = this.state;
    return rows;
  };

  const [rows, setRows] = useState(props.rows);
  const [columns, setColumns] = useState(props.columns);
  const [tableColumnExtensions, setTableColumnExtensions] = useState(props.tableColumnExtensions);
  const [sorting, setSorting] = useState(props.sorting);
  const [editingRowIds, setEditingRows] = useState(props.editingRowIds);
  const [addedRows, setAddedRows] = useState(props.addedRows);
  const [rowChanges, setRowChanges] = useState(props.rowChanges);
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const [pageSize, setPageSize] = useState(props.pageSize);
  const [pageSizes, setPageSizes] = useState(props.pageSizes);
  const [columnOrder, setColumnOrder] = useState(props.columnOrder);
  const [leftFixedColumns, setLeftFixedColumns] = useState(props.leftFixedColumns);
  const [totalSummaryItems, setTotalSummaryItems] = useState(props.totalSummaryItems);
  return (
    <Grid rows={rows} columns={columns} getRowId={getRowId}>
      <SortingState sorting={sorting} onSortingChange={sorting => setSorting(sorting)} />
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={page => setCurrentPage(page)}
        pageSize={pageSize}
        onPageSizeChange={item => setPageSize(item)}
      />
      <EditingState
        editingRowIds={editingRowIds}
        onEditingRowIdsChange={item => setEditingRows(item)}
        rowChanges={rowChanges}
        onRowChangesChange={item => setRowChanges(item)}
        addedRows={addedRows}
        onAddedRowsChange={item => setAddedRows(item)}
        onCommitChanges={commitChanges}
      />
      <SummaryState totalItems={totalSummaryItems} />

      <IntegratedSorting />
      <IntegratedPaging />
      <IntegratedSummary />

      <DragDropProvider />

      <Table columnExtensions={tableColumnExtensions} cellComponent={Cell} />
      <TableColumnReordering order={columnOrder} onOrderChange={item => setColumnOrder(item)} />
      <TableHeaderRow showSortingControls />
      <TableEditRow cellComponent={EditCell} />
      <TableEditColumn width={170} showAddCommand={true} showEditCommand showDeleteCommand commandComponent={Command} />
      <TableSummaryRow />
      <TableFixedColumns leftColumns={leftFixedColumns} />
      <PagingPanel pageSizes={pageSizes} />
    </Grid>
  );
};

export default TableView;
