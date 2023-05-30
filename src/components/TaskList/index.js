import React from 'react';
import { Box, Divider } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import TaskCard from '../TaskCard';
import Filter from '../Filter';
import SortBy from '../SortBy';
import useStore from '../../store';

const useStyles = makeStyles((theme) => ({
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxHeight: '500px',
    height: '500px',
    overflowY: 'auto',
  },
}));

const TaskList = () => {
  const { getTasks, updateTask, removeTask } = useStore();
  const tasks = getTasks();
  const classes = useStyles();

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <SortBy />
        <Filter />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box className={classes.taskList}>
        {tasks.map((t) => (
          <>
            <Box mt={2} key={t.id}>
              <TaskCard task={t} onUpdate={updateTask} onRemove={removeTask} />
            </Box>
          </>
        ))}
      </Box>
    </>
  );
};

export default TaskList;
