import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sectionContainer: {
    padding: theme.spacing(2),
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
  },
}));

const LabeledSection = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Container className={classes.sectionContainer} sx={{ mr: 1 }}>
      <Typography variant="h6" className={classes.sectionTitle}>
        {title}
      </Typography>
      <Divider sx={{ my: 2 }} />
      {children}
    </Container>
  );
};

export default LabeledSection;
