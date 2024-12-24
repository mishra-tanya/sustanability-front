import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {  Message, Assignment, Quiz, School, Task, VerifiedUserOutlined, Person } from "@mui/icons-material";
import api from "../services/axios";
import LoadingSpinner from "../components/common/LoadingSpinner";

interface DashboardData {
  newUsersToday: number;
  userCount: number;
  totalTestsGiven: number;
  newContactMessages: number;
  totalQuestions: number;
  totalGoals: number;
  totalTests: number;
  totalCertifications: number;
  newCertificationsToday: number;
}

const Overview: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <><LoadingSpinner size={33}/></>;
  }

  if (!data) {
    return <Typography>Error loading dashboard data.</Typography>;
  }

  const cards = [
    { title: "New Users Today", value: data.newUsersToday, icon: <VerifiedUserOutlined color="success" fontSize="large" /> },
    { title: "New Contact Messages", value: data.newContactMessages, icon: <Message color="primary" fontSize="large" /> },
    { title: "New Certifications Today", value: data.newCertificationsToday, icon: <School color="warning" fontSize="large" /> },
    { title: "Tests Given Today", value: data.totalTestsGiven, icon: <Assignment color="warning" fontSize="large" /> },
    { title: "Total Users", value: data.userCount, icon: <Person color="success" fontSize="large" /> },
    { title: "Total Certifications", value: data.totalCertifications, icon: <School color="primary" fontSize="large" /> },
    { title: "Total Goals", value: data.totalGoals, icon: <School color="primary" fontSize="large" /> },
    { title: "Total Tests", value: data.totalTests, icon: <Task color="warning" fontSize="large" /> },
    { title: "Total Questions", value: data.totalQuestions, icon: <Quiz color="success" fontSize="large" /> },

  ];

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} >
            <Card variant='outlined' sx={{p:1}}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" >
                  {card.icon}
                  <Typography variant="h5" align="right">
                    {card.value}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" align="right" sx={{  }}>
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Overview;
