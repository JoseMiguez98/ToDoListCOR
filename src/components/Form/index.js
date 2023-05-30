import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { PRIORITIES, STATUSES } from '../../store/constants';
import useStore from '../../store';

const Form = () => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      description: '',
      priority: PRIORITIES.MEDIUM,
      status: STATUSES.PENDING,
      title: '',
    },
  });
  const { addTask } = useStore();
  const onSubmit = (data) => {
    addTask(data);
    reset();
  };

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <FormControl>
            <TextField
              label="Title"
              name="title"
              required
              {...register('title')}
            />
          </FormControl>
          <FormControl>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel id="priority" name="priority">
                    Priority
                  </InputLabel>
                  <Select {...field} variant="standard">
                    <MenuItem value={PRIORITIES.LOW}>Low</MenuItem>
                    <MenuItem value={PRIORITIES.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={PRIORITIES.HIGH}>High</MenuItem>
                  </Select>
                </>
              )}
            />
          </FormControl>
          <FormControl>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <>
                  <InputLabel>Status</InputLabel>
                  <Select {...field} variant="standard">
                    <MenuItem value={STATUSES.PENDING}>Pending</MenuItem>
                    <MenuItem value={STATUSES.IN_PROGRESS}>
                      In Progress
                    </MenuItem>
                    <MenuItem value={STATUSES.COMPLETED}>Completed</MenuItem>
                  </Select>
                </>
              )}
            />
          </FormControl>
        </Box>
        <Box my={1}>
          <FormControl fullWidth>
            <TextField
              label="Description"
              multiline
              id="description"
              name="description"
              rows={6}
              {...register('description')}
            />
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button type="submit" color="primary" variant="outlined">
            Create
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Form;
