import React, { forwardRef } from 'react';
import TextField from '@mui/material/TextField';

const CustomTextField = forwardRef((props, ref) => (
  <TextField {...props} inputRef={ref} />
));

export default CustomTextField;
