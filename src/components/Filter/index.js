import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  makeStyles,
} from '@material-ui/core';
import useStore from '../../store';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    margin: theme.spacing(1),
  },
}));

const FilterComponent = () => {
  const { statusFilter, priorityFilter, setStatusFilter, setPriorityFilter } =
    useStore((state) => state);
  const classes = useStyles();

  const handlePriorityChange = (event) => {
    setPriorityFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <Grid container alignItems="center" justifyContent="flex-end">
      <FormControl className={classes.formControl}>
        <InputLabel>Priority</InputLabel>
        <Select value={priorityFilter} onChange={handlePriorityChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Status</InputLabel>
        <Select value={statusFilter} onChange={handleStatusChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default FilterComponent;
