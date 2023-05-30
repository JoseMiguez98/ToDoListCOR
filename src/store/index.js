import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set, get) => ({
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        priority: 'low',
        status: 'pending',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        priority: 'medium',
        status: 'pending',
      },
    ],
    statusFilter: 'all',
    priorityFilter: 'all',
    sortBy: 'creationDate',
    showTooltip: false,
    tooltipMessage: '',
    toggleTooltip: (message) => {
      set((state) => ({
        showTooltip: !state.showTooltip,
        tooltipMessage: message,
      }));
    },
    addTask: ({ title, description, priority, status }) => {
      set((state) => ({
        tasks: [
          ...state.tasks,
          {
            id: state.tasks.length + 1,
            title: title.trim(),
            description: description,
            priority: priority,
            status: status,
            creationDate: new Date().toLocaleString(),
          },
        ],
      }));
      get().toggleTooltip('Task Added');
    },
    removeTask: (id) => {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
      get().toggleTooltip('Task Removed');
    },
    updateTask: (id, newTask) => {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...newTask } : task
        ),
      }));
      get().toggleTooltip('Task Updated');
    },
    setStatusFilter: (statusFilter) => {
      set(() => ({
        statusFilter: statusFilter.trim(),
      }));
    },
    setPriorityFilter: (priorityFilter) => {
      set(() => ({
        priorityFilter: priorityFilter.trim(),
      }));
    },
    setSort: (sort) => {
      set(() => ({
        sortBy: sort.trim(),
      }));
    },
    getFilteredTasks: () => {
      return get().tasks.filter((t) => {
        if (get().statusFilter === 'all' && get().priorityFilter === 'all') {
          return true;
        }

        if (get().statusFilter === 'all') {
          return t.priority === get().priorityFilter;
        }

        if (get().priorityFilter === 'all') {
          return t.status === get().statusFilter;
        }

        return (
          t.status === get().statusFilter && t.priority === get().priorityFilter
        );
      });
    },
    getTasks: () => {
      return get()
        .getFilteredTasks()
        .sort((a, b) => {
          if (get().sortBy === 'creationDate') {
            return new Date(a.creationDate) - new Date(b.creationDate);
          }

          if (get().sortBy === 'priority') {
            return a.priority.localeCompare(b.priority);
          }

          return a.status.localeCompare(b.status);
        });
    },
  }))
);

export default useStore;
