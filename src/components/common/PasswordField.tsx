import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
}) => (
  <TextField
    fullWidth
    type={showPassword ? 'text' : 'password'}
    name={name}
    value={value}
    onChange={onChange}
    label={label}
    variant="outlined"
    required
    error={!!error}
    helperText={error}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={toggleShowPassword} edge="end">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
);
