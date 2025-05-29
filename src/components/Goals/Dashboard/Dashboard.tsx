import * as React from 'react';
import { extendTheme, } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
// import Grid from '@mui/material/Grid2';AddHome, Home, Logout,
// import {  Verified } from '@mui/icons-material';
// import { Button } from '@mui/material';
import Dash from './Dash';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
// import Certificate from './Certificate';
// import Login from '../../Auth/LoginForm';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Navigations',
  },

  {
    segment: 'dashboard',
    title: 'Profile',
    icon: <DashboardIcon />,
  },
  
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  // {
  //   segment: 'reports',
  //   title: 'Reports',
  //   icon: <BarChartIcon />,
  //   children: [
  //     {
  //       segment: 'sales',
  //       title: 'Sales',
  //       icon: <DescriptionIcon />,
  //     },
  //     {
  //       segment: 'traffic',
  //       title: 'Traffic',
  //       icon: <DescriptionIcon />,
  //     },
  //   ],
  // },
  {
    segment: '4',
    title: 'Grade 4th',
    icon: <LayersIcon />,
  },
  {
    segment: '5',
    title: 'Grade 5th',
    icon: <LayersIcon />,
  },
  {
    segment: '6',
    title: 'Grade 6th',
    icon: <LayersIcon />,
  },
  {
    segment: '7',
    title: 'Grade 7th',
    icon: <LayersIcon />,
  },
  {
    segment: '8',
    title: 'Grade 8th',
    icon: <LayersIcon />,
  },
  {
    segment: '9',
    title: 'Grade 9th',
    icon: <LayersIcon />,
  },
  {
    segment: '10',
    title: 'Grade 10th',
    icon: <LayersIcon />,
  },

  // {
  //   segment: 'certificates',
  //   title: 'Certificates',
  //   icon: <Verified />,
  // },

];


const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

// const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   height,
//   content: '" "',
// }));


export default function DashboardLayoutBasic(props: any) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  const demoWindow = window ? window() : undefined;
  const [selectedPage, setSelectedPage] = React.useState('dashboard');

  React.useEffect(() => {
    setSelectedPage(router.pathname.replace('/', ''));
  }, [router.pathname]);


  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src="download.png" alt="logo" />,
        title: 'Sustainability Olympiad',
      }}
    >
      <DashboardLayout sx={{
        '& > .MuiBox-root': {
          overflow: 'hidden'
        }
      }}>


        <PageContainer maxWidth="xl" >
          <Link to={'/'} >
            <Typography  >
              Go back to Home Page
            </Typography>
          </Link>
          <br />

          {selectedPage === 'dashboard' && (
            <>

<Profile />
            </>
          )}

          {
            selectedPage == '4' && (
              <Dash classId='4' />
            )
          }
          {
            selectedPage == '5' && (
              <Dash classId='5' />
            )
          }
          {
            selectedPage == '6' && (
              <Dash classId='6' />
            )
          }
          {
            selectedPage == '7' && (
              <Dash classId='7' />
            )
          }
           {
            selectedPage == '8' && (
              <Dash classId='8' />
            )
          }
           {
            selectedPage == '9' && (
              <Dash classId='9' />
            )
          }
           {
            selectedPage == '10' && (
              <Dash classId='10' />
            )
          }
         
           {/* {selectedPage === 'certificates' && (
            <Certificate />
          )} */}

          {/* <Grid container spacing={1}>
            <Grid size={5} />
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={4}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={8}>
              <Skeleton height={100} />
            </Grid>

            <Grid size={12}>
              <Skeleton height={150} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>

            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={3}>
              <Skeleton height={100} />
            </Grid>
          </Grid> */}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
