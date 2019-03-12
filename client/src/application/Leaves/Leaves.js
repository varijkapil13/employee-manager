import React from 'react';
import {connect} from 'react-redux';
import {Button} from '@material-ui/core';
import {toggleCalendar} from '../../redux/actions/leaves-actions';

const Leaves = props => {
  const {showCalendar, leaves} = props;

  return (
    <>
      <Button onClick={() => props.toggleCalendar(showCalendar)}>{showCalendar ? 'View as Table' : 'View in Calendar'}</Button>
    </>
  );
};

const mapStateToProps = state => {
  return {
    leaves: state.leaves.leaves,
    showCalendar: state.leaves.showCalendar
  };
};

const mapDispatchToProps = dispatch => ({toggleCalendar: dispatch(toggleCalendar())});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaves);
