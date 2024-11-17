import { Button, Grid, TextField } from '@mui/material'
import React from 'react'

function Profile() {
  return (
    <div>
         <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Name" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Phone" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained">Update Profile</Button>
                </Grid>
              </Grid>
    </div>
  )
}

export default Profile