import React,{ FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Footer: FC = (): ReactElement => {
    const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        border:"1px solid grey",
        paddingBottom: "1rem",
      }}
    >
        
      <Container maxWidth="lg">
      

        <Grid container direction="column" alignItems="center">
        
          <Grid item xs={12}>
          <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ color: "black" }}

      >
       <BottomNavigationAction
        label="Facebook"
        icon={
          <a href="https://www.facebook.com" style={{color:"black"}}  target="_blank" rel="noopener noreferrer">
            <FacebookIcon />
          </a>
        }
      />
      <BottomNavigationAction
        label="Instagram"
        icon={
          <a href="https://www.instagram.com" style={{color:"black"}} target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
        }
      />
      <BottomNavigationAction
        label="YouTube"
        icon={
          <a href="https://www.youtube.com"  style={{color:"black"}} target="_blank" rel="noopener noreferrer">
            <YouTubeIcon />
          </a>
        }
      />
      <BottomNavigationAction
        label="Twitter"
        icon={
          <a href="https://www.twitter.com"  style={{color:"black"}} target="_blank" rel="noopener noreferrer">
            <XIcon />
          </a>
        }
      />
      <BottomNavigationAction
        label="LinkedIn"
        icon={
          <a href="https://www.linkedin.com"  style={{color:"black"}} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
        }
      />
    </BottomNavigation>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1" sx={{m:3}}>
            Copyright  2024 - {`${new Date().getFullYear()} | Sustainability Olympiad`}
            </Typography>
          </Grid>
        </Grid>

      </Container>

     
    </Box>

  );
};

export default Footer;