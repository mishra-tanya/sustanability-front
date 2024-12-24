import * as React from 'react';
import { extendTheme, } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import {   BarChart, MessageOutlined, Person, Quiz, School, Task } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import Overview from './Overview';
import AllUsers from './AllUsers';
import Certifications from './Certifications';
import UserRegistrationChart from './UserRegistrationChart';
import Contact from './Contact';
import GoalsTable from './GoalsTable';
import TestsData from './TestsData';
import TestQuestionsTable from './TestQuestionsTable';

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
    segment: 'users',
    title: 'All Users',
    icon: <Person />,
  },
  {
    segment: 'track',
    title: 'Track Registration of last 7 days',
    icon: <BarChart />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'certificates',
    title: 'Certifications',
    icon: <School />,
  },
  {
    segment: 'contact',
    title: 'Contact Messages',
    icon: <MessageOutlined />,
  },
  {
    segment: 'goals',
    title: 'All Goals',
    icon: <LayersIcon />,
  },
  {
    segment: 'tests',
    title: 'All Tests',
    icon: <Task />,
  },
  {
    segment: 'questions',
    title: 'All Questions',
    icon: <Quiz />,
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
        logo: <img src="../download.png" alt="logo" />,
        title: 'Admin Panel',
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
              <Overview />
            </>
          )}

          {
            selectedPage === 'users' && (
             <>
             <AllUsers/>
             </>
            )
          }
            {
            selectedPage === 'certificates' && (
             <>
             <Certifications/>
             </>
            )
          }
           {
            selectedPage === 'track' && (
             <>
             <UserRegistrationChart/>
             </>
            )
          }
           {
            selectedPage === 'contact' && (
             <>
             <Contact/>
             </>
            )
          }
           {
            selectedPage === 'goals' && (
             <>
             <GoalsTable/>
             </>
            )
          }
          {
            selectedPage === 'tests' && (
             <>
             <TestsData/>
             </>
            )
          }
           {
            selectedPage === 'questions' && (
             <>
             <TestQuestionsTable/>
             </>
            )
          }
          
        
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
