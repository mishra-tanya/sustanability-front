import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Grid, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, } from '@mui/material';
import api from '../../../services/axios';
// import { SelectFieldComponent } from '../../common/InputField';

function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // phone: '',
    address: '',
    school: '',
    className: '',
  });

  const [message, setMessage] = useState('');
  const classOptions  = [
    '4-5', '6-8', '9-10', '11-12'
  ];

  useEffect(() => {
    api.get('/getuser/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => setFormData(response.data.user))
      .catch(error => console.error("Error fetching profile data:", error));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const selecthandleChange = (e: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateProfile = () => {
    api.put('/api/user/profile', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("Error updating profile:", error);
        setMessage("Failed to update profile.");
      });
  };

  return (
    <Box p={2}>
<br />
      {message && <Typography sx={{background:'red',mb:3}} variant='h6' textAlign={'center'}>{message}</Typography>}
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
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
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            variant="outlined"
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
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Class</InputLabel>
            <Select
              name="className"
              value={formData.className}
              onChange={selecthandleChange}
              label="Class"
            >
              {classOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
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
