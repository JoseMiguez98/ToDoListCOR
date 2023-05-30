import React, { useState } from 'react';
import {
  Box,
  CardContent,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
  Button,
  InputLabel,
  Paper,
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { PRIORITIES, STATUSES } from '../../store/constants';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
  textSecondary: {
    display: 'inline',
    textWrap: 'nowrap',
    color: theme.palette.text.secondary,
    textTransform: 'capitalize',
  },
}));

const TaskCard = ({ task, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      status: task.status,
      priority: task.priority,
    },
  });
  const classes = useStyles();

  const onSave = (data) => {
    onUpdate(task.id, { ...task, ...data });
    setIsEditing(false);
  };

  return (
    <Paper
      elevation={isHovering ? 3 : 1}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" component="div">
            {task.title}
          </Typography>
          <Box visibility={!isEditing && isHovering ? 'visible' : 'hidden'}>
            <IconButton onClick={() => setIsEditing(true)} aria-label="Edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onRemove(task.id)} aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={1} width="50%">
          {isEditing ? (
            <>
              <form>
                <Box className={classes.inputsContainer}>
                  <FormControl
                    variant="standard"
                    className={classes.formControl}
                  >
                    <InputLabel>Priority</InputLabel>
                    <Select
                      defaultValue={task.priority}
                      {...register('priority')}
                    >
                      <MenuItem value={PRIORITIES.LOW}>Low</MenuItem>
                      <MenuItem value={PRIORITIES.MEDIUM}>Medium</MenuItem>
                      <MenuItem value={PRIORITIES.HIGH}>High</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    className={classes.formControl}
                    variant="standard"
                  >
                    <InputLabel>Status</InputLabel>
                    <Select defaultValue={task.status} {...register('status')}>
                      <MenuItem value={STATUSES.IN_PROGRESS}>
                        In Progress
                      </MenuItem>
                      <MenuItem value={STATUSES.PENDING}>Pending</MenuItem>
                      <MenuItem value={STATUSES.COMPLETED}>Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </form>
            </>
          ) : (
            <>
              <Box>
                <Typography display="inline" variant="subtitle2">
                  Priority:{' '}
                </Typography>
                <Typography className={classes.textSecondary} variant="body2">
                  {task.priority}
                </Typography>
              </Box>
              <Box>
                <Typography display="inline" variant="subtitle2">
                  Status:{' '}
                </Typography>
                <Typography className={classes.textSecondary} variant="body2">
                  {task.status}
                </Typography>
              </Box>
            </>
          )}
        </Box>
        <Typography variant="body1" mt={1}>
          {task.description}
        </Typography>
        <Box
          display="flex"
          justifyContent="flex-end"
          visibility={isEditing ? 'visible' : 'hidden'}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsEditing(false)}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit(onSave)}
          >
            Save
          </Button>
        </Box>
      </CardContent>
    </Paper>
  );
};

export default TaskCard;
