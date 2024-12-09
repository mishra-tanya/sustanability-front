import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';

interface PasswordProps {
  name: string;
  value: string;
  label: string;
  error?: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  showPassword: boolean;
  toggleShowPassword: () => void;
}

export const PasswordField: React.FC<PasswordProps> = ({
  name,
  value,
  onChange,
  label,
  error,
  showPassword,
  toggleShowPassword,
}) => {
  const [touched, setTouched] = useState(false); 
 
  const validatePassword = (value: string) => {
    return value.length < 6 ? "Password must be at least 6 characters" : "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setTouched(true);
  };

  const validationError = touched ? validatePassword(value) : "";

  return (
    <TextField
      fullWidth
      type={showPassword ? 'text' : 'password'}
      name={name}
      value={value}
      onChange={handleChange}
      label={label}
      variant="outlined"
      required
      error={!!error || !!validationError}
      helperText={error || validationError}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onBlur={() => setTouched(true)} 
    />
  );
};
