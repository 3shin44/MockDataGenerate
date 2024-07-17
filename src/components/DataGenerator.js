import React, { useState } from 'react';
import { Button, TextField, Grid, MenuItem } from '@mui/material';
import OptionField from './OptionField';

const DataGenerator = () => {
  const [options, setOptions] = useState([{ id: 1, type: 'time', value: '' }]);
  const [dataCount, setDataCount] = useState(1);

  const addOption = () => {
    setOptions([...options, { id: options.length + 1, type: 'time', value: '' }]);
  };

  const removeOption = (id) => {
    setOptions(options.filter(option => option.id !== id));
  };

  const handleOptionChange = (id, newType, newValue) => {
    setOptions(options.map(option => option.id === id ? { ...option, type: newType, value: newValue } : option));
  };

  const generateData = () => {
    const data = Array.from({ length: dataCount }, (_, i) => {
      const record = {};
      options.forEach(option => {
        if (option.type === 'time') {
          record[option.type] = new Date().toISOString();
        } else if (option.type === 'index') {
          record[option.type] = i + 1;
        } else {
          record[option.type] = option.value;
        }
      });
      return record;
    });
    console.log(data);
  };

  return (
    <div>
      {options.map((option) => (
        <OptionField
          key={option.id}
          id={option.id}
          type={option.type}
          value={option.value}
          onChange={handleOptionChange}
          onRemove={removeOption}
        />
      ))}
      <Button variant="outlined" onClick={addOption}>Add Option</Button>
      <TextField
        label="Number of Records"
        type="number"
        value={dataCount}
        onChange={(e) => setDataCount(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={generateData}>
        Generate Data
      </Button>
    </div>
  );
};

export default DataGenerator;
