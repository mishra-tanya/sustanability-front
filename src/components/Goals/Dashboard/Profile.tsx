import { useState, useEffect, ChangeEvent } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
} from '@mui/material';
import api from '../../../services/axios';

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    school: '',
    class: '',
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});  

  const classOptions = {
    'class_4': 'Grade 4th',
    'class_5': 'Grade 5th',
    'class_6': 'Grade 6th',
    'class_7': 'Grade 7th',
    'class_8': 'Grade 8th',
    'class_9': 'Grade 9th',
    'class_10': 'Grade 10th',
  };

  useEffect(() => {
    api
      .get('/getuser/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => setFormData(response.data.user))
      .catch((error) => console.error('Error fetching profile data:', error));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));  
  };

  const selecthandleChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      class: e.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, class: '' }));  
  };

  const handleUpdateProfile = () => {
    setErrors({});  
    setMessage(''); 

    api
      .put('/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.errors); 
        } else {
          setMessage('Failed to update profile.');
        }
      });
  };

  return (
    <Box p={2}>
      <br />
      {message && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="School"
            name="school"
            value={formData.school}
            onChange={handleChange}
            variant="outlined"
            error={!!errors.school}
            helperText={errors.school}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" error={!!errors.class}>
            <InputLabel>Grade</InputLabel>
            <Select
              name="class"
              value={formData.class}
              onChange={selecthandleChange}
              label="Class"
            >
              {Object.entries(classOptions).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
            {errors.class && (
              <Typography color="error" variant="caption">
                {errors.class}
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
