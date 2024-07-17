import React from 'react';
import { Grid, TextField, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const OptionField = ({ id, type, value, onChange, onRemove }) => {
  const handleTypeChange = (event) => {
    onChange(id, event.target.value, value);
  };

  const handleValueChange = (event) => {
    onChange(id, type, event.target.value);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={5}>
        <TextField
          select
          label="Type"
          value={type}
          onChange={handleTypeChange}
          fullWidth
        >
          <MenuItem value="time">Time</MenuItem>
          <MenuItem value="index">Index</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={5}>
        <TextField
          label="Value"
          value={value}
          onChange={handleValueChange}
          fullWidth
          disabled={type === 'time' || type === 'index'}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={() => onRemove(id)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default OptionField;
