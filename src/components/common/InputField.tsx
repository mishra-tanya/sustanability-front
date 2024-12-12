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
      <MenuItem  value="class_4-5">Class 4-5</MenuItem>
      <MenuItem value="class_6-8">Class 6-8</MenuItem>
      <MenuItem value="class_9-10">Class 9-10</MenuItem>
      <MenuItem value="class_11-12">Class 11-12</MenuItem>
    </Select>
  </FormControl>
);
