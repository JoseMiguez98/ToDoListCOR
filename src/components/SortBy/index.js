import React from 'react';
import { Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import useStore from '../../store';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    margin: theme.spacing(1),
  },
}));

const SortBy = () => {
  const { sortBy, setSort } = useStore((state) => state);
  const classes = useStyles();

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box mt={1}>
      <FormControl className={classes.formControl} variant="standard">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={handleSortChange}>
          <MenuItem value="creationDate">Creation Date</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortBy;
