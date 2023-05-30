import React, { useEffect } from 'react';
import { Box, Container, Tooltip } from '@mui/material';
import Form from './components/Form';
import TaskList from './components/TaskList';
import LabeledSection from './components/LabeledSection';
import useStore from './store';

const App = () => {
  const { showTooltip, tooltipMessage, toggleTooltip } = useStore(
    (state) => state
  );

  useEffect(() => {
    if (!showTooltip) return;
    const timeout = setTimeout(() => {
      toggleTooltip('');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showTooltip, toggleTooltip]);

  return (
    <>
      <Container>
        <Box display="flex" justifyContent="space-between">
          <LabeledSection title="Add Task">
            <Form />
          </LabeledSection>
          <LabeledSection title="Tasks">
            <TaskList />
          </LabeledSection>
        </Box>
      </Container>
      <Tooltip
        position="absolute"
        bottom={0}
        left={50}
        right={50}
        title={tooltipMessage}
        open={showTooltip}
      >
        <Box />
      </Tooltip>
    </>
  );
};

export default App;
