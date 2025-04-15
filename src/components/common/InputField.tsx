import { TextField, Select, MenuItem, FormControl, InputLabel,SelectChangeEvent } from '@mui/material';

interface TextFieldComponentProps {
  name: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  error?: string | boolean;
}

export const TextFieldComponent:React.FC<TextFieldComponentProps> = ({ name, value, onChange, label, error }) => (
  <TextField
    fullWidth
    name={name}
    value={value}
    onChange={onChange}
    label={label}
    variant="outlined"
    required
    size="small"
    error={!!error}
    helperText={error}
  />
);


interface SelectFieldComponentProps {
  name: string;
  value: string;
  onChange:  (event: SelectChangeEvent<string>) => void;
  label: string;
  error?: string | boolean;
}

export const SelectFieldComponent :React.FC<SelectFieldComponentProps> = ({ name, value, onChange, label, error })  => (
  <FormControl fullWidth variant="outlined" required error={!!error}>
    <InputLabel size="small" >{label}</InputLabel>
    <Select name={name} value={value} onChange={onChange} size="small"  label={label}>
      <MenuItem  value="class_4">Class 4th</MenuItem>
      <MenuItem value="class_5">Class 5th</MenuItem>
      <MenuItem value="class_6">Class 6th</MenuItem>
      <MenuItem value="class_7">Class 7th</MenuItem>
      <MenuItem value="class_8">Class 8th</MenuItem>
      <MenuItem value="class_9">Class 9th</MenuItem>
      <MenuItem value="class_10">Class 10th</MenuItem>

    </Select>
  </FormControl>
);
