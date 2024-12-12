import { useState, useEffect } from "react";
import { fetchOverallData } from "../../../services/apiService";
import LoadingSpinner from "../../common/LoadingSpinner";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Gauge } from "@mui/x-charts";
import Footer from "../../Footer";
import { useNavigate } from "react-router-dom";
import { Visibility } from "@mui/icons-material";

type ClassResult = {
  total_score: number;
  results: Array<{
    id: number;
    user_id: number;
    score: number;
    goal_id: string;
    class_id: string;
    test_id: string;
    answers: string;
    created_at: string;
    updated_at: string;
  }> ;
};

type Data = {
  user_id: number;
  class_results: Record<string, ClassResult>;
};

type DashProps = {
  classId: string;
};

const Dash = ({ classId }: DashProps) => {
  const [data, setData] = useState<Data | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await fetchOverallData();
      setData(apiResponse);
    };
    fetchData();
  }, []);

  if (!data) {
    return <LoadingSpinner size={33} />;
  }

  const handleButtonClick = (class_id: string, goal_id: string, test_id: string) => {
    navigate(`/results/${class_id}/${goal_id}/${test_id}`);
  };

  const classResults = data.class_results[classId];

  if (!classResults) {
    return <p>No results available for class {classId}</p>;
  }

  const res = classResults.total_score;
  const uniqueTestsGiven = new Set(classResults.results.map((result) => result.test_id)).size;
  const uniqueGoalsCompleted = new Set(classResults.results.map((result) => result.goal_id)).size;

  return (
    <div>
      <Grid container spacing={0} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, border: '1px solid lightgrey' }}>
          <Gauge width={150} height={150} value={res ?? 0} />
          <Typography sx={{ textAlign: 'center', marginTop: 1 }}>Overall Percentage</Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, border: '1px solid lightgrey' }}>
          <Gauge width={150} height={150} value={uniqueTestsGiven} valueMax={10} />
          <Typography sx={{ textAlign: 'center', marginTop: 1 }}>Total Tests Given</Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, border: '1px solid lightgrey' }}>
          <Gauge width={150} height={150} value={uniqueGoalsCompleted} valueMax={17} />
          <Typography sx={{ textAlign: 'center', marginTop: 1 }}>Total Goals Attempted/Completed</Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" align="center" sx={{ mt: 5, bgcolor:"#eeeeee", p:1}}>
        Results   for Class {classId}
      </Typography>

      <Box sx={{ overflowX: 'auto', width: '100%',mt:4 }}>
        {classResults.results.length > 0 ? (
          <TableContainer component={Paper}>
            <Table  sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Class No</TableCell>
                  <TableCell>Goal No  </TableCell>
                  <TableCell>Test No</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>View Results</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classResults.results.map((result, index) => (
                  <TableRow key={result.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{result.class_id}</TableCell>
                    <TableCell>{result.goal_id}</TableCell>
                    <TableCell>{result.test_id}</TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>
                      <Button color="primary" sx={{ m: 1 }} onClick={() => handleButtonClick(result.class_id, result.goal_id, result.test_id)}>
                        <Visibility />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography align="center" variant="caption">No results available for this class.</Typography>
        )}
      </Box>

      <Footer />
    </div>
  );
};

export default Dash;