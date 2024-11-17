import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
// import Grid from '@mui/material/Grid2';
import { AddHome, Home, Logout, Person } from '@mui/icons-material';
// import { Button } from '@mui/material';
import Dash from './Dash';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
// import Login from '../../Auth/LoginForm';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Navigations',
  },
  
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'profile',
    title: 'Your Profile',
    icon: <Person />,
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
    segment: '4-5',
    title: 'Class 4-5',
    icon: <LayersIcon />,
  },
  {
    segment: '6-8',
    title: 'Class 6-8',
    icon: <LayersIcon />,
  },
  {
    segment: '9-10',
    title: 'Class 9-10',
    icon: <LayersIcon />,
  },
  {
    segment: '11-12',
    title: 'Class 11-12',
    icon: <LayersIcon />,
  },
  
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

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));


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
      <DashboardLayout>
   <Box sx={{bgcolor:'gre'}}>
   <header>
          <Link to={'/'}>
           <Typography sx={{p:2, textDecoration:"none",textAlign:"right"}}>
            Go back to Home Page
           </Typography>
          </Link>
          
         
        </header>
   </Box>

        <PageContainer>
        
        {selectedPage === 'dashboard' && (
              <>
                <Dash/>
              </>
            )}

{selectedPage === 'profile' && (
             <Profile/>
            )}
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
